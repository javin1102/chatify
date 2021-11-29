import React from "react";
import styles from "./Form.module.css";
interface InputProps {
  id: string;
  type: string;
  placeholder: string;
}
export const FormInput: React.FC<InputProps> = ({ id, type, placeholder }) => {
  return (
    <div className={styles["form__content"]}>
      <input id={id} type={type} placeholder={placeholder} />
    </div>
  );
};

export const FormButton: React.FC = ({ children }) => {
  return <button className={styles["form__button"]}>{children}</button>;
};

export const FormLink: React.FC<{ href: string }> = ({ children, href }) => {
  return (
    <a className={styles["form__link"]} href={href}>
      {children}
    </a>
  );
};
