const elementos=document.querySelectorAll(".fade");

window.addEventListener("scroll",()=>{

elementos.forEach(el=>{

const pos=el.getBoundingClientRect().top;

if(pos<window.innerHeight-120){

el.classList.add("visible");

}

});

});


const audio=document.getElementById("musica");

const boton=document.querySelector(".music");

let activo=false;

boton.onclick=()=>{

if(activo){

audio.pause();

}else{

audio.play();

}

activo=!activo;

}