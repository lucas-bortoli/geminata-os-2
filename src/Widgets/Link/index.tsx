import classNames from "classnames";
import { HTMLAttributes } from "preact/compat";
import styles from "../widgets.module.scss";

export function Link(props: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} target="_blank" className={classNames(props.className?.toString(), styles.link)}>
      {props.children}
    </a>
  );
}

export const Anchor = Link;
