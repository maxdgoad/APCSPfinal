class Game
{
    var max_players;
    var password;
    var name;
    var player_count;
    var players;
    var rounds;
    var king;
    var last_king;
    
    constructor(name, password, max_players)
    {
        this.name = name;
        this.password = password;
        this.max_players = max_players;
        this.king = 0;
    }
    
    get king()
    {      
        return this.king;
    }
    
    newKing()
    {
        this.players(this.king).becomeKing();
        this.last_king = this.king;
        this.king = this.last_king++;
        
    }
    
    get name()
    {
        return this.name;
    }
    
    get password()
    {
        return this.password;
    }
    
    get max_players()
    {
        return this.max_players;
    }
    
    canAddPlayer()
    {  
        return this.max_players > this.playercount;
    }
    
    get rounds()
    {
        this.rounds++;
    }
    
    addRound()
    {
        this.rounds++;
    }
    
    addPlayer(player)
    {
        this.players.push(player); 
        this.player_count++;
    }
}

class Player
{
    var name;
    var cards;
    var wins;
    var rounds;
    var king;
    
    construtor(name)
    {
        this.name = name;
        this.king = false;
    }
    
    get wins()
    {
        return this.wins;
    }
    
    addWins()
    {
        this.wins++;
    }
    
    get rounds()
    {
        return this.rounds;
    }
    
    addRounds()
    {
        this.rounds++;
    }
    
    becomeKing()
    {
        this.king = true;
    }
}
