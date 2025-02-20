import * as T from "../_type"
import Render from "./_render";
import Textures from "./textures"
// import Snap from "../render/windows"


export abstract class Composite extends Render {
  // public remove    : boolean     ;
  // public bg        : T.Tex       ; // compose when needed (ex.: from npc)
  // public mask      : T.Tex       ; // compose when needed (ex.: from npc)
  public composite : T.Renderable;
  public bounds    : T.Bounds    ;
  public dynamic   : boolean     ;
  public remove    : boolean     ;
  
  protected ready  : boolean     = false;
  protected view   : T.Bounds    = {x:0,y:0,w:0,h:0};

  constructor(){
    super();
  }

  public applyBg(){
    // Snap.gl.bindTexture(Snap.gl.TEXTURE_2D, this.bg.image)
    // Snap.passShader(this.bg, this.view, true)

    // Copy bound texture to framebuffer
    // Snap.gl.drawArrays(Snap.gl.TRIANGLES, 0, 6);
  }

  public applyMask(){
    console.log("Apply mask not implemented")
  }



  /**
   * Compose parts and return composite
   */
  public abstract compose();
}

export class Snap extends Composite {
  
  public sprite    : Array<T.Renderable>;

  constructor(parts : Array<T.Renderable>){
    super();
    this.sprite = parts;
  }

  // update(){
  compose(){
    let toDraw = this.sprite.filter((a)=>{return !a.hidden}).sort((a,b)=>a.layer-b.layer);

    if(this.composite) Snap.gl.deleteTexture(this.composite.texture.image);
    
    if(toDraw.length > 0){
      // if(!this.composite) this.composite = {x:0,y:0,w:0,h:0,layer:0};
      
      this.view = {
        x : this.sprite.reduce((acc,c)=>{return Math.min(c.x    ,acc)},0),
        y : this.sprite.reduce((acc,c)=>{return Math.min(c.y    ,acc)},0),
        w : this.sprite.reduce((acc,c)=>{return Math.max(c.w-c.x,acc)},0),
        h : this.sprite.reduce((acc,c)=>{return Math.max(c.h-c.y,acc)},0)
      }

      this.composite.texture.image = Textures.createTexToBlitOn(this.view.w, this.view.h)

      Snap.gl.viewport(this.view.x, this.view.y, this.view.w, this.view.h);

      this.applyBg(); // maybe maybe

      for(let i = 0; i < this.sprite.length; i++){
        Snap.gl.bindTexture(Snap.gl.TEXTURE_2D, this.sprite[i].texture.image)
        Snap.passShader(this.sprite[i], this.view, true)

        // Copy bound texture to framebuffer
        Snap.gl.drawArrays(Snap.gl.TRIANGLES, 0, 6);
      }

      // this.applyMask();

      Snap.gl.bindFramebuffer(Snap.gl.READ_FRAMEBUFFER, Snap.framebuffer)
      Snap.gl.bindFramebuffer(Snap.gl.DRAW_FRAMEBUFFER, null)
      Snap.gl.bindTexture(Snap.gl.TEXTURE_2D , this.composite.texture.image);

      Snap.passShader(this.composite, this.view, true)

      // Copy from framebuffer to bound texture
      Snap.gl.copyTexImage2D(Snap.gl.TEXTURE_2D, 0, Snap.gl.RGBA, 0, 0
        , this.view.w, this.view.h, 0)

      Snap.gl.bindFramebuffer(Snap.gl.READ_FRAMEBUFFER, Snap.Rframebuffer)
      Snap.gl.bindFramebuffer(Snap.gl.DRAW_FRAMEBUFFER, Snap.framebuffer)

      Snap.gl.clearColor(0, 0.5, 0, 0);
      Snap.gl.clear(Snap.gl.COLOR_BUFFER_BIT);
    } 
    else this.composite = undefined

  }

}

export class Animation extends Composite {

  public frames : Array<Snap>
  public currentFrame : number
  public dynamic: boolean = true;

  // public addFrame (imgName : string, bounds : T.Bounds){
  //   this.frames.push(
      
  //   )
  // }

  constructor(parts: Array<Snap>){
    super();
    this.frames = parts;
    
  }

  public addFrame (snap : Snap){
    this.frames.push(snap);
  }

  // update(){
  compose(){
    if(this.frames[this.currentFrame].dynamic || !this.frames[this.currentFrame].composite){
      this.frames[this.currentFrame].compose();
    }
    this.composite = this.frames[this.currentFrame].composite;
  }
}

