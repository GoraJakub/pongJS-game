window.addEventListener("load",()=>{
    document.querySelector(".loader").style.display = "none";
})

const optionPlayer = document.querySelector("#optionPlayer");
const optionPC = document.querySelector("#optionPC");
const welcome = document.querySelector(".welcome__container");
const player = document.querySelector(".welcome__player");
const submit = document.querySelector("#submit");
const back = document.querySelector("#back");
const playerControl = document.querySelectorAll(".player__control");
let colorA;
let colorB;
let nickA = document.querySelector("#playerOne"),nickB=document.querySelector("#playerTwo");
let ctrl1A,ctrl2A,ctrl1B,ctrl2B;

optionPC.addEventListener("click",()=>{
    alert("Ta opcja jest niedostępna!");
});

optionPlayer.addEventListener("click",()=>{
    welcome.style.display = "none";
    player.style.display = "flex";
})
back.addEventListener("click",()=>{
    welcome.style.display = "flex";
    player.style.display = "none";
})

const isAsigned = (e) =>{
    // console.log("klawisz: "+e.keyCode);
    console.clear();
    for(let pc of playerControl){
        console.log("klawisz: "+e.keyCode);
        console.log("input: "+pc.value);
        if(e.keyCode==pc.value) return true;    
    }
    return false;
}

const alertDiv = document.querySelector(".alert");
playerControl.forEach(ctrl =>{
    const check = () =>{
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Click key to asign";
        ctrl.style.background = "coral";
        ctrl.addEventListener("keydown",(e)=>{
            if(!isAsigned(e)){
                ctrl.value= e.keyCode;
                if(e.key == "ArrowUp"){
                    ctrl.innerHTML = `<i class="fas fa-arrow-up">`;
                }else if(e.key == "ArrowDown"){
                    ctrl.innerHTML = `<i class="fas fa-arrow-down">`;
                }else if(e.key == "ArrowLeft"){
                    ctrl.innerHTML = `<i class="fas fa-arrow-left">`;
                }else if(e.key == "ArrowRight"){
                    ctrl.innerHTML = `<i class="fas fa-arrow-right">`;
                }else{
                    ctrl.innerHTML = e.key;
                }
                alertDiv.style.display = "none";
                ctrl.blur();
                ctrl.style.background ="rgb(141, 252, 141)";
            }
        });
        ctrl.removeEventListener("keyup",check);
    }
    ctrl.addEventListener("click",check);
})

submit.addEventListener("click",()=>{
    colorA = document.querySelector("#colorA").value;
    colorB = document.querySelector("#colorB").value;
    nickA.innerHTML = document.querySelector("#nick1").value;
    nickB.innerHTML = document.querySelector("#nick2").value;
    ctrl1A = document.querySelector("#control1A").value;
    ctrl2A = document.querySelector("#control2A").value;
    ctrl1B = document.querySelector("#control1B").value;
    ctrl2B = document.querySelector("#control2B").value;
    document.querySelector(".welcome").style.display="none";
})


