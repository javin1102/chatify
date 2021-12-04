import styles from "./Form.module.css";
import { FormInput, FormButton, FormLink } from "./FormComponent";
import { auth, validateEmail } from "../../utils/auth.utils";
import { useReducer, useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
enum ValidateFormType {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  CONFIRM = "CONFIRM",
}

interface FormType {
  email: string | undefined;
  password: string | undefined;
  confirm: string | undefined;
  miscEmail?: boolean;
}
interface ValidateFormAction {
  type: ValidateFormType;
  payload: FormType;
}

interface ValidateFormState {
  emailError: boolean;
  passwordError: boolean;
  confirmError: boolean;
}
interface ErrorMessageType {
  emailMessage: string;
  passwordMessage: string;
  confirmMessage: string;
}

const FormReducerState = {
  emailError: false,
  passwordError: false,
  confirmError: false,
};

const FormErrorReducer = (
  state: ValidateFormState,
  action: ValidateFormAction
) => {
  const { type, payload } = action;
  const { email, password, confirm, miscEmail } = payload;
  switch (type) {
    case ValidateFormType.EMAIL:
      if ((email && !validateEmail(email)) || miscEmail) {
        return {
          ...state,
          emailError: true,
        };
      }
      return {
        ...state,
        emailError: false,
      };

    case ValidateFormType.PASSWORD:
      if (password && password.length < 6) {
        return {
          ...state,
          passwordError: true,
        };
      }
      return {
        ...state,
        passwordError: false,
      };

    case ValidateFormType.CONFIRM:
      if (confirm !== password) {
        return {
          ...state,
          confirmError: true,
        };
      }
      return {
        ...state,
        confirmError: false,
      };
    default:
      return state;
  }
};
const ErrorMessageState: ErrorMessageType = {
  emailMessage: "Invalid Email",
  passwordMessage: "Password need to be at least 6 characters",
  confirmMessage: "Password does not match",
};
const RegisterForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [state, dispatch] = useReducer(FormErrorReducer, FormReducerState);
  const [errorMessage, setErrorMessage] = useState(ErrorMessageState);

  //Register User
  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const formValue: FormType = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirm: confirmRef.current?.value,
      miscEmail: false,
    };

    setErrorMessage(ErrorMessageState);

    dispatch({ type: ValidateFormType.EMAIL, payload: formValue });
    dispatch({ type: ValidateFormType.PASSWORD, payload: formValue });
    dispatch({ type: ValidateFormType.CONFIRM, payload: formValue });

    if (state.emailError || state.passwordError || state.confirmError) return;

    await createUserWithEmailAndPassword(
      auth,
      String(emailRef.current?.value),
      String(passwordRef.current?.value)
    )
      .then((userCredential) => console.log(userCredential))
      .catch((error) => {
        const errorMessage = error.code.split("/")[1].split("-").join(" ");
        const upper = errorMessage.charAt(0).toUpperCase();
        const upperErrorMessage = errorMessage.replace(
          errorMessage.charAt(0),
          upper
        );

        formValue.miscEmail = true;

        if (upperErrorMessage === "Email alredy in use") {
          dispatch({ type: ValidateFormType.EMAIL, payload: formValue });
          setErrorMessage((state: ErrorMessageType) => ({
            ...state,
            emailMessage: "Email already in use",
          }));
        }
      });
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler} noValidate>
      <FormInput
        id="email"
        type="email"
        placeholder="Enter your email"
        ref={emailRef}
        errorMessage={errorMessage.emailMessage}
        isError={state.emailError}
      />
      <FormInput
        id="password"
        type="password"
        placeholder="Enter your password"
        ref={passwordRef}
        errorMessage={errorMessage.passwordMessage}
        isError={state.passwordError}
      />
      <FormInput
        id="confirm-password"
        type="password"
        placeholder="Re-enter your password"
        ref={confirmRef}
        errorMessage={errorMessage.confirmMessage}
        isError={state.confirmError}
      />
      <div className={styles["form__navigation"]}>
        <FormLink href="/auth/login">{"Already have account?"}</FormLink>
        <FormButton ref={buttonRef}>Register</FormButton>
      </div>
    </form>
  );
};

export default RegisterForm;
