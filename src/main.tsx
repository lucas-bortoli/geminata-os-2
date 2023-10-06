import { Taskbar } from "./Taskbar";
import { Window } from "./Window";
import "./style.css";
import { Publish } from "./apps/Publish";

const wind = new Window();
const wind2 = new Window();
wind.$content.appendChild(<h1>Hello</h1>)
wind2.$content.appendChild(<h1>Hello 2</h1>)

new Taskbar();

window["publish"] = Publish;
