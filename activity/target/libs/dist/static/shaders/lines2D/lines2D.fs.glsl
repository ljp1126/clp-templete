#ifdef GL_ES
	precision mediump float;
#endif


uniform float alpha;

void main(void) {

    gl_FragColor = vec4(vec3(alpha),1.0);
}
