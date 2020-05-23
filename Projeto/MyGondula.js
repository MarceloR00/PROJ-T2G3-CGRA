/**
* MyTriangle
* @constructor
*/
class MyGondula extends CGFobject {
    constructor(scene) {
        super(scene);

        this.ang = 0;       //display dos lemes rodados

        //--------------------------------

        this.sphere = new MySphere(this.scene, 50, 50);
        this.cylinder = new MyCylinder(this.scene, 50, 25);
        this.square = new MySquare(this.scene);

        //--------------------------------

        this.initMaterials();
    }

    initMaterials(){

        //textura de vidro para aplicar a gondula
        this.vidro = new CGFappearance(this.scene);
        this.vidro.setAmbient(1, 1, 1, 1);
        this.vidro.setDiffuse(0, 0, 0, 1);
        this.vidro.setSpecular(0, 0, 0, 1);
        this.vidro.setShininess(10.0);
        this.vidro.loadTexture('images/vidro.jpg');
        this.vidro.setTextureWrap('REPEAT', 'REPEAT');

        //--------------------------------
        //textura branca a aplicar nos suportes das helices

        this.white = new CGFappearance(this.scene);
        this.white.setAmbient(1, 1, 1, 1);
        this.white.setDiffuse(0, 0, 0, 1);
        this.white.setSpecular(0, 0, 0, 1);
        this.white.setShininess(10.0);
        this.white.loadTexture('images/branco.png');
        this.white.setTextureWrap('REPEAT', 'REPEAT');

        //--------------------------------
        //textura branca a aplicar nas helices

        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 1, 1, 1);
        this.red.setDiffuse(0, 0, 0, 1);
        this.red.setSpecular(0, 0, 0, 1);
        this.red.setShininess(10.0);
        this.red.loadTexture('images/vermelho.png');
        this.red.setTextureWrap('REPEAT', 'REPEAT');

    }

    update(vel){
        this.ang += (Math.PI * 15  / 180) * vel * 10;       //velocidade de rotacao das helices
    } 

    showGondula(){
        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.vidro.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.3);
        this.vidro.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.scale(0.2, 0.2, 0.3);
        this.vidro.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
    
    showSuportesHelices(){
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0, -0.1);
        this.scene.scale(0.1, 0.1, 0.2);
        this.white.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, -0.1);
        this.scene.scale(0.1, 0.1, 0.2);
        this.white.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    showHelices(){
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0, -0.3);
        this.scene.rotate(this.ang, 0, 0, 1);
        this.scene.scale(0.03, 0.25, 1);
        this.red.apply();
        this.square.display();
        this.scene.popMatrix(); 

        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, -0.3);
        this.scene.rotate(this.ang, 0, 0, 1);
        this.scene.scale(0.03, 0.25, 1);
        this.red.apply();
        this.square.display();
        this.scene.popMatrix();
    }

    display() {

        var ini = [1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];

        this.scene.multMatrix(ini);

        this.showGondula();
        this.showSuportesHelices();
        this.showHelices();
    
    }
    
}