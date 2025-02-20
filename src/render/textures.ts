import Render from "./_render";
import * as T from "../_type"


export default class Textures extends Render {

  public static backupTex : WebGLTexture; 


  public static createTexture(img: HTMLImageElement) : T.Tex { 
    let tex : WebGLTexture = this.createTexToBlitOn(img.width,img.height)
    Textures.gl.bindTexture(Textures.gl.TEXTURE_2D, tex)
    Textures.gl.texImage2D(Textures.gl.TEXTURE_2D, 0, Textures.gl.RGBA, Textures.gl.RGBA, Textures.gl.UNSIGNED_BYTE, img)

    return {
      image: tex,
      w: img.width,
      h: img.height,
      x:0,
      y:0
    }
  }


  public static createSprite(from: WebGLTexture, bounds: T.Bounds) : T.Tex { 
    const framebuffer : WebGLFramebuffer = Textures.gl.createFramebuffer()
    let spr : WebGLTexture = Textures.createTexToBlitOn(bounds.w, bounds.h);

    Textures.gl.bindFramebuffer(Textures.gl.FRAMEBUFFER, framebuffer)

    Textures.gl.framebufferTexture2D(Textures.gl.FRAMEBUFFER, Textures.gl.COLOR_ATTACHMENT0, Textures.gl.TEXTURE_2D, from, 0);
    Textures.gl.bindTexture(Textures.gl.TEXTURE_2D, spr)
    Textures.gl.copyTexSubImage2D(Textures.gl.TEXTURE_2D, 0,
      0, 0, bounds.x, bounds.y, bounds.w, bounds.h)

    Textures.gl.deleteFramebuffer(framebuffer)

    return {
      image:spr,
      w: bounds.w,
      h: bounds.h,
      x:0,
      y:0
    };
  }

  public static createTexToBlitOn(width: number, height: number): WebGLTexture {
    const targetTexture = Textures.gl.createTexture() as WebGLTexture;
    // let arr = new Uint8Array(width*height*4).fill(0);

    Textures.gl.bindTexture(Textures.gl.TEXTURE_2D, targetTexture);
    Textures.gl.texImage2D(Textures.gl.TEXTURE_2D, 0, Textures.gl.RGBA, 
                width, height,
                0, Textures.gl.RGBA, Textures.gl.UNSIGNED_BYTE,
                null)
                // arr)

    Textures.gl.texParameteri(Textures.gl.TEXTURE_2D, Textures.gl.TEXTURE_MIN_FILTER, Textures.gl.LINEAR)
    Textures.gl.texParameteri(Textures.gl.TEXTURE_2D, Textures.gl.TEXTURE_MAG_FILTER, Textures.gl.NEAREST)
    Textures.gl.texParameteri(Textures.gl.TEXTURE_2D, Textures.gl.TEXTURE_WRAP_S, Textures.gl.CLAMP_TO_EDGE)
    Textures.gl.texParameteri(Textures.gl.TEXTURE_2D, Textures.gl.TEXTURE_WRAP_T, Textures.gl.CLAMP_TO_EDGE)
    return targetTexture;
  }

}