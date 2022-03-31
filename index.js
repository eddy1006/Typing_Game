var timeLeft;
var elem = document.getElementById('some_div');
    
var timerId 

var str = "";
var index = 0;

function gameOver(){
    if(index === str.length){
        clearTimeout(timerId);
        elem.innerHTML = 'You won!'
    }else{
        elem.innerHTML = 'You Lost!'
    }
    str = "";
    index = 0;
    timeLeft = 30;
    $('#start').prop('disabled',false)
    $(document).unbind()
}

function countdown() {
if (timeLeft < 0) {
 clearTimeout(timerId);
 gameOver()
      } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
      }
   }

function start(){
    var dur = $('#duration option:selected').val()
    var penalty = $('#penalty option:selected').val()
    var words = $('#words option:selected').val()
    if(dur >1 && penalty > -1 && words >1){
        timeLeft = dur
        timerId= setInterval(countdown, 1000);
        $.ajax({url: `https://random-word-api.herokuapp.com/word?number=${words}`,async : true,success:function(result){
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
                    if(index === str.length)
                    gameOver()
                }else{
                    timeLeft = timeLeft - penalty
                    var audio = new Audio('wrong.mp3')
                    audio.play();
                }
            })
            $('#start').text('Restart')
            $('#start').prop('disabled',true)     
    }else{
        alert('Please first configure the settings')
    }
   
}