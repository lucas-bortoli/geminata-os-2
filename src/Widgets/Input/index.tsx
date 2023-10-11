import classNames from "classnames";
import { HTMLAttributes } from "preact/compat";
import styles from "../widgets.module.scss";

export function Input(props: HTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={classNames(props.className?.toString(), styles.input)} />;
}
