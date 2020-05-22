/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, ang_YY, x, y, z) {
        super(scene);
        
        this.ang_YY = ang_YY;   //orientacao do veiculo
        this.vel = 0;           //velocidade do veiculo inicialmente 0
        this.x = x;             //posicao do veiculo em x
        this.y = y;             //posicao do veiculo em y
        this.z = z;             //posicao do veiculo em z

        //Guarda os valores das coordenadas iniciais
        this.xi = this.x;
        this.yi = this.y;
        this.zi = this.z;

        this.direcaoLeme = 0;   //usado para manobrar os lemes dos dirigiveis

        this.resetVehicle = false;      //usado para saber se o utilizador pretende resetar o veiculo
        this.pilotoAutomatico = false;  //usado para saber se o utilizador pretende usar o piloto automatico

        this.i = 0;             //usado para criar o movimento sinusoidal da bandeira

        this.tInicialPil = -1;
        this.angInicialPil = -1;
        this.rotPil = -1;

        //--------------------------------

        this.dirigivel = new MyDirigivel(this.scene);
        this.flag = new MyPlane(this.scene, 40);
        this.flagHolder = new MySquare(this.scene);

        //--------------------------------

        //texturas das bandeiras normal e refletida
        this.flagPort = new CGFtexture(this.scene, "images/bandPort.png");
        this.flagPortReflected = new CGFtexture(this.scene, "images/bandPortReflected.png");
        
        //--------------------------------

        //textura branca aplicada nas hastes da badeira
        this.white = new CGFappearance(this.scene);
        this.white.setAmbient(1, 1, 1, 1);
        this.white.setDiffuse(0, 0, 0, 1);
        this.white.setSpecular(0, 0, 0, 1);
        this.white.setShininess(10.0);
        this.white.loadTexture('images/branco.png');
        this.white.setTextureWrap('REPEAT', 'REPEAT');

        //--------------------------------

        this.flagShader = new CGFshader(this.scene.gl, "flag.vert", "flag.frag");
        this.flagShaderOtherSide = new CGFshader(this.scene.gl, "flagOtherSide.vert", "flagOtherSide.frag");
        this.flagShader.setUniformsValues({ period: 2 * Math.PI});          //periodo da funcao sinusoidal
        this.flagShaderOtherSide.setUniformsValues({ period: 2 * Math.PI}); //periodo da funcao sinusoidal
        this.flagShader.setUniformsValues({uSampler1: 0});                  //textura da bandeira
        this.flagShaderOtherSide.setUniformsValues({uSampler2: 1});         //textura da bandeira
        
    }

    moveFlag(){
        //fator que representa a velocidade da bandeira relacionada com o veiculo
        var velocityOfFlag = Math.ceil(Math.abs(this.vel)* 10 * this.scene.speedFactorVehicle);

        //limita a velocidade da bandeira a 13
        if(velocityOfFlag > 13)
            velocityOfFlag = 13;

        //usado para criar movimento sinusoidal
        this.i = this.i % ((14-velocityOfFlag)*2);
    
        //valor em x da funcao sinusoidal
        this.flagShader.setUniformsValues({ desloc: Math.PI/(14-velocityOfFlag) * this.i });
        this.flagShaderOtherSide.setUniformsValues({ desloc: Math.PI/(14-velocityOfFlag) * this.i });
        //usado para nao movimentar a bandeira nas extremidades
        this.flagShader.setUniformsValues({ dif: Math.sin(Math.PI/(14-velocityOfFlag) * this.i) * 0.2});
        this.flagShaderOtherSide.setUniformsValues({ dif: Math.sin(Math.PI/(14-velocityOfFlag) * this.i) * 0.2});
        //scaleFactor para a bandeira
        this.flagShader.setUniformsValues({ normScale: this.scene.scaleFactorVehicle});
        this.flagShaderOtherSide.setUniformsValues({ normScale: this.scene.scaleFactorVehicle});
      
        this.i++;
    }

    update(t){

        if(!this.pilotoAutomatico){
            if(this.tInicialPil != -1)
                this.tInicialPil = -1;
            if (!this.resetVehicle){
                this.x += Math.sin(this.ang_YY) * this.vel * this.scene.speedFactorVehicle;
                this.z += Math.cos(this.ang_YY) * this.vel * this.scene.speedFactorVehicle;
            }else{
                this.resetVehicle =false;
            }
            this.dirigivel.update(this.vel, this.direcaoLeme);
            this.direcaoLeme = 0;
            this.display();
        }
        else{
            if(this.tInicialPil == -1){
                this.tInicialPil = t;
                this.angInicialPil = this.ang_YY;
            }
            this.dirigivel.update(1, -1);
            this.rotPil = ((t - this.tInicialPil) * 2 *  Math.PI) / 5000;
            this.ang_YY = this.angInicialPil + this.rotPil;
            this.direcaoLeme = 0;
            this.display();
        }
    }

    turn(val){
        if(!this.pilotoAutomatico){
            this.ang_YY += Math.PI * val / 180;
            if (this.vel>=0){
                if(val > 0){
                    this.direcaoLeme += -1;
                }
                else{
                    this.direcaoLeme += 1;
                }
            }else{
                if(val > 0){
                    this.direcaoLeme += 1;
                }
                else{
                    this.direcaoLeme += -1;
                }
            }
        }
    }

    accelerate(val){
        if(!this.pilotoAutomatico)
            this.vel += val;
    }

    reset(){
        this.x = this.xi;
        this.y = this.yi;
        this.z = this.zi;

        this.ang_YY = 0; 
        this.vel = 0; 

        this.tInicialPil = -1;
        this.angInicialPil = -1;

        this.resetVehicle = true;
        this.pilotoAutomatico = false
    }

    activatePilotoAutomatico(){
        if(!this.pilotoAutomatico){
            this.pilotoAutomatico = true;
            this.xRotationCenter = this.x + (5* Math.cos(this.ang_YY));
            this.zRotationCenter = this.z - (5* Math.sin(this.ang_YY));
        }else{
            this.pilotoAutomatico = false;
            this.x = this.xRotationCenter - (5* Math.cos(this.ang_YY));
            this.z = this.zRotationCenter + (5* Math.sin(this.ang_YY));
        }
    }

    //---------------
    //Dirigivel controlado pelo utilizador

    showManual(){
        this.showManualDirigivel();
        this.showManualFlag();
        this.showManualFlagHolder();
    }

    showManualDirigivel(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.translate(0, 10, 0);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.dirigivel.display();
        this.scene.popMatrix();
    }

    showManualFlag(){
        this.flagPort.bind(0);
        this.flagPortReflected.bind(1);

        this.scene.setActiveShader(this.flagShader);
        
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.translate(-2.8*Math.sin(this.ang_YY)*this.scene.scaleFactorVehicle, 10, -2.8*Math.cos(this.ang_YY)*this.scene.scaleFactorVehicle);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.rotate(Math.PI/2.0, 0, 1, 0);
        this.scene.scale(1, 0.5, 1);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.flagShaderOtherSide);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.translate(-2.8*Math.sin(this.ang_YY)*this.scene.scaleFactorVehicle, 10, -2.8*Math.cos(this.ang_YY)*this.scene.scaleFactorVehicle);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/2.0, 0, 1, 0);
        this.scene.scale(1, 0.5, 1);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    showManualFlagHolder(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.translate(-1.8*Math.sin(this.ang_YY)*this.scene.scaleFactorVehicle, 10 + 0.25*this.scene.scaleFactorVehicle, -1.8*Math.cos(this.ang_YY)*this.scene.scaleFactorVehicle);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);
        this.scene.rotate(Math.PI/2.0, 0, 0, 1);
        this.scene.scale(1, 0.1, 1);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.white.apply();
        this.flagHolder.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.translate(-1.8*Math.sin(this.ang_YY)*this.scene.scaleFactorVehicle, 10 - 0.25*this.scene.scaleFactorVehicle, -1.8*Math.cos(this.ang_YY)*this.scene.scaleFactorVehicle);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);
        this.scene.rotate(Math.PI/2.0, 0, 0, 1);
        this.scene.scale(1, 0.1, 1);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.white.apply();
        this.flagHolder.display();
        this.scene.popMatrix();
    }

    //Dirigivel em piloto automatico

    showPilotoAutomatico(){
        this.showAutomaticDirigivel();
        this.showAutomaticFlag();
        this.showAutomaticFlagHolder();
    }

    showAutomaticDirigivel(){
        this.scene.pushMatrix();
        this.scene.translate(this.xRotationCenter, 0, this.zRotationCenter);
        this.scene.translate(0, 10, 0);
        this.scene.translate(-5 * Math.cos(this.ang_YY), 0, 5 * Math.sin(this.ang_YY));
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.dirigivel.display();
        this.scene.popMatrix();
    }

    showAutomaticFlag(){
        this.flagPort.bind(0);
        this.flagPortReflected.bind(1);

        this.scene.setActiveShader(this.flagShader);

        this.scene.pushMatrix();
        this.scene.translate(this.xRotationCenter, 0, this.zRotationCenter);
        this.scene.translate(-5 * Math.cos(this.ang_YY), 0, 5 * Math.sin(this.ang_YY));
        this.scene.translate(-2.8*Math.sin(this.ang_YY)*this.scene.scaleFactorVehicle, 10, -2.8*Math.cos(this.ang_YY)*this.scene.scaleFactorVehicle);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.rotate(Math.PI/2.0, 0, 1, 0);
        this.scene.scale(1, 0.5, 1);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.flagShaderOtherSide);

        this.scene.pushMatrix();
        this.scene.translate(this.xRotationCenter, 0, this.zRotationCenter);
        this.scene.translate(-5 * Math.cos(this.ang_YY), 0, 5 * Math.sin(this.ang_YY));
        this.scene.translate(-2.8*Math.sin(this.ang_YY)*this.scene.scaleFactorVehicle, 10, -2.8*Math.cos(this.ang_YY)*this.scene.scaleFactorVehicle);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.rotate(-Math.PI/2.0, 0, 1, 0);
        this.scene.scale(1, 0.5, 1);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    showAutomaticFlagHolder(){
        this.scene.pushMatrix();
        this.scene.translate(this.xRotationCenter, 0, this.zRotationCenter);
        this.scene.translate(-5 * Math.cos(this.ang_YY), 0, 5 * Math.sin(this.ang_YY));
        this.scene.translate(-1.8*Math.sin(this.ang_YY)*this.scene.scaleFactorVehicle, 10 + 0.25*this.scene.scaleFactorVehicle, -1.8*Math.cos(this.ang_YY)*this.scene.scaleFactorVehicle);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);
        this.scene.rotate(Math.PI/2.0, 0, 0, 1);
        this.scene.scale(1, 0.1, 1);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.white.apply();
        this.flagHolder.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(this.xRotationCenter, 0, this.zRotationCenter);
        this.scene.translate(-5 * Math.cos(this.ang_YY), 0, 5 * Math.sin(this.ang_YY));
        this.scene.translate(-1.8*Math.sin(this.ang_YY)*this.scene.scaleFactorVehicle, 10 - 0.25*this.scene.scaleFactorVehicle, -1.8*Math.cos(this.ang_YY)*this.scene.scaleFactorVehicle);
        this.scene.rotate(this.ang_YY, 0, 1, 0);
        this.scene.rotate(Math.PI/2.0, 1, 0, 0);
        this.scene.rotate(Math.PI/2.0, 0, 0, 1);
        this.scene.scale(1, 0.1, 1);
        this.scene.scale(this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle, this.scene.scaleFactorVehicle);
        this.white.apply();
        this.flagHolder.display();
        this.scene.popMatrix();
    }

    display() {

        var ini = [1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];

        this.scene.multMatrix(ini);

        if(!this.pilotoAutomatico)
            this.showManual();
        else
            this.showPilotoAutomatico();

    }

    enableNormalViz(){
            this.sphere.enableNormalViz();
    }

    disableNormalViz(){
            this.sphere.disableNormalViz();
    }

}