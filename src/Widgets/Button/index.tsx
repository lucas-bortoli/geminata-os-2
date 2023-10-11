import classNames from "classnames";
import { HTMLAttributes } from "preact/compat";
import styles from "../widgets.module.scss";

export function Button(props: HTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={classNames(props.className?.toString(), styles.button)}>{props.children}</button>;
}
