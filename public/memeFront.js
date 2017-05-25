//I am taking things from crazyscript.js and cleaning/commenting them into here. Also may start adding emits as I go
//Here a we go

var div
var loaded = false;
var already = false;
var created = false;
var game;

var read = false;
var crea = false;

function bye()
{
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
        buildGame();
        
    }
    
    else if((getNickname() === "" && getGame() === "") || (getNickname() === "" && getGame() !== ""))
    {
        document.getElementById("init").style.display = "inline";
    }
    
    
    else if(getNickname() !== "" && getGame() === "")
    {
        document.getElementById("original").style.display = "inline";
    }

}

function menu()
{
    //rating: could be improved
    
    //This function hides everythings else and displays the main menu (the new game, browse games, info screen)
    
    
    document.getElementById("init").style.display = "none";
    already = false;
    created = false;
    document.cookie = "game=;";
    window.location.href = "#";
    
   document.getElementById("newgame").style = "transform: translateY(0px); position:relative";
    document.getElementById("newgame").innerHTML = "New Game";

    document.getElementById("original").style.display = "inline"; 
    
    if(document.getElementById("crap") !== null)
    {
        document.getElementById("original").removeChild(document.getElementById("crap"));
        console.log('jesus');
    }
    
    document.getElementById("browse").style.display = "inline";
    document.getElementById("info").style.display = "inline";
 
    document.getElementById("init").style.display = "none"; 
    document.getElementById("KungFuKenny").style.display = "none";
    
    document.getElementById("newgame").onclick = selectNew;
    
    
}



function buildGame()
{
    //rating: solid
    
    //this really should be called join game, just joins a game
    //changes query string, and cookie
    //will be used for players joining from server browser
    document.getElementById("original").style.display = "none";
    
    if(getGame() === "")
    {
        document.cookie = " game=" + document.getElementById("gamename").value + ";";
    }
    
    window.location.href = "#game=" + getGame();
    
    document.getElementById("KungFuKenny").style.display = "block";
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
        game = new Game(document.getElementById("gamename").value, document.getElementById("pw").value, document.getElementById("box").options[document.getElementById("box").selectedIndex].value);

        created = true;
        
        buildGame();

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
         socket.emit('new player', document.getElementById("nick").value);
        
        if(getGame() !== "")
        {
            document.getElementById("init").style.display = "none";
            buildGame();  
        }
        
        else
        {
            menu();
        }
    }
}

function selectNew()
{
    //rating: bad news bears
    //this monster changes from menu to the game create screen, pretty much garbage

    document.getElementById("browse").style = "display:none;";
    document.getElementById("info").style = "display:none;";


    document.getElementById("newgame").style = "transform: translateY(50px); position:relative ";
    document.getElementById("newgame").innerHTML = "Start"

    var name = document.createElement("input");
    name.id = "gamename";
    name.type = "text";
    name.style = "width: 280px; margin: 0 auto; text-align:center; border: 2px solid #000000;";
    name.defaultValue = "";

    var box = document.createElement("select");
    box.id = "box";
    box.style = "width:70px; margin: 0 auto; text-align: center; background-color: #ffffff; border: 2px solid #000000; color: black;  position:relative; font-size: 30px"
    
    var temp;
    for(rep = 4; rep<=8; rep++)
    {
        temp = document.createElement("option");
        temp.value = rep;
        temp.innerHTML = rep;
        temp.style = "direction: rtl; font-size: 30px"
        box.appendChild(temp);

    }

    div = document.createElement("div");
    div.id = "values";
    div.style = "text-align: center"
    
    div.appendChild(box);

    var password = document.createElement("input");
    password.id = "pw";
    password.type = "password";
    password.style = "width: 280px; margin: 0 auto; text-align:center; border: 2px solid #000000;";

    var words = document.createElement("div");
    var optional = document.createElement("div");
    
    words.id = "words";
    words.innerHTML = "Game Name: ";
    words.appendChild(document.createElement("br"));
    words.appendChild(name);
    words.style = "text-align:center;color: black; font-size:30px;"

    optional.id = "optional";
    optional.innerHTML = "Game Password (optional): ";
    optional.appendChild(document.createElement("br"));
    optional.appendChild(password);
    optional.style = "text-align: center; color: black; font-size:30px"
    crap = document.createElement("div");
    crap.id = "crap";
    crap.style.display = "inline";
    
    document.getElementById("original").appendChild(crap);

    crap.appendChild(document.createElement("br"));
    crap.appendChild(document.createElement("br"));
    crap.appendChild(document.createElement("br"));
    crap.appendChild(words);
    crap.appendChild(document.createElement("br"));
    crap.appendChild(optional);
    crap.appendChild(document.createElement("br"));
    crap.appendChild(div);
    
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

function test()
{
    console.log("test");  
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