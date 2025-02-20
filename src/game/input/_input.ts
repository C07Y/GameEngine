// import * as K from './keyboards/_keyboard'
// import * as M from './mouse/_mouse'

export default abstract class Input {
  // private static poo

  protected abstract update() : void;

  // public static refresh() : void {
  //   K.Keyboard.mKeyboard.update();
  //   K.Keyboard.updateKeys();

  //   M.Mouse.update()
  // }
}