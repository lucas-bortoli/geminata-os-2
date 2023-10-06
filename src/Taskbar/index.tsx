import style from "./style.module.scss";

export class Taskbar {
  $node: HTMLDivElement;
  $clock: HTMLSpanElement;
  $clockTimer: number;

  constructor() {
    this.$node = Taskbar.createDomNode();
    this.$clock = this.$node.querySelector(`.${style.clock}`)!;
    this.$clockTimer = setInterval(this.updateClock.bind(this), 1000);

    this.updateClock();
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
