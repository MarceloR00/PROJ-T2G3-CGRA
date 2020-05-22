attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 coords;

void main() {

	vTextureCoord = aTextureCoord;
	coords = aVertexPosition;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

}

