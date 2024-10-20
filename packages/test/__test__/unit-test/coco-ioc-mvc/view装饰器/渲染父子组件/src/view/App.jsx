import { view, render, reactive } from 'coco-mvc';
import Button from "./Button";

@view()
class App {

  @render()
  fn () {
    return <h1>
      <Button />
    </h1>
  }
}

export default App