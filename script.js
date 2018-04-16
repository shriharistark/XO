

$(document).ready(function(){

	var player = {

		players : {player1: "X", player2: "O"},
		currentPlayer : "X",

		getcurrentplayer : function(){
			return this.currentPlayer;
		},

		flipplayer : function(){
			let cur = this.getcurrentplayer();
			if(cur == "X"){
				this.currentPlayer = "O";
			}

			else if(cur == "O"){
				this.currentPlayer = "X";
			}

			console.log("next player after flip is: "+this.getcurrentplayer());
			return this.getcurrentplayer();
		}
	};

	/*
	function flipPlayer(currentPlayer){
		let players = player.players;
		console.log("flip players: "+players.player1+","+players.player2);
		if(currentPlayer == players.pla){
			currentPlayer = players[1];
			return currentPlayer;
		}
		else if(currentPlayer == players[1]){
			currentPlayer =players[0];
			return currentPlayer;
		}
	}*/

	function gamePlay(player,callback){

		console.log(player.getcurrentplayer());

		let currentplayer = player.getcurrentplayer();
		let arr = [];
		
		let nextplayer;
		$("h2").text(currentplayer+"'s turn");
		console.log("current player: "+currentplayer);

		$("table").click(function(event){
			event.target.innerHTML = currentplayer;

			setTimeout(() =>{
				let _gameover = gameover();

				if(!_gameover){
				nextplayer = player.flipplayer();
				console.log("next player: "+nextplayer);
				console.log("---");
				gamePlay(player,gameover);
			}
			else{
				alert("game over!"+ flipPlayer(currentplayer)+" wins");
				reset();
				return;
			}
		}, 50 );
		});
	}

	function gameover(){

		function checkRow(){

			let rowval;
			console.log("checking row");
	//first row
	rowval1 = ($("tr td:eq(0)").html() == $("tr td:eq(1)").html()) && ($("tr td:eq(2)").html() == $("tr td:eq(1)").html());
	rowval2 = ($("tr td:eq(3)").html() == $("tr td:eq(4)").html()) && ($("tr td:eq(5)").html() == $("tr td:eq(4)").html());
	rowval3 = ($("tr td:eq(6)").html() == $("tr td:eq(7)").html()) && ($("tr td:eq(8)").html() == $("tr td:eq(7)").html());

	/*
	for(let i = 0 ; i < 3 ; ){
		console.log($("tr td:eq("+i+")").html());
		i++;
	}*/

	//console.log("-----")
	//second row

	/*
	for(let i = 3 ; i < 6 ; ){
		console.log($("tr td:eq("+i+")").html());
		i++;
	}*/

	//console.log("-----")
	//third row

		/*
	for(let i = 6 ; i < 9 ; ){
		console.log($("tr td:eq("+i+")").html());
		i++;
	}*/

	return rowval1||rowval2||rowval3;
}

function checkDiagonal(){

	console.log("checking diagonal");
	//left diagonal

	let diagonalval1 = (($("tr td:eq(0)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(8)").html());
	let diagonalval2 = (($("tr td:eq(2)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(6)").html());
	
	/*
	for(let i = 0 ; i < 9 ; ){
		console.log($("tr td:eq("+i+")").html());
		i+= 4;
	}

	console.log("-----")


	//right diagonal
	for(let i = 2 ; i < 8 ; ){
		console.log($("tr td:eq("+i+")").html());
		i+= 2;
	}*/

	return diagonalval1||diagonalval2;

}

function checkColumn(){

	console.log("checking column");
	//first column

	let columnval1 = (($("tr td:eq(0)").html() == $("tr td:eq(3)").html()) && $("tr td:eq(3)").html() == $("tr td:eq(6)").html());
	let columnval2 = (($("tr td:eq(1)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(7)").html());
	let columnval3 = (($("tr td:eq(2)").html() == $("tr td:eq(5)").html()) && $("tr td:eq(5)").html() == $("tr td:eq(8)").html());

	/*
	for(let i = 0 ; i < 9 ; ){
		console.log($("tr td:eq("+i+")").html());
		i+= 3;
	}

	console.log("-----")

	//second column
	for(let i = 1 ; i < 9 ; ){
		console.log($("tr td:eq("+i+")").html());
		i+= 3;
	}

	console.log("-----")

	//third column
	for(let i = 2 ; i < 9 ; ){
		console.log($("tr td:eq("+i+")").html());
		i+= 3;
	}*/

	return columnval1||columnval2||columnval3;
}

return (checkRow() || checkColumn() || checkDiagonal());

};

function reset(){

	for(let i = 0 ; i < 9 ; ){
		console.log($("tr td:eq("+i+")").html(i+1));
		i++;
	}
}

setTimeout(gamePlay(player,gameover),50);
});

