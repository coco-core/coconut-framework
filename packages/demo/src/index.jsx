import {createContainer} from "coconut";
import App from "./app";

const container = createContainer(document.getElementById("root"));

container.render(<App />);