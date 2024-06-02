import {createContainer, render} from "coconut";
import App from "./app";

const container = createContainer(document.getElementById("root"));

render(<App />, container);