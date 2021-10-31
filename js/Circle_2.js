import {
	CircleDigitizer
} from "./CircleDigitizer.js";

// var parent = require("CircleDigitizer")
class Part2 extends CircleDigitizer {
	constructor(squares, bPart_1) {
		super(squares, false);
	}
}


window.onload = function () {
	var obj = new Part2([]);
	let clickedCoordinate = null;

	obj.drawGrid();
	obj.colorGrid();

	canvas.onmousedown = function (e) {
		obj.updateCanvas();
		clickedCoordinate = {
			x: e.offsetX,
			y: e.offsetY,
			width: 1,
			height: 1
		}
		obj.getBlueSquare(clickedCoordinate);
	}

	document.getElementById("generateCircle").onclick = function () {
		obj.generateCircle();
	}

	document.getElementById("generateEllipse").onclick = function () {
		obj.generateEllipse();
	}

	document.getElementById("refresh").onclick = function () {
		location.reload();
	}
}