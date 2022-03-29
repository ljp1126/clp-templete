#ifdef GL_ES
	precision mediump float;
#endif




void main(void) {
 vec2 uv = gl_PointCoord - 0.5;
    float f =dot(uv,uv)+0.9;


    gl_FragColor = vec4(f,f,f,1.0);
}
