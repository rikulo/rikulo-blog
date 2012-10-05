Date: 2012-10-5
Title: Easing Function in Rikulo
Tags: rikulo, dart, effect, easing, motion
Author: Simon Pai
summary: <p>This blog post introduces the capability and usage of Rikulo EasingMotion.</p><img src="http://static.rikulo.org/blogs/tutorial/easing/easing-sample.png" class="center-blog-image" />

#A Demo

<p>
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/_common/view.css" />
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/tutorial/easing/effect-demo.css" />
<div id="v-main" class="center-blog-image" style="width:600px;height:600px"></div>
<script type="application/dart" src="http://static.rikulo.org/blogs/tutorial/easing/EasingDemo.dart"></script>
<script src="http://static.rikulo.org/blogs/_common/dart.js"></script>
</p>

Try different combinations of easing functions and actions.

The [source code](http://github.com/rikulo/rikulo/blob/master/example/effect/EasingDemo.dart) is also available.



#EasingMotion

Many of web prgrammers are familiar with the idea of easing function when working on visual effects. In Rikulo, we provided [EasingMotion](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/EasingMotion.dart) as a utility to easily construct easing-function-based effects and motions.

If you are not familiar with the idea, here is a quick explanation: Imagine we are going to implement a slide-down effect by iteratively setting the height of a DIV element from 0 to 100px. If the height increment is linear to elapsed time, the element will slide down linearly. (OK, this sounds like rubblish!)

<img src="http://static.rikulo.org/blogs/tutorial/easing/easing-01.png" class="center-blog-image" />

However, we can also plug in a function to map the input t to a different value. Say, if we map t to t^2, the element will slide down in a varying speed (in this case, like a free fall).

<img src="http://static.rikulo.org/blogs/tutorial/easing/easing-02.png" class="center-blog-image" />

In Rikulo code, this will be:

	::dart
	MotionAction action = (num x, MotionState state) {
		element.style.height = CSS.px((100 * x).toInt());
	};
	new EasingMotion(action, easing: (num t) => t * t).run();

You can specify the number of iterations and duration:

	::dart
	new EasingMotion(action, period: 2000 /* in millisecond */).run(); // runs for 2 sec
	new EasingMotion(action, repeat: 3).run(); // repeat 3 times
	new EasingMotion(action, repeat: -1).run(); // goes forever until explicitly stopped

At the start and the end of motion, you can provide callbacks:

	::dart
	new EasingMotion(action, start: (MotionState state) {
		// invoked when the motion starts
	}, end: (MotionState state) {
		// invoked when the motion ends
	}).run(); // runs for 2 sec

There are lifecycle managements:
	
	::dart
	EasingMotion motion = new EasingMotion(action); // some easing motion
	motion.run();
	if (motion.isRunning()) {
		motion.pause();
		motion.stop();
	}



#Easing Function Tips

Unlike jQuery, where you pass in easing function by name (as a string) and customize via plug-in, Rikulo allows you to work on the function directly. In our opinion, this is the right way to go, because the choice of easing function will often strongly affect user experience.

Here are some tips we would like to share:

* Good easing functions are often functions that resembles real-life physics. For instance, free fall, simple harmonic motion, bouncing, etc.
* On the other hand, the mathematical properties on an easing function will directly impact the user experience.
* For example, to make the motion smooth, avoid cusp in the easing function.
* In a bounced free-fall function, keep the gravity consistent.
* Effects regarding to change of color or opacity are rather insensitive to the choice of easing function. The linear function is usually good enough.

Here are some nice easing functions:

	::dart
	// free fall, gives a natural sense of gravity/attraction
	EasingFunction ef1 = (num t) => t * t;
	// simple harmonic motion, spring-like bouncing
	EasingFunction ef2 = (num t) => sin(t * PI * 2);
	// heart beat
	EasingFunction ef3 = (num t) =>  t < 0.3 ? (t * t / 0.09) : (1 - t) / 0.7;



#Conclusion

EasingMotion is one of our building blocks to conveniently cover visual effects in application, component, and view switching. There are also built-in effects coming with the Rikulo library. 
We will further introduce them in the following blog posts.


