attribute vec4 aPos;

uniform float uScale;
uniform float uOffX;
uniform float uOffZ;

uniform float uTime;
uniform mat4 _WorldViewProjection;
void main(void) {

	vec3 pos =  aPos.xyz;
	pos.x =mod(pos.x-uTime*aPos.w,1.0);
  pos*= vec3(uScale);
  pos+= vec3(uOffX,0.0,uOffZ);

  gl_Position = _WorldViewProjection * vec4(pos,1.0);
	gl_PointSize =1500.0/gl_Position.w;
}
