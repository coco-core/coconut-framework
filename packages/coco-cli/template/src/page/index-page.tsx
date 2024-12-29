import { view, route } from 'coco-mvc';

@route('/')
@view()
class IndexPage {
  @view()
  h() {
    return <div>hello coconut</div>;
  }
}

export default IndexPage;
