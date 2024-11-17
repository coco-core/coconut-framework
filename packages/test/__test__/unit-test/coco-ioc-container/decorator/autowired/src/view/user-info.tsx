import { autowired, view } from 'coco-mvc';
import Button from './button';
import Theme from '../component/theme.ts';
import Router from '../component/router.ts';
import Route from '../component/route.ts';

@view()
class UserInfo {
  @autowired(Button)
  button: Button;

  @autowired(Theme)
  theme: Theme;

  @autowired(Router)
  router: Router;

  @autowired(Route)
  route: Route;
}

export default UserInfo;
