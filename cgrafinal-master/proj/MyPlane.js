/**
 * MyPlane
 * @constructor
 */
class MyPlane extends CGFobject {
    constructor(scene, nDivisions, minS, maxS, minT, maxT) {
        super(scene);

        nDivisions = typeof nDivisions !== 'undefined' ? nDivisions : 1;

        this.nDivisions = nDivisions;
        this.patchLength = 1.0 / nDivisions;

        this.minS = minS || 0;
        this.maxS = maxS || 1;
        this.minT = minT || 0;
        this.maxT = maxT || 1;

        this.q = (this.maxS - this.minS) / this.nDivisions;
        this.w = (this.maxT - this.minT) / this.nDivisions;

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.texCoords = [];
        var yCoord = 0.5;
        for (var j = 0; j <= this.nDivisions; j++) {
            var xCoord = -0.5;
            for (var i = 0; i <= this.nDivisions; i++) {
                this.vertices.push(xCoord, yCoord, 0);
                this.normals.push(0, 0, 1);
                this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
                xCoord += this.patchLength;
            }
            yCoord -= this.patchLength;
        }

        this.indices = [];
        var ind = 0;
        for (var j = 0; j < this.nDivisions; j++) {
            for (var i = 0; i <= this.nDivisions; i++) {
                this.indices.push(ind);
                this.indices.push(ind + this.nDivisions + 1);
                ind++;
            }
            if (j + 1 < this.nDivisions) {
                this.indices.push(ind + this.nDivisions);
                this.indices.push(ind);
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    }

    // http://www.dgp.toronto.edu/~ah/csc418/fall_2001/tut/ogl_draw.html
    setFillMode() {
        this.primitiveType = this.scene.gl.TRIANGLES;
    }
    setLineMode() {
        this.primitiveType = this.scene.gl.LINE_STRIP;
    };

}