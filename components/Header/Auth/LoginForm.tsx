import styles from "./Form.module.css";
import { FormInput, FormButton, FormLink } from "./FormComponent";
const LoginForm: React.FC = () => {
  return (
    <form className={styles.form}>
      <FormInput id="email" type="email" placeholder="Enter your email" />
      <FormInput
        id="password"
        type="password"
        placeholder="Enter your password"
      />
      <div className={styles["form__navigation"]}>
        <FormLink href="/auth/register">{"Don't have account?"}</FormLink>
        <FormButton>Login</FormButton>
      </div>
    </form>
  );
};

export default LoginForm;
