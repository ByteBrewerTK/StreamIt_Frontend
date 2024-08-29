import OptionsItem from "./OptionsItem";

const SettingsOptions = ({ options, children }) => {
	return (
		<>
			{options.map((option, index) => (
				<OptionsItem {...option} key={index} />
			))}
			{children}
		</>
	);
};

export default SettingsOptions;
