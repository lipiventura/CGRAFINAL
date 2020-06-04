/**
 * MyVehicleModel
 * @constructor
 */
class MyVehicleModel extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initMaterials(scene);
        this.scene = scene;

        this.gondola = new MyGondola(scene);
        this.body = new MySphere(scene, 16, 8);
        this.leme = new MyLeme(scene);
        this.helice = new MyHelice(scene);
        this.flag = new MyPlane(scene, 20);
        this.support = new MyUnitCubeQuad(scene);
        this.vehicleTime = 0;

        this.windShader = new CGFshader(scene.gl, 'shaders/flag.vert', 'shaders/flag.frag');
        this.windShader.setUniformsValues({ uSampler: 1 });
        this.windShader.setUniformsValues({ timeFactor: 0 });
        this.windShader.setUniformsValues({ vehicleSpeed: 0 });
    }

    initMaterials(scene) {
        this.bodyTex = new CGFappearance(this.scene);
        this.bodyTex.loadTexture('images/irisdecent.jpg');
        this.bodyTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.bodyTex.setDiffuse(1, 1, 1, 1);
        this.bodyTex.setSpecular(1, 1, 1, 1);
        this.bodyTex.setShininess(10.0);

        this.flagTex = new CGFappearance(this.scene);
        this.flagTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.flagTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.flagTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.flagTex.setShininess(10.0);
        this.flagTex.loadTexture('images/flag.png');
    }

    display(automatic) {
        this.scene.setDiffuse(0, 0, 0);

        this.bodyTex.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.body.display();
        this.scene.popMatrix();
        this.bodyTex.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.gondola.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.1, -0.5, -0.3);
        this.scene.rotate(this.scene.vehicle.heliceangle, 0, 0, 1);
        this.helice.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, -0.5, -0.3);
        this.scene.rotate(this.scene.vehicle.heliceangle, 0, 0, 1);
        this.helice.display();
        this.scene.popMatrix();
        this.bodyTex.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.1, -0.6, -0.2)
        this.scene.scale(0.05, 0.05, 0.1);
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.1, -0.6, -0.2)
        this.scene.scale(0.05, 0.05, 0.1);
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.25, 0, -0.65);
        this.scene.rotate(90 * Math.PI / 180.0, 0, 0, 1);
        this.leme.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.25, 0, -0.65);
        this.scene.rotate(90 * Math.PI / 180.0, 0, 0, 1);
        this.leme.display();
        this.scene.popMatrix();

        this.flagTex.apply();

        if (this.scene.displayFlag) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -1);
            this.scene.rotate(16 * Math.PI / 180.0, 1, 0, 0);
            this.scene.scale(0.005, 0.005, 1.8);
            this.support.display(1);
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0, -1);
            this.scene.rotate(-16 * Math.PI / 180.0, 1, 0, 0);
            this.scene.scale(0.005, 0.005, 1.8);
            this.support.display(1);
            this.scene.popMatrix();

            this.windShader.setUniformsValues({ uSampler: 0 })
            this.scene.setActiveShader(this.windShader);
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -2.5);
            this.scene.scale(1, 0.5, 1.3);
            this.scene.rotate(-90 * Math.PI / 180.0, 0, 1, 0);
            this.flag.display();
            this.scene.popMatrix();
            this.scene.setActiveShader(this.scene.defaultShader);

            this.scene.setActiveShader(this.windShader);
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -2.5);
            this.scene.scale(1, 0.5, 1.3);
            this.scene.rotate(90 * Math.PI / 180.0, 0, 1, 0);
            this.flag.display();
            this.scene.popMatrix();
            this.scene.setActiveShader(this.scene.defaultShader);
        }

        this.scene.pushMatrix();
        this.scene.translate(0, 0.25, -0.65);

        if (automatic)
            this.scene.rotate(Math.PI / 9.0, 0, 1, 0);

        else if (this.scene.gui.isKeyPressed("KeyD"))
            this.scene.rotate(Math.PI / 9.0, 0, 1, 0);

        else if (this.scene.gui.isKeyPressed("KeyA"))
            this.scene.rotate(-Math.PI / 9.0, 0, 1, 0);

        this.leme.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.25, -0.65);

        if (automatic)
            this.scene.rotate(Math.PI / 9.0, 0, 1, 0);

        else if (this.scene.gui.isKeyPressed("KeyD"))
            this.scene.rotate(Math.PI / 9.0, 0, 1, 0);

        else if (this.scene.gui.isKeyPressed("KeyA"))
            this.scene.rotate(-Math.PI / 9.0, 0, 1, 0);
        this.leme.display();
        this.scene.popMatrix();

    }

    update(timePast, vehicleSpeed) {
        this.vehicleTime += timePast;
        this.windShader.setUniformsValues({ timeFactor: this.vehicleTime });
        this.windShader.setUniformsValues({ vehicleSpeed: vehicleSpeed });
    }

    setFillMode() { this.primitiveType = this.scene.gl.TRIANGLES; }
    setLineMode() { this.primitiveType = this.scene.gl.LINE_STRIP; };
}