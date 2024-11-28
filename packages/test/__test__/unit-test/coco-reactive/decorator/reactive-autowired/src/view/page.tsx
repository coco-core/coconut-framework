import { view } from 'coco-mvc';
import Detail from './detail.tsx';
import Form from './form.tsx';

@view()
class Page {
  @view()
  h() {
    return (
      <div>
        <Detail />
        <Form />
      </div>
    );
  }
}

export default Page;
