var util = {};

//Causes the game to fill the current window
util.resizeGame = function(game){
	game.scale.scaleMode = 2;
	game.scale.setShowAll();
	game.scale.refresh();
}