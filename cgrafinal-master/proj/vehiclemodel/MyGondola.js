/**
 * MyGondola
 * @constructor
 */
class MyGondola extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.top = new MySphere(this.scene, 16, 8);
        this.rest = new MyCylinder(this.scene, 10);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -3);
        this.scene.scale(1, 1, 6);
        this.scene.rotate(90 * Math.PI / 180.0, 1, 0, 0);
        this.rest.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 3);
        this.top.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -3);
        this.top.display();
        this.scene.popMatrix();
    }

    // http://www.dgp.toronto.edu/~ah/csc418/fall_2001/tut/ogl_draw.html
    setFillMode() {
        this.primitiveType = this.scene.gl.TRIANGLES;
    }
    setLineMode() {
        this.primitiveType = this.scene.gl.LINE_STRIP;
    };
}