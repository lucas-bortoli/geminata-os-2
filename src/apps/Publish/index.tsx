import { Window } from "../../Window";
import { Application } from "../Application";

@Application()
export class Publish implements Application {
  static appId = "";
  static appName = "Publish";
  static icon = { 16: "" }

  readonly mainWindow: Window;

  constructor(args: string[]) {
    this.mainWindow = new Window();
    this.mainWindow.$content.appendChild(<h1>Hello World!</h1>);
  }

  async onExit(): Promise<void> {

  }
}
