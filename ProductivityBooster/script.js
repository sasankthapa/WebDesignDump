const main=document.getElementById('main');
const states=['School','Work','Fun & Games & Learning']
const leftArrow=document.querySelector('i.fas.fa-angle.left');
const rightArrow=document.querySelector('i.fas.fa-angle-right');

var current=0;
//store DOM mains
const mains=[]
const notesArray=[];

loadAll()

console.log(mains)
//need to do a local storage of 3 jsons

function left(){
    if(current!==0){
        mains[current].classList='main right'
        current--;
        mains[current].classList='main active'
    }
    //onleftclick
    //create the new div if it is not already created.
}

function right(){
    console.log(current)
    if(current<states.length-1){
        mains[current].classList='main left'
        current++;
        mains[current].classList='main active'
    }
    //onrightclick
    //create the new div if it is not already created.
}

document.addEventListener('keydown',e=>{
    if(e.keyCode===37){
        console.log('left')
        left()
    }else if(e.keyCode===39){
        console.log('right')
        right();
    }
})

function loadAll(){
    states.forEach((element,index) => {
        const notes=getLocalStorageData(element);
        notesArray.push(notes);
        const container=document.createElement('div');
        container.classList='main'
        if(index==0) container.classList.add('active')
        const header=document.createElement('header');
        header.innerHTML=`<header><i class="fas fa-angle-left"></i></i>${element}<i class="fas fa-angle-right"></i></header>`;
        container.appendChild(header);
        const main=document.createElement('main');
        notes.forEach(element => {
            const noteEl=processNoteAndReturnElement(element)
            main.appendChild(noteEl);
        })
        container.appendChild(main)
        mains.push(container)
        document.querySelector('body').appendChild(container)
    });
}

function getLocalStorageData(name) {
    const cards = JSON.parse(localStorage.getItem(name));
    return cards === null ? [] : cards;
  }
  
function setLocalStorageData() {
    notesArray.forEach((element,index) => {
        localStorage.setItem(states[index], JSON.stringify(element));
    })
    window.location.reload();
}

function processNoteAndReturnElement(data){
    const note=document.createElement('div');
    note.classList='sticky';
    note.setAttribute('draggable','true');
    note.style.top=data.top;
    note.style.left=data.left;
    note.innerHTML=`<div class="noteheading">${data.heading}</div>
            <div class="notedesc">${data.desc}</div>`
    note.addEventListener("dragend",(e)=>{  
        const header=document.querySelector('header');
        note.style.top=(e.clientY-header.offsetHeight).toString()+'px';
        note.style.left=(e.clientX).toString()+'px';
        var index=notesArray[current].indexOf(note);
        data.top=note.style.top;
        data.left=note.style.left;
        notesArray[index]=data;
        setLocalStorageData();
    })
    return note;
}

const headingEl=document.getElementById('heading');
const descEl=document.getElementById('description');
const addbutton=document.getElementById('addbtn');
const addContainer=document.getElementById('add-container');
const addNote=document.getElementById('addnote')

const hidebutton=document.getElementById('hide')

addbutton.addEventListener('click', (e)=>addContainer.classList.add('show'))
hidebutton.addEventListener('click', () => addContainer.classList.remove('show'));

addNote.addEventListener('click',()=>{
    const heading=headingEl.value;
    const desc=descEl.value;

    const note={ top:"200px",left:"200px",heading:heading, desc:desc};

    notesArray[current].push(note);

    setLocalStorageData();
})