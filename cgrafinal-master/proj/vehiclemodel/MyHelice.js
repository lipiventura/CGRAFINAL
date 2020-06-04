/**
 * MyHelice
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHelice extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(scene);
        this.sphere = new MySphere(scene, 16, 8);
        this.initBuffers();
    }

    initBuffers() {
        this.quad.initBuffers();
        this.sphere.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, (1 / 2 * Math.SQRT2), 0);
        this.scene.scale((1 / 2), 1, 1);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.scale((1 / 2), (1 / 2), 1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -(1 / 2 * Math.SQRT2), 0);
        this.scene.scale((1 / 2), 1, 1);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.scale((1 / 2), (1 / 2), 1);
        this.quad.display();
        this.scene.popMatrix();
    }
}