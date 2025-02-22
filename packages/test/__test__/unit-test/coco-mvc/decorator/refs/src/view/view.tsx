import { view, ref, bind } from 'coco-mvc';

@view()
class View {
  id() {
    return 'view-component';
  }

  @view()
  render() {
    return <div>view</div>;
  }
}

export default View;
