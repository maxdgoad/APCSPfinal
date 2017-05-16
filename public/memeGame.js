class Game
{
  
    
    constructor(name, password, max_players)
    {
        var max_players = max_players;
        var password = password;
        var name = name;
        var player_count;
        var players;
        var rounds;
        var king = 0;
        var last_king;
    
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
    
    set name(name)
    {
        this.name = name;
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
    
    
    construtor(name)
    {
        this.name = name;
        this.king = false;
        
        var name;
        var cards;
        var wins;
        var rounds;
        var king;
        
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
