
import * as K from '../game/input/keyboards/_keyboard'

// import * as T from "../../../_type"
import * as S from "../game/archetypes/npcs/states"
// import * as C from '../../collisions/states'
import Enemy from '../game/archetypes/npcs/enemies/_enemy';
// import { Timings } from '../../systems/timings';


export default class mayKeys extends K.Keyboard {

  private controlled : Enemy;

  constructor(controlled:Enemy){
    super();
    this.controlled = controlled;
    document.addEventListener("keydown", (event) => {
      if(!event.repeat) mayKeys.keys[event.key] = 1;
    })

    document.addEventListener("keyup", (event) => {
      mayKeys.keys[event.key] = -1;
    })

  }

  public update() {
    this.controlled.state = S.NPCStates.idle;
    for(let i in mayKeys.keys){
      switch (i){
        case ' ':
          switch(mayKeys.keys[' ']){
            case -1:
            case  0:
            break;
            case  1:
            case  2:
                this.controlled.state = S.NPCStates.flap;
            break;
          }
        break;
        case 'a':
          switch(mayKeys.keys['a']){
            case -1:
            case  0:
            break;
            case  1:
              console.log("FDASDFAS");
            case  2:
            break;
          }
        break;
        default:
        break;

      }
    }

    // K.Keyboard.updateKeys();
  }
}
