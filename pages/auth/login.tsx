import { NextPage } from "next";
import LoginForm from "../../components/Auth/LoginForm";

const Login: NextPage = () => {
	return (
		<div className="app-container form-container">
			<h1>Login To Chatify</h1>
			<LoginForm />
		</div>
	);
};

export default Login;
