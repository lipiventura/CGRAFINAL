/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.side = new MyQuad(this.scene);
    }

    display(box) {
        if (box === 1) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, (1 / 2));
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(0, 0, (1 / 2));
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate((1 / 2), 0, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-(1 / 2), 0, 0);
            this.scene.rotate(-Math.PI / 2, 0, 1, 0);
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, (1 / 2), 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -(1 / 2), 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.side.display();
            this.scene.popMatrix();
        }

        if (box === 2) {
            this.scene.pushMatrix();
            this.scene.translate(0, -(1 / 2), 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -(1 / 2), -1);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(1, -(1 / 2), 0);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-1, -(1 / 2), 0);
            this.scene.rotate(-Math.PI / 2, 0, 0, 1);
            this.scene.rotate(-Math.PI / 2, 0, 1, 0);
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -(1 / 2), 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.side.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -(1 / 2), 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.side.display();
            this.scene.popMatrix();
        }
    }
}