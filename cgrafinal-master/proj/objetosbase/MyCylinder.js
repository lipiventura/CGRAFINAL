/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();

    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var angle = 0;
        var alpha = (2 * Math.PI / this.slices);
        var textmap = 0;
        var textmapadd = (1 / this.slices);

        for (var i = 0; i <= this.slices; i++) {

            this.vertices.push(Math.cos(angle), 0, -Math.sin(angle));
            this.vertices.push(Math.cos(angle), 1, -Math.sin(angle));
            this.texCoords.push(textmap, 1);
            this.texCoords.push(textmap, 0);

            this.normals.push(Math.cos(angle), 0, -Math.sin(angle), Math.cos(angle), 0, -Math.sin(angle));

            if (i != 0) {
                this.indices.push((i * 2), (i * 2 + 1), (i * 2 - 1));
                this.indices.push((i * 2), (2 * i - 1), (2 * i - 2));
            }

            angle += alpha;
            textmap += textmapadd;

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity);
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    // http://www.dgp.toronto.edu/~ah/csc418/fall_2001/tut/ogl_draw.html
    setFillMode() {
        this.primitiveType = this.scene.gl.TRIANGLES;
    }
    setLineMode() {
        this.primitiveType = this.scene.gl.LINE_STRIP;
    };

}