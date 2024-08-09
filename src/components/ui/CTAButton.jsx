const CTAButton = ({ children, disabled = false }) => {
	return (
		<button
			className="w-full py-2 font-semibold text-white bg-black rounded-full h-[45px]"
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default CTAButton;
