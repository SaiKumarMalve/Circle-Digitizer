import {
	CircleDigitizer
} from "./CircleDigitizer.js";

// var parent = require("CircleDigitizer")
class Test extends CircleDigitizer {
	constructor(squares, endPt) {
		super(squares, endPt);
	}
}


window.onload = function () {
	let endPt = null;
	var obj = new Test([], true, endPt);

	obj.getSquares();
	obj.fillGrid();

	// When mouse is originally clicked
	canvas.onmousedown = function (e) {
		obj.reset();
		obj.updateCanvas();
		obj.setCenter(e.offsetX, e.offsetY);
		// When mouse is dragged
		this.onmousemove = function (e) {
			obj.setMovingMouse(e.offsetX, e.offsetY);
			obj.createBlueCircle()
		}
	}

	// When click is let go
	canvas.onmouseup = function (e) {
		obj.setEndPoint(e.offsetX, e.offsetY);
		obj.createBlueCircle();
	}

	document.getElementById("refresh").onclick = function () {
		location.reload();
	}
}