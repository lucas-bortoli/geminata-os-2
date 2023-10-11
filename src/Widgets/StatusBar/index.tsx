import classNames from "classnames";
import { HTMLAttributes } from "preact/compat";
import styles from "../widgets.module.scss";

export function StatusBar(props: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      role="status"
      {...props}
      className={classNames(props.className?.toString(), styles.statusBar)}>
      {props.children}
    </ul>
  );
}

export function StatusBarItem(props: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      role="status"
      {...props}
      className={classNames(props.className?.toString(), styles.statusBarItem)}>
      {props.children}
    </li>
  );
}
