import NPCCollision from "./npcCollision"
import Collision from "./_collision"
import * as C from "./states"

import * as T from '../../_type'

import NPC from '../archetypes/npcs/_npc'

export default class Capture extends NPCCollision {



  public height : number;
  public width  : number;
 
 
  private action: (a:NPC) => void;

  // public offY : number;
  // public offX : number;

  constructor(to: C.CollideLayers, action : (a:NPC) => void = (a) => {
      // a = this.health;
      a.health += 1;
    }){
      super(C.CollideLayers.none, to, C.CollideTypes.none);
      // this.interactable = true;
      // this.offX = bounds.x;
      // this.offY = bounds.y;
      // // this.s
      // this.width  = bounds.w;
      // this.height = bounds.h;
      this.action = action;

      // new NPCCollision(this, C.CollideLayers.interactable, to, C.CollideTypes.interact);
  }


  // public refresh() {
  //     // console.log(this.selfGo.x);
  // }

  public intersect(getter:NPC) : void {
    const collidePoints : Array<Array<Array<number>>> = this.computeCollidePoints(
        {x: getter.rootPicture.x, y: getter.rootPicture.y, w: getter.width, h:getter.height});
    
    // console.log(getter);
    const npcBounds : T.Bounds = {
    x: 
       (this.npc === null ? 0 : this.npc.rootPicture.x +
        (this.npc.direction == T.Direction.right ? this.offX : -(this.width + this.offX - this.npc.width))),
    y: this.offY + 
       (this.npc === null ? 0 : this.npc.rootPicture.y),
    w: this.width,
    h: this.height
    }


    if(
    //check top
    Collision.inBounds(collidePoints[0][0][0],collidePoints[0][1][0], npcBounds) || 
    Collision.inBounds(collidePoints[0][0][1],collidePoints[0][1][1], npcBounds) ||

    //check left
    Collision.inBounds(collidePoints[1][0][0],collidePoints[1][1][0], npcBounds) || 
    Collision.inBounds(collidePoints[1][0][1],collidePoints[1][1][1], npcBounds) ||

    //check below
    Collision.inBounds(collidePoints[2][0][0],collidePoints[2][1][0], npcBounds) || 
    Collision.inBounds(collidePoints[2][0][1],collidePoints[2][1][1], npcBounds) ||

    //check right
    Collision.inBounds(collidePoints[3][0][0],collidePoints[3][1][0], npcBounds) || 
    Collision.inBounds(collidePoints[3][0][1],collidePoints[3][1][1], npcBounds)
    ) {this.action(getter);     

    // if(getter.dbgName=="PLAYER") console.log(getter)
    } else {
      // if(getter.dbgName==="PLAYER" && this.npc.dbgName === "scorpion"){
      //  console.log({x: this.npc.selfGo.x, y: this.npc.selfGo.y, w: this.npc.width, h:this.npc.height})
      //  console.log(npcBounds);
      //  console.log({x: getter.selfGo.x, y: getter.selfGo.y, w: getter.width, h:getter.height})
      //  console.log(collidePoints);
      // }
    }


  }
  public scale(floats: T.Box){
    this.width  *= floats.w;
    this.height *= floats.h;
    this.offX   *= floats.w;
    this.offY   *= floats.h;
  }

  public scaleTo(floats: T.Box){
    this.width  = this.ogBounds.w * floats.w;
    this.height = this.ogBounds.h * floats.h;
    this.offX   = this.ogBounds.x * floats.w;
    this.offY   = this.ogBounds.y * floats.h;
  }
}