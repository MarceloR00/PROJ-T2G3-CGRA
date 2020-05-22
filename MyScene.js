/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //--------------------------------

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        this.sphere = new MySphere(this, 50, 50);
        this.cylinder = new MyCylinder(this, 50,25);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this, 0, 0, 0, 0);
        this.billboard = new MyBillboard(this);
        
        this.Supplies=[];
        this.nSuppliesDelivered=0;
        for(var i=0;i<5;i++){
            this.Supplies.push(new MySupply(this));
        }

        //--------------------------------

        this.worldTxt = new CGFappearance(this);
        this.worldTxt.setAmbient(1, 1, 1, 1);
        this.worldTxt.setDiffuse(0, 0, 0, 1);
        this.worldTxt.setSpecular(0, 0, 0, 1);
        this.worldTxt.setShininess(10.0);
        this.worldTxt.loadTexture('images/earth.jpg');
        this.worldTxt.setTextureWrap('REPEAT', 'REPEAT');

        this.default = new CGFappearance(this);
        this.default.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.default.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.default.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.default.setShininess(10.0);

        //--------------------------------

        this.landScapeIds = {'Mountain':0, 'SkyBox':1};

        //--------------------------------

        this.selectedLandScape = 0;
        this.scaleFactorVehicle = 1.0;
        this.speedFactorVehicle = 1.0;

        //--------------------------------
        //Objects connected to MyInterface
        this.displayAxis = false;

        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayPlane = false;
        this.displayVehicle = true;
        this.displayCubeMap = true;
        this.displayTerrain = true;
        this.displayBillBoard =true;
        
        this.displayNormals = false;

        //--------------------------------
    
        this.setUpdatePeriod(50);
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setAmbient(0.7, 0.7, 0.7, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.6, 0.1, 500, vec3.fromValues(24.9, 24.9, 24.9), vec3.fromValues(0, 8, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){

        this.checkKeys(t);
        this.vehicle.update(t);
        
        for(var j=0;j<=(this.nSuppliesDelivered-1);j++){
            this.Supplies[j].update(t);
        }

        this.vehicle.moveFlag(t);
        this.billboard.update(this.nSuppliesDelivered);
    }

    //--------

    showCubeMap(){
        this.pushMatrix();
        this.translate(0, 24.8, 0);
        this.default.apply();
        if(this.displayNormals)    
                this.cubeMap.enableNormalViz();
            else    
                this.cubeMap.disableNormalViz();
        this.cubeMap.display();
        this.popMatrix();
    }

    showSphere(){
        this.default.apply();
            if(this.displayNormals)    
                this.sphere.enableNormalViz();
            else    
                this.sphere.disableNormalViz();

        this.worldTxt.apply();
        this.sphere.display();
    }

    showCylinder(){
        this.default.apply();
        if(this.displayNormals)    
            this.cylinder.enableNormalViz();
        else    
            this.cylinder.disableNormalViz();
        
        this.worldTxt.apply();
        this.cylinder.display();
    }

    showVehicle(){
        this.pushMatrix();
        this.default.apply();
        this.vehicle.display();
        this.popMatrix();

        for(var i = 0; i <= (this.nSuppliesDelivered-1); i++)
            this.Supplies[i].display();

    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        
        this.lights[0].update();

        //--------------------------------

        // Draw axis
        if (this.displayAxis){
            this.default.apply();
            this.axis.display();
        }

        //--------------------------------

        if(this.displayTerrain)
            this.terrain.display();

        //--------------------------------

        if(this.displayCubeMap)
            this.showCubeMap();

        //--------------------------------

        if(this.displaySphere)
            this.showSphere();

        //--------------------------------

        if(this.displayCylinder)
            this.showCylinder();

        //--------------------------------

        if(this.displayVehicle)
            this.showVehicle();

        //--------------------------------
        
        if (this.displayBillBoard)
            this.billboard.display();
       
    }

    checkKeys(t) {
        var text="Keys pressed: ";
        var keysPressed=false;
        
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            if(this.displayVehicle)
                this.vehicle.accelerate(0.01);
            keysPressed=true;
        }
        
        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            if(this.displayVehicle)
                this.vehicle.accelerate(-0.01);
            keysPressed=true;
        }
        
        if (this.gui.isKeyPressed("KeyA")) {
            text+=" A ";
            if(this.displayVehicle)
                this.vehicle.turn(5);
            keysPressed=true;
        }
        
        if (this.gui.isKeyPressed("KeyD")) {
            text+=" D ";
            if(this.displayVehicle)
                this.vehicle.turn(-5);
            keysPressed=true;
        }
        
        if (this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            if(this.displayVehicle){
                this.vehicle.reset();
                for(var i=0;i<=(this.nSuppliesDelivered-1);i++){
                    this.Supplies[i].reset();
                }   
                this.nSuppliesDelivered = 0; 
            }
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            if(this.displayVehicle)
                this.vehicle.activatePilotoAutomatico();
            keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyL")){
            text+=" L ";
            if(this.displayVehicle && (!this.vehicle.pilotoAutomatico)){
                if (this.nSuppliesDelivered<5){  
                    this.Supplies[this.nSuppliesDelivered].drop(this.vehicle.x,this.vehicle.z, t);
                    this.nSuppliesDelivered++;
                }
            }
            keysPressed = true;
        }

        if(keysPressed){
            console.log(text);
        }
    }
}