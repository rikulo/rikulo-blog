Date: 2012-8-10
Title: A Photo Album Prototype with Swipe Gesture
Tags: swipe, gesture, rikulo, dart
Author: Simon Pai
summary: <p>This blog post reveals a prototype implementation of photo album with swipe gesture.</p><img src="http://static.rikulo.org/blogs/tutorial/swipe-album/swipe-album-sample.png" class="center-blog-image" />

#The Plan

We are going to build an album-like demo as an application of the new SwipeGesture. If you are
a front end web developer, you should be familiar with the construction:

<img src="http://static.rikulo.org/blogs/tutorial/swipe-album/swipe-album-plan.png" class="center-blog-image" />

Then we are going to wire up a [SwipeGesture](http://github.com/rikulo/ui/blob/master/client/gesture/src/SwipeGesture.dart) and a Motion, so that the pictures will shift when they receive a swipe gesture.



#The Outcome

<p>
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/_common/view.css" />
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/tutorial/swipe-album/gesture-demo.css" />
<div id="v-main" class="center-blog-image" style="width:600px;height:600px"></div>
<script type="application/dart" src="http://static.rikulo.org/blogs/tutorial/swipe-album/AlbumDemo.dart"></script>
<script src="http://static.rikulo.org/blogs/_common/dart.js"></script>
</p>

Swipe to view next or previous photo.

* The pictures are distributed under Creative Commons license. 
* Original pictures came from [Kim Carpenter](http://www.flickr.com/photos/kim_carpenter_nj/), [sophie](http://www.flickr.com/photos/sophiea/), [Kate](http://www.flickr.com/photos/sparklykate/), [Chris. P](http://www.flickr.com/photos/chr1sp/), [Kabacchi](http://www.flickr.com/photos/kabacchi/).



#Layout and Responsive Design

We start by laying down the views:

	::dart
	final View frame = new View();
	frame.style.overflow = "hidden";
	frame.profile.location = "center center";
	// frame width/height = minimum of [window width] and [window height]
	
	final View frameInner = new View();
	// frameInner height = [frame height]
	// frameInner width = [frame width] * [photo count]
	// frameInner top = 0 (default)
	// frameInner left = - [photo index] * [frame width]
	frame.addChild(frameInner);
	
	for (int i = 0; i < photoCount; i++) {
		View photoBox = new View();
		// photoBox width/height = [frame width/height] - 50, capped at 500
		// photoBox top = an offset which makes it center-aligned to frame
		// photoBox left = [the offset] + [photo index] * [frame width/height]
		
		Image photo = new Image();
		photo.classes.add("photo");
		photo.profile.text = "location: top left; width: 100%; height: 100%";
		photo.src = "res/alpaca-0${i+1}.jpg";
		
		View mask = new View(); // to block browser's default image dragging
		mask.classes.add("photo-mask");
		mask.profile.text = "location: top left; width: 100%; height: 100%";
		
		photoBox.addChild(photo);
		photoBox.addChild(mask);
		frameInner.addChild(photoBox);
	}
	
	mainView.addChild(frame);

Note that the size settings of some views are purposely left out, as we are going to handle it directly within the layout callback, so they will be responsive automatically:

	::dart
	frame.on.preLayout.add((LayoutEvent event) {
		final Size msize = new DOMQuery(mainView).innerSize;
		frameSize = min(msize.width, msize.height);
		final int photoSize = min(frameSize - 50, 500);
		final int photoOffset = ((frameSize - photoSize) / 2).toInt();
		
		frame.width = frame.height = frameInner.height = frameSize;
		frameInner.width = frameSize * photoCount;
		frameInner.left = -_index * frameSize;
		
		for (int i = 0; i < photoCount; i++) {
			View photoBox = frameInner.children[i];
			photoBox.width = photoBox.height = photoSize;
			photoBox.left = photoOffset + i * frameSize;
			photoBox.top = photoOffset;
		}
	});



#Business Logic

Now we are going to write down the business logic:
	
	::dart
	int _index = 0;
	
	void next() => select(_index + 1);
	
	void previous() => select(_index - 1);
	
	void select(int index) {
		if (index < 0 || index >= photoCount) {
			// do nothing
			return;
		}
		// TODO: trigger an animation to shift the photos
	}



#Animation

The animation part is straightforward:

	::dart
	void select(int index) {
		if (index < 0 || index >= photoCount) {
			// do nothing
			return;
		}
		// trigger an animation to shift the photos
		final Offset origin = new Offset(-_index * frameSize, 0);
		final Offset dest = new Offset(-index * frameSize, 0);
		new LinearPathMotion(frameInner.node, origin, dest, end: (MotionState state) {
			_index = index;
		}, easing: (num x) => x * x);
	}



#Swipe Gesture

Here we are going to capture user's swipe gesture. 

	::dart
	new SwipeGesture(mainView.node, (SwipeGestureState state) {
		final int diff = state.delta.x;
		if (diff < -50) // swipe left
			next();
		else if (diff > 50) // swipe right
			previous();
    });

But wait! There is an issue with this implementation. Whenever there are multiple gestures/motions in the game, it is necessary to consider whether they will conflict each other. Generally there will be a priority, where one gesture/motion will block or interrupt another.

In the [previous example](http://blog.rikulo.org/posts/2012/Aug/Tutorial/building-a-grid-demo-using-rikulo/) we have shown how a gesture interrupts a motion. In this scenario, we are going to make the photo-shifting motion block the incoming swipe gesture:

	::dart
	SwipeGesture gesture;
	
	gesture = new SwipeGesture(mainView.node, (SwipeGestureState state) {
		gesture.disable();
		final int diff = state.delta.x;
		if (diff < -50) // swipe left
			next();
		else if (diff > 50) // swipe right
			previous();
		else
			gesture.enable();
    });
	
	void select(int index) {
		if (index < 0 || index >= photoCount) {
			gesture.enable();
			return;
		}
		final Offset origin = new Offset(-_index * frameSize, 0);
		final Offset dest = new Offset(-index * frameSize, 0);
		new LinearPathMotion(frameInner.node, origin, dest, end: (MotionState state) {
			_index = index;
			gesture.enable();
		}, easing: (num x) => x * x);
	}

The gestures come with enable/disable APIs, allowing us to easily turn it on and off.



#Conclusion

At the end we added a few more decorations to the demo to make it fancier. They are quite straightforward to figure out from the [source code](http://github.com/rikulo/ui/blob/master/samples/gesture/AlbumDemo.dart).


