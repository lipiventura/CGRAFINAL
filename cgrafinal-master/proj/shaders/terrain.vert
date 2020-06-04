#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
    
    vec3 offset = texture2D(uSampler2, vTextureCoord).b * aVertexNormal / 5.0;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 0.8);
}