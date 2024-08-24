import { useNavigate, Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { GoGear } from "react-icons/go";

const ProfileNav = () => {
	const navigate = useNavigate();
	return (
		<header className="w-full py-2">
			<nav className="flex items-center justify-between mx-auto w-container">
				<button
					onClick={() => {
						navigate(-1);
					}}
				>
					<MdArrowBack className="text-2xl"/>
				</button>

				<div>
					<Link to={"/user/settings"}>
						<GoGear className="text-xl"/>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default ProfileNav;
