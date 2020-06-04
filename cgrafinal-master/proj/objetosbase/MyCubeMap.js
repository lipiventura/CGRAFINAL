/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 *
 */
class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [

            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5, -0.5, -0.5, 0.5,

            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5, -0.5, 0.5, 0.5,

            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,

            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5, -0.5, -0.5, -0.5,

            -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,

            0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
        ];
        this.indices = [
            // z 0.5
            1, 2, 0,
            0, 2, 3,
            // y 0.5
            4, 5, 6,
            4, 6, 7,
            // x 0.5
            8, 9, 10,
            8, 10, 11,
            // y-0.5
            12, 13, 14,
            12, 14, 15,
            // x -0.5
            16, 17, 18,
            16, 18, 19,
            // z -0.5
            20, 21, 22,
            20, 22, 23,
        ];

        this.normals = [
            // x -0.5
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // y -0.5
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // z -0.5
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // x 0.5
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            // y 0.5
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // z 0.5
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        this.texCoords = [
            // back
            1.00, (0.4),
            (3 / 4), (0.4),
            (3 / 4), (2 / 3),
            1.00, (2 / 3),
            // top
            0.25, (1 / 3),
            0.50, (1 / 3),
            0.50, 0.00,
            0.25, 0.00,
            // right
            (3 / 4), (1 / 3),
            0.50, (1 / 3),
            0.50, (2 / 3),
            (3 / 4), (2 / 3),
            // bottom
            0.25, 1.00,
            0.50, 1.00,
            0.50, (2 / 3),
            0.25, (2 / 3),
            // left
            0.25, (1 / 3),
            0.00, (1 / 3),
            0.00, (2 / 3),
            0.25, (2 / 3),
            // front
            0.50, (1 / 3),
            0.25, (1 / 3),
            0.25, (2 / 3),
            0.50, (2 / 3),

        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display() {
            this.scene.setGlobalAmbientLight(0.8, 0.8, 0.8, 1);
            this.scene.setDiffuse(0, 0, 0);
            this.scene.setSpecular(0, 0, 0, 0);
            this.scene.setAmbient(1, 1, 1, 0);
            this.scene.pushMatrix();
            this.scene.scale(50, 50, 50);
            super.display();
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