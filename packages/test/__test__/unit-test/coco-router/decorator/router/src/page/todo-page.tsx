import { view, route } from 'coco-mvc';

@route('/todo-page')
@view()
class TodoPage {
  render() {
    return <div>todo page</div>;
  }
}

export default TodoPage;
