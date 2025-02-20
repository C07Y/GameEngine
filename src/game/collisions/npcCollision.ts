import * as C       from './states'
import NPC          from '../archetypes/npcs/_npc'
import * as T       from '../../_type'

import Collision from "./_collision"
// import Collision from "../collisions/_collision"

export default class NPCCollision extends Collision {
  public npc : NPC;

  constructor(from : C.CollideLayers, to : C.CollideLayers, types : C.CollideTypes){

    super(from, to, types);
    // this.npc = self;

  }

  public intersect(bd : NPC): void {

    const collidePoints : Array<Array<Array<number>>> = this.computeCollidePoints(
      {x: bd.rootPicture.x, y: bd.rootPicture.y, w: bd.width, h:bd.height}, this.npc.collisionPadding);

    const npcBounds : T.Bounds = {
      x: this.npc.rootPicture.x,
      y: this.npc.rootPicture.y,
      w: this.npc.width,
      h: this.npc.height
    }

    let applyEffects : Array<C.CollideTypes> = [C.CollideTypes.none,C.CollideTypes.none,C.CollideTypes.none,C.CollideTypes.none];
    //check top
    applyEffects[0] |= 
      Collision.inBounds(collidePoints[0][0][0],collidePoints[0][1][0], npcBounds) || 
      Collision.inBounds(collidePoints[0][0][1],collidePoints[0][1][1], npcBounds) ?
        this.type : C.CollideTypes.none;

    //check left
    applyEffects[1] |= 
      Collision.inBounds(collidePoints[1][0][0],collidePoints[1][1][0], npcBounds) || 
      Collision.inBounds(collidePoints[1][0][1],collidePoints[1][1][1], npcBounds)?
        this.type : C.CollideTypes.none;

    //check below
    applyEffects[2] |= 
      Collision.inBounds(collidePoints[2][0][0],collidePoints[2][1][0], npcBounds) || 
      Collision.inBounds(collidePoints[2][0][1],collidePoints[2][1][1], npcBounds)?
        this.type : C.CollideTypes.none;

    //check right
    applyEffects[3] |= 
      Collision.inBounds(collidePoints[3][0][0],collidePoints[3][1][0], npcBounds) || 
      Collision.inBounds(collidePoints[3][0][1],collidePoints[3][1][1], npcBounds)?
        this.type : C.CollideTypes.none;

    bd.activeEffects[0] |= applyEffects[0];
    bd.activeEffects[1] |= applyEffects[1];
    bd.activeEffects[2] |= applyEffects[2];
    bd.activeEffects[3] |= applyEffects[3];
} 

  public scale (floats: T.Box){
    
  }
  public scaleTo (floats: T.Box){
    
  }
}
