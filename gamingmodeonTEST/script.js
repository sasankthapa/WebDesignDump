const state=['School','Work','Fun and Games & Learning']
var current=0;

const heading=document.getElementById("heading");
const leftArrow=document.querySelector("i.arrow.left");
const rightArrow=document.querySelector("i.arrow.right");

const left=()=>{
    current=(current-1)
    if(current===-1) current=2
    heading.innerHTML=state[current]
    heading.parentElement.classList.add('left')
}

const right=()=>{
    current=(current+1)%state.length;
    heading.innerHTML=state[current]
    heading.parentElement.classList.add('right')
}

leftArrow.addEventListener('click', (e)=>{
    left();
})

rightArrow.addEventListener('click', (e)=>{
    right();
})

document.addEventListener('keydown',e=>{
    if(e.keyCode===37){
        left()
    }else if(e.keyCode===39){
        right();
    }
})

const node= () => {
    var sticky=document.createElement("div");
    sticky.appendChild()
}