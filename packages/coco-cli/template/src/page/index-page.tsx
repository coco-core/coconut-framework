import { view, route } from 'coco-mvc';

@route('/')
@view()
class IndexPage {
  @view()
  h() {
    return <div>hello coco-mvc</div>;
  }
}

export default IndexPage;
