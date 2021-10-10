const parent=document.getElementById('parent')
var nodelist=Array.from(parent.children);

for(var i=0;i<nodelist.length;i++){
    var element=nodelist[i];
    element.addEventListener('mousedown', function(e){
        if(e.altKey){
            parent.appendChild(this)
        }else if(e.ctrlKey || e.metaKey){
            parent.appendChild(this)
            const temp=Array.from(parent.children)
            for(var i=0;i<temp.length-1;i++){
                console.log(parent.appendChild(temp[i]))
            }
        }
    });
}