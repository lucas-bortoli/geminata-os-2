import StartMenu from "./StartMenu";
import style from "./style.module.scss";

export default class Taskbar {
  readonly $node: HTMLDivElement;
  readonly $clock: HTMLSpanElement;
  readonly $clockTimer: number;
  readonly $startButton: HTMLButtonElement;

  readonly startMenu: StartMenu;

  constructor() {
    this.$node = Taskbar.createDomNode();
    this.$clock = this.$node.querySelector(`.${style.clock}`)!;
    this.$clockTimer = setInterval(this.updateClock.bind(this), 1000);
    this.$startButton = this.$node.querySelector(`.${style.start}`)!;
    this.startMenu = new StartMenu(this.$startButton);

    this.updateClock();

    this.$startButton.addEventListener("click", (event) => {
      if (event.target !== this.$startButton) {
        return;
      }

      requestAnimationFrame(() => this.startMenu.show());
    });

    document.body.appendChild(this.$node);
  }

  updateClock() {
    const time = new Date().toISOString().replace("T", " ").slice(0, 19);
    this.$clock.innerText = time;
  }

  private static createDomNode() {
    return (
      <div class={style.taskbar}>
        <button class={style.start}>Start</button>
        <button>Places</button>
        <button>System</button>
        <div className={style.spacing} />
        <div class={style.tray}>
          <span class={style.clock}></span>
        </div>
      </div>
    ) as HTMLDivElement;
  }
}
