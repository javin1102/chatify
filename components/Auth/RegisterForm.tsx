import styles from "./Form.module.css";
import { FormInput, FormButton, FormLink } from "./FormComponent";
import { auth, validateEmail } from "../../utils/auth.utils";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile,
  User,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setUserCredentials } from "../../redux/user-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

enum ValidateFormType {
  USERNAME = "USERNAME",
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  CONFIRM = "CONFIRM",
}

interface FormType {
  username: string | undefined;
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
  usernameError: boolean;
  emailError: boolean;
  passwordError: boolean;
  confirmError: boolean;
}
interface ErrorMessageType {
  usernameMessage: string;
  emailMessage: string;
  passwordMessage: string;
  confirmMessage: string;
}

const FormReducerState: ValidateFormState = {
  usernameError: false,
  emailError: false,
  passwordError: false,
  confirmError: false,
};

const FormErrorReducer = (
  state: ValidateFormState,
  action: ValidateFormAction
) => {
  const { type, payload } = action;
  const { username, email, password, confirm, miscEmail } = payload;
  switch (type) {
    case ValidateFormType.USERNAME:
      if (!username) {
        return {
          ...state,
          usernameError: true,
        };
      }
      return {
        ...state,
        usernameError: false,
      };
    case ValidateFormType.EMAIL:
      if (!email || !validateEmail(email) || miscEmail) {
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
      if (!password || password.length < 6) {
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
  usernameMessage: "Username must be filled",
  emailMessage: "Invalid Email",
  passwordMessage: "Password need to be at least 6 characters",
  confirmMessage: "Password does not match",
};
const RegisterForm: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const [state, dispatch] = useReducer(FormErrorReducer, FormReducerState);
  const [errorMessage, setErrorMessage] = useState(ErrorMessageState);

  const dispatchRegister = useDispatch<AppDispatch>();
  const [authUser] = useAuthState(auth);

  useEffect(() => {
    const updateData_Redirect = async () => {
      await updateProfile(authUser as User, {
        displayName: usernameRef.current?.value,
      });
      return router.push("/");
    };
    if (authUser && usernameRef.current?.value) {
      updateData_Redirect();
    }
  }, [authUser, router]);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const formValue: FormType = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirm: confirmRef.current?.value,
      miscEmail: false,
    };

    setErrorMessage(ErrorMessageState);
    dispatch({ type: ValidateFormType.USERNAME, payload: formValue });
    dispatch({ type: ValidateFormType.EMAIL, payload: formValue });
    dispatch({ type: ValidateFormType.PASSWORD, payload: formValue });
    dispatch({ type: ValidateFormType.CONFIRM, payload: formValue });

    if (
      state.usernameError ||
      state.emailError ||
      state.passwordError ||
      state.confirmError
    )
      return;

    await createUserWithEmailAndPassword(
      auth,
      String(emailRef.current?.value),
      String(passwordRef.current?.value)
    )
      .then(async (userCredential: UserCredential) => {
        console.log(userCredential);

        dispatchRegister(
          setUserCredentials({
            name: formValue.username,
            userId: userCredential.user.uid,
          })
        );
        const tokenId = await userCredential.user.getIdToken();
        localStorage.setItem("tokek", tokenId);
      })
      .catch((error) => {
        const errorMessage = error.code.split("/")[1].split("-").join(" ");
        const upper = errorMessage.charAt(0).toUpperCase();
        const upperErrorMessage = errorMessage.replace(
          errorMessage.charAt(0),
          upper
        );

        console.log(errorMessage);

        formValue.miscEmail = true;
        if (upperErrorMessage === "Email already in use") {
          // console.log(upperErrorMessage);
          setErrorMessage((state: ErrorMessageType) => ({
            ...state,
            emailMessage: "Email already in use",
          }));
          dispatch({ type: ValidateFormType.EMAIL, payload: formValue });
        }
      });
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler} noValidate>
      <FormInput
        id="username"
        type="text"
        placeholder="Enter your username"
        ref={usernameRef}
        errorMessage={errorMessage.usernameMessage}
        isError={state.usernameError}
      />
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
