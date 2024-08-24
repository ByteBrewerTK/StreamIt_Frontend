import { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import SettingsOptions from "../../components/settings/SettingsOptions";

const SettingsPage = () => {
	const { setNavVisible } = useOutletContext();
	const navigate = useNavigate();
	useEffect(() => {
		setNavVisible(false);

		return () => {
			setNavVisible(true);
		};
	}, []);
	return (
		<main className="flex flex-col overflow-hidden text-white size-full">
			<header className="w-full py-2 bg-primary">
				<nav className="flex items-center mx-auto space-x-4 w-container">
					<span onClick={()=>{navigate(-1)}}>
						<MdArrowBack className="text-xl" />
					</span>
					<h2 className="text-lg">Settings</h2>
				</nav>
			</header>
			<div className="flex-1 py-4">
                <SettingsOptions/>
            </div>
		</main>
	);
};

export default SettingsPage;
