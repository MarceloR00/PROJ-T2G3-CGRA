#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 coords;

uniform sampler2D uSampler1;
uniform float numberOfSupplies;

void main() {
    vec2 copyTexCoords = vTextureCoord;
	vec4 tx1 = texture2D(uSampler1, vTextureCoord);
	
    vec4 color = tx1;

    if(-0.5 +  numberOfSupplies/5.0 > coords.x){
        color.r = 1.0-(coords.x+0.5);
        color.g = coords.x+0.5;
        color.b = 0.0;
    }

	gl_FragColor = color;
}