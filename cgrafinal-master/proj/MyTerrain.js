/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(scene, 20);

        this.terrShader = new CGFshader(scene.gl, 'shaders/terrain.vert', 'shaders/terrain.frag');
        this.textsquare = new CGFtexture(scene, 'images/shadersquare.png');
        this.text = new CGFtexture(scene, 'images/terrain.png');

        this.terrShader.setUniformsValues({ uSampler: 0 });
        this.terrShader.setUniformsValues({ uSampler2: 2 });
    }

    display() {
        this.text.bind(0);
        this.textsquare.bind(2);

        this.scene.setActiveShader(this.terrShader);

        this.scene.pushMatrix();
        this.scene.scale(40, 40, 40);

        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}