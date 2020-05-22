/**
* MyTriangle
* @constructor
*/
class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }
    initBuffers() {

        this.vertices = [-0.5, 0, -0.5,
                        0.5, 0, -0.5, 
                        0, 0, 0.5];
        
        this.indices = [2, 1, 0];
        
        this.normals = [0, 1, 0,
                        0, 1, 0,
                        0, 1, 0]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}