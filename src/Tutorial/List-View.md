Date: 2012-7-24
Title: Building a List View Demo using Rikulo
Tags: scroller, list-view, dart
Author: Simon Pai
summary: <p>This blog post talks about building a List View sample using Rikulo's ScrollView component.</p><img src="http://blog.rikulo.org/static/files/tutorial/list-view/list-view-sample.png" class="center-blog-image" />

#Introduction

As we are building up the UI infrastructure of Rikulo, there is a critical widget we can't miss: List View. On our skretch paper, the rough architecture is like this:

<img src="http://blog.rikulo.org/static/files/tutorial/list-view/list-view-architecture.png" class="center-blog-image" />

Before we rush to create a List View widget, we would like to simulate its left part as an application of ScrollView first. Also this gives us a chance to test the strength of the Scroller utility.

#The Outcome

<p>
<link rel="stylesheet" type="text/css" href="/files/_common/view.css" />
<link rel="stylesheet" type="text/css" href="http://blog.rikulo.org/static/files/tutorial/list-view/scroll-view.css" />
<div id="v-main" class="center-blog-image" style="width:572px;height:396px"></div>
<script type="application/dart" src="/files/tutorial/list-view/ListViewDemo.dart"></script>
<script src="/files/_common/dart.js"></script>
</p>

#Starting with ScrollView

We start with putting down a ScrollView widget at the center of mainView.

	::dart
	ScrollView view = new ScrollView(direction: Dir.VERTICAL);
	view.profile.text =
		"location: center center; width: 80%; height: 80%";
	view.classes.add("list-view");
	mainView.addChild(view);

#Loading List Items

Then, we are going to fill up the list items in ScrollView. Note that if we don't give ScrollView a content height, it will adjust automatically depending on the size and position of its children.

	::dart
	for (int x = 0; x < 50; ++x) {
		View child = new TextView("Row ${x + 1}");

		final int height = 50;
		child.classes.add("list-item");
		child.style.cssText = "line-height: ${height}px";
		child.style.userSelect = "none"; // so it does not interrupt dragging
		child.profile.width = "flex"; // take full width
		child.top = x * height;
		child.height = height;

		view.addChild(child);
	}

#Snap Function

Stepping further, we can add a snap function, which tells the ScrollView to "snap to" a position based on the ending position of a scrolling. In the implementation below, we let it snap to closest border of each list item.

	::dart
	ScrollView view;
	view = new ScrollView(direction: Dir.VERTICAL, 
	snap: (Offset off) {
		final num vlimit = 50 * 50 - view.innerHeight;
		final num y = off.y >= vlimit ? vlimit : ((off.y + 25) / 50).floor() * 50;
		return new Offset(off.x, y);
	});

#Conclusion

Based on the nature of ScrollView, such a List View example is really easy to achieve.

In our next blog post, we are going to explore creating another example using ScrollView: a 2D scrolling panel with its scrolling linked to side bars. Please don't hesitate to leave your comment.
