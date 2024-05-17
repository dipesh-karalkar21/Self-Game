AFRAME.registerComponent("engen",{
    schema:{
        count : {default : false , type : "boolean"},
        alive : {default : true , type : "boolean"},
        damage : {default : 0 , type : "number"},
        health : {default : 1 , type : "number"},
        hit : {default : 0 , type : "number"},
        type : {default : "minion" , type : "string"},        
        time : {default : 10000 , type : "number"}
      },
    init:function(){
        setInterval(function(){
            var {count} = document.querySelector("#generator").getAttribute("engen")
            var {damage} = document.querySelector("#generator").getAttribute("engen")
            var {type} = document.querySelector("#generator").getAttribute("engen")
            console.log(count)
            if(count === true){
                var position1 = new THREE.Vector3();
                var position2 = new THREE.Vector3();
                
                var enemy = document.querySelector("#zombie").object3D;
                var player = document.querySelector("#camera-rig").object3D;

                player.getWorldPosition(position1);
                enemy.getWorldPosition(position2);
                
                position1.y=0

                var direction = new THREE.Vector3();

                var zombie = document.querySelector("#zombie")
                if(type == "minion"){
                    var soun = document.querySelector("#growl");
                    soun.components.sound.playSound();
                }
                else{

                }
                direction.subVectors(position1, position2)
                var mag = Math.sqrt(direction.x*direction.x + direction.y*direction.y + direction.z*direction.z)
                //console.log(mag)
                if(3.5 > mag){
                    var  {value} = document.querySelector("#countLife").getAttribute("text")
                    value = value  - damage;
                    document.querySelector("#countLife").setAttribute("text",{value : value < 0 ? 0 :value})
                    var soun1 = document.querySelector("#Zattack");
                    soun1.components.sound.playSound();
                    var soun2 = document.querySelector("#hurt");
                    soun2.components.sound.playSound();
                    if(value <= 0){
                        document.querySelector("#over").setAttribute("visible",true)   
                        document.querySelector("#generator").setAttribute("engen",{count : false, alive : false})
                        document.querySelector("#scene").removeChild(zombie)                 
                    }    

            }
        }
        },2000)
        setInterval(function(){
            var {hit} = document.querySelector("#generator").getAttribute("engen")
            var {count} = document.querySelector("#generator").getAttribute("engen")
            var {type} = document.querySelector("#generator").getAttribute("engen")
            var {health} = document.querySelector("#generator").getAttribute("engen")
            var {value} = document.querySelector("#countTank").getAttribute("text")
            if(hit >= health){
                if(type == "minion"){
                    document.querySelector("#countTank").setAttribute("text",{value : parseInt(value) + 1})
                    document.querySelector("#death").components.sound.playSound();
                    document.querySelector("#generator").setAttribute("engen",{count : false,hit:0,health:1})
                    var scene = document.querySelector("#scene")
                    var zombie = document.querySelector("#zombie")
                    scene.removeChild(zombie)
                }
                else if(type == "boss"){
                    document.querySelector("#countTank").setAttribute("text",{value : parseInt(value) + 1})
                    document.querySelector("#generator").setAttribute("engen",{count : false,hit:0,health:1})
                    var position1 = new THREE.Vector3();
                    var enemy = document.querySelector("#zombie").object3D;
                    enemy.getWorldPosition(position1);
                    document.querySelector("#bDeath").components.sound.playSound();
                    document.querySelector("#BGM").components.sound.stopSound()
                    var zombie = document.querySelector("#zombie")
                    var scene  = document.querySelector("#scene")
                    scene.removeChild(zombie)
                    var heli = document.querySelector("#heli")
                    heli.setAttribute("heligen",{enter : true})
                }
            }
        },1000)
        setInterval(function(){
            var {hit} = document.querySelector("#generator").getAttribute("engen")
            var {count} = document.querySelector("#generator").getAttribute("engen")
            var {type} = document.querySelector("#generator").getAttribute("engen")
            var {health} = document.querySelector("#generator").getAttribute("engen")
            if(count == true && type == "boss"){
                var boulder = document.createElement("a-entity")
                boulder.setAttribute("gltf-model","#boulder")
                boulder.setAttribute("scale",{
                    x:3,
                    y:3,
                    z:3
                })
                boulder.setAttribute("dynamic-body",{
                    mass : 0 ,
                    shape : "sphere",
                })


                var position1 = new THREE.Vector3();
                var position2 = new THREE.Vector3();
                
                var enemy = document.querySelector("#zombie").object3D;
                var player = document.querySelector("#camera-rig").object3D;


                player.getWorldPosition(position1);
                enemy.getWorldPosition(position2);
                
                position1.y = 2
                position2.y += 3 


                boulder.setAttribute("position",{
                    x:position2.x,
                    y:position2.y,
                    z:position2.z
                })

                var direction = new THREE.Vector3();


                direction.subVectors(position1,position2).normalize()

                boulder.setAttribute("velocity",direction.multiplyScalar(25))

                var soun1 = document.querySelector("#bThrow");
                soun1.components.sound.playSound();
                var scene = document.querySelector("#scene")
                scene.appendChild(boulder)

                boulder.addEventListener("collide",function(e){
                    console.log(e.detail.body.el)
                    var body = e.detail.body.el
                    if(body.id.includes("ground") || body.id.includes("camera-rig")){
                        if(body.id.includes("camera-rig")){
                            
                            var  {value} = document.querySelector("#countLife").getAttribute("text")
                            value = value  - 6;
                            document.querySelector("#countLife").setAttribute("text",{value : value < 0 ? 0 :value})
                            var soun2 = document.querySelector("#hurt");
                            soun2.components.sound.playSound();
                            if(value <= 0){
                                document.querySelector("#over").setAttribute("visible",true)   
                                document.querySelector("#generator").setAttribute("engen",{count : false, alive : false})
                                document.querySelector("#scene").removeChild(zombie)                 
                            }

                        }
                        var soun = document.querySelector("#bHit")
                        soun.components.sound.playSound() 
                        scene.removeChild(boulder)
                    }
                })

            }

        },this.data.time)
    },
    generate:function(){
        var zombie = document.createElement("a-entity")
        var x = Math.floor(Math.random()*200 - 100);
        var y = Math.floor(Math.random()*200 - 100);
        var j = Math.floor(Math.random() * 6 + 1);
        var {value} = document.querySelector("#countTank").getAttribute("text")
        if(value == 2){
            j = 7;
        }
        if(j == 7){
            x = 0;
            y = 0;
        }
        var zPos = {
            0 : ["scaleX","scaleY","scaleZ","timeScale","colliiderRadius","Health","Attack"],
            1 : [1,1,1,1,2,10,1],
            2 : [1.5,1.5,1.5,2,2,10,3],
            3 : [0.025,0.025,0.025,2,2,10,3],
            4 : [2,2,2,5.5,2,10,4],
            5 : [3,3,3,1,3,50,5],
            6 : [0.02,0.02,0.02,1,3,50,6],
            7 : [5,5,5,1,6,100,8]
        }
        zombie.setAttribute("id","zombie")
        zombie.setAttribute("class",j)
        zombie.setAttribute("animation-mixer",{timeScale:zPos[j][3]})
        zombie.setAttribute("gltf-model",`#zombie${j}`)
        zombie.setAttribute("dynamic-body",{
            shape:"sphere",
            mass:0,
            sphereRadius:zPos[j][4],
        })
        zombie.setAttribute("look-at","#focus")
        zombie.setAttribute("position",{
            x:x,
            y:0,
            z:y
        })

        zombie.setAttribute("scale",{
            x:zPos[j][0],
            y:zPos[j][1],
            z:zPos[j][2],
        })


        var scene = document.querySelector("#scene")
        scene.appendChild(zombie)
        if(j != 7){
            var soun = document.querySelector("#spawn");
            
            soun.components.sound.playSound();
            
            this.data.type = "minion"
        }
        else{
            var soun = document.querySelector("#bSpawn");
            soun.components.sound.playSound();
            var soun1 = document.querySelector("#BGM")
            soun1.components.sound.playSound()
            this.data.type = "boss"
            this.data.alive = false
        }
        this.data.count = true
        this.data.damage = zPos[j][6]
        this.data.health = zPos[j][5]
        this.data.hit = 0

    },
    tick:function(){
        if(this.data.count === false && this.data.alive === true){
            this.generate()          
        }
        if(this.data.count === true){
            this.direction()
        }

    },
    direction:function(){
            
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            
            var enemy = document.querySelector("#zombie").object3D;
            var player = document.querySelector("#camera-rig").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);
            
            position1.y=0

            var direction = new THREE.Vector3();

            var zombie = document.querySelector("#zombie")
            var speed = {
                1 : 4.5,
                2 : 9,
                3 : 4.5,
                4 : 4.5,
                5 : 4,
                6 : 4.5,
                7 : 3.5
            }
            var zombieNumber = zombie.getAttribute("class")
            direction.subVectors(position1, position2)
            var mag = Math.sqrt(direction.x*direction.x + direction.y*direction.y + direction.z*direction.z)
            //console.log(mag)
            if(mag > 3.5){    
                if(this.data.type == "minion"){
                    zombie.setAttribute("velocity",direction.normalize().multiplyScalar(speed[zombieNumber]))
                }
                else if(this.data.type == "boss"){
                    if(this.data.hit < 125){
                        zombie.setAttribute("velocity",direction.normalize().multiplyScalar(speed[zombieNumber]))
                    }
                    else if( 150<= this.data.hit < 225 ){
                        this.data.time = 4000
                        if(this.data.hit == 150){
                            document.querySelector("#bSpawn").components.sound.playSound()
                        }
                        zombie.setAttribute("velocity",direction.normalize().multiplyScalar(4))
                    }
                    else if(this.data.hit >= 225){
                        this.data.time = 2000
                        if(this.data.hit == 225){
                            document.querySelector("#bSpawn").components.sound.playSound()
                        }
                        zombie.setAttribute("velocity",direction.normalize().multiplyScalar(5))
                    }
                }
            }
            else if(mag<3.1){
                zombie.setAttribute("velocity",direction.normalize().multiplyScalar(-5))
            }
            else{
                zombie.setAttribute("velocity",direction.multiplyScalar(0))
            }    
        
    }
})