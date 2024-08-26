const CTAButton = ({ children, disabled = false , bg_col = "black"}) => {
	return (
		<button
			className={`w-full py-2 font-semibold text-white bg-${bg_col} rounded-full h-[45px]`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default CTAButton;
