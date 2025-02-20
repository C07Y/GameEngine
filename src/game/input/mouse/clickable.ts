import * as M from "./_mouse";


export default class Clickable extends M.Mouse {
  protected fnct: () => void;

  constructor(callback: () => void) {
    super();
    this.fnct = callback;
  }

  protected update(){
    this.fnct();
  }
}