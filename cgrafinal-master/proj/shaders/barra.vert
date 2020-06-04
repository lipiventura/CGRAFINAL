#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 coordinates;
varying vec4 normal;

void main() {
    normal = vec4(aVertexNormal, 1.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    coordinates = vec4(aVertexPosition, 1.0);
}
