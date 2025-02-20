import Systems from "../../systems/_system"
import * as T from "../../../_type"
import Input from "../_input"

// export enum keycodes{
//   spacebar = " "         ,
//   up       = "ArrowUp"   ,
//   left     = "ArrowLeft" ,
//   down     = "ArrowDown" ,
//   right    = "ArrowRight",
//   a        = "a"         ,
//   length   = 6
// }

export abstract class Keyboard extends Input {

  protected static keys : {[name:string]:number} = {};
  public mKeyboard : Keyboard;
  // protected controlled : NPC;
  
  constructor(){
    super();
    this.mKeyboard = this;
  }

  public static updateKeys() {
    for(let k in Keyboard.keys){
      Keyboard.keys[k] = Keyboard.keys[k] < 0 ? 
        0 : Keyboard.keys[k] > 0 ? 2 : 0;
    }
  }

}