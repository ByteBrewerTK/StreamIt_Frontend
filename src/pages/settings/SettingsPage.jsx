import { Outlet } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useNavVisible from "../../hooks/useNavVisible";
import useSetNavTitle from "../../hooks/useSetNavTitle";

const SettingsPage = () => {
	useNavVisible(true);
	const navigate = useNavigate();
	const { navTitle } = useSetNavTitle("Settings");

	return (
		<main className="flex flex-col overflow-hidden text-white size-full">
			<header className="w-full py-2 md:hidden bg-primary">
				<nav className="flex items-center mx-auto space-x-4 w-container">
					<span
						onClick={() => {
							navigate(-1);
						}}
					>
						<MdArrowBack className="text-xl" />
					</span>
					<h2 className="text-lg">{navTitle}</h2>
				</nav>
			</header>

			<section className="flex flex-row flex-1">
				<Outlet />
			</section>
		</main>
	);
};

export default SettingsPage;
