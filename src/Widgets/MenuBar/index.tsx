import classNames from "classnames";
import { HTMLAttributes } from "preact/compat";
import styles from "../widgets.module.scss";

export function MenuBar(props: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      role="menubar"
      {...props}
      className={classNames(props.className?.toString(), styles.menuBar)}>
      {props.children}
    </ul>
  );
}

export function Menu(props: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      tabIndex={0}
      role="menu"
      {...props}
      className={classNames(props.className?.toString(), styles.menu)}>
      {props.children}
    </ul>
  );
}

export function MenuItem(
  props: HTMLAttributes<HTMLLIElement> & { label: string; isDivider?: boolean }
) {
  const handleClose: (typeof props)["onClick"] = event => {
    if (!props.onClick) {
      return;
    }

    // Esconder menu ao clicar
    const sourceNode = event.currentTarget;
    let targetMenu: HTMLElement | null | undefined = sourceNode;

    do {
      targetMenu = targetMenu?.parentElement?.closest("ul[role='menu']");
      if (targetMenu) targetMenu.style.display = "none";
    } while (Boolean(targetMenu));

    setTimeout(() => {
      targetMenu = sourceNode;

      do {
        targetMenu = targetMenu?.parentElement?.closest("ul[role='menu']");
        if (targetMenu) targetMenu.style.display = "";
      } while (Boolean(targetMenu));
    }, 100);

    props.onClick(event);
  };

  return (
    <li
      tabIndex={1}
      role="menuitem"
      {...props}
      className={classNames(props.className?.toString(), styles.menuItem)}
      onClick={handleClose}
      x-divider={props.isDivider}>
      {props.label}
      {props.children}
    </li>
  );
}

export const MenuDivider = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={classNames(props.className?.toString(), styles.menuDivider)} />
  );
};
