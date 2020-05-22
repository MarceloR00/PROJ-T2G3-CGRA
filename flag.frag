#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;

void main() {
	vec4 tx1 = texture2D(uSampler1, vTextureCoord);

	gl_FragColor =  tx1;
}
