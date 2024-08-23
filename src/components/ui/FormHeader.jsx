const FormHeader = ({ heading, description, children }) => {
	return (
		<section className="flex flex-col items-center w-full sm:mb-8">
			<div className="overflow-hidden bg-black rounded-lg w-fit h-fit">
				{children}
			</div>
			<div className="flex flex-col items-center">
				<h3 className="text-lrg">{heading}</h3>
				<p className="text-center text-smr">{description}</p>
			</div>
		</section>
	);
};

export default FormHeader;
