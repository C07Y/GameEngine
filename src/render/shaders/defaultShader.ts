import * as T from '../../_type'

// import {ShaderStates} from "./states"

import Games from   '../../game/games'

import Matrix from '../matrices'
import Shader from './_shaders'



export default class DefaultShader extends Shader {
  // public static initShaders(game : Games) {
  //   new defaultCamShader("defaultCamShader").compile(game)
  // }
// }

// export class defaultCamShader {
  private id : string = 'DefaultShader'
  private game : Games;

    constructor(game : Games){
      super();
      // this.id = id
    // }
    
    // public compile(game : Games) : void {
      let shader : T.Shader | null = DefaultShader.createShader(
        this.vertex, this.fragment, this.passes);
      if(shader != null) DefaultShader.addShader(this.id, shader);
      else console.log(this.id + " creation unsuccessffffful");
      this.game = game;
    }

    public vertex: string = 
    `
    attribute vec2 aVertexPosition;
    attribute vec2 texcoordLocation;

    uniform mat4 matrixLocation;
    uniform mat4 textureMatrixLocation;

    varying vec2 v_texcoord;

    void main() {
        gl_Position = matrixLocation * vec4(aVertexPosition,0.,1.);
        v_texcoord = 
        (textureMatrixLocation * 
          vec4(texcoordLocation, 0, 1)).xy;
    }
    `

    public fragment: string =
    `
    precision mediump float;
        
    varying vec2 v_texcoord;
    
    uniform sampler2D textureLocation;
    
    void main(void) {
        gl_FragColor = texture2D(textureLocation, v_texcoord);
    }
    `

    // public vertex: string = 
    // `
    // attribute vec2 aVertexPosition;
    // attribute vec2 texcoordLocation;

    // uniform mat4 matrixLocation;
    // uniform mat4 textureMatrixLocation;

    // varying vec2 v_texcoord;

    // void main() {
    //     gl_Position = matrixLocation * vec4(aVertexPosition.x, (aVertexPosition.y)*-1.+1.,0.,1.);
    //     v_texcoord = 
    //     // (textureMatrixLocation *  
    //       vec4(texcoordLocation, 0., 1.).xy;
    // }
    // `

    // public fragment: string =
    // `
    // precision mediump float;
        
    // varying vec2 v_texcoord;
    
    // uniform sampler2D textureLocation;
    
    // void main(void) {
    //     gl_FragColor = texture2D(textureLocation, v_texcoord);
    // }
    // `
    
    public passes : Array<T.shaderPass> = [
      (surface: T.Surface, targetSize: T.Box, shader: T.Shader) => {
        // DefaultShader.gl.activeTexture(DefaultShader.gl.TEXTURE0);
        // let gl : WebGLRenderingContext = this.game.renderer.getContext();
        let aVertexPosition = DefaultShader.gl.getAttribLocation(shader.program, "aVertexPosition");
        DefaultShader.gl.enableVertexAttribArray(aVertexPosition);
          DefaultShader.gl.vertexAttribPointer(aVertexPosition, 2, DefaultShader.gl.FLOAT, false, 0 , 0);
      },

      (surface: T.Surface, targetSize: T.Box, shader: T.Shader) => {
        // let gl : WebGLRenderingContext = this.game.renderer.getContext();

        let texCoordLocation = DefaultShader.gl.getAttribLocation(shader.program, "texcoordLocation");
        // DefaultShader.gl.bindBuffer(gl)
        DefaultShader.gl.enableVertexAttribArray(texCoordLocation);
        DefaultShader.gl.vertexAttribPointer(texCoordLocation, 2, DefaultShader.gl.FLOAT, false, 0, 0);
      },

      (surface: T.Surface, targetSize: T.Box, shader: T.Shader) => {
        // let gl : WebGLRenderingContext = this.game.renderer.getContext();

        // if(surface.texture){
          // console.log("fas");
          let matrixLocation : WebGLUniformLocation | null = DefaultShader.gl.getUniformLocation(shader.program, "matrixLocation");

          let scale   = {w:1,h:1};
          // this.game.zoom;
          let pos : T.Point = {
            x: ((surface.properties.flip == true ? surface.w * scale.w : 0) + 
                (surface.x)),
                //  - (renderable.shaderState! & T.ShaderStates.camera) ? this.game.camera.x : 0)),
                // - renderable.w!
            y:  (surface.y )
                // - (renderable.shaderState! & T.ShaderStates.camera) ? this.game.camera.y : 0)
                // - renderable.z!
          };
          
          // let funtimes = new Float32Array(
          //   [ 1,0,0,0,
          //     0,1,0,0,
          //     0,0,1,0,
          //     0,0,0,1]
          // )
          let funtimes = new Float32Array(
            [surface.w * scale.w,0,0,0,
              0,surface.h * scale.h,0,0,
              0,0,1,0,
              pos.x * scale.w, pos.y * scale.h,0,1]
          )

          // funtimes[12] /= targetSize.w;
          // funtimes[13] /= targetSize.h;
          // funtimes = Matrix.scale(funtimes, 2/targetSize.w, 2/targetSize.h, 1)
          
          funtimes[12] -=  .5;
          funtimes[13] -=  .5;
          // funtimes = Matrix.rotation(funtimes, -.5)
          
          // funtimes = Matrix.scale(funtimes, 1, 2, 1)
          funtimes[12] +=  .5;
          funtimes[13] +=  .5;
          // matrix = Matrix.translate(matrix, renderable.x,renderable.y,0)
          
          if(surface.scale){
            // console.log("scale not implemented")
            // scale[0]+=renderable.scale[0];
            // scale[1]+=renderable.scale[1];
          }

          // Normalize to drawing plane
          funtimes[0]  *=  2/targetSize.w;
          funtimes[5]  *= -2/targetSize.h;
          funtimes[12]  =  (funtimes[12]*(2/targetSize.w))-1;
          funtimes[13]  = -(funtimes[13]*(2/targetSize.h))+1;

          DefaultShader.gl.uniformMatrix4fv(matrixLocation, false, funtimes);
        // }

      },

      (surface: T.Surface, targetSize: T.Box, shader: T.Shader) => {
        // let gl : WebGLRenderingContext = this.game.renderer.getContext();

        let textureMatrixLocation : WebGLUniformLocation | null = DefaultShader.gl.getUniformLocation(shader.program, "textureMatrixLocation");
        if(textureMatrixLocation != null){
          // let texMatrix =           Matrix.orthographic(0, .25, .2, 0, 1, 0)
          let texMatrix = Matrix.orthographic(-1, 1, -1, 1, 1, 0)
          // texMatrix = Matrix.translate(texMatrix, -.1, .1, 0)
          // texMatrix = Matrix.scale(texMatrix, currentSurface.scale[0], currentSurface.scale[1], 1)
          // DefaultShader.gl.uniformMatrix4fv(textureMatrixLocation, false, texMatrix);
            // let texMatrix = Matrix.orthographic(-1, 1, 1, -1, -1,1)
          // let texMatrix = Matrix.orthographic(0,1,1,0,-1,0);
          // let texMatrix = Matrix.orthographic(0,1,1,0,1,0);

          // let texMatrix = Matrix.orthographic(0,255,255,0,0,255);
          // let texMatrix = Matrix.orthographic(0,255,255,0,0,255);
          // console.log(texMatrix);
          // texMatrix = Matrix.translate(texMatrix, 0,0,1)
          // texMatrix = Matrix.scale(texMatrix, 1,1,1)
          // texMatrix = Matrix.scale(texMatrix, currentSurface.scale[0], currentSurface.scale[1], 1)
          DefaultShader.gl.uniformMatrix4fv(textureMatrixLocation, false, texMatrix);
        }
      }
    ]

}