attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;

void main() {

	vTextureCoord = aTextureCoord;

	vec4 tx1 = texture2D(uSampler1, vTextureCoord);

	vec3 offset = vec3(0.0, 0.0, 0.0);
	vec3 tam = vec3(8, 8, 8);
	offset = aVertexNormal * tx1.rgb * tam;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}

