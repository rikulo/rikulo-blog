Date: 2012-6-27
Title: Creating Snake
Tags: snake, game, core, dart
Author: Timothy Clare
Slug: A tutorial detailing how to create a snake game in Dart using Rikulo

#Introduction

This blog post details how to create a Snake game using Rikulo, Dart, HTML 5 and the Canvas.

#The Result
<iframe height="400px" width="572px" src="/files/tutorial/creating-snake/index.html" style="width:572px height:396px"></iframe> 

#Modeling the items

I started by modeling the different elements of the game, we are required to model the Snake, its environment and the food that it eats. If an item was complex I split it over a couple of classes. The file names should give you all a clue as to what elements are modeled within them, but just for completeness sake here is a list of files and what they represent.

* *Snake.dart* - The actual snake, will require a body, direction and will be responsible for acting on turns
* *Food.dart* - The food that the snake eats
* *SnakePoint.dart* - A point on the canvas
* *SnakeEvironment.dart* - The environment that the snake acts in
* *SnakeCanvas.dart* - The main class which sets up the game

I will walk you through the process of modeling these items in the game.

##Snake

As previously mentioned the Snake will be responsible for its own body and direction. First of all let's setup the snake body. The body will be represented via a list of SnakePoints. The SnakePoint is very easy so we can include the entire code for the class here.

	::dart
		class SnakePoint {
 			int x, y;
 		 
 			nakePoint(this.x, this.y);
 			
 			String toString() {
 				return "($x, $y)";
 			}
		}

As we can see the SnakePoint class is just used to represent a point and does nothing else. So the body representation of the snake in Snake.dart. The snippet below also includes methods for retrieving the Snake's length and head.


	::dart
		List<SnakePoint> body;

		int length() {
		  return body.length;
		}
		
		SnakePoint head() {
		  return body.last();
		}

The Snake also has a direction which is represented internally via an integer. The directions are also provided using static integer which represent the directions of the Snake. The following code snippet outlines the possible snake directions and the getter and setters.

	::dart
		static final int UP = -2, DOWN = 2, LEFT=-1, RIGHT=1;  
		int _direction;

		int get direction() => _direction;
		
		set direction(int value) {
		  if((_direction + value) != 0) {
		    _direction = value;
		  }
		}

In this case the setter for direction does not check whether the direction is one of UP, DOWN, LEFT or RIGHT. That is of course desired should a production quality game being created but for the purposes of our example we will leave it be. The set direction function prevents an opposite direction being set, so the Snake cannot be moving left and be made to move right. It does this by assigning absolute equal values to opposite directions, thus when _direction is added to the proposed value and the outcome is 0 then the direction is not set.

Finally we move onto looking to implement the actions of the snake, this is generally to move and to grow depending on whether the snake consumes the food or not. To implement these actions we create a function called act which takes the canvas rendering context and the location of the food, this function is responsible for movement and checking for growth, let's take a look at the function.


	::dart
		bool act(CanvasRenderingContext2D context, Food food) {
			
			if(initial) {
			  body.forEach((element) => drawSnake(context, element, null));
			  initial = false;
			  return false;
			}
			
			SnakePoint moveTo = nextMove();
			bool grow = (moveTo.x == food.x && 
			             moveTo.y == food.y);
			
			var removed = move(moveTo, grow);
			draw(context, removed);
			
			return grow;
		}

As shown in the function when the snake is initialized this function will draw the entire snake using the drawSnake method which we will talk after this section. The snake also looks at the next available move before moving to determine whether or not it will actually consume the food. Whether or not the snake will grow is stored in a boolean value and then passed to the move method to move the actual snake, the following shows this method.

	::dart
		SnakePoint move(SnakePoint to, bool grow) {
			var removed = null; 
			
			if(!grow) {
			  removed = body[0];
			  body.removeRange(0, 1);
			}
			body.add(to);
			
			return removed;
		}

In this method if the snake will not grow the last point of the body is removed and the new point where the snake moves to is added. However, if the snake will in fact grow then the last point is not removed, so in effect the snake grows by 1 square. The removed point is then returned from the function.

The snake, as all actors are in this simple example, is responsible for its own