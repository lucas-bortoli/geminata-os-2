import { Window } from "./Window";
import "./style.css";

const wind = new Window();
const wind2 = new Window();
wind.$content.appendChild(<h1>Hello</h1>)
wind2.$content.appendChild(<h1>Hello 2</h1>)
