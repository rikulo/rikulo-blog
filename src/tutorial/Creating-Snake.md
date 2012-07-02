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

First of all I started by modeling the different elements of the game:

* *Snake* - The actual snake, will require a body, direction and will be responsible for acting on turns
* *Food* - The food that the snake eats
* *SnakePoint* - A point on the canvas
* *SnakeEvironment* - The environment that the snake acts in
* *SnakeCanvas* - The main class which sets up the game

Let's take a look at these items individually.

##Snake and SnakePoint

As previously mentioned the Snake will be responsible for its own body and direction. First of all let's setup the snake body. 

First of all the body will be represented via a list of SnakePoints. The SnakePoint is very easy so we can include the entire code for the class here.

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

Finally we move onto looking at the way the Snake moves around the canvas using particular functions 
