#ifdef GL_ES
	precision highp float;
#endif

varying vec2 vUV;



uniform float uTimeScale;
uniform float uNoiseScale;
uniform float uNoiseSize;
uniform float uNoiseSizeX;
uniform float uAttraction;
uniform float uAttractionPow;
uniform float uAtractionDist;
uniform float uSpeed;
uniform float uPosScale;
uniform float uTime;
uniform sampler2D uPrevPosTextureX;
uniform sampler2D uPrevPosTextureY;
uniform sampler2D uPrevPosTextureZ;
uniform sampler2D uStartTextureY;
uniform sampler2D uStartTextureZ;




const vec4 bitShift = vec4(1.0, 255.0, 65025.0, 16581375.0);
const vec4 bitMask = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);
const vec4 invBitShift = 1.0 / bitShift;

float DecodeFloatRGB(vec3 v, float min, float max)
{
  return dot(v, invBitShift.xyz)* (max - min) + min;
}



vec3 EncodeFloatRGB(float v,float min, float max) {
v =(v - min) / (max - min);
  vec3 enc = fract(bitShift.xyz * v);
  enc = floor(enc * 255.)/255.;
  return enc;
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




void main(void) {
     vec3 px = texture2D(uPrevPosTextureX, vUV).xyz;
     vec3 py = texture2D(uPrevPosTextureY, vUV).xyz;
     vec3 pz = texture2D(uPrevPosTextureZ, vUV).xyz;

     vec3 pos;
     pos.x = DecodeFloatRGB(px,0.0,1.0);
     pos.y = DecodeFloatRGB(py,0.0,1.0);
     pos.z = DecodeFloatRGB(pz,0.0,1.0);

    float t = uTime/uTimeScale;

    float offX = snoise(vec2(pos.y*uNoiseScale ,t));
    //float offY = snoise(vec2(pos.z*uNoiseScale ,t));
    //float offZ = snoise(vec2(pos.x*uNoiseScale ,t));
    pos.x =pos.x+ offX*uNoiseSizeX;
  // pos.y =pos.y+offX*uNoiseSizeX ;//offY*0.005*0.1;
  // pos.z = pos.z+ offX*uNoiseSizeX;//+offZ*0.005*0.1;



    vec3 target ;
    target.y = 0.5;
    target.z = 0.5;
    target.x = pos.x;


    vec3  dir  =pos -target;

    pos-=  dir*0.001*uAttraction;

    pos.x-=uSpeed;

    if(pos.x<uPosScale-0.05)
    {
        pos.x+=1.0-uPosScale-0.05;


        vec3 pys = texture2D(uStartTextureY, vUV).xyz;
        vec3 pzs = texture2D(uStartTextureZ, vUV).xyz;


        pos.y = DecodeFloatRGB(pys,0.0,1.0);
        pos.z = DecodeFloatRGB(pzs,0.0,1.0);

    }

    pos =abs( mod(pos,vec3(1.0)));



#ifdef X
    gl_FragColor =vec4(EncodeFloatRGB(pos.x,0.0,1.0),1.0);
#endif
#ifdef Y
    gl_FragColor = vec4(EncodeFloatRGB(pos.y,0.0,1.0),1.0);
#endif
#ifdef Z
    gl_FragColor = vec4(EncodeFloatRGB(pos.z,0.0,1.0),1.0);
#endif

}
