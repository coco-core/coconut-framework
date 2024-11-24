import { view, reactive, bind, autowired } from 'coco-mvc';
import UserInfo from '../store/user-info.ts';

@view()
class Detail {
  @autowired(UserInfo)
  userInfo: UserInfo;

  label() {
    return `展示:${this.userInfo.name}`;
  }

  @view()
  h() {
    return <h1>{this.label()}</h1>;
  }
}

export default Detail;
