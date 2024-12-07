import { view, route } from 'coco-mvc';

@route('/')
@view()
class IndexPage {
  @view()
  h() {
    return <div>index page</div>;
  }
}

export default IndexPage;
