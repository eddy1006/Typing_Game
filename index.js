var timeLeft = 30;
var elem = document.getElementById('some_div');
    
var timerId 

var str = "";
var index = 0;

function gameOver(){
    if(index+1 === str.length){
        console.log("You won")
    }else{
        console.log('You lost')
    }
    str = "";
    index = 0;
    timeLeft = 30;
    $(document).keypress(function(event){
        console.log("restart the game")
    })
}

function countdown() {
if (timeLeft == -1) {
 clearTimeout(timerId);
 gameOver()
      } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
      }
   }

function start(){
    timerId= setInterval(countdown, 1000);
    $.ajax({url: "https://random-word-api.herokuapp.com/word?number=20",async : true,success:function(result){
            console.log(result)
            for(var i=0;i<result.length-1;i++){
                str = str +result[i]+" ";
            }
            str =  str + result[result.length-1]
            console.log(str);
            $("#text").html(str)
        }})
        $(document).keypress(function(event){
            if(event.key === str[index]){
                var typed = str.substring(0,index+1)
                var untyped = str.substring(index+1)
                $('#text').html(`<h3 style="color:green; display:inline; margin:0;"> ${typed}<span style="color:red;">${untyped}</span></h3>`)
                index++;
            }else{
                console.log('NOT match')
            }
        })
}