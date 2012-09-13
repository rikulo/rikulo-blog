Date: 2012-8-2
Title: Building a Grid Demo using Rikulo
Tags: scroller, grid, rikulo, dart
Author: Simon Pai
summary: <p>This blog post talks about building a Grid sample with two dimensional scrolling using Rikulo's ScrollView component.</p><img src="http://static.rikulo.org/blogs/tutorial/grid-view/grid-view-sample.png" class="center-blog-image" />

#Introduction

Continued from the [previous post](http://blog.rikulo.org/posts/2012/Jul/Tutorial/building-a-list-view-demo-using-rikulo/), this time we are going to build a grid sample, with scrolling on both directions. In addition, we would like to try the events on ScrollView and Scroller control functions, by contructing multiple ScrollViews whose scrolling are "linked" to each others.

<img src="http://static.rikulo.org/blogs/tutorial/grid-view/grid-view-design.png" class="center-blog-image" />



#The Outcome

<p>
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/_common/view.css" />
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/tutorial/grid-view/scroll-view.css" />
<div id="v-main" class="center-blog-image" style="width:600px;height:600px"></div>
<script type="application/dart" src="http://static.rikulo.org/blogs/tutorial/grid-view/GridViewDemo.dart"></script>
<script src="http://static.rikulo.org/blogs/_common/dart.js"></script>
</p>

Grag or swipe on the each area to scroll. 



#Prepare ScrollView and Their Contents.

The ScrollView and content preparation itself is quite straightforward. You can refer to the [previous blog post](http://blog.rikulo.org/posts/2012/Jul/Tutorial/building-a-list-view-demo-using-rikulo/) or the [source code](http://github.com/rikulo/rikulo/blob/master/samples/scroll-view/GridViewDemo.dart). Here is an overview of what we do:

	::dart
	final int barSize = 50, barInnerSize = 40;
	final Size msize = new DOMQuery(mainView).innerSize;
	
	final View container = new View();
	container.profile.text = "location: center center; width: 80%; height: 80%";
	mainView.addChild(container);
	final csize = new DOMQuery(container).innerSize;
	
	final ScrollView view = new ScrollView();
	view.profile.text = 
		"location: bottom right; width: ${csize.width - barSide}px; height: ${csize.height - barSide}px";
	view.classes.add("list-view");
	
	final ScrollView hbar = new ScrollView(direction: Dir.HORIZONTAL);
	hbar.profile.anchorView = view;
	hbar.profile.text = "location: north center; width: 100%; height: ${barSize}px";
	hbar.classes.add("list-view list-view-hbar");
	
	final ScrollView vbar = new ScrollView(direction: Dir.VERTICAL);
	vbar.profile.anchorView = view;
	vbar.profile.text = "location: west center; width: ${barSize}px; height: 100%";
	vbar.classes.add("list-view list-view-vbar");
	
	// fill children
	// ...



#Cling Together

To link these parts, there are two things we need to handle:
1. When user starts scrolling on one ScrollView, stop current scrollings on the others, if any.
2. While scrolling, update scroll position of linked ScrollViews as well.

	::dart
	view.on.scrollStart.add((ScrollEvent event) {
		hbar.scroller.stop();
		vbar.scroller.stop();
	});
	view.on.scrollMove.add((ScrollEvent event) {
		hbar.scroller.scrollPosition = vbar.scroller.scrollPosition = event.state.position;
	});
	
	hbar.on.scrollStart.add((ScrollEvent event) {
		view.scroller.stop();
		vbar.scroller.stop();
	});
	hbar.on.scrollMove.add((ScrollEvent event) {
		view.scroller.scrollPosition = 
			new Offset(event.state.position.x, view.scroller.scrollPosition.y);
	});
	
	vbar.on.scrollStart.add((ScrollEvent event) {
		view.scroller.stop();
		hbar.scroller.stop();
	});
	vbar.on.scrollMove.add((ScrollEvent event) {
		view.scroller.scrollPosition = 
			new Offset(view.scroller.scrollPosition.x, event.state.position.y);
	});



#Be Responsive

In the current code, the size depends on browser window size. However, if we resize the window after the page is loaded, some of the component sizes will not change. To make it responsive, we have to intercept the size setting in the pre-layout event:

	::dart
	final ScrollView view = new ScrollView();
	view.profile.text = "location: bottom right";
	
	view.on.preLayout.add((LayoutEvent event) {
		final cs = new DOMQuery(container).innerSize;
		view.width = cs.width - barSize;
		view.height = cs.height - barSize;
	});

In the future we may come up with a more natural and intuitive way to support responsive design  implementation.



#Conclusion

Many of the motion/gesture related constructions come with the same lifecycle callbacks: start, move, and end. 

For example, you may often consider:

* Interrupt some current actions when a gesture/motion starts.
* Update the state of some element when a gesture/motion is running.
* When a gesture/motion ends, trigger another motion.

The homogeneity makes it easy chain or link these constructions together to compose them into a larger unit, and we believe these patterns should be quite friendly to web effect/animation designers.


