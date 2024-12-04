import router from '../decorator/router.ts';

@router()
class HistoryRouter {
  constructor() {
    // todo 获取所有带有Route元数据的组件，保存映射关系
    // 监听浏览器push事件，添加对应回调
  }
}

export default HistoryRouter;
