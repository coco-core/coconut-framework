import render from '../decorator/render.ts';

/**
 * @public
 */
@render()
abstract class Render {
  public abstract render(component: Class<any>): any;
}

export default Render;
