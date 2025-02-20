import Render from "../_render";
import * as T from "../../_type"


export default class Shader extends Render {

  private shader: T.Shader 

  public static getShader (id: string = '') : T.Shader{
    let shader : T.Shader = Shader.shaders[id] || Shader.shaders[Shader.fallbackShader] || undefined
    if(shader===undefined){
      console.log("Shader "+id+" doesn't exist and couldn't find fallback shader "+ Shader.fallbackShader)
    }
    return shader
  }

  // public static static createShader(id:string, vertex: string, fragment: string): boolean {
  //   return Shader.GLSLinterpreter.createShader(id, vertex, fragment)
  // }
  public static createShader(vertexSource: string, fragmentSource: string, 
    // properties: {[propName: string]: T.shaderProp},
     passes: Array<T.shaderPass>): T.Shader | null{  
    try{
      let vertexShader =   Shader.compileShader(Shader.gl.VERTEX_SHADER, vertexSource)
      let fragmentShader = Shader.compileShader(Shader.gl.FRAGMENT_SHADER, fragmentSource)
      let program =        Shader.createProgram(vertexShader, fragmentShader)
      return {
      // properties: properties,
      program : program!,
      passes: passes
      }
    } catch {
      console.log("Shader creation unsuccessful")
      return null;
    }
  }

  public static addShader(id: string, shader: T.Shader){
    Shader.shaders[id] = shader
  }

  // private
  private static compileShader(type, source): WebGLShader | null {
    let shader = Shader.gl.createShader(type) as WebGLShader
    Shader.gl.shaderSource(shader, source)
    Shader.gl.compileShader(shader)
    let success: boolean = Shader.gl.getShaderParameter(shader, Shader.gl.COMPILE_STATUS)
    if (success) return shader
  
    console.debug(Shader.gl.getShaderInfoLog(shader))
    Shader.gl.deleteShader(shader)
    return null;
  }

  // private
  private static createProgram(vertexShader, fragmentShader): WebGLProgram | null {
    let program = Shader.gl.createProgram() as WebGLProgram
    Shader.gl.attachShader(program, vertexShader)
    Shader.gl.attachShader(program, fragmentShader)
    Shader.gl.linkProgram(program)
    let success = Shader.gl.getProgramParameter(program, Shader.gl.LINK_STATUS)
    if (success) return program
  
    console.debug(Shader.gl.getProgramInfoLog(program))
    Shader.gl.deleteProgram(program)
    return null;
  }
    
}