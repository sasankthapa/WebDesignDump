const state=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

const winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

function checkForThreeInRow(player){
    for(var i=0;i<winningConditions.length; i++){
        var condition=winningConditions[i];
        let result = true;
        for(var j=0;j<condition.length;j++){
            if(getValueInState(condition[j])!==player){
                result=false;
                break;
            }
        }
        if(result){
            $('.overlay h1').text("Player "+player+" wins")
            $('td').off('click');
        }
    }
}

function getValueInState(id){
    var x=parseInt(id/3);
    var y=parseInt(id%3);
    return state[x][y]==null?'null':state[x][y];
}

function updateState(id,player){
    var x=parseInt(id/3);
    var y=parseInt(id%3);
    state[x][y]=player;
}

function eventListener1(curr){
    curr.removeClass('empty')
    if(typeof eventListener1.counter=='undefined'){
        eventListener1.counter=0;
    }
    if(eventListener1.counter%2===0){
        $("<img/>").attr('src','whitepiece.png').addClass('img').css({'border':'2px solid black','border-radius':'50%'}).hide().appendTo(curr).fadeIn(800);
        $('.overlay h1').text("Player 2's turn")
        curr.addClass('white')
        updateState(curr.attr('id'),1)
        checkForThreeInRow(1)
    }else{
        $("<img/>").attr('src','blackpiece.png').addClass('img').css({'border':'2px solid white','border-radius':'50%'}).hide().appendTo(curr).fadeIn(800);
        $('.overlay h1').text("Player 1's turn")
        curr.addClass('black');
        updateState(curr.attr('id'),2)
        checkForThreeInRow(2)
    }
    curr.off()
    eventListener1.counter++;

    if(eventListener1.counter===8){
        $('td').off('click')
        console.log('her1e');
        phase2()
    }
}

$(function(){
    $('td').addClass('empty')
    $('td').on('click',function(e){
        eventListener1($(this));
    })
})

function phase2listener(curr){
    if(typeof phase2listener.counter=='undefined'){
        phase2listener.counter=0;
    }
    console.log(curr.attr('class'))
    if(curr.hasClass('empty')) return
    var player=phase2listener.counter%2+1;
    if(curr.hasClass('white') && player==1){
        move(1, curr);
        phase2listener.counter++;
    }else if(curr.hasClass('black') && player==2){
        move(2,curr)
        phase2listener.counter++;
    }
}

function phase2(){
    $('td').on('click',function(e){
      phase2listener($(this))
    })
}

function move(player,curr){
    var emptyEle=$('.empty')
    var empty=emptyEle.attr('id')
    var id=curr.attr('id');
    var emptyX=parseInt(empty/3);
    var emptyY=parseInt(empty%3);
    var x=parseInt(id/3);
    var y=parseInt(id%3);
    if(!checkIfValidMove(emptyX,emptyY,x,y)) return
    if(player==1){
        $("<img/>").attr('src','whitepiece.png').addClass('img').css({'border':'2px solid black','border-radius':'50%'}).hide().appendTo(emptyEle).fadeIn(800);
        emptyEle.addClass('white').removeClass('empty');
        curr.addClass('empty').removeClass('white');
        state[emptyX][emptyY]=1
        state[x][y]=null;
        checkForThreeInRow(1);
    }else{
        $("<img/>").attr('src','blackpiece.png').addClass('img').css({'border':'2px solid black','border-radius':'50%'}).hide().appendTo(emptyEle).fadeIn(800);
        emptyEle.addClass('black').removeClass('empty');
        curr.addClass('empty').removeClass('black');
        state[emptyX][emptyY]=2
        state[x][y]=null;
        checkForThreeInRow(2);
    }
    $(curr).find('img').fadeOut(800)
    
    // var diffX=emptyX-x;
    // var diffY=emptyY-y;
    // console.log(diffX,diffY);
    // //diffY=-1 move left,diffY=1 move right
    // if(diffY==-1){
    //     console.log("animating")
    //     curr.find('img').animate({marginRight:"+=200px"},1000)
    // }
    // //diffX=1 move down, diffX=-1 move up
}

function checkIfValidMove(emptyX,emptyY,x,y){
    //if x and y each are distance 1 from empty, then we can make the move
    if(Math.abs(emptyX-x)<=1 && Math.abs(emptyY-y)<=1){
        return true;
    }else{
        return false;
    }
}