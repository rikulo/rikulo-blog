Date: 2012-11-13
Title: Visual Effects in Rikulo
Tags: rikulo, dart, effect
Author: Simon Pai
summary: <p>With the power of Dart's class/closure fusion, visual effects in Rikulo are designed to be customizable to the finest details.</p><img src="http://static.rikulo.org/blogs/tutorial/effect/effect-sample.png" class="center-blog-image" />

<p>
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/tutorial/effect/view.css" />
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/tutorial/effect/effect-demo.css" />
</p>

Last time we talked about [EasingMotion](http://blog.rikulo.org/posts/2012/Oct/Tutorial/easing-function-in-rikulo/) in Rikulo. In this post, we are going to show you how to work on visual effects in Rikulo.

Many UI frameworks provide built-in effects to choose from, but few of them allow you to customize the effects to the finest details. In Rikulo, following the philosophy behind Motion, we let you do so, for Dart has a powerful class/closure fusion and a clear threading model, and we think users should be able to control visual effects to the maximal possible extent.

The effect infrastructure is designed to be loosely coupled with other parts of the view utilities, allowing you to do anything straightforward.

In the following sections, we are going to demonstrate how to use effects in your application.



#Effects for Showing/Hiding Views

// demo 1 (view)
<p>
<div id="v-main-view" class="center-blog-image" style="width:600px;height:600px"></div>
<script type="application/dart" src="http://static.rikulo.org/blogs/tutorial/effect/ViewEffectDemo2.dart"></script>
</p>

* You can read the [source code](http://github.com/rikulo/rikulo/blob/master/example/effect/ViewEffectDemo2.dart).

To add a view without effect is simple:

	::dart
	parent.addChild(view);

To add a view with an effect (say, fade-in) is not difficult either. Without the need of extending the old API, we shall do the following:

	::dart
	view.style.visibility = "hidden"; // add the view while invisible
	parent.addChild(view);
	new FadeInEffect(view.node).run();
	
[FadeInEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart) is a subclass of [EasingMotion](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/EasingMotion.dart), which iteratively assign CSS opacity to the element from 0 to 1 in a given period (default: 500 ms). Like other [EasingMotions](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/EasingMotion.dart), you can customize its running time, easing function, and pass in callback at the end of motion. For example,

	::dart
	view.style.visibility = "hidden"; // add the view while invisible
	parent.addChild(view);
	new FadeInEffect(view.node, end: (MotionState state) {
		// called when the effect ends
	}).run();

When you need to remove a view with an effect, do it reversely:

	::dart
	new FadeOutEffect(view.node, end: (MotionState state) {
		view.remove();
		view.style.visibility = ""; // change the visibility back after removal
    }).run();

Note that [FadeInEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart) is also a subclass of [ShowEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart), which assumes element's visibility to be "hidden" to start with, and will make the element visible during the effect. On the contrary, [FadeOutEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart), as a [HideEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart), assumes element to be visible at the beginning, and will turn it invisible at the end.

Rikulo supplies a few built-in effects: [FadeInEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart), [ZoomInEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart), [SlideInEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/SlideEffect.dart) for showing an element, and [FadeOutEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart), [ZoomOutEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart), [SlideOutEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/SlideEffect.dart) for hiding an element. However, you can always easily customize them, or design your own effects by subclassing [ShowEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart) and [HideEffect](http://github.com/rikulo/rikulo/blob/master/lib/src/effect/Effect.dart).



#Dialog Effects

// demo 2 (dialog/panel)
<p>
<div id="v-main-panel" class="center-blog-image" style="width:600px;height:600px"></div>
<script type="application/dart" src="http://static.rikulo.org/blogs/tutorial/effect/PanelEffectDemo.dart"></script>
</p>

* You can read the [source code](http://github.com/rikulo/rikulo/blob/master/example/effect/PanelEffectDemo.dart).

Effects for showing or hiding a dialog is similar, expect that there is an additional mask element to take care of.

	::dart
	dialog.style.visibility = "hidden";
	dialog.addToDocument(mode: "dialog");
	Element mask = dialog.maskNode; 
	// mask will inherit dialog's visibility, which allows you to control its effect
	new EasingMotion.join([new ZoomInEffect(dialog.node), new FadeInEffect(mask)]).run();

* Joint EasingMotion takes multiple EasingMotion and combines their actions. It has it's own period length and easing function.



#View Switching Effects

// demo 3 (switch)
<p>
<div id="v-main-switch" class="center-blog-image" style="width:600px;height:600px;overflow:hidden"></div>
<script type="application/dart" src="http://static.rikulo.org/blogs/tutorial/effect/SwitchViewEffectDemo2.dart"></script>
</p>

Here goes some slightly advanced effect applications. In the demo above, we switch two views with visual effects by 

* Add a second view to the document with hidden visibility
* Apply the effect on both views together
* Remove the first view

Feel free to take a glance at the [source code](http://github.com/rikulo/rikulo/blob/master/example/effect/SwitchViewEffectDemo2.dart) to get more details.

<p>
<script src="http://static.rikulo.org/blogs/tutorial/effect/dart.js"></script>
</p>



#Conclusion

We believe visualization is an important part in the application that you don't want to compromise. With the effect infrastructure of Rikulo, you can achieve almost every kind of effect you want. 

In the next post, we are going to talk about MVC and [UXL](http://docs.rikulo.org/rikulo/latest/UXL/Fundamentals/UXL_Overview.html) (User-interface eXtensible language) in Rikulo, with an implementation of [todoMVC](http://github.com/addyosmani/todomvc).


