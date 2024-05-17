AFRAME.registerComponent("equigen",{
    schema:{
        ammo : {default : false , type : "boolean"},
        medi : {default : false , type : "boolean"}
    },
    tick:function(){
        if(this.data.ammo === false){
            this.generateAmmo()
        }
        if(this.data.medi === false){
            this.generateMedi()
        }
    },
    generateAmmo:function(){
        var ammo = document.createElement("a-entity")
        var x = Math.floor(Math.random()*200 - 100);
        var y = Math.floor(Math.random()*200 - 100);
        
        ammo.setAttribute("gltf-model","#ammo")
        ammo.setAttribute("dynamic-body",{
            mass:0,
        })
        ammo.setAttribute("position",{
            x:x,
            y:1,
            z:y
        })

        ammo.setAttribute("scale",{
            x:2,
            y:2,
            z:2,
        })

        var scene = document.querySelector("#scene")
        scene.appendChild(ammo)
        this.data.ammo = true

        ammo.addEventListener("collide",function(e){
            var id = e.detail.body.el.id
            if(id.includes("camera-rig")){
                var {value} = document.querySelector("#countBullet").getAttribute("text")
                value = parseInt(value) + 100
                var equigen = document.querySelector("#equi")
                equigen.setAttribute("equigen",{ammo : false})
                document.querySelector("#countBullet").setAttribute("text",{value : value})
                var scene = document.querySelector("#scene")
                scene.removeChild(ammo)
            }
        })

    },
    generateMedi:function(){
        var medi = document.createElement("a-entity")
        var x = Math.floor(Math.random()*200 - 100);
        var y = Math.floor(Math.random()*200 - 100);
        
        medi.setAttribute("gltf-model","#medikit")
        medi.setAttribute("dynamic-body",{
            mass:0,
        })
        medi.setAttribute("position",{
            x:x,
            y:0,
            z:y
        })

        medi.setAttribute("scale",{
            x:0.025,
            y:0.025,
            z:0.025,
        })


        var scene = document.querySelector("#scene")
        scene.appendChild(medi)
        this.data.medi = true



        medi.addEventListener("collide",function(e){
            var id = e.detail.body.el.id
            if(id.includes("camera-rig")){
                var {value} = document.querySelector("#countLife").getAttribute("text")
                value = parseInt(value) + 3
                document.querySelector("#countLife").setAttribute("text",{value : value})
                var equigen = document.querySelector("#equi")
                equigen.setAttribute("equigen",{medi : false})
                var scene = document.querySelector("#scene")
                scene.removeChild(medi)                
            }
        })

    },
})