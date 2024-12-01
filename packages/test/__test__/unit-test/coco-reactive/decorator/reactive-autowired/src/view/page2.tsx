import { view } from 'coco-mvc';
import Form2 from './form2.tsx';

@view()
class Page2 {
  @view()
  h() {
    return (
      <div>
        <Form2 />
      </div>
    );
  }
}

export default Page2;
