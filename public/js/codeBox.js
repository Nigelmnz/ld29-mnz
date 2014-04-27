var codeBox = {
	toggleRequest: false,
	down: false,
	variables:[{name: "Jump_Velocity", val: player.jumpSpeed, unlocked: true, displayed: false, 
		plusAction:function(valObj){
			var self = this;
			player.jumpSpeed += 200;
			self.val = player.jumpSpeed;
			valObj.setText(self.val);
		},minusAction: function(valObj){
			var self = this;
			player.jumpSpeed -= 200;
			self.val = player.jumpSpeed;
			valObj.setText(self.val);
		}
	}],
	functions:[]

};

codeBox.createSprite = function(){
	bitmap = game.add.bitmapData(GAME_WIDTH, 200);
	ctx = bitmap.context;
	ctx.fillStyle = "#4C514E";
	ctx.fillRect(0, 0, GAME_WIDTH, 200);
	codeBox.sprite = game.add.sprite(0,-200, bitmap);

	codeBox.texts = game.add.group();
	codeBox.texts.add(game.add.text(0, 0, 'Variables:', { font: '36px Source Code Pro', fill: '#0BF9FF'}));
	codeBox.texts.add(game.add.text(960, 0, 'Functions:', { font: '36px Source Code Pro', fill: '#0BF9FF'}));


}

codeBox.update = function(){
	if(codeBox.toggleRequest){

		if(codeBox.down){


		}else{
			if(codeBox.sprite.y < 0){
				codeBox.sprite.y += 5;
			}else{
				codeBox.toggleRequest = false;
				codeBox.down = true;
			}
		}
	}

	if(scene === 3){
		codeBox.sprite.y = 0;
		codeBox.down = true;
	}

	//Display Texts
	codeBox.variables.forEach(function(elem){
		if(elem.unlocked && !elem.displayed){
			codeBox.showText(elem);
			// elem.valObj.setText("d");
		}

	});


	//Update Text
	codeBox.texts.y = codeBox.sprite.y;
}

codeBox.showText = function(text){
	var name = game.add.text(60, 40, text.name, { font: '36px Source Code Pro', fill: '#FFDA3E'});
	var eq = game.add.text(name.width + name.x + 5, 40, '=', { font: '36px Source Code Pro', fill: '#FFFFFF'});
	var val = game.add.text(eq.width + eq.x + 5, 40, text.val, { font: '36px Source Code Pro', fill: '#BD68DD'});
	text.valObj = val;

	bitmap = game.add.bitmapData(40, 40);
	ctx = bitmap.context;
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 40, 40);
	var switcher_plus = game.add.button(val.width + val.x + 50, 40, bitmap, function(){text.plusAction(text.valObj);});

	bitmap = game.add.bitmapData(40, 40);
	ctx = bitmap.context;
	ctx.font = "50px Source Code Pro";
	ctx.fillStyle = "#000000";
	ctx.fillText("+", 5,35);
	var switcher_plus_symbol = game.add.sprite(val.width + val.x + 50, 40, bitmap);

	bitmap = game.add.bitmapData(40, 40);
	ctx = bitmap.context;
	ctx.font = "50px Source Code Pro";
	ctx.fillStyle = "#CCCCCC";
	ctx.fillRect(0, 0, 40, 40);
	var switcher_minus = game.add.button(switcher_plus.width + switcher_plus.x, 40, bitmap, function(){text.minusAction(text.valObj)});

	bitmap = game.add.bitmapData(40, 40);
	ctx = bitmap.context;
	ctx.font = "50px Source Code Pro";
	ctx.fillStyle = "#000000";
	ctx.fillText("-", 5,35);
	var switcher_minus_symbol = game.add.sprite(switcher_plus.width + switcher_plus.x, 40, bitmap);

	codeBox.texts.add(name);
	codeBox.texts.add(eq);
	codeBox.texts.add(val);
	codeBox.texts.add(switcher_plus);
	codeBox.texts.add(switcher_minus);
	codeBox.texts.add(switcher_plus_symbol);
	codeBox.texts.add(switcher_minus_symbol);

	text.displayed = true;

}





