/**
 * 
 * Send a 2char string and returns tile position in pics1_dyl.png array
 * 
 * TODO: Links, Signs, NPCs, Chests and Baddies
 * 
 *  */ 

import * as T from "../_type"
import Assets from "./_assets"
import Render from "../render/_render"
import Globals from "../game/games"
import Games from "../game/games"
import NPC from '../../build/src/game/archetypes/npcs/_npc'
import Textures from '../render/textures';
import Window from "../render/windows"

export default class Tiled extends Render {
  // public static loadLevel(iniFile : string, game: Games) : T.CellBuild {
  //   const cell : TiledCell = await Tiled.parseIni(iniFile, game);

  //   return {
  //     collisionsBool : cell.collisions,
  //     tileset        : cell.tileset,
  //     renderable     : Tiled.blit(cell.tiles, game),
  //     grid           : {w: cell.tiles[0].tileYX.length, h: cell.tiles[0].tileYX[0].length},
  //     square         : cell.square,
  //     playLayer      : cell.playLayer
  //   }
  // }

  

    public static blit(tiles:Array<T.tilesLayer>, game : Games) : Array<T.Picture> {

  
    return  tiles.map(layer => {
        const framebuffer : WebGLFramebuffer | null = Tiled.gl.createFramebuffer()

        Tiled.gl.bindFramebuffer(Tiled.gl.FRAMEBUFFER, framebuffer)

        const cellWidth  =  game.assetList.square.w     * layer.tileYX[0].length;
        const cellHeight =  game.assetList.square.h     * layer.tileYX.length   ;
        const tilesetTW  = (game.assetList.tileset.w  / game.assetList.square.w    );
        // const tilesetTH  =  game.assetList.tileset.h  / game.assetList.square    ;

        let cellTex : WebGLTexture = Textures.createTexToBlitOn(cellWidth, cellHeight);

        Tiled.gl.framebufferTexture2D(Tiled.gl.FRAMEBUFFER, Tiled.gl.COLOR_ATTACHMENT0, Tiled.gl.TEXTURE_2D, game.assetList.tileset.image, 0);
        Tiled.gl.bindTexture(Tiled.gl.TEXTURE_2D, cellTex);
        
        for(let i = 0; i < layer.tileYX.length; i++){
          for(let x = 0; x < layer.tileYX[i].length; x++){
            Tiled.gl.copyTexSubImage2D(Tiled.gl.TEXTURE_2D, 0,
              x * game.assetList.square.w,
              i * game.assetList.square.h,
              // 0,
              layer.tileYX[i][x] % tilesetTW * game.assetList.square.w,
              Math.floor(layer.tileYX[i][x] / tilesetTW) * game.assetList.square.h, 
            game.assetList.square.w, game.assetList.square.h)
          }
        }
        // console.log(cellTex);
    //     Window.passShader({
    //   x:50,y:250,layer:1,
    //   texture:{
    //     image: cellTex,
    //     w: 30,
    //     h: 100
    // }}, game.gameSize);
    // Tiled.gl.drawArrays(Tiled.gl.TRIANGLES, 0, 6);
        Tiled.gl.deleteFramebuffer(framebuffer)

        
        return {
          redraw: true,
          layer: 0,
          x:0,y:0,
          texture:{
          file: game.assetList.source,
          image: cellTex,
          w:cellWidth,
          h:cellHeight
        }}
      }
    );
    
    // let renderable : T.renderables = {all:{}};
    // for(let i = 0; i < bob.length; i ++){
    //   renderable.all[i] = {
    //     shaderID : 'defaultCamShader',
    //     x: 0,
    //     y: 0,
    //     r: {0:[{x:0,y:0, texture: bob[i]}]},
    //   };
    // }

    // return renderable;
  }
  // }

  public static async loadIni (iniFileName: string, game : Games) : Promise<T.CellBuild> {

    let tiles      : Array<T.tilesLayer> = [];
    let npcs       : Array<string> = [];
    let collisions : Array<boolean> = [];
    let tileset    : T.Tex = {w:0,h:0};
    let square     : T.Box;
    let playLayer  : number;

    const lvlPath = iniFileName.split('.')[0];
    
    Assets.loadText(iniFileName, Globals.getOrigin()+"/_assets/levels/"+iniFileName);
    const iniFile = await Assets.getText(iniFileName);

    const iniLines : Array<string> = iniFile.split('\n');
    for(let i = 0; i < iniLines.length; i++){
      const currLine : Array<string> = iniLines[i].split(' ');
      switch (currLine[0]){
        case "TILESET":
          const currParams : Array<string> = currLine[1].split(':');
          switch (currParams[0]) {
            case "SQUARE":
              square = {w:Number(currParams[1]), h:Number(currParams[1])};
            break;
            case "FILE":
              Assets.loadImage(currParams[1], Globals.getOrigin()+"/_assets/levels/"+lvlPath+"/"+currParams[1]);
              tileset = Textures.createTexture(await Assets.getImage(currParams[1]));
              Assets.addTex(currParams[1], tileset.image);
              console.log(currParams[1]);
              // console.log(currParams[1])
            break;
          };
        break;
        case "PLAYGROUND":
          playLayer = Number(currLine[1]);
        break;
        case "CSV":
          Assets.loadText(currLine[1], Globals.getOrigin()+"/_assets/levels/"+lvlPath+"/"+currLine[1]);
          const tileLayer = await Assets.loadText(currLine[1]);
          tiles.push({tileYX : tileLayer.split('\n').map(x=>x.split(',').map(y=>Number(y)))});
          // console.log(tiles);
        break;
        case "NPCS":
          Assets.loadText(currLine[1], Globals.getOrigin()+"/_assets/levels/"+lvlPath+"/"+currLine[1]);
          let npcsInfo = await Assets.getText(currLine[1]);
          npcs = npcsInfo.replace(/\n(?!\Z)/g,',').split(',');
          // console.log(cell.npcs);
        break;
        case "COLLISION":
          Assets.loadText(currLine[1], Globals.getOrigin()+"/_assets/levels/"+lvlPath+"/"+currLine[1]);
          const collisionLn = await Assets.getText(currLine[1]);
          collisions =
            collisionLn.replace(/\n(?!\Z)/g,',').split(',').map(
                  (y : string) => 
                    Number(y) < 0 ? false : true);
          // console.log(collisions);
        break;
        default:
        break;
      };
    }

    return     {
      tiles      : tiles     ,
      npcs       : npcs      ,
      collisions : collisions,
      tileset    : tileset   ,
      square     : square    ,
      playLayer  : playLayer ,
      grid       : {w: tiles[0].tileYX[0].length, h:tiles[0].tileYX.length}
    };
  }
}

  
  