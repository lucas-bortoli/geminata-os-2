import { render } from "preact";
import { Window } from "../../Window";
import { Application } from "../Application";

import UI from "../../Widgets/widgets.module.scss";
import style from "./style.module.scss";

//@ts-expect-error "unused import", React is used for JSX compilation
import React from "preact/compat";

@Application()
export class TSearch implements Application {
  static appId = "com.lucas-bortoli.geminata.tsearch";
  static appName = "TSearch";
  static icon = { 16: "" };

  readonly mainWindow: Window;

  constructor(_args: string[]) {
    this.mainWindow = new Window();
    this.mainWindow.title = "TSearch";

    render(
      <div className={style.main}>
        <h1>TSearch</h1>
        <p>Sua ferramenta para pesquisa nos arquivos (backups) de magnets.</p>
        <p>Encontre facilmente o que procura em nossos arquivos indexados.</p>
        <p>Comece sua busca agora!</p>
        <div className={style.searchWrapper}>
          <input type="text" className={UI.input} />
          <button className={UI.button}>Estou com sorte</button>
          <button className={UI.button}>Pesquisa</button>
        </div>
      </div>,
      this.mainWindow.$content
    );
  }

  onExit(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
