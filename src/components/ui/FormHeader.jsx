import React from "react"; // Import React if not already present
import logo from "../../assets/logo.png"; // Ensure this is being used correctly somewhere


const FormHeader = ({ heading, description, children }) => {
    // console.log(heading, description, Icon)
	return (
		<section className="flex flex-col items-center w-full mb-8">
			<div className="overflow-hidden bg-black rounded-lg w-fit h-fit">
				{/* Use the icon component passed as a prop */}
				{/* <div className="text-[60px] text-white">
					<Icon />
				</div> */}
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
