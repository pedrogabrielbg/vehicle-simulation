'use strict';

const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 500;

// OBJECTS
function Car(x,y,w,h,color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.acc = 0;
	this.vel = 0;
	this.dx = 0;
	this.dy = 0;
	this.wheelAngle = 0;
	this.rotation = 0;
	this.update = function() {

		if(turnRPressed) {
			// Calculate car rotation
			this.rotation += 1;
			if(this.rotation > 360) {
				this.rotation %= 360; 
			}
			else if(this.rotation < 0) {
				this.rotation = (360 + this.rotation) % 360;
			}
		}
		else if(turnLPressed) {
			// Calculate car rotation
			this.rotation -= 1;
			if(this.rotation > 360) {
				this.rotation %= 360; 
			}
			else if(this.rotation < 0) {
				this.rotation = (360 + this.rotation) % 360;
			}
		}


		if(accPressed) {
			this.acc = 0.03;
			this.vel += this.acc;
		}
		else if(brakePressed && this.vel + this.acc > 0) {
			this.acc = -0.09;
			this.vel += this.acc;
		}
		else if(!accPressed && this.vel + this.acc > 0) {
			this.acc = -0.025;
			this.vel += this.acc;
		}
		else if(!accPressed && this.dx + this.acc <= 0) {
			this.acc = 0;
			this.vel = 0;
		}


		this.dx = this.vel * Math.cos(this.rotation * Math.PI/180);
		this.dy = this.vel * Math.sin(this.rotation  * Math.PI/180);
		
		this.x += this.dx;
		this.y += this.dy;


		this.draw();	

	};

	this.draw = function() {
		c.save();

		c.translate(this.x+(this.w/2), this.y+(this.h/2));
		c.rotate(this.rotation * Math.PI/180);
		c.translate(-(this.x+(this.w/2)), -(this.y+(this.h/2)));
		//c.translate(-(this.w/2), -(this.h/2));
		//c.restore();		

		c.beginPath();
		c.rect(this.x, this.y, this.w, this.h);
		c.fillStyle = this.color;
		c.fill();

		//c.translate(-(this.x+(this.w/2)), -(this.y+(this.h/2)));
		c.resetTransform();

		c.restore();
	};
}

// KEYBOARD
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var accPressed = false;
var brakePressed = false;
var turnRPressed = false;
var turnLPressed = false;

function keyDownHandler(e) {	
	if(e.keyCode == 65) {
		accPressed = true;
	}
	if(e.keyCode == 90) {
		brakePressed = true;
	}
	if(e.keyCode == 190) {
		turnRPressed = true;
	}
	if(e.keyCode == 188) {
		turnLPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 65) {
		accPressed = false;
	}
	if(e.keyCode == 90) {
		brakePressed = false;
	}
	if(e.keyCode == 190) {
		turnRPressed = false;
	}
	if(e.keyCode == 188) {
		turnLPressed = false;
	}
}

//******************** IMPLEMENTATION ********************//

var car1;

function init() {
	car1 = new Car(0, canvas.height/2, 30, 10, '#FF0000');
}
init();


// Animation Loop
;(function main() {

	requestAnimationFrame(main);


	c.clearRect(0, 0, canvas.width, canvas.height);


	car1.update();


	document.querySelector('#data').innerHTML = 	'x:    ' 	+ 	car1.x  	+	'<br />'
												+ 	'y:    ' 	+ 	car1.y  	+	'<br />'
												+ 	'acc:  ' 	+ 	car1.acc 	+ 	'<br />'
												+ 	'vel:  ' 	+ 	car1.vel 	+ 	'<br />'
												+ 	'dx: ' 	+ 	car1.dx 	+ 	'<br />'
												+ 	'dy: ' 	+ 	car1.dy 	+ 	'<br />'
												+ 	'rotation: ' 	+ 	car1.rotation 	+ 	'<br />'
												+ 	'mouseX: ' 	+ 	mouseX 	+ 	'<br />'
												+ 	'mouseY: ' 	+ 	mouseY 	+ 	'<br />';
												
												

})();



var mouseX;
var mouseY;
canvas.addEventListener('mousemove', function(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
});