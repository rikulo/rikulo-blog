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

As previously mentioned the Snake will be responsible for its own body and direction. Let's first set this up. First of all the body will be represented via a list of SnakePoints. The SnakePoint is very easy so we can include the entire code for the class here.

	::dart
		class SnakePoint {
 			int x, y;
 		 
 			nakePoint(this.x, this.y);
 			
 			String toString() {
 				return "($x, $y)";
 			}
		}

As we can see the SnakePoint class is just used to represent a point and does nothing else. So the body representation of the snake in Snake.dart will look like this:


	::dart
		List<SnakePoint> body;

This will store a list of SnakePoints which represent the body of the Snake. 

