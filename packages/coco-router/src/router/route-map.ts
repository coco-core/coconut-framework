import { type Metadata } from 'coco-ioc-container';

class RouteMap {
  map = new Map();

  init(map: Map<Class<any>, Metadata>) {
    for (const [pageComponent, metadata] of map.entries()) {
      this.set(metadata.value, pageComponent);
    }
  }

  set(url: string, PageComponent: Class<any>) {
    if (this.map.has(url)) {
      console.error('重复的URL', url);
    } else {
      this.map.set(url, PageComponent);
    }
  }

  get(url: string): any {
    return this.map.get(url);
  }
}

export default RouteMap;
