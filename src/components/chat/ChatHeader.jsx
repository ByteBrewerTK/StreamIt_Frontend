import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/api";
import { useState, useEffect, useRef } from "react";
import SearchItem from "./SearchItem";
import Loader from "../ui/loader/Loader";

const ChatHeader = () => {
	const [searchedData, setSearchedData] = useState(null);
	const [isSearching, setIsSearching] = useState(false);
	const [isSearchedDataActive, setIsSearchedDataActive] = useState(false);
	const navigate = useNavigate();
	const controllerRef = useRef(null);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			controllerRef.current?.abort();
		};
	}, []);

	const handleChatSearch = async (event) => {
		const { value } = event.target;

		// Ignore empty search input
		if (value.trim().length <= 0) {
			setIsSearchedDataActive(false);
			setSearchedData(null);
			return;
		}

		// Cancel previous request
		controllerRef.current?.abort();
		controllerRef.current = new AbortController();
    
		setIsSearching(true);
		try {
			const result = await apiRequest(
				`/user?search=${value.trim()}`,
				"GET",
				{},
				controllerRef.current.signal
			);

			if (result?.statusCode === 200) {
				setSearchedData(result?.data || []);
				setIsSearchedDataActive(true);
			} else {
				setSearchedData([]);
			}
		} catch (error) {
			if (error.name === "CanceledError") {
				console.log("Search request canceled.");
			} else {
				console.error("Search error:", error);
			}
		} finally {
			setIsSearching(false);
		}
	};

	return (
		<header className="flex items-center justify-between w-full py-2 gap-x-2 bg-primary">
			<button onClick={() => navigate(-1)}>
				<MdArrowBack className="text-2xl text-white text-opacity-60" />
			</button>

			<div className="flex items-center h-8 px-1 border border-white rounded-md border-opacity-60 gap-x-2">
				<FaMagnifyingGlass className="text-white text-opacity-60 text-[20px]" />
				<input
					onChange={handleChatSearch}
					type="search"
					placeholder="Search"
					className="w-full text-white bg-transparent outline-none"
				/>
				<div className="flex size-fit">
					{isSearching && (
						<span className="size-[20px] aspect-square">
							<Loader />
						</span>
					)}
				</div>
			</div>

			<button>
				<IoMdMore className="text-xl text-white text-opacity-60" />
			</button>

			{isSearchedDataActive && (
				<div className="fixed border-b border-muted max-h-[15rem] w-full top-[3rem] overflow-x-hidden overflow-y-auto scrollbar-hide bg-primary">
					{searchedData?.length > 0 ? (
						searchedData.map((item) => (
							<SearchItem {...item} key={item._id} />
						))
					) : (
						<div className=" h-[3rem] grid place-content-center">
							<span className="text-center text-muted">
								No results found
							</span>
						</div>
					)}
				</div>
			)}
		</header>
	);
};

export default ChatHeader;
