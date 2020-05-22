attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float desloc;
uniform float period;
uniform float dif;
uniform float normScale;

varying vec2 vTextureCoord;

void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset=vec3(0.0,0.0,0.0);
		
	offset.z = -sin(desloc - (aVertexPosition.x + 0.5) * period) * 0.2;

	offset.z = offset.z + dif;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

