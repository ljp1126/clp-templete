#ifdef GL_ES
	precision mediump float;
#endif

uniform float alpha;


void main(void) {
 vec2 uv = gl_PointCoord - 0.5;
    float f = smoothstep(0.25, 0.15, dot(uv,uv));
    gl_FragColor = vec4(vec3(alpha*f),1.0);
}
