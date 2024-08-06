import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const OauthUi = () => {
	return (
		<div className="relative space-y-2">
			<div className="flex items-center justify-between py-2 space-x-4 select-none">
				<span className="w-full h-px bg-muted_border" />
				<span className="font-semibold text-muted text-smr">OR</span>
				<span className="w-full h-px bg-muted_border" />
			</div>
			<div className="flex justify-center py-2 space-x-2 border rounded-full border-muted_border">
				<FcGoogle className="text-mid" />
				<span className="text-smr">Sign up with Google</span>
			</div>
			<div className="flex justify-center py-2 space-x-2 border rounded-full border-muted_border">
				<FaGithub className="text-mid" />
				<span className="text-smr">Sign up with GitHub</span>
			</div>
		</div>
	);
};

export default OauthUi;
