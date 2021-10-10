function main(){
    const canvas=document.getElementById('canvas');
    const ctx= canvas.getContext('2d');
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    drawClock();
    drawNumbers();

    function drawNumbers() {
        var ang;
        var num;
        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for(num = 1; num < 13; num++){
            ang = num * Math.PI / 6;
            console.log(num,ang*180/Math.PI)
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    }

    function drawClock() {
        ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFF';
        ctx.fill();
    }
}

window.onload=main
