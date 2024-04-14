import {createContainer} from "coconut";
import Button from "./components/button";

const container = createContainer(document.getElementById("root"));

container.render(<Button />);