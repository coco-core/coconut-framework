import Route from '../metadata/route.ts';

interface RouteUrl {
  // 是否是动态路由
  isDynamic: boolean;
  // 不是动态路由就是固定的url；是动态路由则是url对应的正则表达式
  route: string | RegExp;
  // 是动态路由时，url被/拆分后的结果
  parts?: string[];
}
class RouteComponentMapper {
  mapper: Map<RouteUrl, Class<any>> = new Map();

  init(map: Map<Class<any>, Route>) {
    for (const [pageComponent, route] of map.entries()) {
      const routeUrl = this.formatUrl2RouteUrl(route.value);
      this.set(routeUrl, pageComponent);
    }
  }

  private set(routeUrl: RouteUrl, PageComponent: Class<any>) {
    if (this.mapper.has(routeUrl)) {
      console.error('重复的URL', routeUrl);
    } else {
      this.mapper.set(routeUrl, PageComponent);
    }
  }

  match(url: string): any {
    for (const [routeUrl, pageComponent] of this.mapper.entries()) {
      if (!routeUrl.isDynamic) {
        if (routeUrl.route === url) {
          return { pageComponent };
        }
      } else {
        const match = (routeUrl.route as RegExp).exec(url);
        if (match) {
          let params = {};
          let paramIndex = 1;
          routeUrl.parts.forEach((part) => {
            if (part.startsWith(':')) {
              const paramName = part.slice(1);
              params[paramName] = match[paramIndex++];
            }
          });
          return { pageComponent, params };
        }
      }
    }
    return {};
  }

  formatUrl2RouteUrl(url: string): RouteUrl {
    if (url.includes(':')) {
      const parts = url.split('/');
      const regexParts = parts.map((part) => {
        if (part.startsWith(':')) {
          return '(.+)';
        } else {
          return part;
        }
      });
      return {
        isDynamic: true,
        route: new RegExp(`^${regexParts.join('\\/')}$`),
        parts,
      };
    } else {
      return {
        isDynamic: false,
        route: url,
      };
    }
  }
}

export default RouteComponentMapper;
