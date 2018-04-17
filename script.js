

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


	function gamePlay(player,event){

		//console.log(player.getcurrentplayer());
		let currentplayer = player.getcurrentplayer();
		//console.log(currentplayer+","+event.target.dataset.clicked);
		if(event.target.dataset.clicked == "true"){
			return;
		}
		if((event.target.innerHTML != player.player1 || event.target.innerHTML != player.player2) && (event.target.dataset.clicked != true)){

		//console.log(event.target.dataset.clicked);
		event.target.innerHTML = currentplayer;
		event.target.dataset.clicked = true;
		event.target.removeEventListener("click",function(){
			return false;
		});
		let nextplayer = player.flipplayer();
		$("h2").text(nextplayer+"'s turn");
		}
	}

	function gameover(){

		function checkRow(){

			let rowval;
			//console.log("checking row");
	//first row
	rowval1 = ($("tr td:eq(0)").html() == $("tr td:eq(1)").html()) && ($("tr td:eq(2)").html() == $("tr td:eq(1)").html());
	rowval2 = ($("tr td:eq(3)").html() == $("tr td:eq(4)").html()) && ($("tr td:eq(5)").html() == $("tr td:eq(4)").html());
	rowval3 = ($("tr td:eq(6)").html() == $("tr td:eq(7)").html()) && ($("tr td:eq(8)").html() == $("tr td:eq(7)").html());


	return rowval1||rowval2||rowval3;
}

function checkDiagonal(){

	//console.log("checking diagonal");
	//left diagonal

	let diagonalval1 = (($("tr td:eq(0)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(8)").html());
	let diagonalval2 = (($("tr td:eq(2)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(6)").html());
	

	return diagonalval1||diagonalval2;

}

function checkColumn(){

	//console.log("checking column");
	//first column

	let columnval1 = (($("tr td:eq(0)").html() == $("tr td:eq(3)").html()) && $("tr td:eq(3)").html() == $("tr td:eq(6)").html());
	let columnval2 = (($("tr td:eq(1)").html() == $("tr td:eq(4)").html()) && $("tr td:eq(4)").html() == $("tr td:eq(7)").html());
	let columnval3 = (($("tr td:eq(2)").html() == $("tr td:eq(5)").html()) && $("tr td:eq(5)").html() == $("tr td:eq(8)").html());


	return columnval1||columnval2||columnval3;
}

function tie(){
	let cells = $("td");

	for(let cell of cells){
		if(cell.dataset.clicked != "true"){
			return false;
		}
	}

	return true;
}

let gameoverobj = {
	result:"",
	winner:"",

	setWinner : function(){
		this.winner = player.flipplayer();
	},

	setresult : function(res){
		this.result = res;
	},

	generateResult : function(){
		if(checkRow() || checkColumn() || checkDiagonal()){
			this.setresult("gameover");
			this.setWinner();
		}

		else if(tie()){
			this.setresult("gametie");
			this.setWinner("none");
		}
	},

	getstatus : function(){
		this.generateResult();
		return {result:this.result, winner:this.winner};
	}
};

return gameoverobj.getstatus();

};

function reset(){

	for(let i = 0 ; i < 9 ; ){
		let elem = $("tr td:eq("+i+")");
		elem.html(i+1);
		elem.attr("data-clicked",'');
		i++;
	}


	gameStart();
}


function gameStart(){

	let firstPlayer = prompt("Start with X or O ?");
	if(firstPlayer == "X" || firstPlayer == "O"){

	player.currentPlayer = firstPlayer;
	$("h2").text(player.currentPlayer+"'s turn");
	setTimeout(function(){
				
		$("td").click(function(event){
		gamePlay(player,event);

		let gamestatus = gameover();
		console.log(gamestatus);
		if(gamestatus.result == "gameover"){
			alert("game over"+gamestatus.winner+" wins!");
			reset();
			return;
		}

		else if(gamestatus.result == "gametie"){
			alert("game tied!");
			reset();
			return;
		}

	});

},50);
}

else{
	alert("choose either X or O");
	reset();
}
};

gameStart();

});

