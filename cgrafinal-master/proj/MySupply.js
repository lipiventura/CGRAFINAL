const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);
        this.y = 9;
        this.x = 0;
        this.z = 0;

        this.tempo = 0;

        this.box = new MyUnitCubeQuad(this.scene);
        this.interiorBox = new MyUnitCubeQuad(this.scene);
        this.state = SupplyStates.INACTIVE;

        this.initMaterials();
    }

    initMaterials() {
        this.interiorBoxtexture = new CGFappearance(this.scene);
        this.interiorBoxtexture.setAmbient(0.9, 0.9, 0.9, 1);
        this.interiorBoxtexture.setDiffuse(0.4, 0.4, 0.4, 1);
        this.interiorBoxtexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.interiorBoxtexture.loadTexture('images/supply/crate5.png');
        this.interiorBoxtexture.setTextureWrap('REPEAT', 'REPEAT');
        this.outsideBoxTex = new CGFappearance(this.scene);
        this.outsideBoxTex.setAmbient(0.5, 0.5, 0.5, 1);
        this.outsideBoxTex.setDiffuse(0.5, 0.5, 0.5, 1);
        this.outsideBoxTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.outsideBoxTex.setShininess(10.0);
        this.outsideBoxTex.loadTexture('images/supply/crate4.png');
        this.outsideBoxTex.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.outsideBoxTex.apply();

        if (this.scene.linear !== true)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.box.display(this.state);
        this.scene.popMatrix();

        if (this.state === SupplyStates.LANDED) {
            this.interiorBoxtexture.apply();

            if (this.scene.linear !== true)
                this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else
                this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

            this.scene.pushMatrix();
            this.scene.translate(this.x, this.y - 0.2, this.z);
            this.scene.scale(0.5, 0.5, 0.5);
            this.interiorBox.display(1);
            this.scene.popMatrix();
        }
    }

    drop(boxDropX, boxDropY) {
        this.state = SupplyStates.FALLING;
        this.x = boxDropX;
        this.z = boxDropY;
    }

    land() {
        this.y = 0.55;
        this.state = SupplyStates.LANDED;
        this.scene.billboard.updateBillboard();
    }

    update(elapsedtime) {
        if (this.state === SupplyStates.FALLING) {
            this.tempo += elapsedtime;
            this.y = 9 - (this.tempo * 0.003);
            if (this.y < 0.4)
                this.land();
        }
    }

    // http://www.dgp.toronto.edu/~ah/csc418/fall_2001/tut/ogl_draw.html
    setFillMode() {
        this.primitiveType = this.scene.gl.TRIANGLES;
    }
    setLineMode() {
        this.primitiveType = this.scene.gl.LINE_STRIP;
    };
}