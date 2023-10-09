import { TSearch } from "../../apps/TorrSearch/Application";
import style from "./style.module.scss";

export default class StartMenu {
  private $parent: HTMLElement;
  private $element: HTMLDivElement | null;

  /**
   * A reference to the handleFocusLost function, with "this" bound to the class
   */
  private _focusLost: (typeof this)["handleFocusLost"];

  constructor($parent: HTMLElement) {
    this.$parent = $parent;
    this.$element = null;
    this._focusLost = this.handleFocusLost.bind(this);
  }

  show() {
    this.removeFromDom();

    this.$element = this.createDomNode();

    this.$element.toggleAttribute("x-shown");
    this.$parent.appendChild(this.$element);
    this.$element.focus();

    this.$element.addEventListener("blur", this._focusLost);
    document.addEventListener("click", this._focusLost);
  }

  handleFocusLost(_event: MouseEvent | FocusEvent) {
    if (this.$element?.matches(":focus-within")) {
      // Clicked in menu
      return;
    }

    this.removeFromDom();
  }

  private removeFromDom() {
    document.removeEventListener("click", this._focusLost);
    this.$element?.remove();
    this.$element = null;
  }

  private launchApp() {
    new TSearch([]);

    this.removeFromDom();
  }

  private createDomNode() {
    return (
      <ul role="menu" className={style.startMenu}>
        <li tabIndex={0}>Publisher</li>
        <li tabIndex={0} onClick={() => this.launchApp()}>TSearch</li>
        <li aria-hidden className={style.separator}></li>
        <li tabIndex={0}>Calculator</li>
      </ul>
    ) as HTMLDivElement;
  }
}
