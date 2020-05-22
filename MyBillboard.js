/**
* MyVehicle
* @constructor
*/
class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        //--------------------------------
        
        this.tabuleta = new MyPlane(this.scene, 40);
        this.barra = new MyPlane(this.scene, 40);
        this.estaca = new MyPlane(this.scene, 40);

        //--------------------------------

        //textura da tabuleta
        this.texTab = new CGFappearance(this.scene);
        this.texTab.setAmbient(1, 1, 1, 1);
        this.texTab.setDiffuse(0, 0, 0, 1);
        this.texTab.setSpecular(0, 0, 0, 1);
        this.texTab.setShininess(10.0);
        this.texTab.loadTexture('images/planoSuppliesDelivered.png');
        this.texTab.setTextureWrap('REPEAT', 'REPEAT');

        //textura da estaca
        this.texEstaca = new CGFappearance(this.scene);
        this.texEstaca.setAmbient(1, 1, 1, 1);
        this.texEstaca.setDiffuse(0, 0, 0, 1);
        this.texEstaca.setSpecular(0, 0, 0, 1);
        this.texEstaca.setShininess(10.0);
        this.texEstaca.loadTexture('images/barraSuppliesDelivered.png');
        this.texEstaca.setTextureWrap('REPEAT', 'REPEAT');

        //textura default
        this.default = new CGFappearance(this.scene);
        this.default.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.default.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.default.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.default.setShininess(10.0);

        //--------------------------------

        //textura da barra que passada para o shader
        this.texBarra = new CGFtexture(this.scene, "images/barraSuppliesDelivered.png");

        //--------------------------------

        //shader do billboard
        this.BillboardShader = new CGFshader(this.scene.gl, "Billboard.vert", "Billboard.frag");
        this.BillboardShader.setUniformsValues({uSampler1: 0});             //textura da barra
        this.BillboardShader.setUniformsValues({numberOfSupplies: 0.0});    //numero de supplies delivered

    }

    update(nSuppliesDelivered){
        //atualiza o billboard com o umero de supplies delivered
        this.BillboardShader.setUniformsValues({numberOfSupplies: nSuppliesDelivered});
    }

    showBillboard(){
        this.scene.pushMatrix();
        this.scene.translate(-5,1.5,-5);

        this.showTabuleta();
        this.showPercentagem();
        this.showEstacas();

        this.scene.popMatrix();
    }

    showTabuleta(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(2, 1, 1);
        this.texTab.apply();
        this.tabuleta.display();
        this.scene.popMatrix();
    }

    showPercentagem(){
        this.texBarra.bind(0);
        this.scene.setActiveShader(this.BillboardShader);    
        
        //--------------------------------
        //Display da barra de contagem

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0,0,0.01);
        this.scene.scale(1.5, 0.2, 1);
        this.default.apply();
        this.barra.display();
        this.scene.popMatrix();

        //--------------------------------

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    showEstacas(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0.9,-1,0);
        this.scene.scale(0.1, 1, 1);
        this.texEstaca.apply();
        this.estaca.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(-0.9,-1,0);
        this.scene.scale(0.1, 1, 1);
        this.texEstaca.apply();
        this.estaca.display();
        this.scene.popMatrix();
    }

    display() {

        var ini = [1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];

        this.scene.multMatrix(ini);

        this.showBillboard();
        
    }

    enableNormalViz(){
            this.sphere.enableNormalViz();
    }

    disableNormalViz(){
            this.sphere.disableNormalViz();
    }

}