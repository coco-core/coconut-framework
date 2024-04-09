import {createContainer} from "coconut-framework";
import Button from "./components/button";

const container = createContainer(document.getElementById("root"));

container.render(<Button />);