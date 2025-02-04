import { autowired, view } from 'coco-mvc';
import Button from './button.tsx';
import Theme from '../component/theme.ts';
import Router from '../component/router.ts';
import Route from '../component/route.ts';

@view()
class UserInfo {
  @autowired()
  button: Button;

  @autowired()
  theme: Theme;

  @autowired()
  router: Router;

  @autowired()
  route: Route;
}

export default UserInfo;
