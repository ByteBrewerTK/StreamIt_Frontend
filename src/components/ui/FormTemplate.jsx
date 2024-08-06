const FormTemplate = ({ children }) => {
	return (
		<main className="grid w-full h-full place-items-center">
			<div className="space-y-2 w-container h-fit sm:w-[360px]  sm:p-4 sm:rounded-2xl sm:shadow-lg sm:py-8">
				{children}
			</div>
		</main>
	);
};

export default FormTemplate
