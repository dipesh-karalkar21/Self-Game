AFRAME.registerComponent("move",{
    init : function(){
        this.play()
    },
    play :function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key == "w" || e.key == "s" || e.key == "a" || e.key == "d"){
                var soun = document.querySelector("#walkSound");
                soun.components.sound.playSound();
            }
        })
    }
})