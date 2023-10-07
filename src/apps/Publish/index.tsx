import { Window } from "../../Window";
import { Application } from "../Application";
import theme from "../../widgets.module.scss"

@Application()
export class Publish implements Application {
  static appId = "";
  static appName = "Publish";
  static icon = { 16: "" }

  readonly mainWindow: Window;

  constructor(args: string[]) {
    this.mainWindow = new Window();
    this.mainWindow.$content.appendChild(<>
      <button class={theme.button}>Hello</button>
    </>);
  }

  async onExit(): Promise<void> {

  }
}
