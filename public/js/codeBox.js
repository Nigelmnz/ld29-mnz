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
	},{name: "Player_Size", val: player.playerSize, unlocked: false, displayed: false, 
		plusAction:function(valObj){
			var self = this;
			player.playerSize += 1;
			self.val = player.playerSize;
			valObj.setText(self.val);
			player.sprite.y -= 20;
		},minusAction: function(valObj){
			var self = this;
			player.playerSize -= 1;
			self.val = player.playerSize;
			valObj.setText(self.val);
		}
	}],
	functions:[{name: "Restart()", key: 1, unlocked: false, displayed: false, 
		Action:function(){
			if(scene === 7){
				scene = 8;
			}else if(scene === 9 && friend.dialogueCount === friend.dialogue[scene].length - 1){
				game.physics.enable(falseBackground, Phaser.Physics.ARCADE); 
				scene = 10;
				friend.currentText.y = 600;
			}
		}
	}]

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
	codeBox.variables.forEach(function(elem,ind){
		if(elem.unlocked && !elem.displayed){
			codeBox.showText(elem,ind);
		}

	});

	codeBox.functions.forEach(function(elem,ind){
		if(elem.unlocked && !elem.displayed){
			codeBox.showFunction(elem,ind);
		}

	});


	//Check for function activations
	if(game.input.keyboard.justPressed(Phaser.Keyboard.ONE, 20) && codeBox.functions[0].unlocked){
		codeBox.functions[0].Action();
	}


	//Update Text
	codeBox.texts.y = codeBox.sprite.y;
}

codeBox.showText = function(text,ind){
	var position = 50*(ind+1);

	var name = game.add.text(60, position, text.name, { font: '36px Source Code Pro', fill: '#FFDA3E'});
	var eq = game.add.text(name.width + name.x + 5, position, '=', { font: '36px Source Code Pro', fill: '#FFFFFF'});
	var val = game.add.text(eq.width + eq.x + 5, position, text.val, { font: '36px Source Code Pro', fill: '#BD68DD'});
	text.valObj = val;

	bitmap = game.add.bitmapData(40, 40);
	ctx = bitmap.context;
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 40, 40);
	var switcher_plus = game.add.button(val.width + val.x + 50, position, bitmap, function(){
		text.plusAction(text.valObj);
		sfx.pressHi.play();
	});

	bitmap = game.add.bitmapData(40, 40);
	ctx = bitmap.context;
	ctx.font = "50px Source Code Pro";
	ctx.fillStyle = "#000000";
	ctx.fillText("+", 5,35);
	var switcher_plus_symbol = game.add.sprite(val.width + val.x + 50, position, bitmap);

	bitmap = game.add.bitmapData(40, 40);
	ctx = bitmap.context;
	ctx.font = "50px Source Code Pro";
	ctx.fillStyle = "#CCCCCC";
	ctx.fillRect(0, 0, 40, 40);
	var switcher_minus = game.add.button(switcher_plus.width + switcher_plus.x, position, bitmap, function(){
		text.minusAction(text.valObj);
		sfx.pressLo.play();
	});

	bitmap = game.add.bitmapData(40, 40);
	ctx = bitmap.context;
	ctx.font = "50px Source Code Pro";
	ctx.fillStyle = "#000000";
	ctx.fillText("-", 5,35);
	var switcher_minus_symbol = game.add.sprite(switcher_plus.width + switcher_plus.x, position, bitmap);

	codeBox.texts.add(name);
	codeBox.texts.add(eq);
	codeBox.texts.add(val);
	codeBox.texts.add(switcher_plus);
	codeBox.texts.add(switcher_minus);
	codeBox.texts.add(switcher_plus_symbol);
	codeBox.texts.add(switcher_minus_symbol);

	text.displayed = true;

}

codeBox.showFunction = function(fun,ind){
	var position = 50*(ind+1);

	var key = game.add.text(1020, position, fun.key+": ", { font: '36px Source Code Pro', fill: '#E6E6E6'});
	var name = game.add.text(key.width + key.x, position, fun.name, { font: '36px Source Code Pro', fill: '#00FF00'});
	
	codeBox.texts.add(key);
	codeBox.texts.add(name);
	fun.displayed = true;
}





