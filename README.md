# Neocis Software Assesment

[Click here to check out the demo!](https://skmalve.github.io/Neocis/)

-----

## Part 1

A program capable of digitizing circles.

The program loads a 20*20 grid of gray squares. The user can click any where in the grid, that would be the center of the circle and as the user drags with mouse
down the radius of the circle is calculated and a blue circle is drawn, which updates as the mouse is dragged. Once the mouse is released, two more circles are drawn one inside and one outside the blue circle with the largest and smallest possible radius of the blue points.

The button ("Reset Grid") resets the grid to the initial state.

### Algoritm

drawGrid()
1. Rows = 20
2. Columns = 20
3. for each Row in Rows
4. for each Column in Columns
5. Draw a Sqaure and store the points in Squares
6. end
7. end

colorGrid()
1. for each Square in Squares
2.  If Square is not selected then fill the Square color Gray
3.  Else fill the Square color Blue

drawBlueCircle()
1. CurrentPoint <- Point the cursor is at
2. Radius <- Distance from Center(first point) to the CurrentPoint
3. Set Stroke Color to Blue
4. DrawCircle with Center, first point, and Radius.

drawRedCircles()
1. OuterRadius <- Radius + 1
2. InnerRadius <- Radius - 1
3. Set Stroke Color to Red
4. DrawCircle with Center, first point, and OuterRadius.
4. DrawCircle with Center, first point, and InnerRadius.

reset()
1. Reset all the variables and objects
2. drawGrid()
3. colorGrid()

-----

## Part 2

A program that allows the user to choose points on the grid and when the user clicks "Generate Circle", a circle is generated that best fits the points chosen. When the user clicks "Generate Ellipse", an ellipse is generated that best fits the points chosen.

Reused the algorithms from Part 1 to create the Grid and to color the Grid

### Algorithm 
getCenter(Points)
1. Center <- The point of convergance of all the selected points
2. Center.X-Coordinate <- Average of all x coordinates of the points
3. Center.Y-Coordinate <- Average of all y coordinates of the points

getRadius(Points)
1. Radius <- The average of distances of all the points from the center

generateCircle()
1. getCenter(Points)
2. getRadius()
3. DrawCircle with Center and Radius.

generateEllipse()
1. getCenter(Points)
2. getRadius()
3. Point A <- Radius distance away from center
4. Point B <- Radius distance away from center exactly on the opposite end of Point A
5. LongRadius <- Using Pythogorean theorem to find the long radius
6. Angle <- Finding the average of angles between all the points chosen
7. Set Stroke Color to Red
8. DrawEllipse with Center, Radius(As short radius), LongRadius, Angle


-----

### Created by Sai Kumar Malve
