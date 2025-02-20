import Textures from './textures';
import Games from "../game/games"

import * as Comp from "./composite"
import { CollideLayers } from '../game/collisions/states';

// type fbo = {
//   framebuffer : WebGLFramebuffer,
//   owner : T.Picture,
//   offset : T.Box
// }

    // Window.gl.viewport(0, 0, game.gameSize.w, game.gameSize.h);
    // Window.gl.bindTexture(Window.gl.TEXTURE_2D, Window.backupTex);
    // Window.passShader({
    //   x:0,y:0,layer:0,
    //   // w:500,h:500,
    //   texture:{
    //     image: Window.backupTex,
    //     w: 800,
    //     h: 1280
    // }}, game.gameSize);
    //     Window.gl.drawArrays(Window.gl.TRIANGLES, 0,6);



export default class Window extends Textures {

  public static renderGame2(game : Games){
    // Window.gl.viewport(0, 0, game.gameSize.w, game.gameSize.h);
    Window.gl.bindFramebuffer(Window.gl.READ_FRAMEBUFFER, Window.Rframebuffer);
    Window.gl.bindFramebuffer(Window.gl.DRAW_FRAMEBUFFER, Window.framebuffer);
    Window.gl.bindRenderbuffer(Window.gl.RENDERBUFFER, Window.renderbuffer)
    Window.gl.renderbufferStorage(Window.gl.RENDERBUFFER, Window.gl.RGBA8, 2000,2000)
    Window.gl.framebufferRenderbuffer(Window.gl.DRAW_FRAMEBUFFER, Window.gl.COLOR_ATTACHMENT0, Window.gl.RENDERBUFFER, Window.renderbuffer)
    Window.gl.readBuffer(Window.gl.COLOR_ATTACHMENT0);
    Window.gl.drawBuffers([Window.gl.COLOR_ATTACHMENT0]);

    // let toRender : Array<T.Renderable>;

    for(let i = 0; i < game.drawTypeOrder.length; i++){
      game.viewpane[game.drawTypeOrder[i]] = game.viewpane[game.drawTypeOrder[i]]
                                            .filter((a)=>!a.remove);

      let vp : Array<Comp.Composite> = game.viewpane[game.drawTypeOrder[i]]
                                      .filter((a)=>(a.composite && !a.composite.hidden) || !a.composite)

      for(let j = 0; j < vp.length; j++){
        if(vp[j].dynamic || !vp[j].composite){
          vp[j].compose();
        }
      }

      vp = vp.filter((a)=>a.composite).sort((a,b)=>a.composite.layer-b.composite.layer);
      
      Window.gl.bindFramebuffer(Window.gl.FRAMEBUFFER, null);
      Window.gl.clearColor(0, 0.5, 0, 1);
      Window.gl.clear(Window.gl.COLOR_BUFFER_BIT);
      
      for(let i = 0; i < vp.length; i++){
        Window.gl.bindTexture(Window.gl.TEXTURE_2D, vp[i].composite);

        // Draw with different shader
        Window.passShader(vp[i].composite, game.gameSize);

        // apply stencil so it doesn't display outside of the viewpane
        Window.gl.drawArrays(Window.gl.TRIANGLES, 0, 6);
      }

    }
  }

  // public static renderGame(game : Games){
  //   // Window.gl.bindFramebuffer(Window.gl.FRAMEBUFFER, null);
  //   Window.gl.viewport(0, 0, game.gameSize.w, game.gameSize.h);
  //   Window.gl.bindFramebuffer(Window.gl.READ_FRAMEBUFFER, Window.Rframebuffer);
  //   Window.gl.bindFramebuffer(Window.gl.DRAW_FRAMEBUFFER, Window.framebuffer);
  //   Window.gl.bindRenderbuffer(Window.gl.RENDERBUFFER, Window.renderbuffer)
  //   Window.gl.renderbufferStorage(Window.gl.RENDERBUFFER, Window.gl.RGBA8, 2000,2000)
  //   Window.gl.framebufferRenderbuffer(Window.gl.DRAW_FRAMEBUFFER, Window.gl.COLOR_ATTACHMENT0, Window.gl.RENDERBUFFER, Window.renderbuffer)
  //   Window.gl.readBuffer(Window.gl.COLOR_ATTACHMENT0);
  //   Window.gl.drawBuffers([Window.gl.COLOR_ATTACHMENT0]);

  //   // Window.gl.activeTexture(Window.gl.TEXTURE0);

  //   // For each great layer (drawType)
  //   for(let i = 0; i < game.drawTypeOrder.length; i++){
  //     if (Window.canvas.all[game.iniName] && Window.canvas.all[game.iniName][game.drawTypeOrder[i]]){
  //       Window.passShader(Window.canvas.all[game.iniName][game.drawTypeOrder[i]], Window.canvas.all[game.iniName][game.drawTypeOrder[i]].texture, false);

  //       Window.canvas.all[game.iniName][game.drawTypeOrder[i]].redraw = true;
  //       // Window.gl.framebufferTexture2D(Window.gl.FRAMEBUFFER, Window.gl.COLOR_ATTACHMENT0, Window.gl.TEXTURE_2D, Window.canvas.all[game.iniName][game.drawTypeOrder[i]].texture.image, 0);
  //       // Window.canvas.all[game.iniName][game.drawTypeOrder[i]].texture.image = 
  //       //   Textures.createTexToBlitOn(game.gameSize.w, game.gameSize.h, true)
  //         // Window.gl.texStorage2D(Window.gl.TEXTURE_2D, 1, Window.gl.RGB8, game.gameSize.w, game.gameSize.h)
  //       // Window.gl.framebufferTexture2D(Window.gl.DRAW_FRAMEBUFFER, Window.gl.COLOR_ATTACHMENT0, Window.gl.TEXTURE_2D, Window.canvas.all[game.iniName][game.drawTypeOrder[i]].texture.image, 0)

  //       // Window.gl.bindFramebuffer(Window.gl.READ_FRAMEBUFFER, Window.Rframebuffer);
        
  //       // Window.gl.bindFramebuffer(Window.gl.DRAW_FRAMEBUFFER, Window.framebuffer);

  //       // Window.gl.bindTexture(Window.gl.TEXTURE_2D, Window.canvas.all[game.iniName][game.drawTypeOrder[i]].texture.image)
  //       // Window.gl.copyTexImage2D(Window.gl.TEXTURE_2D, 0, Window.gl.RGBA, 0, 0
  //       //   , game.gameSize.w, game.gameSize.h, 0)
  
  //       // Window.passShader(Window.canvas.all[game.iniName][game.drawTypeOrder[i]], game.gameSize);
  //       // Window.gl.drawArrays(Window.gl.TRIANGLES, 0, 6);

  //       // // // Window.gl.clear(Window.gl.COLOR_BUFFER_BIT);
  //     let myOffset : T.Bounds = {x:0,y:0, w:0, h:0};
        
  //       // Blit pictures recursively
  //       let pacman : T.Picture = Window.drawPictures(
  //         Window.canvas.all[game.iniName][game.drawTypeOrder[i]], // to blit on
  //         {x:0,y:0, w:0, h:0}, game.gameSize);
          
  //       // Window.gl.viewport(0, 0, game.gameSize.w, game.gameSize.h);
        
  //       // DRAW THIS
  //       // draw current framebuffer
  //       // Pass shaders on topRenderable?
  //       // Window.gl.bindFramebuffer(Window.gl.FRAMEBUFFER, Window.framebuffer);

  //       // Window.gl.bindVertexArray()
        
  //       // Window.gl.activeTexture(Window.gl.TEXTURE0);
  //       // Window.gl.bindTexture(Window.gl.TEXTURE_2D, 
  //         // pacman.texture.image);
  //       // console.log(pacman)
  //       // Window.gl.clear()
  //       // Window.gl.bindFramebuffer(Window.gl.FRAMEBUFFER, Window.Rframebuffer);
  //       // Window.gl.framebufferRenderbuffer(Window.gl.FRAMEBUFFER, 
  //       //   Window.gl.COLOR_ATTACHMENT0, Window.gl.RENDERBUFFER, Window.framebuffer)
        
  //       // Window.gl.framebufferTexture2D(Window.gl.FRAMEBUFFER, Window.gl.COLOR_ATTACHMENT0, Window.gl.TEXTURE_2D, game.assetList.tileset.image, 0);
  //       // Window.gl.bindTexture(Window.gl.TEXTURE_2D, pacman.texture.image);
  //       // Window.gl.copyTexImage2D(Window.gl.TEXTURE_2D,0,Window.gl.RGBA,0,0,pacman.texture.w,pacman.texture.h,0)
        
  //       Window.gl.bindFramebuffer(Window.gl.FRAMEBUFFER, null);

  //       Window.gl.clearColor(0, 0.5, 0, 1);
  //       Window.gl.clear(Window.gl.COLOR_BUFFER_BIT);

  //       // Window.gl.viewport(0, 0, game.gameSize.w, game.gameSize.h);

  //       // Window.gl.texImage2D(Window.gl.READ_FRAMEBUFFER, Window.gl.COLOR_ATTACHMENT0, Window.gl.TEXTURE_2D, Window.canvas.all[game.iniName][game.drawTypeOrder[i]].texture.image, 0);
  //       Window.gl.bindTexture(Window.gl.TEXTURE_2D, pacman.texture.image);
  //       // Window.gl.copyTexImage2D(Window.gl.TEXTURE_2D, 0, Window.gl.RGBA, 0, 0
  //       // , pacman.texture.w, pacman.texture.h, 0)

  //       Window.passShader(pacman, game.gameSize);
  //       Window.gl.drawArrays(Window.gl.TRIANGLES, 0, 6);
  //     }
  //   }
  //   // // Window.gl.erro();

  //   // // Window.gl.deleteFramebuffer(this.fboArray.pop())

  
  // }

  // private static previousShader : string = "";
  // private static currShader     : T.Shader;
  // private static currDepth      : number = 0;
  // private static fboArray       : Array<WebGLFramebuffer>;//Array<fbo> = [];


  // private static drawPictures(
  //   picture       : T.Picture,       // to blit on
  //   view        : T.Bounds,
  //   gameSize      : T.Box,
  //   // parentPicture?: T.Picture,       // for size information
  //   // texture       : T.Tex, 
  //   // depth         : number
  //   ) : T.Picture{
  //     // console.log("FDASF");
  //   if(picture.hidden) return;
  //   picture.redraw = true;
  //   // -> draw renderable background
  //   if(picture.redraw){
  //     Window.gl.deleteTexture(picture.texture!.image);
      
  //     let myOffset : T.Bounds = {x:0,y:0, w:0, h:0};
  //     let toDraw : Array<T.Picture> = [];

  //     if(picture.bg) {
  //       toDraw.push(picture.bg);
  //     }
  //     if(picture.r) {
  //       for(let i in picture.r){
  //         toDraw.push(this.drawPictures(picture.r[i],
  //           myOffset,
  //           {w:-1,h:-1}));
  //       }
  //     }

  //     picture.texture.w = Math.max(picture.bg?picture.bg!.texture.w:0, gameSize.w==-1?picture.texture.w:myOffset.w);
  //     picture.texture.h = Math.max(picture.bg?picture.bg!.texture.h:0, gameSize.h==-1?picture.texture.h:myOffset.h);

  //     picture.texture.image = Textures.createTexToBlitOn(picture.texture.w, picture.texture.h, true)

  //     Window.gl.viewport(myOffset.x, myOffset.y, picture.texture.w, picture.texture.h);

  //     for(let i = 0; i < toDraw.length; i++){
  //       Window.gl.bindTexture(Window.gl.TEXTURE_2D, toDraw[i].texture.image)

  //       // Copy bound texture to framebuffer
  //       Window.gl.drawArrays(Window.gl.TRIANGLES, 0, 6);
  //     }

  //     Window.gl.viewport(myOffset.x, myOffset.y, gameSize.w==-1?picture.texture.w:gameSize.w, gameSize.w==-1?picture.texture.h:gameSize.h);

  //     Window.gl.bindFramebuffer(Window.gl.READ_FRAMEBUFFER, Window.framebuffer)
  //     Window.gl.bindFramebuffer(Window.gl.DRAW_FRAMEBUFFER, null)
  //     Window.gl.bindTexture(Window.gl.TEXTURE_2D , picture.texture.image);
  //     // Window.passShader(picture, picture.texture, true)
  //     // Window.passShader(picture, {w:480,h:864}, true)
  //     Window.passShader(picture, gameSize.w==-1?picture.texture:gameSize, true)

  //     // Window.gl.drawArrays(Window.gl.TRIANGLES, 0, 6);
      
  //     // Copy from framebuffer to bound texture
  //     Window.gl.copyTexImage2D(Window.gl.TEXTURE_2D, 0, Window.gl.RGBA, 0, 0
  //       , picture.texture.w, picture.texture.h, 0)

  //     Window.gl.bindFramebuffer(Window.gl.READ_FRAMEBUFFER, Window.Rframebuffer)
  //     Window.gl.bindFramebuffer(Window.gl.DRAW_FRAMEBUFFER, Window.framebuffer)

  //       Window.gl.clearColor(0, 0.5, 0, 0);
  //       Window.gl.clear(Window.gl.COLOR_BUFFER_BIT);

  //     // EXPERIMENTAL -- HASN'T BEEN TESTED
  //     // if(picture.mask?.texture){
  //     //   Window.gl.framebufferTexture2D(
  //     //     Window.gl.FRAMEBUFFER, Window.gl.COLOR_ATTACHMENT0, 
  //     //     Window.gl.TEXTURE_2D, picture.mask?.texture.image, 0);

  //     //   Window.gl.copyTexImage2D(Window.gl.TEXTURE_2D, 0, Window.gl.ALPHA,
  //     //     0, // Where on bound x
  //     //     0, // where on bound y
  //     //     // 0, // where from framebuffer x
  //     //     // 0, // where from framebuffer y
  //     //     texture.w, texture.h, 0
  //     //   )
  //     // }
      
  //     // RESet viewport

  //   } else {
  //     // DO AS FORETOLD
  //     // take texture and draw it on current buffer

  //   }
  //   // console.log(picture.texture)

  //   view.x = /* Math.min(view.x, picture.x,  */0/* ); */
  //   view.y = /* Math.min(view.y, picture.y,  */0/* ); */

  //   // if(parentPicture && parentPicture.texture){
  //     view.w = Math.max(picture.texture.w,view.w);
  //     view.h = Math.max(picture.texture.h,view.h);

  //     // view.w = Math.max(view.w, picture.texture.w ?? 0);
  //     // view.h = Math.max(view.h, picture.texture.h ?? 0);
  //   // }
    

  //   return picture;
  // }

  // public static passShader(picture?: T.Renderable, targetSize?: T.Box, set?: boolean){
  //   const shaderID : string | undefined = picture.shaderID
  //   // console.log(picture.shaderID)

  //   if(Window.previousShader!==shaderID) {
  //     Window.currShader = Window.shaders[shaderID]
  //     if(Window.currShader != undefined) {
  //       Window.gl.useProgram(Window.currShader.program)
  //       Window.previousShader = shaderID;
  //     } else {
  //       Window.currShader = Window.shaders["DefaultShader"] || undefined;
  //       if(Window.currShader != undefined) Window.gl.useProgram(Window.currShader.program)
  //       else console.log("Fallback shader undefined")
  //       Window.previousShader = "DefaultShader"
  //     }
  //   }

  //   if(Window.currShader != undefined && set){

  //     // Window.gl.bindTexture(Window.gl.TEXTURE_2D, picture.texture!.image!)

  //     for(const a in Window.currShader.passes){
  //       Window.currShader.passes[a](picture, targetSize, Window.currShader)          
  //     }
  //   }
  // }
}