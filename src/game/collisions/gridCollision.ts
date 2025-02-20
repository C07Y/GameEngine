import * as C       from './states'
import NPC          from '../archetypes/npcs/_npc'
import * as T       from '../../_type'

import Collision from "./_collision"
import Game from '../../game/games';
import Games from '../../game/games';

export default class CollisionGrid extends Collision{
  
  public npc = null;
  public ogPadding : T.Point = {x:1,y:1};

  private walls : Array<Array<number>> = []; // walls[y][x]
  private game  : Games;
  // private square  : number;
  // private displaytileSize  : number;
  // prote padding : T.Box = {w:1,h:1};

  private static sizeBit : number = 5; //32 bit
  private static bitSize : number = 1 << this.sizeBit;

  
  constructor(boolArr : Array<boolean>, game: Game, to : C.CollideLayers, type : C.CollideTypes){
    super(C.CollideLayers.grid, to, type);
    this.game = game;
    // this.square = game.assetList.square;
    // this.displaytileSize = game.displaytileSize;

    this.padding.x = this.ogPadding.x * game.zoom.w;
    this.padding.y = this.ogPadding.y * game.zoom.h;

    let passes = 0;

    for(let idx = 0; idx < boolArr.length; idx+=game.assetList.grid.w){
      this.walls.push(Array<number>());

      // let bAidx : number;
      
      for(let i = 0; i < game.assetList.grid.w; i+= CollisionGrid.bitSize){
        let stuff : number = 0;


        for(let bAidx = 0; bAidx < CollisionGrid.bitSize; bAidx++){
          if(i+bAidx >= game.assetList.grid.w) break;
          if (boolArr[idx+i+bAidx] == true){
            stuff |= 1 << bAidx;
          }
        }
        console.log(stuff);
        this.walls[passes].push(stuff);
      }

      passes += 1;
      // idx += game.levelWidth;
    }
    console.log(this.walls);
  }

  private againstGrid(gXbd:number, gYbd:number, bdX : number, bd) : boolean{
    const bitX : number = Math.floor((bdX / this.game.displaytileSize.w)) % CollisionGrid.bitSize;//CollisionGrid.sizeBit;

    let xIndex : number = gXbd;
    let bShift : number = bitX;

    if(bShift < 0){
      xIndex -= 1;

      // hit "wall" left
      if(xIndex < 0) {
        return true;
      }

      bShift = CollisionGrid.bitSize + bShift;

    } else if (bShift > CollisionGrid.bitSize){
      xIndex += 1;

      // hit "wall" right
      if(xIndex >= this.walls[0].length){
        return true;
      }

      bShift = bShift - CollisionGrid.bitSize;
    }

    let checkX : number = 1 << bShift;
    let yIndex : number = gYbd;

    // if(yIndex >= this.walls.length){
    //   console.log(bd.dbgName);
    // } 
    return ((this.walls[yIndex][xIndex] & checkX) != 0);
  }

  /**
   * 
   * @param arch 
   * @returns 0 up to 3 right boolean array of if a wall is nearby in each direction
   */
  public intersect(bd : NPC) : void {
    // if(bd.dbgName=="scorpion"){
    //   console.log("TOUTE");
    // }
    
    const collidePoints : Array<Array<Array<number>>> = this.computeCollidePoints(
      {x: bd.rootPicture.x, y: bd.rootPicture.y, w: bd.width, h: bd.height}, this.padding, this.game.displaytileSize, CollisionGrid.sizeBit);

    //check top
    bd.activeEffects[0] |= 
      this.againstGrid(collidePoints[0][0][0],collidePoints[0][1][0], bd.rootPicture.x            + 2 * this.padding.x, bd) || 
      this.againstGrid(collidePoints[0][0][1],collidePoints[0][1][1], bd.rootPicture.x + bd.width - 2 * this.padding.x, bd) ?
        this.type : C.CollideTypes.none;

    //check left
    bd.activeEffects[1] |= 
      this.againstGrid(collidePoints[1][0][0],collidePoints[1][1][0], bd.rootPicture.x + this.padding.x, bd) || 
      this.againstGrid(collidePoints[1][0][1],collidePoints[1][1][1], bd.rootPicture.x + this.padding.x, bd)?
        this.type : C.CollideTypes.none;

    //check below
    bd.activeEffects[2] |= 
      this.againstGrid(collidePoints[2][0][0],collidePoints[2][1][0], bd.rootPicture.x            + 2 * this.padding.x, bd) || 
      this.againstGrid(collidePoints[2][0][1],collidePoints[2][1][1], bd.rootPicture.x + bd.width - 2 * this.padding.x, bd)?
        this.type : C.CollideTypes.none;

    //check right
    bd.activeEffects[3] |= 
      this.againstGrid(collidePoints[3][0][0],collidePoints[3][1][0], bd.rootPicture.x + bd.width - this.padding.x, bd) || 
      this.againstGrid(collidePoints[3][0][1],collidePoints[3][1][1], bd.rootPicture.x + bd.width - this.padding.x, bd)?
        this.type : C.CollideTypes.none; 

    // return result;
  }

  public scale(floats : T.Box){
    // this.displaytileSize *= floatx;
    this.padding.x *= floats.w;
    this.padding.y *= floats.h;

  }

  public scaleTo(floats : T.Box){
    // this.displaytileSize = this.game.assetList.square * floatx   ;
    this.padding.x         = this.ogPadding.x * floats.w;
    this.padding.y         = this.ogPadding.y * floats.h;

  }
}


