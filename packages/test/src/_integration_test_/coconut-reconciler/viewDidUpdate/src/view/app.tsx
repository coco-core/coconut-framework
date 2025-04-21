import { view } from 'coco-mvc';
import Button from './button';
import { appDidMount } from '../../test.test.ts';

@view()
class App {
  viewDidMount() {
    appDidMount();
  }

  render() {
    return (
      <h1>
        <Button />
      </h1>
    );
  }
}

export default App;
