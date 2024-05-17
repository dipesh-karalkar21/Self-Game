AFRAME.registerComponent("heligen",{
    schema:{
        enter : {default : false , }
    },
    tick:function(){
        if(this.data.enter === true){
            this.heligen()
        }
    },
    heligen:function(){
        var heli = document.createElement("a-entity")
        
        heli.setAttribute("gltf-model","#helicopter")

        heli.setAttribute("position",{
            x:0,
            y:10,
            z:0
        })

        heli.setAttribute("animate",{
            property : "position",
            to : {
                x:0,
                y:0,
                z:0
            },
            dur: 6000, 
            easing: linear, 
            loop: false
        }) 

        var soun = document.querySelector("#heli")
        soun.components.sound.playSound()

        var scene = document.querySelector("#scene")
        scene.appendChild(heli)

        this.data.enter = false

    }
})