import {createVirtualDom} from "./component";
import {createContainer} from "./dom";
import Button from "./button";

const container = createContainer(document.getElementById("root"));

const App = createVirtualDom(Button, {})
container.render(App);