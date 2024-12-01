import { view, reactive, bind, autowired } from 'coco-mvc';
import Login from '../global-data/login.ts';

@view()
class Button1 {
  @autowired(Login)
  login: Login;

  @view()
  h() {
    return <button>btn-1</button>;
  }
}

export default Button1;
