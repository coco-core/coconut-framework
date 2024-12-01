import { view } from 'coco-mvc';
import Form1 from './form1.tsx';
import Detail1 from './detail1.tsx';

@view()
class Page1 {
  @view()
  h() {
    return (
      <div>
        <Form1 />
        <Detail1 />
      </div>
    );
  }
}

export default Page1;
