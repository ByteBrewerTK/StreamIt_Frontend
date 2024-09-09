import { useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center w-full h-screen bg-black">
			<div className="text-center">
				<h1 className="font-bold text-white text-7xl">404</h1>
				<p className="mt-4 text-2xl text-white">
					Oops! The page you're looking for doesn't exist.
				</p>
				<p className="mt-2 text-lg text-white">
					It looks like you might have taken a wrong turn. Don't
					worry, it happens to the best of us.
				</p>
				<button
					onClick={() => {
						navigate(-1);
					}}
					className="px-8 py-3 mt-8 font-semibold text-black transition duration-300 ease-in-out bg-white rounded hover:bg-gray-800 hover:text-white"
				>
					Go Back
				</button>
			</div>
		</div>
	);
}

export default NotFound;
