import { render } from "preact";
import { Window } from "../../Window";
import { Application } from "../Application";

//@ts-expect-error "unused import", React is used for JSX compilation
import React from "preact/compat";

import widgets from "../../Widgets/widgets.module.scss";
import { Menu, MenuBar, MenuDivider, MenuItem } from "../../Widgets/MenuBar";
import { Button } from "../../Widgets/Button";

@Application()
export class BauApp implements Application {
  static appId = "com.lucas-bortoli.geminata.bau";
  static appName = "Baú";
  static icon = { 16: "" };

  readonly mainWindow: Window;

  constructor(_args: string[]) {
    this.mainWindow = new Window();
    this.mainWindow.title = "Baú";

    render(this.createReactTree(), this.mainWindow.$content);
  }

  private createReactTree() {
    return (
      <div>
        <MenuBar>
          <MenuItem label="Arquivo">
            <Menu>
              <MenuItem label="Abrir" />
              <MenuItem label="Salvar" />
              <MenuDivider />
              <MenuItem label="Sair" />
            </Menu>
          </MenuItem>
          <MenuItem label="Ver"></MenuItem>
        </MenuBar>
        <Button>Nice</Button>
      </div>
    );
  }

  onExit(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
