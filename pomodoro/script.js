const start=document.getElementById('start');
const minutes=document.getElementById('minutes');
const second=document.getElementById('seconds');


start.addEventListener('click',(event)=>{
    event.target.classList.toggle('clicked');
    setTimeout(()=> event.target.classList.toggle('clicked'),500)
    const x=setInterval((seconds, minutes)=>{
        if(seconds===0){
            minutes--;
            seconds=60;
            this.minutes.innerHTML=minutes;
        }
        seconds--;
        this.seconds.innerHTML=seconds;
    },1000,second.innerHTML,minutes.innerHTML);
})
