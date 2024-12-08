abstract class Render {
  public abstract setContainer(container: HTMLElement): void;
  public abstract render(component: Class<any>): any;
}

export default Render;
