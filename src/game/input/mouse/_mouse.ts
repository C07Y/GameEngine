// import * as T from '../core/type'
// import Render from '../core/render'
// import * as P from '../archetypes/properties'

import * as C from '../../collisions/states'
import * as E from '../../../game1/enums'
import Input from "../_input"
import Capture from '../../collisions/capture'
import Collision from '../../collisions/_collision'
import * as S from '../../archetypes/npcs/states'

import Games from "../../games"

export enum State {
  idle     = 0     ,
  released = 1 << 0,
  // rMoving  = 1 << 1,
  down     = 1 << 1,
  moving   = 1 << 2
}

// TODO need to add multigame support

export abstract class Mouse extends Input {
    // protected abstract fnct        : () => void          ;

    public static games : Array<Games>

    public    static   state       : State;
    public    static   collision   : Collision                ;
    public    static   click       : Collision                ;
    public    static   up          : Collision                ;
    // protected static   pool        : Array<Mouse> = []   ;
    private   static   initialized : boolean      = false;
    private   static   size        : number       = 10   ;

  constructor(game: Games){
    super();
    Mouse.games.push(game);

    if(!Mouse.initialized){
      Mouse.collision = game.addCollisionTo(null, {x:0,y:0,w:Mouse.size,h:Mouse.size},
        new Capture(C.CollideLayers.all, (a) => {
        a.state |= S.NPCStates.mouseCollide;
      }));

      document.addEventListener("mousemove", (event) => {
        Mouse.collision.offX = event.clientX; // - game x y
        Mouse.collision.offY = event.clientY;
        Mouse.state |= State.moving;
      });

      document.addEventListener("mousedown", (event) => {
        Mouse.click = game.addCollisionTo(null, {x:event.clientX,y:event.clientY,w:Mouse.size,h:Mouse.size},
        new Capture(C.CollideLayers.all, (a) => {
          a.state |= S.NPCStates.mouseClick;
        }));
        Mouse.state |= State.down;
      });

      document.addEventListener("mouseup", (event) => {
        Mouse.up     = game.addCollisionTo(null, {x:event.clientX,y:event.clientY,w:Mouse.size,h:Mouse.size},
        new Capture(C.CollideLayers.all, (a) => {
          a.state |= S.NPCStates.mouseUp;
        }));
        Mouse.state |= State.released;
        Mouse.state ^= State.down    ;

      });
    }
    // Mouse.pool.push(this);
  }

  public addGame(game: Games){
    Mouse.games.push(game);
  }

  // public static update(){
  //   for(let i = 0; i < this.pool.length; i++){
  //     this.pool[i].update();
  //   }

  //   Mouse.state &= ~(State.released)
  // }

}