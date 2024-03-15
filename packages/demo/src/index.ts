import {createVirtualDom} from "decor-framework";
import {createContainer} from "decor-framework";
import Button from "./components/button";

const container = createContainer(document.getElementById("root"));

const App = createVirtualDom(Button, {})
container.render(App);