#ifdef GL_ES
	precision mediump float;
#endif

varying vec2 vUV;

uniform sampler2D uTexture;	

void main(void) {
    gl_FragColor = texture2D(uTexture, vUV);
}