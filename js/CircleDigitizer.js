export class CircleDigitizer {
	mouseXY;
	radius = 0;
	closesetBoxOutside = null;
	closesetBoxInside = null;
	innerCircleRadius = null;
	outerCircleRadius = null;
	toggledSquares = [];

	//Constructor calls sets the canvas and initializes the class
	constructor(squares, bPart_1, endPt) {
		this.squares = squares;
		this.endPoint = endPt;
		this.ctx = canvas.getContext('2d');
		this.bPart_1 = bPart_1;
	}

	//Resets all the variables when the grid is reset
	reset() {
		this.mouseXY = null;
		this.radius = 0;
		this.closesetBoxOutside = null;
		this.closesetBoxInside = null;
		this.innerCircleRadius = null;
		this.outerCircleRadius = null;
		this.toggledSquares = [];
		this.squares = [];
		this.endPoint = null;
		this.ctx = canvas.getContext('2d');
		this.bPart_1 = true;
		this.drawGrid();
		this.colorGrid();
	}

	//Creates the squares to be fit into the grid
	drawGrid() {
		let count = 1;
		for (let i = 20; i <= 400; i += 20) {
			for (let j = 20; j <= 400; j += 20) {
				if (!this.bPart_1) {
					this.squares[count] = {
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
					this.squares[count] = {
						x: i,
						y: j,
						width: 20,
						height: 20
					}
				}
				count++;
			}
		}
	}

	// Fills grid with squares and colors the grids
	colorGrid() {
		for (let i = 1; i < this.squares.length; i++) {

			if (this.bPart_1 && this.endPoint) {
				if (this.getBlueSquares(i)) {
					this.ctx.fillStyle = "blue";
				} else {
					this.ctx.fillStyle = "#D3D3D3";
				}
			} else if (!this.bPart_1 && this.toggledSquares.includes(this.squares[i])) {
				this.ctx.fillStyle = "blue";
			} else {
				this.ctx.fillStyle = "#D3D3D3";
			}
			this.ctx.fillRect(this.squares[i].x, this.squares[i].y, 10, 10);
		}
		if (this.endPoint) {
			this.drawRedCircles();
		}
	}

	//Sets the center of the circle for Part 1
    setCenter(eventX, eventY) {
		this.center = {
			x: eventX,
			y: eventY
		}
	}

	//Captures the x and y co-ordinates as the mouse moves
	setMovingMouse(eventX, eventY) {
		this.mouseXY = {
			x: eventX,
			y: eventY
		}
	}

	//Captures the end point when the mouse is released.
	setEndPoint(eventX, eventY) {
		this.endPoint = {
			x: eventX,
			y: eventY
		}
	}

	//Updating canvas with colors
	updateCanvas() {
		this.ctx.clearRect(0, 0, 430, 430);
		this.colorGrid();
	}


	// Sets the clicked square to the blue color
	getBlueSquare(coordinate) {
		for (let i = 1; i < this.squares.length; i++) {
			if (this.checkCollision(coordinate, this.squares[i])) {
				this.toggledSquares.push(this.squares[i]);
				this.updateCanvas();
			}
		}
	}

	// Generates the blue circle based on blue squares in Part 2
	generateCircle() {
		let center = this.getCenter();
		let distances = [];
		for (let i = 0; i < this.toggledSquares.length; i++) {
			distances.push(this.getDistance(this.toggledSquares[i], center));
		}
		let radius = this.getAverageDistance(distances);

		this.ctx.beginPath();
		this.ctx.strokeStyle = "blue";
		this.ctx.arc(center.x , center.y, radius, 0, 2 * Math.PI);
		this.ctx.stroke();
		return;
	}

	//Finds the angle between the points selected
	getAngle() {
		let angle = 0;
		if(this.toggledSquares.length < 2)
			return angle;
		for(var i = 0; i < this.toggledSquares.length - 1 ; ++i)
			angle += Math.atan2(this.toggledSquares[i+1].y - this.toggledSquares[i].y, this.toggledSquares[i+1].x - this.toggledSquares[i].x) * 180 / Math.PI;
		return angle/this.toggledSquares.length;
	}

	// Generates a red ellipse based on the points/squares selected
	generateEllipse() {
		let center = this.getCenter();
		let distances = [];
		for (let i = 0; i < this.toggledSquares.length; i++) {
			distances.push(this.getDistance(this.toggledSquares[i], center));
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

	// Checks if point selected is on the square or in the empty space
	checkCollision(point, square) {
		if (point.x < square.x + square.width &&
			point.x + point.width > square.x &&
			point.y < square.y + square.height &&
			point.y + point.height > square.y) {
			return true;
		}
	}


	// Returns the average center coordinate of the selected squares
	getCenter() {
		return {
			x: this.getAverageX(),
			y: this.getAverageY()
		}
	}


	// Gets the average X coordinates of blue squares
	getAverageX() {
		let sum = 0;
		for (let i = 0; i < this.toggledSquares.length; i++) {
			sum += this.toggledSquares[i].centerOfSquare.x;
		}
		return (sum / this.toggledSquares.length);
	}


	// Gets the average Y coordinates of blue squares
	getAverageY() {
		let sum = 0;
		for (let i = 0; i < this.toggledSquares.length; i++) {
			sum += this.toggledSquares[i].centerOfSquare.y;
		}
		return (sum / this.toggledSquares.length);
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
				if (!this.toggledSquares.includes(this.squares[index])) {
					this.toggledSquares.push(this.squares[index]);
				}
				return true;
			}
		}
		return false;
	}

	// Creates blue circle
	drawBlueCircle() {
		this.updateCanvas();
		if (this.endPoint) {
			this.radius = this.getDistance(this.center.x, this.center.y, this.endPoint.x, this.endPoint.y);
		} else {
			this.radius = this.getDistance(this.center.x, this.center.y, this.mouseXY.x, this.mouseXY.y);
		}

		this.ctx.beginPath();
		this.ctx.strokeStyle = "blue";
		this.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
		this.ctx.stroke();
		return;
	}


	// Creates red circles
	drawRedCircles() {

		this.outerCircleRadius = this.radius;
		this.innerCircleRadius = this.radius;
		let r1 = this.outsideCircle(this.outerCircleRadius);
		let r2 = this.insideCircle(this.innerCircleRadius);

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
		for (let i = 0; i < this.toggledSquares.length; i++) {
			for (let k = 0; k < 360; k += 5) {
				let point = this.getPoint(k * (Math.PI / 180), r);

				if (this.checkCollision(point, this.toggledSquares[i])) {
					this.outerCircleRadius += 1;
					return this.outsideCircle(this.outerCircleRadius);
				}
			}
		}
		return this.outerCircleRadius;
	}


	// Inner red circle
	insideCircle(r) {
		for (let i = 0; i < this.toggledSquares.length; i++) {
			for (let k = 0; k < 360; k += 5) {
				let point = this.getPoint(k * (Math.PI / 180), r);
				if (this.checkCollision(point, this.toggledSquares[i])) {
					this.innerCircleRadius -= 1;
					return this.insideCircle(this.innerCircleRadius);
				}
			}
		}
		return this.innerCircleRadius;
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
			if (this.closesetBoxInside === null || this.closesetBoxInside.distance < newDistance) {
				this.closesetBoxInside = {
					theSquare: this.squares[index],
					circlePoint: point,
					distance: newDistance
				}
			} else {
				if (this.closesetBoxOutside === null || this.closesetBoxOutside.distance < newDistance) {
					this.closesetBoxOutside = {
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