#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float speed;

varying vec2 vTextureCoord;

uniform float timeFactor;
uniform float blimpSpeed;

void main() {
        vTextureCoord = aTextureCoord;

   vec3 offset=vec3(0.0,0.0,0.0);
        
    offset.z += sin(timeFactor*(speed*5.0+0.1) + 15.0*(aVertexPosition.x+0.5))*0.05*(aVertexPosition.x+0.5);
    
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

}