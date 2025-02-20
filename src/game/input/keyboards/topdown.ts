
import * as K from './_keyboard'

import * as T from "../../../_type"
// import * as D from "./directions"
import * as S from "../../archetypes/npcs/states"
import * as C from '../../collisions/states'
import Enemy from '../../archetypes/npcs/enemies/_enemy';


export default class PlayerKeyboard extends K.Keyboard {

  private controlled : Enemy;

  constructor(controlled:Enemy){
    super();
    this.controlled = controlled;
    document.addEventListener("keydown", (event) => {
      if(!event.repeat) PlayerKeyboard.keys[event.key] = 1;
    })

    document.addEventListener("keyup", (event) => {
      PlayerKeyboard.keys[event.key] = -1;
    })

  }

  public update() {
    let lastDirection = this.controlled.direction;
    for(let i in PlayerKeyboard.keys){
      switch (i){
        case 'a':
          switch(PlayerKeyboard.keys['a']){
            case -1:
            case  0:
            break;
            case  1:
              console.log("Pos =" + this.controlled.rootPicture.x + ":" + this.controlled.rootPicture.y);
              console.log("Hits=" + this.controlled.activeEffects[0] + ":" + this.controlled.activeEffects[2] + ":" + this.controlled.activeEffects[2] + ":" + this.controlled.activeEffects[3]);
            break;
            case  2:
            break;
        }
        break;
        case 'ArrowUp':
          switch(PlayerKeyboard.keys['ArrowUp']){
            case -1:
              // this.controlled.state &= ~S.NPCStates.walk;
              this.controlled.direction &= ~T.Direction.up;
            break;
            case  0:
            break;
            case  1:
            case  2:
              this.controlled.direction |= T.Direction.up;
              this.controlled.state |= S.NPCStates.walk;
            break;
        }
        break;
        case 'ArrowLeft':
          switch(PlayerKeyboard.keys['ArrowLeft']){
            case -1:
              // this.controlled.state &= ~S.NPCStates.walk;
              this.controlled.direction &= ~T.Direction.left;
            break;
            case  0:
            break;
            case  1:
            case  2:
              this.controlled.direction |= T.Direction.left;
              this.controlled.state |= S.NPCStates.walk;
            break;
        }
        break;
        case 'ArrowDown':
          switch(PlayerKeyboard.keys['ArrowDown']){
            case -1:
              // this.controlled.state &= ~S.NPCStates.walk;
              this.controlled.direction &= ~T.Direction.down;
            case  0:
            break;
            case  1:
              this.controlled.direction |= T.Direction.down;
              this.controlled.state |= S.NPCStates.walk;
            break;
            case  2:
            break;
        }
        break;
        case 'ArrowRight':
          switch(PlayerKeyboard.keys['ArrowRight']){
            case -1:
              // this.controlled.state &= ~S.NPCStates.walk;
              this.controlled.direction &= ~T.Direction.right;
            break;
            case  0:
            break;
            case  1:
            case  2:
              this.controlled.direction |= T.Direction.right;
              this.controlled.state |= S.NPCStates.walk;
            break;
        }
        break;
        case ' ':
          switch(PlayerKeyboard.keys[' ']){
            case -1:
            case  0:
            break;
            case  1:
              if(this.controlled.activeEffects[2] & C.CollideTypes.block){
                // this.controlled.state |= S.NPCStates.startJump;
                // this.controlled.cycles["walk"].cycles[0].starttime

                console.log("JUMPINTHELINE");

                // this.controlled.cycler.jump.up.active = true;
              }
            break;
            case  2:
            break;
        }
        break;

      }
    }

    if(this.controlled.direction == 0) {
      this.controlled.state &= ~S.NPCStates.walk;
      // this.controlled.direction = lastDirection;
    }
    // K.Keyboard.updateKeys();
  }
}
