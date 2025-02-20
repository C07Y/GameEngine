import Assets from '../parsers/_assets'
import Render from '../render/_render'

import Globals from "./games"
import * as T from '../_type'
// import * as P from '../archetypes/properties'

import * as Tiled    from "../parsers/tiledParser"
import TiledRender   from "../parsers/tiledRender"
import Camera        from './systems/camera'

import CollisionGrid from './collisions/gridCollision'
import * as C        from './collisions/states'

import Games from './games'


// import {losNPCs}     from "../game1/enums"


export class Level {

  public static async load(iniFile : string, game : Games):Promise<void>{
  //   // const cell : Tiled.TiledCell = await Tiled.createFromIni(iniFile, game);

    // game.camera.setLevelSize(
    //   cell.tiles[0].tileIds[0].length,
    //   cell.tiles[0].tileIds.length
    // );

    // // game.gridWidth = cell.tiles[0].tileIds[0].length;
    // // game.gridHeight = cell.tiles[0].tileIds.length;


    // game.addCollisionTo(null,
    //   new CollisionGrid(cell.collisions, game, (C.CollideLayers.npc|C.CollideLayers.player), C.CollideTypes.block)
    //   // ,
    //   // {x:0,y:0,w:0,h:0}
    // )

    // const cellR : Array<T.gameobject> = TiledRender.createATILEDLevel(cell, game);

    // let rdrBTCH : {[layer:number]: {[name:string]:T.Renderable}} = {};

    // cellR.forEach((x,index) => {
    //   rdrBTCH[index] = {};
    //   rdrBTCH[index][index.toString()] = x
    // });

    // rdrBTCH[1] = game.npcBuilder(cell.npcs, cell.tiles[0].tileIds[0].length)

    // let renderableBatch: T.renderableBatch = {
    //   r: rdrBTCH,
    //   x:0,
    //   y:0
    // }
    
    // let lyr : T.Layer = {
    //   members:{npcs:renderableBatch},
    //   x: 0,
    //   y: 0,
    //   // scale: new Float32Array([1.,1.]),
    //   angle: 0,
    //   shaderID : "defaultCamShader"
    // }
  
    // const RDRtomerge : T.renderables = {
    //   all:{0:lyr}
    // }
  
    // game.renderer.mergeToRenderable(RDRtomerge, T.renderableTypes.gameobject)

  }
}