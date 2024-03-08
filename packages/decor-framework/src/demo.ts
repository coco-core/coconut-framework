import {createVirtualDom} from "./component";
import {createRoot} from "./dom";
import Button from "./button";

const root = createRoot(document.getElementById("root"));

const App = createVirtualDom(Button, {});

root.render(App);