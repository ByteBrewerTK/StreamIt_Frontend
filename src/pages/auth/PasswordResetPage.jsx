import FormHeader from "../../components/ui/FormHeader";
import FormTemplate from "../../components/ui/FormTemplate";
import { TbPasswordMobilePhone } from "react-icons/tb";

const PasswordResetPage = () => {
	const form_header = {
		heading: "Forgot Password?",
		description: "Don't worry we got you covered, Please enter your registered email",
	};
	return (
		<FormTemplate>
			<FormHeader {...form_header} >
        <TbPasswordMobilePhone className="text-[60px] text-white"/>
      </FormHeader>
			
		</FormTemplate>
	);
};

export default PasswordResetPage;
