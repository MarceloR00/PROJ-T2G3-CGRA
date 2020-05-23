
const SupplyStates = { 
    INACTIVE: 0,
    FALLING: 1, 
    LANDED: 2
 };

class MySupply extends CGFobject {

	constructor(scene) {
		super(scene);

        this.velQueda= 0;
        this.posX;
        this.posY; this.posYini;
        this.posZ;

        this.tInicial = -1;

        //--------------------------------

        this.plane = new MyPlane(this.scene, 6);
        this.state = SupplyStates.INACTIVE;

        //--------------------------------

        this.Material = new CGFappearance(this.scene);
        this.Material.setAmbient(1,1, 1, 1);
        this.Material.setDiffuse(0, 0, 0, 1);
        this.Material.setSpecular(0, 0, 0, 1);
        this.Material.setShininess(10.0);
        this.Material.loadTexture('images/caixa.jpg');
        this.Material.setTextureWrap('REPEAT', 'REPEAT');
        
	}
	display(){
        
        if (this.state != SupplyStates.INACTIVE){
            if (this.state== SupplyStates.FALLING)
                this.displayFalling();
            else
                this.displayLanded();
        }
    }

    displayFalling(){

        this.Material.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.posX,this.posY,this.posZ);
        this.scene.scale(0.5,0.5,0.5);

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate( (-Math.PI/2.0), 0, 1, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate( (Math.PI/2.0), 0, 1, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate( (Math.PI), 0, 1, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate( (Math.PI/2.0), 1, 0, 0 );
        this.plane.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate( (-Math.PI/2.0), 1, 0, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    displayLanded(){
        
        this.Material.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(this.posX,0.01,this.posZ);
        this.scene.rotate( -(Math.PI/2.0), 1, 0, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.posX,0.01,1+this.posZ);
        this.scene.rotate( -(Math.PI/2.0), 1, 0, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.posX,0.01,-1+this.posZ);
        this.scene.rotate( -(Math.PI/2.0), 1, 0, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1+this.posX,0.01,this.posZ);
        this.scene.rotate( -(Math.PI/2.0), 1, 0, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1+this.posX,0.01,1+this.posZ);
        this.scene.rotate( -(Math.PI/2.0), 1, 0, 0 );
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.posX,0.01,-2+this.posZ);
        this.scene.rotate( -(Math.PI/2.0), 1, 0, 0 );
        this.plane.display();
        this.scene.popMatrix();

    }

    update(t){
        this.velQueda = (t - this.tInicial) * this.posYini / 3000;
        if(this.state == SupplyStates.FALLING){
            if (this.posY > 0.1){
                this.posY = this.posYini - this.velQueda;
            }
            else{
                console.log("Tempo = " + (t - this.tInicial));
                this.land();
            }
        }
    }

    drop(x, z, t){
        if (this.state == SupplyStates.INACTIVE){
            this.state = SupplyStates.FALLING;
            this.posX = x;
            this.posYini = this.posY = 10 - 1.2 * this.scene.scaleFactorVehicle;
            this.posZ = z;
            this.tInicial = t;
        }
    }

    land(){
        this.state = SupplyStates.LANDED;
    }

    reset(){
        this.velQueda= 0;
        this.state = SupplyStates.INACTIVE;
    }

    
    enableNormalViz(){
        this.plane.enableNormalViz();
    }

    disableNormalViz(){
        this.plane.disableNormalViz();
    }
}