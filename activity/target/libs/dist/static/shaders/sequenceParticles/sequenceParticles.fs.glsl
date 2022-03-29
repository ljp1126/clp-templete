#ifdef GL_ES
	precision mediump float;
#endif
varying float color;
varying float pointSize;
varying float vpointSize;
void main(void) {

 vec2 uv = gl_PointCoord - 0.5;

float f = smoothstep(0.25, 0.15, dot(uv,uv));

 //   gl_FragColor = vec4(f,f,f,1.0);
gl_FragColor = vec4(0.605,0.792,0.839,pointSize/ vpointSize*f);
}
