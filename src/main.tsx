import Taskbar from "./Taskbar";
import "./style.css";
import { Publish } from "./apps/Publish";
new Taskbar();
window["Publish"] = Publish;
new Publish([]);
