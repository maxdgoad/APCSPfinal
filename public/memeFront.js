
var div;
var loaded = false;
var already = false;
var created = false;
var game = null;
var player = null;

var read = false;
var crea = false;
var drawing = false;
var context;
 var current = {
    color: 'black'
  };

 var socket = io();

socket.on('getGame', function(gameobj){
    game = gameobj;
  
    
    document.cookie = " game=" +game.gameId+";";
    buildGame(game.gameId);
    console.log("game " + game.gameId);
    console.log("player " + socket.id);

});

socket.on('getPlayer', function(playerobj){
   player = playerobj; 
});

function bye()
{
    
    memeGame();
    //rating: pretty solid
    
    //bye runs on the html body load
    //it determines whether or not the user is on a known mobile devices and then switches to the mobile html...
    //Changes the screen that shows onload based on the cookies you have. 
    //e.g. if you have a nickname and game cookie, it will put you in that game
    //later needs to add checking to see if the game is still being played...maybe
    
    if (/Android|webOS|Mobile|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
    {
       // location.href = 'mobile.html';
        console.log("mobile");
    }
    
    document.getElementById("nick").value = getNickname();
    
    if(getNickname() !== "" && getGame() !== "")
    {

         document.cookie = "game=;";
        menu();

        
    }
    
    else if((getNickname() === "" && getGame() === "") || (getNickname() === "" && getGame() !== ""))
    {
        document.getElementById("init").style.display = "inline";
    }
    
    
    else if(getNickname() !== "" && getGame() === "")
    {
        menu();
    }
    

}



function getBackToNick()
{
    document.getElementById("init").style.display = "inline";
    document.getElementById("original").style.display = "none";
    document.getElementById("back").style.display = "none";
}

function menu()
{
    if(getGame() !== "" && getNickname() !== "")
    {
        socket.emit('playerLeave', getGame(), socket.id);
        game = null;
        player = null;  
    }
    
    if(document.getElementById("wrap") !== null)
    {
    
        document.body.removeChild(document.getElementById("wrap"));
    }
    
    if(document.getElementById("canvas") !== null)
    {
    
        document.body.removeChild(document.getElementById("canvas"));
    }
    //rating: could be improved
    
    //This function hides everythings else and displays the main menu (the new game, browse games, info screen)

    
    document.getElementById("back").style.display = "inline";
    document.getElementById("back").innerHTML = "< Change name";
    document.getElementById("back").onclick = getBackToNick;
    
    document.getElementById("init").style.display = "none";
    already = false;
    created = false;
    document.cookie = "game=;";
    window.location.href = "#";
    
    document.getElementById("newgame").style = "transform: translateY(0px); position:relative";
    document.getElementById("browse").style = "transform: translateY(0px); position:relative";
    document.getElementById("info").style = "transform: translateY(0px); position:relative";


    document.getElementById("browse").onclick = gamebrowser;
    document.getElementById("browse").innerHTML = "Browse Games";
    document.getElementById("newgame").innerHTML = "New Game";

    document.getElementById("original").style.display = "inline"; 
    
    if(document.getElementById("crap") !== null)
    {
        document.getElementById("original").removeChild(document.getElementById("crap"));
    }
    
    if(document.getElementById("serve") !== null)
    {
        document.getElementById("original").removeChild(document.getElementById("serve"));
    }
    
    document.getElementById("browse").style.display = "inline";
    document.getElementById("info").style.display = "inline";
 
    document.getElementById("init").style.display = "none"; 
    
    document.getElementById("KungFuKenny").style.display = "none";
    
    document.getElementById("newgame").onclick = selectNew;
    
    
}

function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0  / h,
      x1: x1  / w,
      y1: y1 / h,
      color: color
    }, getGame());
  }


function buildGame(gamename)
{
    //rating: solid
    
    //this really should be called join game, just joins a game
    //changes query string, and cookie
    //will be used for players joining from server browser
    document.getElementById("original").style.display = "none";
    temp = document.getElementById("temp")
    document.getElementById("back").style.display = "inline";
    document.getElementById("back").innerHTML = "< Leave";
    document.getElementById("back").onclick = menu;
    document.body.removeChild(document.getElementById("temp"));
    
    if(getGame() === "")
    {
        document.cookie = " game=" +gamename+";";
    }

    
    wrap = document.createElement("div");
    wrap.id ="wrap"
    wrap.style = "  height: 75%; position: relative; margin: auto; width: 20%; padding: 70px 0;transform: translate(-200%, 0); "
    
    t = document.createElement("input");
    t.type = "text";
    t.style = "bottom: 0; color: black; border: 4px solid #000000; left: 0;  position: absolute; width: 110%"
    t.onkeydown = function(){
        if(event.keyCode == 13){
         add(t.value, gamename);   
        }
    };
    
    /*
    send = document.createElement("button");
    send.id = "send";
    send.innerHTML = "send";
    send.className = "buttonRed"
    send.onmouseover = sendGreen;
    send.onmouseout = sendBack;
    send.onclick = function(){add(t.value, gamename)};
    */
    
    bigd =  document.createElement("div");
    bigd.style.color = "black"
    bigd.style = "text-align:left; color:black; overflow-y:scroll; background: rgba(170,170,170,.75); width: 110%; margin: 0 auto; overflow-x: hidden; height: 100%;border: 4px solid black; font-size: 16px "
    bigd.id ="bigd"
    
    //document.body.appendChild(wrap); 
    bigd.appendChild(t);
    wrap.appendChild(bigd);
   // wrap.appendChild(send);
    canvas = document.createElement("canvas");
    canvas.id = "canvas"
    canvas.className = "whiteboard";
    context = canvas.getContext('2d');
    
    document.body.appendChild(canvas);
    
    canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
    
    window.addEventListener('resize', onResize, false);
  onResize();

    //adds url to query tags

    window.location.href = "#game=" + getGame();
    
    //***we need to make an array of card the amount of cards be 1 - the max players max you do this I will make 4 for demonstration purposes
    //must send this function amount of players too in the future
    document.body.appendChild(temp);
    document.body.appendChild(wrap);

    
   
    
}
socket.on('drawing', onDrawingEvent);

 

 function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    console.log("what")
  }

function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

function onMouseDown(e){
    drawing = true;
    current.x = e.clientX;
    current.y = e.clientY;
  }

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    current.x = e.clientX;
    current.y = e.clientY;
  }




 window.addEventListener('resize', onResize, false);

function onResize() {
    canvas = document.getElementById("canvas")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }


socket.on("getMsg", function(name, msg){
        document.getElementById("bigd").appendChild(document.createElement("br"));
        div = document.createElement('p');
        div.innerHTML += name + ": " + msg;
        div.style = "display: table-cell; vertical-align: bottom; width: 100%; word-wrap:break-word; display:inline"
        document.getElementById("bigd").appendChild(div);
        div.scrollIntoView()
        
        
});


function add(msg, gId)
{
    t.value = "";
    socket.emit("sendMsg", msg, gId, getNickname());
}

function createGame()
{
    //rating: okay
    
    //this is what is called when the create game button is pressed in the game creation menu
    //its pretty solid i think but it needs some weird variables, hmm will come back to
    if(document.getElementById("gamename").value === "" && !already)
    {
        var nDiv = document.createElement("div");
        nDiv.innerHTML = "*Game name is required*";
        nDiv.style = "color: red";
        div.appendChild(document.body.appendChild(document.createElement("br")));
        div.appendChild(document.body.appendChild(document.createElement("br")));
        div.appendChild(nDiv); 
        already = true;

    }

    else if(document.getElementById("gamename").value !== "" && !created)
    {

        created = true;

        socket.emit('hostCreateNewGame', document.getElementById("gamename").value, document.getElementById("box").value, document.getElementById("pw").value, getNickname(), socket.id);
        
    }

}

function getReal()
{
    
    //this is called when the nickname button is pressed
    //sets nickname cookies and sends message on invalid name
    if(document.getElementById("nick").value === "" && !read)
    {
        var nDiv = document.createElement("div");
        nDiv.innerHTML = "*Nickname must be at least 1 character long*";
        nDiv.style = "color: red";
        document.getElementById("init").appendChild(document.body.appendChild(document.createElement("br")));
        document.getElementById("init").appendChild(document.body.appendChild(document.createElement("br")));
        document.getElementById("init").appendChild(nDiv); 
        read = true;
    }
    
    else if(document.getElementById("nick").value !== "" && !crea)
    {
        document.cookie = "nickname=" + document.getElementById("nick").value + "; expires= 13 Jul 2017 12:00:00 UTC; path=/;";
        crea = true;
        
        
        
        if(getGame() !== "")
        {
            document.getElementById("init").style.display = "none";
           // buildGame();
            crea = false;
        }
        
        else
        {
            crea = false;
            menu();
        }
    }
}

function gamebrowser()
{
    //rating: bad news bears
    //this monster changes from menu to the game create screen, pretty much garbage
    
    document.getElementById("back").innerHTML = "< Back";
    document.getElementById("back").onclick = menu;
    
    document.getElementById("newgame").style = "display:none; position:absolute;";
    document.getElementById("info").style = "display:none; position:absolute;";


    document.getElementById("browse").style = "transform: translateY(-100px); position:relative;";

    document.getElementById("browse").innerHTML = "join"
    document.getElementById("browse").onclick = findSelected;
    
    list = document.createElement("div");
    list.id = "serve";
    list.style = "width: 50%; padding:1%; border: 4px solid #000000; color:black; position:absolute; overflow:scroll; height:410px; padding-bottom: -400px; left:24%; background: rgba(255,255,255,.75); transform: translateY(-70px);"
    
    socket.emit('getGames', socket.id);
    document.getElementById("original").appendChild(list);

    

}

//this line will fill the games list with parse and formatted games 
//need to add amount of current players to display
socket.on('returnGames', function(games){
    var tab;
    for(rep = 0; rep<games.length; rep++)
    {
        
        tab = document.createElement("button");
        left = document.createElement("span");
        right = document.createElement("span");
        
        left.innerHTML = games[rep].gameName;
        left.style = "float:left;"
        
        right.innerHTML ="";
        right.style = "float:left"
                
        tab.appendChild(left);
        tab.appendChild(right);

        
        tab.style = "padding: 16px 32px; text-decoration: none; font-size: 30px; margin: 4px 2px; -webkit-transition-duration: 0.4s; /* Safari */ transition-duration: 0.4s; cursor: pointer; width:100%; border: 4px solid black; text-align:left; background-color: white";
        tab.setAttribute("name", games[rep].gameName);
        tab.setAttribute("pw", games[rep].password);
        tab.setAttribute("gId", games[rep].gameId);
        tab.setAttribute("players", games[rep].playernum)
        tab.setAttribute("players", games[rep].playerlist)
        tab.setAttribute("selected", "false");

        tab.onclick = function(){placehold(this)};
        document.getElementById("serve").appendChild(tab);
        
    }
    
});

var selected;
function placehold(game)
{
    for(rep = 0; rep< document.getElementById("serve").childNodes.length; rep++)
    {
        document.getElementById("serve").childNodes[rep].style.color = "black";
        document.getElementById("serve").childNodes[rep].style.backgroundColor = "white";
        game.setAttribute("selected", "false");
    }
    
    //console.log(game.getAttribute("name"))
    if(game.getAttribute("pw") !== "" && document.getElementById("testfor") === null)
    {
        testfor = document.createElement("input");
        testfor.id = "testfor";
        testfor.type = "text";
        testfor.placeholder = "password";
        testfor.style.textAlign = "left"
        document.getElementById("browse").appendChild(testfor);
        document.getElementById("browse").onclick = function(){pwcheck(game)};
        
    }
    
    else if(game.getAttribute("pw") === "" && document.getElementById("testfor") !== null)
    {
           document.getElementById("browse").removeChild(testfor);
            console.log(game.getAttribute("name"))
            document.getElementById("browse").onclick = findSelected;
    }
    
    game.style.color = "white";
    game.style.backgroundColor = "orange";
    game.setAttribute("selected", "true");


}

function findSelected()
{
    for(rep = 0; rep< document.getElementById("serve").childNodes.length; rep++)
    {
        
        if(document.getElementById("serve").childNodes[rep].getAttribute("selected") === "true")
        {
            document.getElementById("serve").childNodes[rep].setAttribute("selected", "false");
            attemptJoin(document.getElementById("serve").childNodes[rep]);
            
        }
    }
}
var f = false;
function attemptJoin(game)
{
    f = false;
    if(game.getAttribute("pw") !== "")
    {
        testfor = document.createElement("input");
        testfor.type = "text";
        testfor.placeholder = "password";
        testfor.style.textAlign = "left"
        document.getElementById("browse").appendChild(testfor);
        document.getElementById("browse").onclick = function(){pwcheck(game)};
    }
    else if(game.getAttribute("pw") === "" )
    {   
        socket.emit("joinGame", game.getAttribute("gId"), getNickname(), socket.id)
       
        
    }
}

function pwcheck(game)
{
    if(f && testfor.value === game.getAttribute("pw"))
    {
        socket.emit("joinGame", game.getAttribute("gId"), getNickname(), socket.id)
        
    }
    else if( f && testfor.value !== game.getAttribute("pw"))
    {
           console.log("wrong pw") 
    }
    f = true;
}

function selectNew()
{
    //rating: bad news bears
    //this monster changes from menu to the game create screen, pretty much garbage
    
    document.getElementById("back").innerHTML = "< Back";
    document.getElementById("back").onclick = menu;
    
    document.getElementById("browse").style = "display:none;position:absolute;";
    document.getElementById("info").style = "display:none;position:absolute;";
    

    //document.getElementById("original").style = "transform: translateY(-100px); position:relative"
    document.getElementById("newgame").style = "transform: translateY(50px); position:relative";
    document.getElementById("newgame").innerHTML = "Start"

    var name = document.createElement("input");
    name.id = "gamename";
    name.type = "text";
    name.style = "width: 280px; margin: 0 auto; text-align:left; border: 2px solid #000000;";
    name.defaultValue = "";

    var box = document.createElement("select");
    box.id = "box";
    box.style = "width:70px; margin: 0 auto; text-align: left; background-color: #ffffff; border: 2px solid #000000; color: black;  position:relative; font-size: 30px"
    
    var temp;
    for(rep = 4; rep<=8; rep++)
    {
        temp = document.createElement("option");
        temp.value = rep;
        temp.innerHTML = rep;
        temp.style = "direction: rtl; font-size: 30px"
        box.appendChild(temp);

    }


    var password = document.createElement("input");
    password.id = "pw";
    password.type = "password";
    password.style = "width: 280px; margin: 0 auto; text-align:left; border: 2px solid #000000;";

    var words = document.createElement("div");
    var optional = document.createElement("div");
    var num = document.createElement("div");
    
    words.id = "words";
    words.innerHTML = "Game Name: ";
    words.appendChild(document.createElement("br"));
    words.appendChild(name);
    words.style = "text-align:center;color: black; font-size:30px; color:white"

    optional.id = "optional";
    optional.innerHTML = "Game Password (optional): ";
    optional.appendChild(document.createElement("br"));
    optional.appendChild(password);
    optional.style = "text-align: center; color: white; font-size:30px"
    crap = document.createElement("div");
    crap.id = "crap";
    crap.style.display = "inline";
    
    num.id = "num";
    num.innerHTML = "max. # of players";
    num.appendChild(document.createElement("br"));
    num.appendChild(box);
    num.style = "text-align: center; color: white; font-size:30px; display:none"

    
   // document.getElementById("original").appendChild(crap);

    crap.appendChild(document.createElement("br"));
    crap.appendChild(document.createElement("br"));
    crap.appendChild(document.createElement("br"));
    crap.appendChild(words);
    crap.appendChild(document.createElement("br"));
    crap.appendChild(optional);
    crap.appendChild(document.createElement("br"));
    crap.appendChild(num);
    
    document.getElementById("original").appendChild(crap);

    event.preventDefault();
    document.getElementById("newgame").onclick = createGame;
    
    already = false;
    created = false;

}

function getNickname()
{
    //https://www.w3schools.com/js/js_cookies.asp
    var name = "nickname=";
    var scook = document.cookie.split(';');
    for( rep = 0; rep < scook.length; rep++) 
    {
        var poss = scook[rep];
        while (poss.charAt(0) == ' ') 
        {
            poss = poss.substring(1);
        }
        if (poss.indexOf(name) == 0) 
        {
            return poss.substring(name.length, poss.length);
        }
    }
    return "";

}
    
function getGame()
{
    //https://www.w3schools.com/js/js_cookies.asp
    var name = "game=";
    var scook = document.cookie.split(';');
    for( rep = 0; rep < scook.length; rep++) 
    {
        var poss = scook[rep];
        while (poss.charAt(0) == ' ') 
        {
            poss = poss.substring(1);
        }
        if (poss.indexOf(name) == 0) 
        {
            return poss.substring(name.length, poss.length);
        }
    }
    return "";

}

function isItOkay()
{
    if(document.getElementById("newgame").innerHTML === "Start" && document.getElementById("gamename").value !== "")
    {
        document.getElementById("newgame").style.backgroundColor = "green";       
        document.getElementById("newgame").style.color = "white"; 
    }
    else
    {
        document.getElementById("newgame").style.backgroundColor = "red";       
        document.getElementById("newgame").style.color = "white";       

    }
}

function isItNo()
{
    document.getElementById("newgame").style.backgroundColor = "white"; 
    document.getElementById("newgame").style.color = "black"; 

}

function isItGo()
{
    if(document.getElementById("nick").value !== "")
    {
        document.getElementById("gogo").style.backgroundColor = "green";       
        document.getElementById("gogo").style.color = "white"; 
    }
    else
    {
        document.getElementById("gogo").style.backgroundColor = "red";       
        document.getElementById("gogo").style.color = "white";       
    }

}

//rating:could be improved
//the next few functions change the button color on mouseover, should change names, really garbo rn
function isItNoGo()
{
    document.getElementById("gogo").style.backgroundColor = "white"; 
    document.getElementById("gogo").style.color = "black"; 
}


function blueBoy()
{
    document.getElementById("info").style.backgroundColor = "blue";       
    document.getElementById("info").style.color = "white"; 
}

function blueGal()
{
    document.getElementById("info").style.backgroundColor = "white";       
    document.getElementById("info").style.color = "black"; 
}

function isItB()
{
    document.getElementById("browse").style.backgroundColor = "orange";       
    document.getElementById("browse").style.color = "white"; 
}

function isItNoB()
{
    document.getElementById("browse").style.backgroundColor = "white";       
    document.getElementById("browse").style.color = "black"; 
}

function sendBack()
{
    document.getElementById("send").style.backgroundColor = "green";       
    document.getElementById("send").style.color = "white"; 
}

function sendGreen()
{
    document.getElementById("send").style.backgroundColor = "white";       
    document.getElementById("send").style.color = "black"; 
}

function changeColOn()
{
    document.getElementById("back").style.backgroundColor = "green";       
    document.getElementById("back").style.color = "white"; 
}

function changeColOff()
{
    document.getElementById("back").style.backgroundColor = "white";       
    document.getElementById("back").style.color = "black"; 
}
