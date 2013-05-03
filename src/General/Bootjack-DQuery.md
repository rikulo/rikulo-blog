Date: 2013-5-3
Title: Bookjack and DQuery
Tags: Rikulo, jQuery, Bootstrap
Author: Simon Pai
summary: <p>Bootjack and DQuery bring the power of Twitter Bootstrap and jQuery into the Dart world. Read more to explore the design philosophy, a demo and sample usage of them.</p><img src="http://static.rikulo.org/blogs/general/bootjack-dquery/bootjack+dquery-title.png" class="center-blog-image" style="margin-top:16px" />

Bootjack is a project porting [Twitter Bootstrap](http://twitter.github.io/bootstrap/index.html) into Dart's world. Following Bootstrap's original implementation, Bootjack was built upon DQuery, a Dart porting of [jQuery](http://jquery.com/). Both libraries are unique, popular, and very useful in the Javascript community; we hope Dartisans can enjoy the powers of them in the Dart world as well.



#Bootjack

Bootstrap offers abundant style resources and many UI components. With its implementation concentrated on CSS as much as possible, its integration is the least invasive. Bootjack hopes to bring these values into the Dart world.

<p>
	<iframe src="http://static.rikulo.org/blogs/general/bootjack-dquery/demo.html" class="center-blog-image" style="width:600px;height:500px;border-width: 0;"></iframe>
</p>



##Coverage

There are roughly more than 20 components in Bootstrap. Many of them only involve simple DOM structure combined with CSS rules, requiring even no Javascript. Those "pure CSS" components are naturally ready to use in Bootjack along with the CSS assets from Bootstrap:

* Breadcrumbs
* Pagination
* Progress bars
* Thumbnails
* Labels and badges
* etc.

On the other hand, there are 12 Bootstrap components requiring Javascript to attain their full functionality. In Bootjack, we are planning to translate all of them, gradually. So far, the following are done:

* Alert
* Button
* Dropdown
* Modal
* Tab

In the future, we are looking forward to translate the rest of them:

* Affix
* Collapse
* Carousel
* Popover
* Scrollspy
* Tooltip
* Typeahead



##Usage

First of all in your HTML file, you need to include the CSS resource:
	
	::html
	<head>
		...
		<link rel="stylesheet" href="packages/bootjack/css/bootstrap-2.3.1.css">
	</head>

Most of the functions in Bootjack components are automatic -- you only need to give the right CSS class on DOM elements and call a global function to register.

For example, a Dropdown button component is prepared by giving the following HTML snippet:

	::html
	<button class="btn dropdown-toggle" data-toggle="dropdown">
		<span class="caret"></span>
	</button>
	<ul class="dropdown-menu">
		<li><a href="#">Menu Item #1</a></li>
		<li><a href="#">Menu Item #2</a></li>
		<li><a href="#">Menu Item #3</a></li>
	</ul>

With the following global registration in Dart:

	::dart
	void main() {
		Bootjack.use(['dropdown']);
	}

That's right. All you need to do in Dart is to tell Bootjack you are using Dropdown components. You can also progammatically access and manipulate the Dropdown:

	::dart
	Dropdown dd = Dropdown.wire(element);
	dd.toggle();

Check more [examples](https://github.com/rikulo/bootjack/tree/master/example) and the [API reference](http://api.rikulo.org/bootjack/latest/bootjack.html) for more features. Also, you can read the reference of [Bootstrap](http://twitter.github.io/bootstrap/getting-started.html).



#DQuery

DQuery is a porting of jQuery in Dart, which transports jQuery's the event system and many useful features to Dart.



##Design Philosophy

The jQuery library consists of many benefits, including:

* DOM element query, including basic selector query and enhanced traversing functions
* Wrapper of element collection, which grants you batch operation and null safe navigation
* Element/CSS attribute value normalization
* Event system, including name space, delegate, trigger, enhanced event object, etc.
* Simplified DOM API

and more.

Thanks to Dart, we already have the some of the values from DOM Query, simplified API, and normalization. However, we think jQuery's element wrapper and event system still have a great potential for Dartisans. In addition to being a cornerstone of Bootjack implementation, the purpose of DQuery is to leverage what we already have with Dart and bring in some other great values of jQuery we yet to have in the Dart world. In the current version of DQuery, we explicitly focus on the values of event system and element wrapper. 

In DQuery, to work with Dart smoothly, we keep the API as strong-typed as possible. Dart and jQuery convensions are also taken into consideration.



##Coverage

Among the categories of jQuery API, the following are included in the current version of DQuery:

* Core: element wrapper
* Traversing: good leverage with element wrapping
* Data: prerequisite for Event
* Event: event system
* addClass/removeClass/hasClass/toggleClass: commonly used
* show/hide/toggle: commonly used

The following are not included yet:

* Attributes, Dimentions, CSS
* Manipulation
* Effect
* Ajax
* Deferred Object (same as Dart's Future)



##Usage

You can create a query object by selector. With context provided, the query will be based on different element.

    ::dart
	// selects all elements containing 'active' in CSS class
	ElementQuery $elems = $('.active');
	
	// selects all descendant elements of div containing 'active' in CSS class
	ElementQuery $elems = $('.active', div);

It implements List<Element>.

	::dart
	$('.active')[0];
	$('.active').isEmpty;
	for (Element e in $('.active')) { ... }

Create another query object with traversing API, including [find](http://api.rikulo.org/dquery/latest/dquery/DQuery.html#find), [closest](http://api.rikulo.org/dquery/latest/dquery/ElementQuery.html#closest), [parent](http://api.rikulo.org/dquery/latest/dquery/ElementQuery.html#parent), [children](http://api.rikulo.org/dquery/latest/dquery/ElementQuery.html#children).

	::dart
	$('.active').closest('ul');
	$('#myDiv').find('a.btn');

Manipulate selected elements.

	::dart
	$('.active').removeClass('active');
	$('.fade').hide();

Register event handlers on queried elements, or trigger an event by API.

	::dart
	$('#myBtn').on('click', (DQueryEvent e) {
		...
	});
	$('#myBtn').trigger('click', data: 'my data');

There are query objects of HtmlDocument and Window too.

	::dart
	DocumentQuery $doc = $document();
	WindowQuery $win = $window();

Check the [API reference](http://api.rikulo.org/dquery/latest/dquery.html) for more features.



#Future Development

Bootstrap and jQuery are two important cornerstones in the Javascript community. We hope Bootjack and DQuery can offer the same benefits to the Dartisans and open up brand new possibilities for even more exciting UI libraries in the Dart community.

Explore our website to figure out our other projects including [Rikulo UI](http://rikulo.org/projects/ui) for web/mobile frontend, [Rikulo Stream](http://rikulo.org/projects/stream) for the backend, and the soon-coming [Couchclient](http://github.com/rikulo/couchclient) as Couchbase 2.0 client in Dart! [Join us](https://plus.google.com/u/2/117602514255061155793) on Google+!


