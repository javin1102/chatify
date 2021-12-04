import router from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth, jwtkey1 } from "../../utils/auth.utils";
import styles from "./Form.module.css";
import { FormInput, FormButton, FormLink } from "./FormComponent";
import { verify } from "jsonwebtoken";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../redux/user-slice";
import { UserJWT } from "../../_structure/user";
import {
  setPersistence,
  browserSessionPersistence,
  AuthError,
} from "firebase/auth";
const LoginForm: React.FC = () => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // const dispatch = useDispatch<AppDispatch>();
  const [userAuth, loadingAuth, errorAuth] = useAuthState(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (userAuth) {
      router.push("/");
    }

    if (error) {
      if (error.code === "auth/wrong-password") setPasswordError(true);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      )
        setEmailError(true);
    }
  }, [userAuth, error]);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email && !password) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(email as string, password as string);
      })
      .catch((error: AuthError) => {
        console.error(error.code);
      });
  };

  return (
    <form className={styles.form} noValidate onSubmit={onSubmitHandler}>
      <FormInput
        isError={emailError}
        ref={emailRef}
        id="email"
        type="email"
        placeholder="Enter your email"
        errorMessage="Email not found"
      />
      <FormInput
        isError={passwordError}
        ref={passwordRef}
        id="password"
        type="password"
        placeholder="Enter your password"
        errorMessage="Invalid Password"
      />
      <div className={styles["form__navigation"]}>
        <FormLink href="/auth/register">{"Don't have account?"}</FormLink>
        <FormButton>Login</FormButton>
      </div>
    </form>
  );
};

export default LoginForm;
