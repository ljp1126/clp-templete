
#ifdef GL_ES
	precision mediump float;
#endif
uniform float alpha;
varying float colora;
varying float color;


uniform  sampler2D partGradient;

void main(void) {

vec3 c =texture2D(partGradient,vec2(color,0)).xyz*0.7;
    gl_FragColor = vec4(vec3( c),colora);
}
