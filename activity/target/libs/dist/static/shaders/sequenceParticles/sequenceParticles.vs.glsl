
attribute vec3 aStartPos1;
attribute vec3 aStartPos2;
attribute vec3 aStartPos3;
attribute vec3 aStartPos4;

uniform float ratioY;
uniform float ratioX;
uniform float frameCount;
uniform float pSize;
varying float color;
varying float pointSize;
varying float vpointSize;
void main() {


    float startFrame1 = mod(aStartPos1.z+frameCount,600.0)/600.0;
    float startFrame2 = mod(aStartPos2.z+frameCount,600.0)/600.0;
    float startFrame3 = mod(aStartPos3.z+frameCount,600.0)/600.0;
    float startFrame4 = mod(aStartPos4.z+frameCount,600.0)/600.0;
    float power =300.0;
     float l;
    if(startFrame1<0.1)
    {
      vec3 pos=aStartPos1*2.0 -1.0;
      l =(pow(1.0-startFrame1,power));
      pos.z =0.0;

      gl_Position =  vec4(pos,1.0);



    }
    else if(startFrame2<0.1)
    {

      vec3 pos=aStartPos2*2.0 -1.0;
      l =(pow(1.0-startFrame2,50.0));
       pos.x-= startFrame2*5.0;
      pos.z =0.0;
      gl_Position =  vec4(pos,1.0);


    }
    else if(startFrame3<0.1)
    {

           vec3 pos=aStartPos3*2.0 -1.0;
           l =(pow(1.0-startFrame3,power));
           pos.z =0.0;
           gl_Position =  vec4(pos,1.0);


     }
     else
     {


               vec3 pos=aStartPos4*2.0 -1.0;
                l =(pow(1.0-startFrame4,power));
               pos.z =0.0;
               gl_Position =  vec4(pos,1.0);


     }
     gl_Position.y = gl_Position.y*ratioY;
     gl_Position.x = gl_Position.x*ratioX;
     color =l;
     vpointSize =pSize;
     gl_PointSize = pSize*l;
     pointSize =pSize*l;
     if(pointSize<0.5)
     {

      gl_Position.x =gl_Position.x +20.0;
     }
}
