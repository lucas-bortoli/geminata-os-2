import Taskbar from "./Taskbar";
import "./style.css";
import { TSearch } from "./apps/TorrSearch/Application";

import "./FileSystem";
import { BauApp } from "./apps/Bau/Application";

new Taskbar();
new TSearch([]);
new BauApp([]);
