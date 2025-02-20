import { view } from 'coco-mvc';
import Button from './button';
import { appDidMount } from '../../test.test';

@view()
class App {
  componentDidMount() {
    appDidMount();
  }

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
