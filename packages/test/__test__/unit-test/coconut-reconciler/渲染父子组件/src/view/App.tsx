import { view } from 'coco-mvc';
import Button from './Button';

@view()
class App {
  @view()
  fn() {
    return (
      <h1>
        <Button />
      </h1>
    );
  }
}

export default App;
