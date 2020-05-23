/**
* MyCubeMap
* @constructor
*/
class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);

        //--------------------------------

        this.square = new MyPlane(scene,40);

        //--------------------------------

        this.initMaterials();
    }

    initMaterials(){

        //--------------------------------
        //Textura da Montanha
        //--------------------------------

        //Parte da frente
        this.landScapeFront = new CGFappearance(this.scene);
        this.landScapeFront.setAmbient(1, 1, 1, 1);
        this.landScapeFront.setDiffuse(0, 0, 0, 1);
        this.landScapeFront.setSpecular(0, 0, 0, 1);
        this.landScapeFront.setShininess(10.0);
        this.landScapeFront.loadTexture('images/split_cubemap/front.png');
        this.landScapeFront.setTextureWrap('REPEAT', 'REPEAT');

        //Parte do lado direito
        this.landScapeRight = new CGFappearance(this.scene);
        this.landScapeRight.setAmbient(1, 1, 1, 1);
        this.landScapeRight.setDiffuse(0, 0, 0, 1);
        this.landScapeRight.setSpecular(0, 0, 0, 1);
        this.landScapeRight.setShininess(10.0);
        this.landScapeRight.loadTexture('images/split_cubemap/right.png');
        this.landScapeRight.setTextureWrap('REPEAT', 'REPEAT');

        //Parte do lado de trás
        this.landScapeBack = new CGFappearance(this.scene);
        this.landScapeBack.setAmbient(1, 1, 1, 1);
        this.landScapeBack.setDiffuse(0, 0, 0, 1);
        this.landScapeBack.setSpecular(0, 0, 0, 1);
        this.landScapeBack.setShininess(10.0);
        this.landScapeBack.loadTexture('images/split_cubemap/back.png');
        this.landScapeBack.setTextureWrap('REPEAT', 'REPEAT');

        //Parte do lado esquerdo
        this.landScapeLeft = new CGFappearance(this.scene);
        this.landScapeLeft.setAmbient(1, 1, 1, 1);
        this.landScapeLeft.setDiffuse(0, 0, 0, 1);
        this.landScapeLeft.setSpecular(0, 0, 0, 1);
        this.landScapeLeft.setShininess(10.0);
        this.landScapeLeft.loadTexture('images/split_cubemap/left.png');
        this.landScapeLeft.setTextureWrap('REPEAT', 'REPEAT');

        //Parte do lado de baixo
        this.landScapeBottom = new CGFappearance(this.scene);
        this.landScapeBottom.setAmbient(1, 1, 1, 1);
        this.landScapeBottom.setDiffuse(0, 0, 0, 1);
        this.landScapeBottom.setSpecular(0, 0, 0, 1);
        this.landScapeBottom.setShininess(10.0);
        this.landScapeBottom.loadTexture('images/split_cubemap/bottom.png');
        this.landScapeBottom.setTextureWrap('REPEAT', 'REPEAT');

        //Parte de cima
        this.landScapeTop = new CGFappearance(this.scene);
        this.landScapeTop.setAmbient(1, 1, 1, 1);
        this.landScapeTop.setDiffuse(0, 0, 0, 1);
        this.landScapeTop.setSpecular(0, 0, 0, 1);
        this.landScapeTop.setShininess(10.0);
        this.landScapeTop.loadTexture('images/split_cubemap/top.png');
        this.landScapeTop.setTextureWrap('REPEAT', 'REPEAT');

        //--------------------------------
        //Textura da Praia
        //--------------------------------

        //Parte da frente
        this.skyBoxFront = new CGFappearance(this.scene);
        this.skyBoxFront.setAmbient(1, 1, 1, 1);
        this.skyBoxFront.setDiffuse(0, 0, 0, 1);
        this.skyBoxFront.setSpecular(0, 0, 0, 1);
        this.skyBoxFront.setShininess(10.0);
        this.skyBoxFront.loadTexture('images/split_cubemap/cubemapFront.png');
        this.skyBoxFront.setTextureWrap('REPEAT', 'REPEAT');

        //Parte do lado direito
        this.skyBoxRight = new CGFappearance(this.scene);
        this.skyBoxRight.setAmbient(1, 1, 1, 1);
        this.skyBoxRight.setDiffuse(0, 0, 0, 1);
        this.skyBoxRight.setSpecular(0, 0, 0, 1);
        this.skyBoxRight.setShininess(10.0);
        this.skyBoxRight.loadTexture('images/split_cubemap/cubemapRight.png');
        this.skyBoxRight.setTextureWrap('REPEAT', 'REPEAT');

        //Parte do lado de tras
        this.skyBoxBack = new CGFappearance(this.scene);
        this.skyBoxBack.setAmbient(1, 1, 1, 1);
        this.skyBoxBack.setDiffuse(0, 0, 0, 1);
        this.skyBoxBack.setSpecular(0, 0, 0, 1);
        this.skyBoxBack.setShininess(10.0);
        this.skyBoxBack.loadTexture('images/split_cubemap/cubemapBack.png');
        this.skyBoxBack.setTextureWrap('REPEAT', 'REPEAT');

        //Parte do lado esquerdo
        this.skyBoxLeft = new CGFappearance(this.scene);
        this.skyBoxLeft.setAmbient(1, 1, 1, 1);
        this.skyBoxLeft.setDiffuse(0, 0, 0, 1);
        this.skyBoxLeft.setSpecular(0, 0, 0, 1);
        this.skyBoxLeft.setShininess(10.0);
        this.skyBoxLeft.loadTexture('images/split_cubemap/cubemapLeft.png');
        this.skyBoxLeft.setTextureWrap('REPEAT', 'REPEAT');

        //Parte do lado de baixo
        this.skyBoxBottom = new CGFappearance(this.scene);
        this.skyBoxBottom.setAmbient(1, 1, 1, 1);
        this.skyBoxBottom.setDiffuse(0, 0, 0, 1);
        this.skyBoxBottom.setSpecular(0, 0, 0, 1);
        this.skyBoxBottom.setShininess(10.0);
        this.skyBoxBottom.loadTexture('images/split_cubemap/cubemapBottom.png');
        this.skyBoxBottom.setTextureWrap('REPEAT', 'REPEAT');

        //Parte de cima
        this.skyBoxTop = new CGFappearance(this.scene);
        this.skyBoxTop.setAmbient(1, 1, 1, 1);
        this.skyBoxTop.setDiffuse(0, 0, 0, 1);
        this.skyBoxTop.setSpecular(0, 0, 0, 1);
        this.skyBoxTop.setShininess(10.0);
        this.skyBoxTop.loadTexture('images/split_cubemap/cubemapTop.jpg');
        this.skyBoxTop.setTextureWrap('REPEAT', 'REPEAT');
    }

    showCubeMap(){
        this.showTopFace();
        this.showBottomFace();
        this.showFrontFace();
        this.showFrontFace();
        this.showBackFace();
        this.showRightFace();
        this.showLeftFace();
    }

    showTopFace(){
        this.scene.pushMatrix();
        if(this.scene.selectedLandScape == 0)
            this.landScapeTop.apply();
        else
            this.skyBoxTop.apply();
        this.scene.translate(0, 24.9, 0);
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);
        this.scene.scale(50, 50, 1);
        this.square.display();
        this.scene.popMatrix();
    }

    showBottomFace(){
        this.scene.pushMatrix();
        if(this.scene.selectedLandScape == 0)
            this.landScapeBottom.apply();
        else
            this.skyBoxBottom.apply();
        this.scene.translate(0, -24.9, 0);
        this.scene.rotate(-Math.PI/2.0, 1, 0, 0);
        this.scene.scale(50, 50, 1);
        this.square.display();
        this.scene.popMatrix();
    }

    showFrontFace(){
        this.scene.pushMatrix();
        if(this.scene.selectedLandScape == 0)
            this.landScapeBack.apply();
        else
            this.skyBoxBack.apply();
        this.scene.translate(0, 0, 24.9);
        this.scene.scale(50, 50, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.square.display();
        this.scene.popMatrix();
    }

    showBackFace(){
        this.scene.pushMatrix();
        if(this.scene.selectedLandScape == 0)
            this.landScapeFront.apply();
        else
            this.skyBoxFront.apply();
        this.scene.translate(0, 0, -24.9);
        this.scene.scale(50, 50, 1);
        this.square.display();
        this.scene.popMatrix();
    }

    showRightFace(){
        this.scene.pushMatrix();
        if(this.scene.selectedLandScape == 0)
            this.landScapeLeft.apply();
        else
            this.skyBoxLeft.apply();
        this.scene.translate(-24.9, 0, 0);
        this.scene.rotate(Math.PI/2.0, 0, 1, 0);
        this.scene.scale(50, 50, 1);
        this.square.display();
        this.scene.popMatrix();
    }

    showLeftFace(){
        this.scene.pushMatrix();
        if(this.scene.selectedLandScape == 0)
            this.landScapeRight.apply();
        else
            this.skyBoxRight.apply();
        this.scene.translate(24.9, 0, 0);
        this.scene.rotate(-Math.PI/2.0, 0, 1, 0);
        this.scene.scale(50, 50, 1);
        this.square.display();
        this.scene.popMatrix();
    }

    display() {

        var ini = [1,0,0,0,
                  0,1,0,0,
                  0,0,1,0,
                  0,0,0,1];

    this.scene.multMatrix(ini);

    this.showCubeMap();

    }

    enableNormalViz(){
            this.square.enableNormalViz();
    }

    disableNormalViz(){
            this.square.disableNormalViz();
    }

    
}