#ifdef GL_ES
	precision highp float;
#endif

varying vec2 vUV;





uniform float thickness;
uniform float uTime;
uniform sampler2D uPrevPosTextureX;
uniform sampler2D uPrevPosTextureY;
uniform sampler2D uPrevPosTextureZ;
uniform sampler2D uOffTexture;

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




void main(void) {

    vec3 offset = texture2D( uOffTexture, vUV).xyz;
    vec3 px =texture2D(uPrevPosTextureX, vUV).xyz;
    vec3 pos;
    pos.x =DecodeFloatRGB(px,-1.0,1.1);
#ifdef X



    vec3 posTarget;
    posTarget.x =  offset.x *0.5   +pow(1.0-vUV.y,0.8)*0.5;;
    posTarget.x =min(posTarget.x,1.0);
    float tAdj=snoise(vec2( 55.55,posTarget.x*10.0+uTime*0.5));
    tAdj=(clamp(tAdj,0.4,1.0)-0.4)*10.0+1.0 ;

    posTarget.yz = (offset.yz -0.5)*2.0 *thickness * tAdj*(1.0-posTarget.x);
    posTarget.yz = posTarget.yz*0.5 +0.5;

    float offSX=snoise(vec2( vUV.y*10.0, offset.y+ 2.333+pos.x*30.0+uTime*0.5))*pow(vUV.x,18.0);

    pos.x += offSX*0.001;
    float dist =  posTarget.x-pos.x;
    pos.x = pos.x+dist*0.1;


    gl_FragColor =vec4(EncodeFloatRGB(pos.x,-1.0,1.1),1.0);
#endif
#ifdef Y


    vec3 py =texture2D(uPrevPosTextureY, vUV).xyz;




    pos.y =DecodeFloatRGB(py,0.0,1.0);



    vec3 posTarget;
    posTarget.x =  offset.x *0.5   +pow(1.0-vUV.y,0.8)*0.5;;
    posTarget.x =min(posTarget.x,1.0);
    float tAdj=snoise(vec2( 55.55,posTarget.x*10.0+uTime*0.5));
    tAdj=(clamp(tAdj,0.4,1.0)-0.4)*10.0+1.0 ;

    posTarget.yz = (offset.yz -0.5)*2.0 *thickness * tAdj*(1.0-posTarget.x);
    posTarget.yz = posTarget.yz*0.5 +0.5;





    float offSY=snoise(vec2( vUV.y*10.0, offset.y +pos.x*30.0+uTime*0.5))*pow(vUV.x,18.0);

    pos.y += offSY*0.0006;

    float dist =  posTarget.y-pos.y;
   pos.y = pos.y+dist*0.1;
    gl_FragColor = vec4(EncodeFloatRGB(pos.y,0.0,1.0),1.0);
#endif
#ifdef Z

    vec3 pz =texture2D(uPrevPosTextureZ, vUV).xyz;



    pos.z =DecodeFloatRGB(pz,0.0,1.0);


    vec3 posTarget;
    posTarget.x =  offset.x *0.5   +pow(1.0-vUV.y,0.8)*0.5;;
    posTarget.x =min(posTarget.x,1.0);
    float tAdj=snoise(vec2( 55.55,posTarget.x*10.0+uTime*0.5));
    tAdj=(clamp(tAdj,0.4,1.0)-0.4)*10.0+1.0 ;

    posTarget.yz = (offset.yz -0.5)*2.0 *thickness * tAdj*(1.0-posTarget.x);
    posTarget.yz = posTarget.yz*0.5 +0.5;




    float offSZ =snoise(vec2( pos.x*30.0+uTime*0.5, offset.y+ vUV.y*10.0))*pow(vUV.x,18.0);


    pos.z += offSZ*0.0006;

   float dist =  posTarget.z-pos.z;
   pos.z = pos.z+dist*0.1;
    gl_FragColor = vec4(EncodeFloatRGB(pos.z,0.0,1.0),1.0);
#endif
}
