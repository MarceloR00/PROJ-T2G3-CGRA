/**
* MyVehicle
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        //--------------------------------

        this.plane = new MyPlane(this.scene, 20);

        //--------------------------------

        this.initMaterials();

    }

    initMaterials(){

        this.terrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.terrainTex = new CGFtexture(this.scene, "images/terrain.jpg");
        
        //--------------------------------

        this.shader = new CGFshader(this.scene.gl, "terrain.vert", "terrain.frag");

        //--------------------------------

        this.shader.setUniformsValues({uSampler1: 0, uSampler2: 1});
    }

    showTerrain(){
        this.terrainMap.bind(0);
        this.terrainTex.bind(1);
        
        this.scene.setActiveShader(this.shader);

        this.scene.pushMatrix();
        this.scene.scale(50, 1, 50);
        this.scene.rotate(3 * Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    display() {

        var ini = [1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];

        this.scene.multMatrix(ini);

        this.showTerrain();

    }
    
}