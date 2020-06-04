/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.scene = scene;
        this.body = new MyVehicleModel(this.scene);
        this.angle = 0;
        this.speed = 0;
        this.angHelice = 0;
        this.x = 0;
        this.y = 10;
        this.z = 0;
        this.automatic = false;
        this.angAuto = 0;
    }

    initBuffers() {
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    activateautomatic() {
        this.automatic = true;
        this.speed = 0.1;
        this.angAuto = 0;
    }

    update(elapsedTime) {
        if (this.automatic) {
            this.angAuto += 2 * Math.PI * elapsedTime / 5000.0;
        } else {
            this.z += 0.1 * elapsedTime * this.speed * Math.cos(this.angle * Math.PI / 180.0);
            this.x += 0.1 * elapsedTime * this.speed * Math.sin(this.angle * Math.PI / 180.0);
        }
        this.angHelice += 25 * this.speed;
        this.body.update(elapsedTime, this.speed);
    }

    turn(val) {
        this.angle += val;
    }

    accelerate(val) {
        this.speed += val;
        this.body.waveshader.setUniformsValues({ blimpSpeed: this.speed });
    }

    reset() {
        this.x = 0;
        this.z = 0;
        this.speed = 0;
        this.angle = 0;
        this.automatic = false;
        this.angAuto = 0;
        this.scene.billboard.resetBillboard();
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);

        if (this.automatic) {
            this.scene.translate(-5 * Math.cos(-this.angle * Math.PI / 180.0), 0, -5 * Math.sin(-this.angle * Math.PI / 180.0));
            this.scene.rotate(-this.angAuto, 0, 1, 0);
            this.scene.translate(5 * Math.cos(-this.angle * Math.PI / 180.0), 0, 5 * Math.sin(-this.angle * Math.PI / 180.0));
        }

        this.scene.rotate(this.angle * Math.PI / 180.0, 0, 1, 0);
        this.body.display(this.automatic);
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