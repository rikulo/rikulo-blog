Date: 2012-8-28
Title: A Rotatable Map Prototype
Tags: zoom, gesture, rikulo, dart
Author: Simon Pai
summary: <p>This image tricks your eyes, but you don't really need to worry about it. Anyway, this blog post demonstrates a rotatable map prototype.</p><br/><img src="http://static.rikulo.org/blogs/tutorial/zoom-map/zoom-map-sample.png" class="center-blog-image" />

#A Rotatable Map

This is going to be a very simple demo. Have you tried Google Maps on a touch device? Have you ever wondered what if Google Maps is rotatable by two fingers? This will be the demo that realizes the imagination. 



#The Outcome

<p>
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/_common/view.css" />
<div id="v-main" class="center-blog-image" style="width:600px;height:600px"></div>
<script type="application/dart" src="http://static.rikulo.org/blogs/tutorial/zoom-map/MapDemo.dart"></script>
<script src="http://static.rikulo.org/blogs/_common/dart.js"></script>
</p>

* You will need to play on a touch device to explore the full functionality of this demo.
* Pinching the image with two fingers results in free scaling, rotating, and moving.
* The picture is distributed under Creative Commons license. It came from [Norman B. Leventhal Map Center at the BPL](http://www.flickr.com/photos/normanbleventhalmapcenter/2675391188/).



#The Idea

The idea is straightforward: we use the information from a [ZoomGesture](http://github.com/rikulo/ui/blob/master/client/gesture/src/ZoomGesture.dart) to determine a CSS transformation to apply to the photo image element. The transformation must satisfy the following properties:

* It has to be linear and angle preserving. (i.e. no stretch/skew)
* It should map the initial touch positions to the current touch positions, respectively. (i.e. say, on a real map, if you touch London and Paris and move your fingers, they should be always on London and Paris.)

The two properties above has uniquely and naturally defined the transformation from the gesture. In fact, this transformation is exactly how ZoomGesture is interpreted in Rikulo. 



#ZoomGesture

In Rikulo, ZoomGesture is all about how two fingers move and what they represent, in terms of scale, rotation, and transition. 

Anytime during a ZoomGesture, the following raw information are supplied:

	::dart
	int startTime = state.startTime; // the initial timestamp of gesture;
	int time = state.time; // the current timestamp of gesture;
	Offset[] spos = state.startPositions; // the initial touch positions
	Offset[] cpos = state.positions; // the current touch positions

<img src="http://static.rikulo.org/blogs/tutorial/zoom-map/zoom-map-01.png" class="center-blog-image" />

From the initial and current positions, it further derives the following values:

	::dart
	num scalar = state.scalar; // scalar change of distance between touch points
	num angle = state.angle; // angular change, in radian
	Offset transition = state.transition; // displacement of midpoint

<img src="http://static.rikulo.org/blogs/tutorial/zoom-map/zoom-map-02.png" class="center-blog-image" />

Last but not least, it also supplies a [Transformation](http://github.com/rikulo/ui/blob/master/client/util/src/Matrix.dart) object to describe the entire transformation, with respect to the midpoint of initial positions as the origin. With Dart's power of operator definition, you can even do matrix multiplication easily.

	::dart
	Transformation t1 = state.transformation;
	Transformation t2 = new Transformation.rotate(PI / 3);
	Transformation t3 = t1 * t2; // matrix multiplication
	element.style.transform = CSS.transform(t3);



#Implementation

We are going to skip the basic layout part of this demo, but you can always explore the [source code](https://github.com/rikulo/ui/blob/master/samples/gesture/MapDemo.dart).

One thing to note here: the transformation matrix provided by ZoomGesture has its origin at the midpoint of initial touches, while the CSS transformation has its origin at the center of the element. To make them compatible, we will shift the transformation origin by API.

	::dart
	Offset diff; // used to offset transform origin
	Transformation trans; // the transformation on the image element
	
	new ZoomGesture(mainView.node, start: (ZoomGestureState state) {
		// the offset of transformation origins to shift
		diff = center(img) - state.startMidpoint;
		
	}, move: (ZoomGestureState state) {
		// 1. the origin needs to shift
		// 2. the transformation shall stack with ones from previous gestures
		img.style.transform = CSS.transform(state.transformation.originAt(diff) * trans);
		
	}, end: (ZoomGestureState state) {
		// write the transformation back
		trans = state.transformation.originAt(diff) * trans;
		
	});
	
	// calculate the page offset of the center of an element
	Offset center(View v) {
		Size size = new DOMQuery(v).outerSize;
		return new DOMQuery(v).pageOffset + new Offset(size.width / 2, size.height / 2);
	}
	
	// whenever window resizes, initialize image transformation
	img.on.preLayout.add((LayoutEvent event) {
		trans = new Transformation.identity();
		img.style.transform = CSS.transform(trans);
		
	});



#DragGesture, Too
	
When you touch the screen with a single finger, you would expect the image to be dragged as well. Here we can add a DragGesture to handle:

	::dart
	new DragGesture(mainView.node, move: (DragGestureState state) {
		img.style.transform = CSS.transform(new Transformation.transit(state.transition) * trans);
		
	}, end: (DragGestureState state) {
		trans = new Transformation.transit(state.transition) * trans;
		
	});

Note that ZoomGesture and DragGesture naturally avoid each other, so there is no extra work required to keep them apart.



#Conclusion

The information given by ZoomGesture are decomposed into the following 3 independent aspects:

* scale
* rotation
* transition

Most of time your would only concern 1 or 2 of them, which are nicely orthogonal, and you don't need to worry about trasformation origin issue. 


