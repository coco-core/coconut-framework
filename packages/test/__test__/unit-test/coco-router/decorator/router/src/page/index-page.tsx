import { view, route } from 'coco-mvc';

@route('/')
@view()
class IndexPage {
  render() {
    return <div>index page</div>;
  }
}

export default IndexPage;
