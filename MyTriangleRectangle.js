/**
* MyTriangle
* @constructor
*/
class MyTriangleRectangle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }
    initBuffers() {

        this.vertices = [0.5, -0.5, 0,
                        0.5, 0.5, 0, 
                        0.5, -0.5, 1];
        
        this.indices = [0, 1, 2,
                        2,1,0];
        
        this.normals = [1, 0, 0,
                        1, 0, 0,
                        1, 0, 0];

        this.texCoords = [1, 1,
                          1, 0,
                          0, 1];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}