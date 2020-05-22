/**
* MyCone
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        //--------------------------------
        
        this.initBuffers();
    }
    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        //--------------------------------

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var tamStack = 1 / this.stacks;
        var tamSlices = 1 / this.slices;

        //--------------------------------
        //Produz os vertices, as texcoords e as normais

        for(var i = 0; i <= this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));  

            this.texCoords.push(i*tamSlices, 1);
            
            var normal1 = [Math.cos(ang), -Math.cos(Math.PI/4.0), -Math.sin(ang)];
            var norma =Math.sqrt(normal1[1] * normal1[1] + normal1[0] * normal1[0] + normal1[2] * normal1[2]); //norma do vetor normal
            //...Normalizando...
            normal1[0] /= norma;
            normal1[1] /= norma;
            normal1[2] /= norma;
            //...Inserindo normalizados...
            this.normals.push(...normal1);

            //Para a parte das stacks
            for(var j = 1; j < this.stacks; j++){
                
                this.vertices.push(Math.cos(ang), j * tamStack, -Math.sin(ang)); 

                this.texCoords.push(i*tamSlices, 1 - j*tamStack);

                this.normals.push(Math.cos(ang), 0, -Math.sin(ang));

            }

            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));

            this.texCoords.push(i*tamSlices, 0);

            var normal2 = [Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang)];
            //...Normalizando...
            normal2[0] /= norma;
            normal2[1] /= norma;
            normal2[2] /= norma;
            //...Inserindo normalizados...
            this.normals.push(...normal2);
            
            ang+=alphaAng;
        }

        this.vertices.push(0,0,0);
        this.vertices.push(0,1,0);

        this.texCoords.push(0.5,1);
        this.texCoords.push(0.5,0);

        this.normals.push(0,-1,0);
        this.normals.push(0,1,0);

        //--------------------------------
        //Faz a ligacao dos vertices

        for(var i = 0; i < this.slices; i++){

            if(this.slices - 1 != i){

                //Desenha as bases
                /*this.indices.push((this.slices + 1)*(this.stacks+1), (i+1)*(this.stacks+1), i * (this.stacks + 1));
                this.indices.push(i * (this.stacks + 1) + this.stacks, (i+1)*(this.stacks+1) + this.stacks, (this.slices + 1)*(this.stacks+1) + 1);*/

                for(var j = 0; j < this.stacks; j++){

                    this.indices.push(i*(this.stacks+1) + j, i*(this.stacks+1) + j + (this.stacks + 1), i*(this.stacks+1) + j + 1);
                    this.indices.push(i*(this.stacks+1) + j + 1 + (this.stacks + 1), i*(this.stacks+1) + j + 1, i*(this.stacks+1) + j + (this.stacks + 1));

                }
            
            }
            else{

                //Desenha as bases
                /*this.indices.push((this.slices+1)*(this.stacks+1), (i+1) * (this.stacks + 1), i * (this.stacks + 1));
                this.indices.push(i * (this.stacks + 1) + this.stacks, (i+1) * (this.stacks + 1) + this.stacks, (this.slices+1)*(this.stacks+1) + 1);*/

                for(var j = 0; j < this.stacks; j++){

                    this.indices.push(i*(this.stacks+1) + j, i*(this.stacks+1) + j + (this.stacks + 1), i*(this.stacks+1) + j + 1);
                    this.indices.push(i*(this.stacks+1) + j + (this.stacks + 1), i*(this.stacks+1) + j + (this.stacks + 1) + 1, i*(this.stacks+1) + j + 1);

                }

            }
            

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}
