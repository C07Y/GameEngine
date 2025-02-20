
import * as K from './_keyboard'

import * as T from "../../../_type"
import * as S from "../../archetypes/npcs/states"
import * as C from '../../collisions/states'
import Enemy from '../../archetypes/npcs/enemies/_enemy';
import { Time } from '../../systems/time';


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
    for(let i in PlayerKeyboard.keys){
      switch (i){
        case '9':
          switch(PlayerKeyboard.keys['9']){
            case -1:
            case  0:
            break;
            case  1:
              Time.scale(1.05);
            break;
            case  2:
            break;
          }
        break;
        case '8':
          switch(PlayerKeyboard.keys['8']){
            case -1:
            case  0:
            break;
            case  1:
              Time.scale(.95);
            break;
            case  2:
            break;
          }
        break;        
        case '0':
          switch(PlayerKeyboard.keys['0']){
            case -1:
            case  0:
            break;
            case  1:
              this.controlled.game.scaleTo({w:1,h:1});
            break;
            case  2:
            break;
          }
        break;
        case '=':
          switch(PlayerKeyboard.keys['=']){
            case -1:
            case  0:
            break;
            case  1:
              this.controlled.game.scale({w:1.01, h:1.01});
            break;
            case  2:
            break;
          }
        break;
        case '-':
          switch(PlayerKeyboard.keys['-']){
            case -1:
            case  0:
            break;
            case  1:
              this.controlled.game.scale({w:.99, h:.99});
            break;
            case  2:
            break;
          }
        break;
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
              this.controlled.state ^= S.NPCStates.climbing;
            break;
            case  0:
            break;
            case  1:
            case  2:
              if(this.controlled.activeEffects.reduce((a,b)=>a|b) & C.CollideTypes.climbable) this.controlled.state |= S.NPCStates.climbing;
            break;
        }
        break;
        case 'ArrowLeft':
          switch(PlayerKeyboard.keys['ArrowLeft']){
            case -1:
              this.controlled.state ^= S.NPCStates.walk;
            break;
            case  0:
            break;
            case  1:
              console.log("FASF");
            case  2:
              this.controlled.direction = T.Direction.left;
              this.controlled.state |= S.NPCStates.walk;
            break;
        }
        break;
        case 'ArrowDown':
          switch(PlayerKeyboard.keys['ArrowDown']){
            case -1:
            case  0:
            break;
            case  1:
              this.controlled.state |= S.NPCStates.atk;
            break;
            case  2:
            break;
        }
        break;
        case 'ArrowRight':
          switch(PlayerKeyboard.keys['ArrowRight']){
            case -1:
              this.controlled.state &= ~S.NPCStates.walk;
            break;
            case  0:
            break;
            case  1:
            case  2:
              this.controlled.direction = T.Direction.right;
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
                this.controlled.state |= S.NPCStates.startJump;
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

    // K.Keyboard.updateKeys();
  }
}
