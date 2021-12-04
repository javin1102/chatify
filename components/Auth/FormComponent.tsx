import React, { forwardRef } from "react";
import styles from "./Form.module.css";
interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  errorMessage?: string | null | undefined;
  isError: boolean;
}
interface ButtonProps {
  children: string;
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, placeholder, type, errorMessage, isError }, ref) => {
    return (
      <div className={styles["form__content"]}>
        <input id={id} type={type} placeholder={placeholder} ref={ref} />
        <p className={styles["form__invalid"]}>{isError && errorMessage}</p>
      </div>
    );
  }
);
FormInput.displayName = "Form Input";

export const FormButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children }, ref) => {
    return (
      <button className={styles["form__button"]} ref={ref}>
        {children}
      </button>
    );
  }
);

FormButton.displayName = "Form Button";

export const FormLink: React.FC<{ href: string }> = ({ children, href }) => {
  return (
    <a className={styles["form__link"]} href={href}>
      {children}
    </a>
  );
};
