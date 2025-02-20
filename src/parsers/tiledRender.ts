import Render from "../render/_render"
import * as Tiled from "./tiledParser"
import * as T from "../_type"

import Games from "../game/games"

export default class TiledRender {
  // public static createATILEDLevel(cell:Tiled.TiledCell, game : Games) : Array<T.Renderable> {

    
  //   return cell.tiles.map(layer => {
  //       const framebuffer : WebGLFramebuffer | null = Render.gl.createFramebuffer()

  //       Render.gl.bindFramebuffer(Render.gl.FRAMEBUFFER, framebuffer)

  //       const cellWidth  =  game.assetList.square     * layer.tileIds[0].length;
  //       const cellHeight =  game.assetList.square     * layer.tileIds.length   ;
  //       const tilesetTW  = (game.assetList.tileset.width  / game.assetList.square    );
  //       const tilesetTH  =  game.assetList.tileset.height / game.assetList.square    ;

  //       let cellTex : WebGLTexture = game.renderer.createTexToBlitOn(cellWidth, cellHeight);

  //       Render.gl.framebufferTexture2D(Render.gl.FRAMEBUFFER, Render.gl.COLOR_ATTACHMENT0, Render.gl.TEXTURE_2D, game.assetList.tileset.image, 0);
  //       // console.log(cell.game.tileset.tex);
  //       Render.gl.bindTexture(Render.gl.TEXTURE_2D, cellTex);

  //       for(let i = 0; i < layer.tileIds.length; i++){
  //         for(let x = 0; x < layer.tileIds[i].length; x++){
  //           Render.gl.copyTexSubImage2D(Render.gl.TEXTURE_2D, 0,
  //             x * game.assetList.square,
  //             i * game.assetList.square,
  //             layer.tileIds[i][x] % tilesetTW * game.assetList.square,
  //             Math.floor(layer.tileIds[i][x] / tilesetTW) * game.assetList.square, 
  //           game.assetList.square, game.assetList.square)
  //         }
  //       }
        
  //       Render.gl.deleteFramebuffer(framebuffer)
  //       return {
  //         // file: cell.file,
  //         x: 0,
  //         y: 0,
  //         // scale: new Float32Array([1.,1.]),
  //         angle: 0,
  //         texture: {
  //           image: cellTex,
  //           width: cellWidth,
  //           height: cellHeight
  //         }
  //       }
  //     }
  //   );
  
  // }
  // public static createATILEDLevel(cell:Tiled.TiledCell, tex:T.Tex, tileset:Tiled.Tileset) : Array<T.gameobject> {

    
  //   return cell.tiles.map(layer => {
  //       const framebuffer : WebGLFramebuffer | null = Render.gl.createFramebuffer()

  //       Render.gl.bindFramebuffer(Render.gl.FRAMEBUFFER, framebuffer)

  //       const cellWidth  =  game.tileset.square     * layer.tileIds[0].length;
  //       const cellHeight =  game.tileset.square     * layer.tileIds.length   ;
  //       const tilesetTW  = (game.tileset.tex.width  / game.tileset.square    );
  //       const tilesetTH  =  game.tileset.tex.height / game.tileset.square    ;

  //       let cellTex : WebGLTexture = Render.createTexToBlitOn(cellWidth, cellHeight);

  //       Render.gl.framebufferTexture2D(Render.gl.FRAMEBUFFER, Render.gl.COLOR_ATTACHMENT0, Render.gl.TEXTURE_2D, tex.image, 0);
  //       // console.log(cell.game.tileset.tex);
  //       Render.gl.bindTexture(Render.gl.TEXTURE_2D, cellTex);

  //       for(let i = 0; i < layer.tileIds.length; i++){
  //         for(let x = 0; x < layer.tileIds[i].length; x++){
  //           Render.gl.copyTexSubImage2D(Render.gl.TEXTURE_2D, 0,
  //             x * game.tileset.square,
  //             i * game.tileset.square,
  //             layer.tileIds[i][x] % tilesetTW * game.tileset.square,
  //             Math.floor(layer.tileIds[i][x] / tilesetTW) * game.tileset.square, 
  //           game.tileset.square, game.tileset.square)    
  //         }
  //       }
        
  //       Render.gl.deleteFramebuffer(framebuffer)
  //       return {
  //         file: cell.file,
  //         x: 0,
  //         y: 0,
  //         scale: new Float32Array([1.,1.]),
  //         angle: 0,
  //         texture: {
  //           image: cellTex,
  //           width: cellWidth,
  //           height: cellHeight
  //         }
  //       }
  //     }
  //   );
  
  // }
}
