import { NAME, register } from 'shared';

abstract class Render {
  public abstract render(component: Class<any>): any;
}

export default Render;

register(NAME.Render, Render);
