
attribute vec3 aColor;
attribute vec2 aIndexPos;
uniform mat4 _WorldViewProjection;




uniform sampler2D positionsX;
uniform sampler2D positionsY;
uniform sampler2D positionsZ;
uniform sampler2D uMainShapeTexture;

uniform float uTime;

uniform float uScale;
uniform float uOffX;
uniform float uOffZ;

uniform float lineScale;
uniform float posScale;
varying vec3 vColor;

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}
float unpack8BitVec2IntoFloat(vec2 pack) {
   float value  = dot( pack, 1.0 / vec2(1.0, 256.0) );
       value       *= (256.0*256.0) / (256.0*256.0 - 1.0);
       return  value ;
}


const vec4 bitShift = vec4(1.0, 255.0, 65025.0, 16581375.0);
const vec4 invBitShift = 1.0 / bitShift;

float DecodeFloatRGB(vec3 v, float min, float max)
{
  return dot(v, invBitShift.xyz)* (max - min) + min;
}

void main() {



    vec3 px =texture2D(positionsX, aIndexPos).xyz;
    vec3 py = texture2D(positionsY,  aIndexPos).xyz;
    vec3 pz = texture2D(positionsZ,  aIndexPos).xyz;

    vec3 pos;
    pos.x =DecodeFloatRGB(px,-1.0,1.1);
    pos.y =DecodeFloatRGB(py,0.0,1.0);
    pos.z =DecodeFloatRGB(pz,0.0,1.0);



    pos.x*=posScale;

    pos.yz-=vec2(0.5);

    pos.yz = rotate(pos.yz,aIndexPos.x*20.0 +uTime*3.0);

    float c = dot(normalize(pos.yz),normalize(vec2(1.0,0.5)));


    vec4 posMainShape = texture2D(uMainShapeTexture,vec2(pos.x,0.0));//.xyz*2.0-1.0;

#ifdef NFLOAT
    float vY = unpack8BitVec2IntoFloat(posMainShape.xy)*2.0-1.0;
    float vZ = unpack8BitVec2IntoFloat(posMainShape.zw)*2.0-1.0;
#else

    float vY = posMainShape.y;
    float vZ = posMainShape.z;
#endif



    pos.y +=vY *lineScale;
    pos.z +=vZ*lineScale;



    pos*= vec3(uScale);
    pos+= vec3(uOffX,0.0,uOffZ);
    gl_Position = _WorldViewProjection * vec4(pos,1.0);

    vColor =aColor*(c*0.2+0.6 +pow(c*0.5+0.5,1000.0)*0.1);

}
