import { view, route } from 'coco-mvc';

@route('/')
class IndexPage {
  @view()
  h() {
    return <div>index page</div>;
  }
}

export default IndexPage;
