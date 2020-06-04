class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.board = new MyPlane(scene, 50);
        this.barrasupply = new MyPlane(scene, 50);
        this.perna = new MyPlane(scene, 50);
        this.plane = new MyPlane(scene, 20);
        this.barraShader = new CGFshader(scene.gl, 'shaders/barra.vert', 'shaders/barra.frag');
        this.barraShader.setUniformsValues({ drops: 0 });
        this.arrived = 0;
        this.initMaterials();
    }

    initMaterials() {
        this.boardtexture = new CGFappearance(this.scene);
        this.boardtexture.setAmbient(0.0, 0.0, 0.0, 1);
        this.boardtexture.setDiffuse(1, 1, 1, 1);
        this.boardtexture.setSpecular(1, 1, 1, 1);
        this.boardtexture.loadTexture('images/billboard.jpg');
        this.boardtexture.setTextureWrap('REPEAT', 'REPEAT');

        this.trave = new CGFappearance(this.scene);
        this.trave.setAmbient(0.5, 0.5, 0.5, 1);
        this.trave.setDiffuse(0, 0, 0, 1);
        this.trave.setSpecular(0.1, 0.1, 0.1, 1);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(13, 2.5, 5);
        this.scene.rotate(1, 0, 1, 0);

        this.boardtexture.apply();
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.board.display();
        this.scene.popMatrix();

        this.trave.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.9, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.perna.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.9, -1, 0);
        this.scene.scale(0.1, 1, 1);
        this.perna.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.barraShader);
        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, 0.02);
        this.scene.scale(1.5, 0.2, 1);
        this.barrasupply.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }

    updateBillboard() {
        this.barraShader.setUniformsValues({ drops: ++this.arrived });
    }

    resetBillboard() {
        this.arrived = 0;
        this.barraShader.setUniformsValues({ drops: 0 });
    }

}