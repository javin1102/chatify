import { NextPage } from "next";
import RegisterForm from "../../components/Auth/RegisterForm";

const Register: NextPage = () => {
  return (
    <div className="app-container form-container">
      <h1>Register To Chatify</h1>
      <RegisterForm />
    </div>
  );
};
export default Register;
