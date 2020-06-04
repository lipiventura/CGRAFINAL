#ifdef GL_ES
precision highp float;
#endif

varying vec4 coordinates;
uniform int drops;

void main() {
    float border = -0.6 - (-1.25 / 5.0) * float(drops);

    if (coordinates.x > border)
        gl_FragColor = vec4(0.1, 0.1, 0.1, 1);
    else {
        gl_FragColor.rgb =  vec3(1.0 - (0.6 + coordinates.x / 0.6), 0.6 + coordinates.x / 0.6, 0);
        gl_FragColor.a = 1.0;
    }
}