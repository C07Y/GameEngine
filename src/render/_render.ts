import * as T from '../_type'



export default class Render {
  public static canvas : T.Canvas = {all:{}}
  public static MAXLAYERS : number = 256;
  public static emptyTex  : WebGLTexture;
  protected static vbuffer: WebGLBuffer;
  protected static Rframebuffer : WebGLFramebuffer;
  protected static framebuffer : WebGLFramebuffer;
  protected static renderbuffer : WebGLRenderbuffer;
  protected static gl: WebGL2RenderingContext
  
  protected static shaders : {[id:string]:T.Shader} = {};
  protected static fallbackShader: string = 'fallbackShader'
  private static previousShader : string = "";
  private static currShader     : T.Shader;

  constructor() {

    if(!Render.gl){

      Render.gl = ((): WebGL2RenderingContext => {
        
        // document.getElementById("BOBOB")!.style.display = 'none';
        document.getElementById("BOBOB")!.setAttribute("width",  "480")
        document.getElementById("BOBOB")!.setAttribute("height", "864")
        let ctx = (document.querySelector("#BOBOB") as HTMLCanvasElement).
        getContext("webgl2",
        {premultipliedAlpha: false}
        )

        ctx.enable(ctx.BLEND);
        ctx.blendFunc(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA);
        return ctx
      })()
      
      Render.framebuffer  = Render.gl.createFramebuffer() ;
      Render.Rframebuffer = Render.gl.createFramebuffer() ;
      Render.renderbuffer = Render.gl.createRenderbuffer();
      Render.vbuffer      = Render.gl.createBuffer()      ;

      Render.gl.bindBuffer(Render.gl.ARRAY_BUFFER, Render.vbuffer);
      Render.gl.bufferData(Render.gl.ARRAY_BUFFER, 
        new Float32Array([
          1, 0, 0, 0, 0, 1, // Triangle 1
          1, 0, 0, 1, 1, 1  // Triangle 2
        ]),
        Render.gl.STATIC_DRAW);
      Render.gl.clearColor(0, 0.5, 0, 0);
    }
      // Render.gl.framebufferTextureLayer()
  }

  public static passShader(picture?: T.Renderable, targetSize?: T.Box, set?: boolean){
    const shaderID : string | undefined = picture.shaderID
    // console.log(picture.shaderID)

    if(Render.previousShader!==shaderID) {
      Render.currShader = Render.shaders[shaderID]
      if(Render.currShader != undefined) {
        Render.gl.useProgram(Render.currShader.program)
        Render.previousShader = shaderID;
      } else {
        Render.currShader = Render.shaders["DefaultShader"] || undefined;
        if(Render.currShader != undefined) Render.gl.useProgram(Render.currShader.program)
        else console.log("Fallback shader undefined")
        Render.previousShader = "DefaultShader"
      }
    }

    if(Render.currShader != undefined && set){

      // Render.gl.bindTexture(Render.gl.TEXTURE_2D, picture.texture!.image!)

      for(const a in Render.currShader.passes){
        Render.currShader.passes[a](picture, targetSize, Render.currShader)          
      }
    }
  }
}

