var userClickedpattern=[];
var gamePattern=[];
var buttonColors=["red" ,"blue" ,"yellow" ,"green"];
var level=0;
var started=false;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});//starting of the app 


$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedpattern.push(userChosenColor);
    playSound(userChosenColor);
    animateColor(userChosenColor);
    checkAnswer(userClickedpattern.length-1);
});//recieves click action 

function nextSequence(){
    userClickedpattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randNo=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randNo];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}//triggers next sequence #Bot Module

function checkAnswer(currentLevel){ 
    if (userClickedpattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedpattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{   
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over, Press Any key to restart");
        startOver();

    }
}//main functionality if crct triggers bot else directs for reset 


function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animateColor(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}//when wrong sequence is triggered every value is reinitialized


