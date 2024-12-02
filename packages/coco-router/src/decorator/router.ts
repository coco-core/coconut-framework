import {
  ClassContext,
  Metadata,
  genDecorator,
  component,
  target,
  Target,
  scope,
  Scope,
  type ApplicationContext,
} from 'coco-ioc-container';

@target([Target.Type.Method])
@scope(Scope.Type.Singleton)
@component()
export class Router extends Metadata {
  value: 'history' | 'hash' = 'history';
}

function postConstruct(metadata: Router, appCtx: ApplicationContext) {
  // todo 获取所有带有Route元数据的组件，保存映射关系
  // 监听浏览器push事件，添加对应回调
}

export default genDecorator<string, ClassContext>(Router, {
  optional: true,
  postConstruct,
});
