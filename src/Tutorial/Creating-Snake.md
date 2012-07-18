Date: 2012-7-9
Title: Creating a Snake game using Rikulo, HTML 5 and the canvas
Tags: snake, game, core, dart
Author: Timothy Clare
summary: <p>This blog post details how to create a Snake game using Rikulo, Dart, HTML 5 and the Canvas. The final game serves as a sample of how to use Rikulo along with Dart</p><p>The image below is a screenshot of the example game</p><img src="http://blog.rikulo.org/static/files/tutorial/creating-snake/snake-example.png" class="center-blog-image" />

#Introduction

This blog post details how to create a Snake style game using Rikulo, Dart, HTML 5 and the Canvas. The final game serves as a sample of how to use Rikulo along with Dart.

#The Result

<p>
<link rel="stylesheet" type="text/css" href="/files/tutorial/creating-snake/view.css" />
<div id="v-main" class="center-blog-image" style="width:572px;height:396px"></div>
<script type="application/dart" src="/files/tutorial/creating-snake/SnakeCanvas.dart"></script>
<script src="/files/tutorial/creating-snake/dart.js"></script>
</p>

To control the Snake try using the arrow keys or using a mouse on a computer or finger to swipe on a tablet or phone.

#Modeling the items

I started by modeling the different elements of the game, we are required to model the Snake, its environment and the food that it eats. If an item was complex I split it over a couple of classes. The file names should give you all a clue as to what elements are modeled within them, but just for completeness sake here is a list of files and what they represent.

* *Snake.dart* - The actual snake, will require a body, direction and will be responsible for acting on turns
* *Food.dart* - The food that the snake eats
* *SnakePoint.dart* - A point on the canvas
* *SnakeEvironment.dart* - The environment that the snake acts in
* *SnakeCanvas.dart* - The main class which sets up the game

I will walk you through the process of modeling the Snake and Food.

##Snake

As previously mentioned the Snake will be responsible for its own body and direction. First of all let's setup the snake body. The body will be represented via a list of SnakePoints. The SnakePoint is very easy so we can include the entire code for the class here.

	::dart
	class SnakePoint {
 		int x, y;
 	 
 		SnakePoint(this.x, this.y);
 		
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

The snake, as all actors are in this simple example, is responsible for its own drawing. Drawing the shape of the Snake is a reasonably simple affrair, let's take a look at the code.

	::dart
	void draw(CanvasRenderingContext2D context, SnakePoint removed) {    
		drawSnake(context, body.last(), removed);
	}

	void drawSnake(CanvasRenderingContext2D context, SnakePoint point, SnakePoint removed) {
		context.beginPath();
		context.fillStyle = "black";
		
		num adjustment = SnakeEnvironment.adjustment;
		
		if(removed != null) {
			context.clearRect(removed.x, removed.y, adjustment, adjustment);
		}
		
		int width = SnakeEnvironment.adjustment;
		int height = SnakeEnvironment.adjustment;
		int radius = SnakeEnvironment.adjustment / 3;
		
		context.beginPath();
		context.moveTo(point.x + radius, point.y);
		context.lineTo(point.x + width - radius, point.y);
		context.quadraticCurveTo(point.x + width, point.y, point.x + width, 
								 point.y + radius);
		context.lineTo(point.x + width, point.y + height - radius);
		context.quadraticCurveTo(point.x + width, point.y + height, 
								 point.x + width - radius, point.y + height);
		context.lineTo(point.x + radius, point.y + height);
		context.quadraticCurveTo(point.x, point.y + height, point.x, 
								 point.y + height - radius);
		context.lineTo(point.x, point.y + radius);
		context.quadraticCurveTo(point.x, point.y, point.x + radius, point.y);
		context.closePath();
		context.fill();
	}

This code will draw one point of the snake and remove one point of the snake. The new point is the new head of the snake to simulate mvoement and the point removed is the last point of the snake, unless it grows. The quadraticCurveTo and lineTo function calls will paint a rounded rectangle. If a rounded rectangle is not required it is of course possible to just replace this with a context.rect function call which would simplify the code a lot.

##Food

The food is the easy part as it just consists of 3 functions, relocate, draw and the constructor. In addition to that there are two properties, one for x and one for y which hold the location of the food.

Let's start with the relocate method:

	::dart
	void relocate(List<SnakePoint> avoid) {
	    
		double suggestedX = Math.random()*((snakeEnvironment.width / SnakeEnvironment.adjustment) - 1);
		double suggestedY = Math.random()*((snakeEnvironment.height / SnakeEnvironment.adjustment) - 1);
		    
		suggestedX = suggestedX.floor() * SnakeEnvironment.adjustment;
		suggestedY = suggestedY.floor() * SnakeEnvironment.adjustment;
		    
		bool has = false;
		    
		for(final point in avoid) {
			if(suggestedX == point.x && suggestedY == point.y) { 
				has=true;
				break;
			}
		}
		    
		if(has)
			relocate(avoid);
		else {
			x = suggestedX.toInt();
			y = suggestedY.toInt();
		}
	}

The above relocate function takes a list of points to avoid (in this case the Snake's location) and then locates a point on the grid where the food can be painted. The algorithm is a very simple implementation and no doubt can be improved. The last function is the draw function which is self explanatory. It will draw an old style Snake food item which consists of 4 small rectangles within a small area.

	::dart
	void draw(CanvasRenderingContext2D context) {
		    
		double smallSquareWidthAndHeight = SnakeEnvironment.adjustment / 3;
		    
		context.beginPath();
		context.fillStyle = "black";
		
		//first rectangle, top row
		context.rect(_x + smallSquareWidthAndHeight, _y, smallSquareWidthAndHeight, smallSquareWidthAndHeight);
		
		//two rectangles second row
		context.rect(_x, _y + smallSquareWidthAndHeight, smallSquareWidthAndHeight, smallSquareWidthAndHeight);
		context.rect(_x + (smallSquareWidthAndHeight * 2), _y + smallSquareWidthAndHeight, smallSquareWidthAndHeight, smallSquareWidthAndHeight);
		
		//bottom row rectangle
		context.rect(_x + smallSquareWidthAndHeight, _y + (smallSquareWidthAndHeight * 2), smallSquareWidthAndHeight, smallSquareWidthAndHeight);
		
		context.closePath();
		context.fill();
	}	

Having walked through individual classes it is time to discuss how the environment and gaming loop were implemented, the following section introduces these concepts.

#The environment, game loop, UI and controls

These are 3 pretty large topics, however, first of all let's take a look at how the environment is setup. 

##The environment

In our class the canvas is initialized in the SnakeCanvas.dart class which is the main class for the UI and the game loop. First of all let's walk through the SnakeEnvironment class which initializes all of the objects within the game and determines whether the gamer scored, continues or loses.

	::dart
	class SnakeEnvironment {
	  
		static final int SCORED=0, GAMEOVER=1, CONTINUE=2;
		static final num adjustment = 10;
		  
		num height,width;
		Snake snake;
		Food food;
		  
		SnakeEnvironment(this.height, this.width) {
		    
			if((this.height % adjustment != 0) ||
			(this.width % adjustment != 0)) {
				throw new IllegalArgumentException("Height & Width must be divisible by the adjustment (${adjustment}) without a remainder");
			}
			    
			snake = new Snake(this);
			food = new Food(this);
			    
			food.relocate(snake.body);
		}
		  
		int draw(CanvasRenderingContext2D context) {
			food.draw(context);
			bool grown = snake.act(context, food);
			    
			var head = snake.head();
			if((head.x >= width || head.x < 0)
			|| (head.y >= height || head.y < 0)) {
				return GAMEOVER;
			}
			    
			if(grown) {
				food.relocate(snake.body);
				return SCORED;
			}
			    
			return CONTINUE;
		}
	}

The SnakeEnvironment is pretty simple, it accepts a height & width and if the height and width are not divisible by the scale factor without a remainder it will throw an error. This is only to keep x, y co-ordinates integers throughout the application for simplicity's sake. The Snake & Food are then initialized and food is relocated depending on the Snakes body.

The draw method is a bit different as it returns an integer, we could have kept it void and wrapped it with another function which returns an integer to signify the status of the game, whether to continue, whether it is gameover or whether the snake scored. 

That pretty much wraps up the SnakeEnvironment, it is time to discuss how the game loop is implemented.

##Game Loop

Now under normal circumstances it is better to separate the UI loop from the actual game loop. In the future I will look into doing this with an Isolate. However, for the purposes of simplicity in this example the game loop is also responsible for the painting the items onto the canvas.

The game loop is activated in the SnakeCanvas class by creating a Rikulo Animator object.

	::dart
	new Animator().add((int time, int elapsed) {
      int timeSinceCycle = time - lastCycle;
      bool ret = true;
      
      if(timeSinceCycle > UPDATE) {
        int message = environment.draw(ctx2d);
        
        switch(message) {
          case SnakeEnvironment.GAMEOVER:
            ret = false;
            window.alert('GAME OVER!! Your score was ${score}');
            break;
          case SnakeEnvironment.SCORED:
            score += 1;
            break;
        }
        
        lastCycle = time;
      }
      
      return ret;
    });

The Animator is used to create the game loop by checking whether the current time subtracted from the last update time is greater than the update period. Currently the update period (contained in the variable UPDATE) is set at 100ms. If the the time since the last cycle is greater than 100ms then the SnakeEnvironment's draw method is called which creates a cascading effect on the canvas and what needs to be redrawn is redrawn.

The returned value from the draw method is then checked and if it is game over the loop is stopped and the score is shown. On the other hand if the player scored then the score is incremented. The game loop is very simple indeed and just continues until the player loses.

Let's now look at how the UI and control elements were implemented.

##UI and controls

To build the UI with Rikulo is very easy to do. In our case we want a background so we will create a view to hold that, then we will require a new View to hold both the canvas and score positioning the score underneath the canvas. Here is the code to do this which is contained in the onCreate method.

	::dart
	View div = new View();
    div.style.backgroundImage = "url('./res/snake_bg.png')";
    div.profile.width = "flex";
    div.profile.height = "flex";

    //first vlayout
    View vlayout = new View();
    vlayout.layout.type = "linear";
    vlayout.layout.orient = "vertical";
    vlayout.profile.width = "flex";
    vlayout.profile.height = "flex";    
    vlayout.top = 60;
    vlayout.left = 80;
    
    //canvas
    canvas = new Canvas();
    canvas.profile.text = "width: ${width}; height: ${height}";
    canvas.style.border = "1px solid black";
    vlayout.addChild(canvas);

    scoreBar = new TextView("Your score is: ${score}");
    scoreBar.profile.width = "flex";
    scoreBar.profile.height = "30";
    vlayout.addChild(scoreBar);
    
    div.addChild(vlayout);
    mainView.addChild(div);

The code above demonstrates how the views are combined to create the layout. The View with the background is named div and created first, then a view which arranges its children vertically is created. Then the Canvas and a TextView is added to the vlayout view to complete the cycle.

This is how simple is it to create the view you see at the top in Rikulo.

The controls are also equally easy to implement, there are two sets of controls, one for tablets & smartphones and the other for a keyboard, the next two sections outline these controls.

###Keyboard

For the keyboard we would like to use the arrow keys to set the direction of the snake, this is easily done using the onKeyDown function provided by Dart.

	::dart
	void onKeyDown(KeyboardEvent event) {
		if(event.keyCode == 37)
			environment.snake.direction = Snake.LEFT;
		else if(event.keyCode == 39)
			environment.snake.direction = Snake.RIGHT;
		else if(event.keyCode == 38)
			environment.snake.direction = Snake.UP;
		else if(event.keyCode == 40)
			environment.snake.direction = Snake.DOWN;
	}

As you can see the code is in fact very very simple and upon keypress will just access the snake and then set its direction.

###Tablets & Smartphones

For tablets and Smartphones we would like to be able to change the movement of the snake using DragGestures. Rikulo makes this easy by providing a class, to create the class you are required to pass it the node you want the gesture to apply to and optionally functions which correspond to start, moving and end. The following demonstrates how the class was created.

	::dart
	new DragGesture(this.canvas.node, moving: _gestureMove(), end: _gestureEnd());

As you can see above we pass the class two methods, _gestureMove() which is the callback function while moving and _gestureEnd() which is the callback function when the gesture has ended, the functions are as follows.

	::dart
	DragGestureMove _gestureMove() {
		return (DragGestureState state) {
			
			final int MINIMUM_DRAG_LENGTH = 5;
			
			if(state.delta.x.abs() > state.delta.y.abs() && 
			state.delta.x.abs() > MINIMUM_DRAG_LENGTH) {
				//horizontal swipe
				state.delta.x > 0 ? 
				environment.snake.direction = Snake.RIGHT :
				environment.snake.direction = Snake.LEFT;
			} else if(state.delta.y.abs() > MINIMUM_DRAG_LENGTH) {
				//vertical swipe
				state.delta.y > 0 ?
				environment.snake.direction = Snake.DOWN :
				environment.snake.direction = Snake.UP;
			}
			
			return true;
		};
	}
	
	DragGestureMove _gestureEnd() {
		return (DragGestureState state) {
			return true;
		};
	}

The _gestureMove() function returns the callback method and it is easy to see what it does. The functions checks to see whether the movement is longer than the minimum drag length and if it is then it checks the direction of the movement and sets the snake's direction according. Very simple but very effective.

#Conclusion

That is really all there is to the snake example. It is important to remember that it is just an example and there is of course major room for improvement both architecturally and feature wise. For example we can attempt to split the game loop from the UI loop and when the snake crossed its own path it will die. However, for the scope of a tutorial this is beyond what I would like to show for now. 

If you have any feedback please let me know. In addition if you would like to improve the game, maybe implementing a few of the ideas suggested in the above paragraph please go ahead and do so.


	
