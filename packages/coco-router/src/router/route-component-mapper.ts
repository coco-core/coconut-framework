import Route from '../metadata/route.ts';

class RouteComponentMapper {
  mapper = new Map();

  init(map: Map<Class<any>, Route>) {
    for (const [pageComponent, route] of map.entries()) {
      this.set(route.value, pageComponent);
    }
  }

  private set(url: string, PageComponent: Class<any>) {
    if (this.mapper.has(url)) {
      console.error('重复的URL', url);
    } else {
      this.mapper.set(url, PageComponent);
    }
  }

  get(url: string): any {
    return this.mapper.get(url);
  }

  getAny() {
    return this.mapper.values().next().value;
  }
}

export default RouteComponentMapper;
