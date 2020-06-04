/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
    constructor() {
        super();
        this.texture = null;
        this.appearance = null;

        // initial configuration of interface
        this.selectedTexture = 2;
        this.wireframe = false;
        this.displayVehicle = true;
        this.displayFlag = true;
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this, 4);
        this.terrain = new MyTerrain(this);
        this.sphere = new MySphere(this);
        this.cylinder = new MyCylinder(this);
        this.billboard = new MyBillboard(this);

        this.supplies = [
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
        ];

        //------

        // Object interface variables

        /*this.objects = [
            new MySphere(this, 16, 8),
            new MyCylinder(this, 6),
            new MyCubeMap(this),
        ];

        this.objectList = {
            'Sphere': 0,
            'Cylinder': 1,
            'Cube Map': 2,
        };*/

        //------ Applied Material
        this.Material = new CGFappearance(this);
        this.Material.setAmbient(0.1, 0.1, 0.1, 1);
        this.Material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Material.setSpecular(0.1, 0.1, 0.1, 1);
        this.Material.setShininess(10.0);
        this.Material.loadTexture('images/earth.jpg');
        this.Material.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Textures
        this.textures = [
            new CGFtexture(this, 'images/earth.jpg'),
            new CGFtexture(this, 'images/beach.png'),
            new CGFtexture(this, 'images/sky.png'),
            new CGFtexture(this, 'images/garden.png'),
        ];
        this.textureList = {
            'Earth': 0,
            'Beach': 1,
            'Sky': 2,
            'Garden': 3,

        };
        //-------

        this.setUpdatePeriod(1000 / 50);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;
        this.updatecheck = 0;
        this.landedBoxes = 0;
        this.lastBox = Number.MAX_VALUE;
        this.scaleFactor = 1;
        this.speedFactor = 1;
    }

    checkKeys() {

        let keysPressed = false;

        // keycodes => https://keycode.info/
        if (this.gui.isKeyPressed("KeyW") && !this.vehicle.automatic) {
            //text+=" W ";
            this.vehicle.accelerate(0.01 * this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyS") && !this.vehicle.automatic) {
            //text+=" S ";
            this.vehicle.accelerate(-0.01 * this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyA") && !this.vehicle.automatic) {
            //text+=" A ";
            this.vehicle.turn(3);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyD") && !this.vehicle.automatic) {
            //text+=" D ";
            this.vehicle.turn(-3);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyR")) {
            //text+=" R ";
            this.vehicle.reset();
            this.landedBoxes = 0;
            for (var count = 0; count < 5; count++) {
                this.supplies[count].state = SupplyStates.INACTIVE;
                this.supplies[count].tempo = 0;
                this.supplies[count].y = 9;
            }
        }

        if (this.gui.isKeyPressed("KeyL")) {
            //text+=" L ";
            if (this.landedBoxes !== 5 && this.lastBox > 500) {
                this.supplies[this.landedBoxes].drop(this.vehicle.x, this.vehicle.z);
                this.landedBoxes++;
                this.lastBox = 0;
            }
        }

        if (this.gui.isKeyPressed("KeyP") && !this.vehicle.automatic) {
            //text+=" P ";
            this.vehicle.activateautomatic();
        }
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(1.0, 0.1, 500, vec3.fromValues(21, 10, 21), vec3.fromValues(0, 6, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    /* onSelectedObjectChanged(v) {
        // update wireframe mode when the object changes
        this.onWireframeChanged(this.wireframe);
    }*/

    onSelectedTextureChanged(v) {
        // update wireframe mode when the object changes
        this.Material.setTexture(this.textures[this.selectedTexture]);
    }

    onWireframeChanged(v) {
        if (v) {
            //this.objects[this.selectedObject].setLineMode();
            this.cubeMap.setLineMode();
            this.vehicle.setLineMode();
        } else {
            this.vehicle.setFillMode();
            this.cubeMap.setFillMode();
            //this.objects[this.selectedObject].setFillMode();
        }

    }

    updateAppliedTexture() {
        this.Material.setTexture(this.textures[this.selectedTexture]);
    }

    update(period) {
        if (this.updatecheck === 0)
            this.updatecheck = period;

        let elapsedTime = period - this.updatecheck;
        this.updatecheck = period;
        this.checkKeys();
        this.vehicle.update(elapsedTime);

        for (var count = 0; count < 5; count++)
            this.supplies[count].update(elapsedTime);

        this.lastBox += elapsedTime;
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        for (var count = 0; count < 5; count++)
            this.supplies[count].display();

        /*   if (this.displayNormals)
               this.objects[this.selectedObject].enableNormalViz();
           else
               this.objects[this.selectedObject].disableNormalViz();

           this.objects[this.selectedObject].display();*/

        if (this.displayVehicle) {
            this.translate(this.vehicle.x, 10, this.vehicle.z);
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.translate(-this.vehicle.x, -10, -this.vehicle.z);
            this.vehicle.display();
        }

        this.popMatrix();
        this.Material.apply();
        this.terrain.display();

        this.billboard.display();
        this.Material.apply();
        this.updateAppliedTexture();
        this.pushMatrix();
        this.translate(0, 12, 0);
        this.cubeMap.display();
        this.popMatrix();
        // ---- END Primitive drawing section*/
    }
}