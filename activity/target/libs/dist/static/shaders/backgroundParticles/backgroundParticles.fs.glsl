#ifdef GL_ES
	precision mediump float;
#endif




void main(void) {
 vec2 uv = gl_PointCoord - 0.5;
    float f =1.0- smoothstep(0.24, 0.25, dot(uv,uv));

   f*=max(0.4, (1.0-smoothstep(0.25, 0.003, dot(uv,uv))));
    f*=0.03;
//f+= smoothstep(0.25, 0.15, dot(uv,uv))*0.015;*/

    gl_FragColor = vec4(f,f,f,1.0);
}
