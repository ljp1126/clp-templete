attribute vec2 aIndexPos;
attribute vec3 offsetPos;
uniform mat4 _WorldViewProjection;

uniform sampler2D positionsX;
uniform sampler2D positionsY;
uniform sampler2D positionsZ;
uniform float uTime;
uniform float uScale;
uniform float uOffX;
uniform float uOffZ;
uniform float uSize;
uniform float uMix;
uniform float uPosScale;
uniform  sampler2D uMainShapeTexture;

varying float color;
varying float colora;

const vec4 bitShift = vec4(1.0, 255.0, 65025.0, 16581375.0);
const vec4 invBitShift = 1.0 / bitShift;

float DecodeFloatRGB(vec3 v, float min, float max)
{
  return dot(v, invBitShift.xyz)* (max - min) + min;
}


vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {


    vec3 px =texture2D(positionsX, aIndexPos).xyz;
    vec3 py = texture2D(positionsY,  aIndexPos).xyz;
    vec3 pz = texture2D(positionsZ,  aIndexPos).xyz;

    vec3 pos;
    pos.x =DecodeFloatRGB(px,0.0,1.0);
    pos.y =DecodeFloatRGB(py,0.0,1.0);
    pos.z =DecodeFloatRGB(pz,0.0,1.0);
float z = pos.z;
    color = snoise(vec2(pos.z*2.0+pos.y,pos.x*2.0-uTime))*0.5+0.5;

    pos.yz-=vec2(0.5);
    float up = uPosScale-0.01;
    float a =1.0-pow(1.0-max(0.0,pos.x-up)*1.0/(1.0-up),2.0);
   float aa =mix(a,1.0,uMix);
    vec4 mainShape =  texture2D(uMainShapeTexture, vec2(pos.x,0.0));
    pos.yz*=aa;
    pos.yz+=mainShape.yz*0.04;
    pos*= vec3(uScale);
    pos+= vec3(uOffX,0.0,uOffZ);
    pos+=offsetPos;
    gl_Position = _WorldViewProjection * vec4(pos,1.0);


    colora=a*3.0*z;
}
