/**
* MyTriangle
* @constructor
*/
class MyLemes extends CGFobject {
    constructor(scene) {
        super(scene);

        //--------------------------------

        this.square = new MySquare(this.scene);
        this.triangle = new MyTriangleRectangle(this.scene);
    }

    showLeme(){
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();
    }

    display() {

        var ini = [1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];

        this.scene.multMatrix(ini);

        //--------------------------------

        this.showLeme();
    
    }
    
}