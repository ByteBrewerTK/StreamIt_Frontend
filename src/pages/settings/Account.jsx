import { BsPersonVcard } from "react-icons/bs";
import OptionsItem from "../../components/settings/OptionsItem";
const Account = () => {
	const options = [
		{
			title: "Personal Info",
			icon: BsPersonVcard,
			path: "personal-info",
		},
		
		
	];
	return (
		<main className="flex-1 text-white border">
			{options.map((option, index) => (
				<OptionsItem {...option} key={index} />
			))}
		</main>
	);
};

export default Account;
