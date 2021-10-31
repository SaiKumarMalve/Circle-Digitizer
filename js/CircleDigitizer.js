export class CircleDigitizer {
	movingMouse;
	radius = 0;
	furthestOutsideBlue = null;
	furthestInsideBlue = null;
	smallRedRadius = null;
	largeRedRadius = null;
	blueSquares = [];

	constructor(squares, bPart_1, endPt) {
		this.squares = squares;
		this.endPt = endPt;
		this.ctx = canvas.getContext('2d');
		this.bPart_1 = bPart_1;
	}

	reset() {
		this.movingMouse = null;
		this.radius = 0;
		this.furthestOutsideBlue = null;
		this.furthestInsideBlue = null;
		this.smallRedRadius = null;
		this.largeRedRadius = null;
		this.blueSquares = [];
		this.squares = [];
		this.endPt = null;
		this.ctx = canvas.getContext('2d');
		this.bPart_1 = true;
		this.drawGrid();
		this.colorGrid();
	}

	drawGrid() {
		let counter = 1;
		for (let i = 20; i <= 400; i += 20) {
			for (let j = 20; j <= 400; j += 20) {
				if (!this.bPart_1) {
					this.squares[counter] = {
						x: i,
						y: j,
						width: 20,
						height: 20,
						centerOfSquare: {
							x: i + 10,
							y: j + 10
						}
					}
				} else {
					this.squares[counter] = {
						x: i,
						y: j,
						width: 20,
						height: 20
					}
				}
				counter++;
			}
		}
	}

	// Fills grid with squares
	colorGrid() {
		for (let i = 1; i < this.squares.length; i++) {

			if (this.bPart_1 && this.endPt) {
				if (this.getBlueSquares(i)) {
					this.ctx.fillStyle = "blue";
				} else {
					this.ctx.fillStyle = "#D3D3D3";
				}
			} else if (!this.bPart_1 && this.blueSquares.includes(this.squares[i])) {
				this.ctx.fillStyle = "blue";
			} else {
				this.ctx.fillStyle = "#D3D3D3";
			}
			this.ctx.fillRect(this.squares[i].x, this.squares[i].y, 10, 10);
		}
		if (this.endPt) {
			this.drawRedCircles();
		}
	}

    setCenter(eventX, eventY) {
		this.center = {
			x: eventX,
			y: eventY
		}
	}

	setMovingMouse(eventX, eventY) {
		this.movingMouse = {
			x: eventX,
			y: eventY
		}
	}

	setEndPoint(eventX, eventY) {
		this.endPt = {
			x: eventX,
			y: eventY
		}
	}

	//Updating canvas 
	updateCanvas() {
		this.ctx.clearRect(0, 0, 430, 430);
		this.colorGrid();
	}


	// Finds squares selected and saves in blueSquares array
	getBlueSquare(coordinate) {
		for (let i = 1; i < this.squares.length; i++) {
			if (this.checkCollision(coordinate, this.squares[i])) {
				this.blueSquares.push(this.squares[i]);
				this.updateCanvas();
			}
		}
	}
	// Generates blue circle based on blue squares
	generateCircle() {
		let center = this.getCenter();
		let distances = [];
		for (let i = 0; i < this.blueSquares.length; i++) {
			distances.push(this.getDistance(this.blueSquares[i], center));
		}
		let radius = this.getAverageDistance(distances);

		this.ctx.beginPath();
		this.ctx.strokeStyle = "blue";
		this.ctx.arc(center.x , center.y, radius, 0, 2 * Math.PI);
		this.ctx.stroke();
		return;
	}

	getAngle() {
		let angle = 0;
		if(this.blueSquares.length < 2)
			return angle;
		for(var i = 0; i < this.blueSquares.length - 1 ; ++i)
			angle += Math.atan2(this.blueSquares[i+1].y - this.blueSquares[i].y, this.blueSquares[i+1].x - this.blueSquares[i].x) * 180 / Math.PI;
		return angle/this.blueSquares.length;
	}
	// Generates blue circle based on blue squares
	generateEllipse() {
		let center = this.getCenter();
		let distances = [];
		for (let i = 0; i < this.blueSquares.length; i++) {
			distances.push(this.getDistance(this.blueSquares[i], center));
		}
		let radius = this.getAverageDistance(distances);

		let A = {
			x: center.x,
			y: center.y - radius
		}
		let B = {
			x: center.x,
			y: center.y + radius
		}
		let longSide = (Math.sqrt((A.y - B.y) * (A.y - B.y) + (B.x - A.x) * (B.x - A.x)));

        let angle = this.getAngle();
		this.ctx.beginPath();
		this.ctx.strokeStyle = "red";
		this.ctx.ellipse(center.x, center.y, longSide, radius, angle, 0, 2 * Math.PI);
		this.ctx.stroke();
		return;
	}

	// Checks if point selected is on square
	checkCollision(point, square) {
		if (point.x < square.x + square.width &&
			point.x + point.width > square.x &&
			point.y < square.y + square.height &&
			point.y + point.height > square.y) {
			return true;
		}
	}


	// Returns the average center coordinate of blue squares
	getCenter() {
		return {
			x: this.getAverageX(),
			y: this.getAverageY()
		}
	}


	// Gets the average X coordinates of blue squares
	getAverageX() {
		let sum = 0;
		for (let i = 0; i < this.blueSquares.length; i++) {
			sum += this.blueSquares[i].centerOfSquare.x;
		}
		return (sum / this.blueSquares.length);
	}


	// Gets the average Y coordinates of blue squares
	getAverageY() {
		let sum = 0;
		for (let i = 0; i < this.blueSquares.length; i++) {
			sum += this.blueSquares[i].centerOfSquare.y;
		}
		return (sum / this.blueSquares.length);
	}


	// Returns the distance between two points
	getDistance(x1, y1, x2, y2) {
		if (x2 != null)
			return Math.hypot(x1 - x2, y1 - y2);
		else
			return Math.hypot(x1.centerOfSquare.x - y1.x, x1.centerOfSquare.y - y1.y);
	}


	// Average distance between the center and the blue squares
	getAverageDistance(distances) {
		let sum = 0;
		for (let i = 0; i < distances.length; i++) {
			sum += distances[i];
		}
		return (sum / distances.length);
	}

	// Checks if square is close enough to the circle to be colored blue
	getBlueSquares(index) {
		let point;
		for (let k = 0; k < 360; k += 5) {
			point = this.getPoint(k * (Math.PI / 180), this.radius);
			if (this.checkCollision(point, this.squares[index])) {
				this.getFurthest(index, point);
				if (!this.blueSquares.includes(this.squares[index])) {
					this.blueSquares.push(this.squares[index]);
				}
				return true;
			}
		}
		return false;
	}

	// Creates blue circle
	drawBlueCircle() {
		this.updateCanvas();
		if (this.endPt) {
			this.radius = this.getDistance(this.center.x, this.center.y, this.endPt.x, this.endPt.y);
		} else {
			this.radius = this.getDistance(this.center.x, this.center.y, this.movingMouse.x, this.movingMouse.y);
		}

		this.ctx.beginPath();
		this.ctx.strokeStyle = "blue";
		this.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
		this.ctx.stroke();
		return;
	}


	// Creates red circles
	drawRedCircles() {

		this.largeRedRadius = this.radius;
		this.smallRedRadius = this.radius;
		let r1 = this.outsideCircle(this.largeRedRadius);
		let r2 = this.insideCircle(this.smallRedRadius);

		if (r1 <= 0 || r2 <= 0) {
			location.reload();
			return;
		}

		this.ctx.beginPath();
		this.ctx.strokeStyle = "red";
		this.ctx.arc(this.center.x, this.center.y, r1, 0, 2 * Math.PI);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.strokeStyle = "red";
		this.ctx.arc(this.center.x, this.center.y, r2, 0, 2 * Math.PI);
		this.ctx.stroke();

		return;
	}


	// Outter red circle
	outsideCircle(r) {
		for (let i = 0; i < this.blueSquares.length; i++) {
			for (let k = 0; k < 360; k += 5) {
				let point = this.getPoint(k * (Math.PI / 180), r);

				if (this.checkCollision(point, this.blueSquares[i])) {
					this.largeRedRadius += 1;
					return this.outsideCircle(this.largeRedRadius);
				}
			}
		}
		return this.largeRedRadius;
	}


	// Inner red circle
	insideCircle(r) {
		for (let i = 0; i < this.blueSquares.length; i++) {
			for (let k = 0; k < 360; k += 5) {
				let point = this.getPoint(k * (Math.PI / 180), r);
				if (this.checkCollision(point, this.blueSquares[i])) {
					this.smallRedRadius -= 1;
					return this.insideCircle(this.smallRedRadius);
				}
			}
		}
		return this.smallRedRadius;
	}

	// Gets the coordinate of point on circle
	getPoint(angle, r) {
		return {
			x: this.center.x + (Math.cos(angle) * r),
			y: this.center.y + (Math.sin(angle) * r),
			width: 1,
			height: 1
		}
	}


	// Find the blue squares with the furthest distance inside and outside of circle
	getFurthest(index, point) {

		let newDistance = this.getDistance(point.x, point.y, this.squares[index].x, this.squares[index].y);
		if (this.isInsideCircle(index)) {
			if (this.furthestInsideBlue === null || this.furthestInsideBlue.distance < newDistance) {
				this.furthestInsideBlue = {
					theSquare: this.squares[index],
					circlePoint: point,
					distance: newDistance
				}
			} else {
				if (this.furthestOutsideBlue === null || this.furthestOutsideBlue.distance < newDistance) {
					this.furthestOutsideBlue = {
						theSquare: this.squares[index],
						circlePoint: point,
						distance: newDistance
					}
				}
			}
		}
	}


	// Checks if square is inside the circle
	isInsideCircle(index) {
		let centerOfSquareX = this.squares[index].x + 10;
		let centerOfSquareY = this.squares[index].y + 10;
		let formula = ((centerOfSquareX - this.center.x) * (centerOfSquareX - this.center.x)) + ((centerOfSquareY - this.center.y) * (centerOfSquareY - this.center.y));
		if (Math.sqrt(formula) < this.radius) {
			return true;
		}
		return false;
	}
}

export default CircleDigitizer