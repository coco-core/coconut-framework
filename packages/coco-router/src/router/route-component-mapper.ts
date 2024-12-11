import { type Metadata } from 'coco-ioc-container';

class RouteComponentMapper {
  mapper = new Map();

  init(map: Map<Class<any>, Metadata>) {
    for (const [pageComponent, metadata] of map.entries()) {
      this.set(metadata.value, pageComponent);
    }
  }

  set(url: string, PageComponent: Class<any>) {
    if (this.mapper.has(url)) {
      console.error('重复的URL', url);
    } else {
      this.mapper.set(url, PageComponent);
    }
  }

  get(url: string): any {
    return this.mapper.get(url);
  }
}

export default RouteComponentMapper;
