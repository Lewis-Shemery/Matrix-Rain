var SYMBOLSIZE = 20;

var streams = [];
var rain = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	var x = 0;
	var y = height;
	for (var i = 0; i <= width / SYMBOLSIZE; i++) {
		var myStream = new stream();
		myStream.generateSymbols(x, y);
		streams.push(myStream);
		x += SYMBOLSIZE;
	}
	textSize(SYMBOLSIZE);
}

function draw() {
	var j = 0;
	background(0, 70);
	rainChance = round(random(1, 2));
	if(rainChance == 1){
		rain.push(round(random(0, width / SYMBOLSIZE)));
	}
	if(rain.length != 0){
		for(var i = 0; i < rain.length; i++){
			streams[rain[i]].render();
		}
	}
}

function symbol(x, y) {
	this.x = x;
	this.y = y;
	//this.value;
	this.switchInterval = round(random(10,100));

	this.randomSymbol = function(){
		if(frameCount % this.switchInterval == 0){
			this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
		}
	};
}

function stream() {
	var a = round(height / SYMBOLSIZE);
	this.symbolArr = [];
	this.allSymbols = round(height / SYMBOLSIZE);

	this.generateSymbols = function(x, y) {
		for(var i = 0; i <= this.allSymbols; i++){
			mySymbol = new symbol(x, y);
			mySymbol.randomSymbol();
			this.symbolArr.push(mySymbol);
			y -= SYMBOLSIZE;
		}
	};

	this.render = function() {
		mySymbol = this.symbolArr[a];
		mySymbol.randomSymbol();
		text(mySymbol.value, mySymbol.x, mySymbol.y);
		fill(185, 255, 200);

		if(frameCount % 2 == 0){
			a--;
		}

		if(a == 0){
			a = round(height / SYMBOLSIZE);
		}

		if(rain.length > width / SYMBOLSIZE + 20){
			rain.splice(0,1);
		}

		if(a < round(height / SYMBOLSIZE)){
			var tailSize = round(height / SYMBOLSIZE) - a;
			for(var i = 0; i < 30; i++){
				if(i <= tailSize){
					mySymbol2 = this.symbolArr[a+i];
					text(mySymbol2.value, mySymbol2.x, mySymbol2.y);
					mySymbol2.randomSymbol();
					fill(20, 220, 90, 70);
				}
			
			}
		}
	};

}