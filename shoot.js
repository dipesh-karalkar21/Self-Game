AFRAME.registerComponent("shoot",{
    init:function(){
        this.createBullet()
    },
    createBullet:function(){
        window.addEventListener("keydown",(e)=>{
            var {value} = document.querySelector("#countBullet").getAttribute("text")
            if(e.key == "z" && parseInt(value) > 0){ 
                var bullet = document.createElement("a-entity")

                console.log("bullet created")

                bullet.setAttribute("gltf-model",`#bullet`)
                bullet.setAttribute("rotation",{
                    x:0,
                    y:90,
                    z:0
                })

                bullet.setAttribute("scale",{
                    x:0.05,
                    y:0.05,
                    z:0.05,
                })
                bullet.setAttribute("dynamic-body",{
                    mass:"0"
                })
                var campos = document.querySelector("#camera-rig")
                pos = campos.getAttribute("position")

                bullet.setAttribute("position",{
                    x: pos.x,
                    y: pos.y + 1.5,
                    z: pos.z
                })

                camdir = document.querySelector("#camera").object3D

                dir = new THREE.Vector3()
                camdir.getWorldDirection(dir)

                bullet.setAttribute("velocity",dir.multiplyScalar(-55))

                var scene = document.querySelector("#scene");


                bullet.addEventListener("collide",function(e){
                    var zombie =e.detail.body.el
                    if(zombie.id.includes("zombie")){
                        var enemy = document.querySelector("#generator")
                        var {hit} = enemy.getAttribute("engen")
                        enemy.setAttribute("engen",{
                            hit : hit + 1,
                        })
                        scene.removeChild(bullet)
                    }
                })
                var {value} = document.querySelector("#countBullet").getAttribute("text")
                document.querySelector("#countBullet").setAttribute("text",{value : (value-1) <=0 ? 0 :value -1})
                scene.appendChild(bullet)
                var soun = document.querySelector("#gunSound");
                soun.components.sound.playSound();
            }
            else if(e.key == "z" && parseInt(value) <= 0){
                var soun = document.querySelector("#gunEmpty");
                soun.components.sound.playSound();
            }
        })
        window.addEventListener("keyup",(e)=>{
            if(e.key == "z"){
                var soun = document.querySelector("#gunSound");
                soun.components.sound.stopSound();
            }
        })

    }
})
