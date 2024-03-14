import {createVirtualDom} from "../src/component";
import {createContainer} from "../src/dom";
import Button from "./button";

const container = createContainer(document.getElementById("root"));

const App = createVirtualDom(Button, {})
container.render(App);