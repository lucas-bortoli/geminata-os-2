import { attachDrag } from "./events/attachDrag";
import { attachResize } from "./events/attachResize";
import { attachZOrder } from "./events/attachZOrder";
import style from "./style.module.scss";

type Div = HTMLDivElement;

export class Window extends EventTarget {
  private $win: Div;
  private attachedEvents: (() => void)[];

  constructor() {
    super();

    this.$win = Window.createDomNode();
    this.attachedEvents = [];

    document.body.appendChild(this.$win);

    this.attachEvents();
  }

  get $content() {
    return this.$win.querySelector("main")!;
  }

  get title() {
    return this.$win.querySelector(`.${style.titlebar} > span`)!.textContent ?? "";
  }

  set title(title: string) {
    this.$win.querySelector(`.${style.titlebar} > span`)!.textContent = title;
  }

  private attachEvents() {
    const $win = this.$win;
    const $titleBar = $win.querySelector(`.${style.titlebar}`)! as Div;
    const $resizeHandle = $win.querySelector(`.${style.resizeBorder}`)! as Div;

    this.detachEvents();
    this.attachedEvents = [
      attachDrag($win, $titleBar),
      attachResize($win, $resizeHandle),
      attachZOrder($win),
    ];
  }

  private detachEvents() {
    this.attachedEvents.forEach(detach => detach());
    this.attachedEvents = [];
  }

  private static createDomNode() {
    return (
      <div class={style.windowWrapper}>
        <div class={style.resizeBorder} />
        <div class={style.window}>
          <div class={style.titlebar}>
            <span>Hello</span>
            <div class={style.buttons}>
              <button class={style.minimize} />
              <button class={style.maximize} />
              <button class={style.close} />
            </div>
          </div>
          <main className={style.content}></main>
        </div>
      </div>
    ) as Div;
  }
}
