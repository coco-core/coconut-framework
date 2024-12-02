import { view, route } from 'coco-mvc';

@route('/todo-page')
class TodoPage {
  @view()
  h() {
    return <div>todo page</div>;
  }
}

export default TodoPage;
