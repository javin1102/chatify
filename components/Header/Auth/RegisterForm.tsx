import styles from "./Form.module.css";
import { FormInput, FormButton, FormLink } from "./FormComponent";
const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <FormInput id="email" type="email" placeholder="Enter your email" />
      <FormInput
        id="password"
        type="password"
        placeholder="Enter your password"
      />
      <FormInput
        id="confirm-password"
        type="password"
        placeholder="Re-enter your password"
      />
      <div className={styles["form__navigation"]}>
        <FormLink href="/auth/login">{" Already have account?"}</FormLink>
        <FormButton>Register</FormButton>
      </div>
    </form>
  );
};

export default RegisterForm;
