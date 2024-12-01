import { view } from 'coco-mvc';
import Form1 from './form1.tsx';

@view()
class Page1 {
  @view()
  h() {
    return (
      <div>
        <Form1 />
      </div>
    );
  }
}

export default Page1;
