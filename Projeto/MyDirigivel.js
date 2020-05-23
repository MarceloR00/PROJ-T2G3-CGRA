/**
* MyVehicle
* @constructor
*/
class MyDirigivel extends CGFobject {
    constructor(scene) {
        super(scene);

        this.direcaoLeme = 0;

        //--------------------------------
        
        this.sphere = new MySphere(this.scene, 50, 50);
        this.lemes = new MyLemes(this.scene);
        this.gondula = new MyGondula(this.scene);

        //--------------------------------

        this.initMaterials();

    }

    initMaterials(){

        //textura vermelho para os lemes e helices
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 1, 1, 1);
        this.red.setDiffuse(0, 0, 0, 1);
        this.red.setSpecular(0, 0, 0, 1);
        this.red.setShininess(10.0);
        this.red.loadTexture('images/vermelho.png');
        this.red.setTextureWrap('REPEAT', 'REPEAT');

        //textura branca para os suportes de helices
        this.white = new CGFappearance(this.scene);
        this.white.setAmbient(1, 1, 1, 1);
        this.white.setDiffuse(0, 0, 0, 1);
        this.white.setSpecular(0, 0, 0, 1);
        this.white.setShininess(10.0);
        this.white.loadTexture('images/branco.png');
        this.white.setTextureWrap('REPEAT', 'REPEAT');

        //textura que contem o grupo para o balao
        this.nomes = new CGFappearance(this.scene);
        this.nomes.setAmbient(1, 1, 1, 1);
        this.nomes.setDiffuse(0, 0, 0, 1);
        this.nomes.setSpecular(0, 0, 0, 1);
        this.nomes.setShininess(10.0);
        this.nomes.loadTexture('images/Nomes.png');
        this.nomes.setTextureWrap('REPEAT', 'REPEAT');

    }

    update(vel, direcaoLeme){
        this.gondula.update(vel);
        
        this.direcaoLeme = direcaoLeme;         //valor que e para rodar o leme
    }

    showDirigivel(){
        this.showBallon();
        this.showLemes();
        this.showGondula();
    }

    showBallon(){
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 2);
        this.nomes.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    showLemes(){
        this.showLemeUp();
        this.showLemeDown();
        this.showLemeRight();
        this.showLemeLeft();
    }

    showLemeUp(){
        this.scene.pushMatrix();
        this.scene.translate(0, 0.8, -1.4);
        this.scene.scale(1, 0.6, 0.8);
        this.scene.rotate(this.direcaoLeme * Math.PI * 30 / 180, 0, 1, 0);
        this.red.apply();
        this.lemes.display();
        this.scene.popMatrix();
    }

    showLemeDown(){
        this.scene.pushMatrix();
        this.scene.translate(0, -0.8, -1.4);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(1, 0.6, 0.8);
        this.scene.rotate(-this.direcaoLeme * Math.PI * 30 / 180, 0, 1, 0);
        this.red.apply();
        this.lemes.display();
        this.scene.popMatrix();
    }

    showLemeRight(){
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 0, -1.4);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(1, 0.6, 0.8);
        this.red.apply();
        this.lemes.display();
        this.scene.popMatrix();
    }

    showLemeLeft(){
        this.scene.pushMatrix();
        this.scene.translate(0.8, 0, -1.4);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.scale(1, 0.6, 0.8);
        this.red.apply();
        this.lemes.display();
        this.scene.popMatrix();
    }

    showGondula(){
        this.scene.pushMatrix();
        this.scene.translate(0, -1, -0.5);
        this.gondula.display();
        this.scene.popMatrix();
    }

    display() {

        var ini = [1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];

        this.scene.multMatrix(ini);

        this.showDirigivel();
    
    }

    enableNormalViz(){
            this.sphere.enableNormalViz();
    }

    disableNormalViz(){
            this.sphere.disableNormalViz();
    }

    
}