

var div;
var already = false;
var created = false;
var game;

var read = false;
var crea = false;

function bye()
{
    if (/Android|webOS|Mobile|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
    {
       // location.href = 'mobile.html';
        console.log("mobile");
    }
    
    document.getElementById("nick").value = getNickname();
    
    if(getGame() !== "" && getNickname() !== "")
    {
        buildGame();
        
    }
    
    else if(getNickname() === "" && getGame() === "")
    {
        document.getElementById("init").style.display = "block";
    }
    
    else if(getNickname() !== "" && getGame() === "")
    {
        document.getElementById("original").style.display = "block";
    }

}

function menu()
{
    already = false;
    created = false;
    document.cookie = "game=;";
    window.location.href = "#";
    
    document.getElementById("newgame").style = "transform: translateY(0px); position:relative ";
    document.getElementById("newgame").innerHTML = "New Game";
    
    document.getElementById("values").style.display = "none";
    document.getElementById("words").style.display = "none";
    document.getElementById("optional").style.display = "none";
    
    document.getElementById("original").style.display = "inline"; 
    document.getElementById("browse").style.display = "inline";
    document.getElementById("info").style.display = "inline";

    
    document.getElementById("init").style.display = "none"; 
    document.getElementById("KungFuKenny").style.display = "none";
    
    document.getElementById("newgame").onclick = selectNew;
}

function buildGame()
{
    document.getElementById("original").style.display = "none";
    
    if(getGame() === "")
    {
        document.cookie = " game=" + document.getElementById("gamename").value + ";";
    }
    
    window.location.href = "#game=" + getGame();
    
    document.getElementById("KungFuKenny").style.display = "block";
}

function selectNew()
{

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
    

    document.getElementById("original").appendChild(document.createElement("br"));
    document.getElementById("original").appendChild(document.createElement("br"));
    document.getElementById("original").appendChild(document.createElement("br"));
    document.getElementById("original").appendChild(words);
    document.getElementById("original").appendChild(document.createElement("br"));
    document.getElementById("original").appendChild(optional);
    document.getElementById("original").appendChild(document.createElement("br"));
    document.getElementById("original").appendChild(div);

    event.preventDefault();
    document.getElementById("newgame").onclick = creategame;
    
    already = false;
    created = false;


}

function creategame()
{
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


function getReal()
{
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
            buildGame();  
        }
        else
        {
            menu();
        }
    }
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
