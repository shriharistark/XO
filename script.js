

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


	function gamePlay(player,event){

		console.log(player.getcurrentplayer());
		let currentplayer = player.getcurrentplayer();
		alert(event.target.dataset.clicked);
		if(event.target.innerHTML != player.player1 || event.target.innerHTML != player.player2 || (event.target.dataset.clicked != true)){
		event.target.innerHTML = currentplayer;
		event.target.dataset.clicked = true;
		event.target.removeEventListener("click",function(){
			return true;
		});
		console.log(event.target);
		let nextplayer = player.flipplayer();
		$("h2").text(nextplayer+"'s turn");
	}
		console.log("current player: "+currentplayer);

	}

	function gameover(){

		function checkRow(){

			let rowval;
			console.log("checking row");
	//first row
	rowval1 = ($("tr td:eq(0)").html() == $("tr td:eq(1)").html()) && ($("tr td:eq(2)").html() == $("tr td:eq(1)").html());
	rowval2 = ($("tr td:eq(3)").html() == $("tr td:eq(4)").html()) && ($("tr td:eq(5)").html() == $("tr td:eq(4)").html());
	rowval3 = ($("tr td:eq(6)").html() == $("tr td:eq(7)").html()) && ($("tr td:eq(8)").html() == $("tr td:eq(7)").html());


	return rowval1||rowval2||rowval3;
}

function checkDiagonal(){

	console.log("checking diagonal");
	//left diagonal

	let diagonalval1 = (($("tr td:eq(0)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(8)").html());
	let diagonalval2 = (($("tr td:eq(2)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(6)").html());
	

	return diagonalval1||diagonalval2;

}

function checkColumn(){

	console.log("checking column");
	//first column

	let columnval1 = (($("tr td:eq(0)").html() == $("tr td:eq(3)").html()) && $("tr td:eq(3)").html() == $("tr td:eq(6)").html());
	let columnval2 = (($("tr td:eq(1)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(7)").html());
	let columnval3 = (($("tr td:eq(2)").html() == $("tr td:eq(5)").html()) && $("tr td:eq(5)").html() == $("tr td:eq(8)").html());


	return columnval1||columnval2||columnval3;
}

function tie(i){

	if(i > 8){
		return true;
	}
	let elemvalue = $("tr td:eq("+i+")").html();
	//todo
	if(elemvalue != '' && (elemvalue == player.player1 || elemvalue == player.player2)){
		return true&&tie(i+1);
	}

	else{
		return false;
	}

}

return (checkRow() || checkColumn() || checkDiagonal());

};

function reset(){

	for(let i = 0 ; i < 9 ; ){
		console.log($("tr td:eq("+i+")").html(i+1));
		i++;
	}

	gameStart();
}


function gameStart(){

	let firstPlayer = prompt("Start with X or O ?");
	player.currentPlayer = firstPlayer;
	$("h2").text(player.currentPlayer+"'s turn");
	setTimeout(function(){
		for(let elem of $("table").children()){
				$(elem).click(function(event){
		gamePlay(player,event);
		if(gameover()){
			alert("game over"+player.flipplayer()+" wins!");
			reset();
			return;
		}

	});
		}

		/*
	$("table").click(function(event){
		gamePlay(player,event);
		if(gameover()){
			alert("game over"+player.flipplayer()+" wins!");
			reset();
			return;
		}

	});*/

	//$("h2").text(firstPlayer+"'s turn");

	/*setInterval(function(){
		let gamedone = gameover();
		if(gamedone){
			alert("game over! "+player.flipplayer()+" wins!");
			reset();
			return;
		}
	},20);*/
},50);
};

gameStart();

});

