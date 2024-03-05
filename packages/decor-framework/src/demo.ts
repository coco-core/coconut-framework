import {createVirtualDom} from "./component";
import {createChild} from "./reconciler/dom";
import {reconciler} from "./reconciler";

const root = document.getElementById("root");

const App = createVirtualDom('div', { children: "hello decor!"});

reconciler(null, App, root);