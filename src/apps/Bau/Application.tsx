import { render } from "preact";
import { Window } from "../../Window";
import { Application } from "../Application";

//@ts-expect-error "unused import", React is used for JSX compilation
import React from "preact/compat";

@Application()
export class BauApp implements Application {
  static appId = "com.lucas-bortoli.geminata.bau";
  static appName = "Baú";
  static icon = { 16: "" };

  readonly mainWindow: Window;

  constructor(_args: string[]) {
    this.mainWindow = new Window();
    this.mainWindow.title = "Baú";

    console.log(this.mainWindow.$content)

    render(<h1>OK</h1>,
      this.mainWindow.$content
    );
  }

  onExit(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
