import {
	CircleDigitizer
} from "./CircleDigitizer.js";

// var parent = require("CircleDigitizer")
class Part1 extends CircleDigitizer {
	constructor(squares, endPt) {
		super(squares, endPt);
	}
}


window.onload = function () {
	let endPt = null;
	var obj = new Part1([], true, endPt);

	obj.drawGrid();
	obj.colorGrid();

	// When mouse is originally clicked
	canvas.onmousedown = function (e) {
		obj.reset();
		obj.updateCanvas();
		obj.setCenter(e.offsetX, e.offsetY);
		// When mouse is dragged
		this.onmousemove = function (e) {
			obj.setMovingMouse(e.offsetX, e.offsetY);
			obj.drawBlueCircle()
		}
	}

	// When click is let go
	canvas.onmouseup = function (e) {
		obj.setEndPoint(e.offsetX, e.offsetY);
		obj.drawBlueCircle();
	}

	document.getElementById("refresh").onclick = function () {
		location.reload();
	}
}