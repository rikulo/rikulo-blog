Date: 2012-12-20
Title: Rikulo's todoMVC
Tags: Rikulo, MVC, ideology, todoMVC, UXL
Author: Simon Pai
summary: <p>An overview of todoMVC project and Rikulo's implementation.</p><img src="http://static.rikulo.org/blogs/general/todoMVC/todoMVC-sample.png" class="center-blog-image" />



#What's todoMVC

[todoMVC](http://todomvc.com/) is a collection of a sample "Todo" web application implemented by different MVC frameworks, for helping interested users to compare and inspect them. It includes many popular frameworks, like Backbone.js, KnockoutJS, AngularJS, and other interesting constructions, like GWT, Dart (Vanilla), etc.

Not all available implementations are included in the official repository. For example, [Dart Web UI](http://www.dartlang.org/articles/dart-web-components/) has an implementation hosted in its [own repository](https://github.com/dart-lang/web-ui/tree/master/example/todomvc).



#Rikulo's implementation

Here is the demo of Rikulo's implementation.

<p>
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/general/todoMVC/view.css" />
<link rel="stylesheet" type="text/css" href="http://static.rikulo.org/blogs/general/todoMVC/app.css" />
<div id="v-main" class="center-blog-image" style="width:600px;height:600px"></div>
<script type="application/dart" src="http://static.rikulo.org/blogs/general/todoMVC/app.dart"></script>
<script src="http://static.rikulo.org/blogs/general/todoMVC/dart.js"></script>
</p>

* You can explore the [source code](https://github.com/rikulo/todoMVC).



#Essential Elements in MVC

We think there are several important criteria to look at when surveying an MVC framework: data flow, view representation, view modulization, code structure.

##Data Flow

An MVC framework usually need to take care of two kinds of data flow: rendering flow and update flow.

* Rendering Flow: Page Request -> ... -> Model -> ... -> UI Rendering
* Update Flow: UI Event -> ... -> Model -> ... -> UI Update

Rendering flow is about how DOM elements are initially loaded, and mostly involves view representation. We will explore this part in the next section.

Update flow is about how model and view communicate through controller (or, view model/binder/presenter/etc.), which pretty much determines the paradigm (MVC/MVVM/MVB/MVP/etc.) of the entire framework. We are not going to introduce each possibility in details, but you can surf the source code of the following implementations to get a quick understanding of each paradigm.

* Backbone.js: MVC, with data event
* AngularJS: MVVM
* GWT implementation of todoMVC: MVP
* Dart Web UI: model driven view (MDV)

Rikulo is a typical MVC framework, which provides a skeleton controller class to extend from. The controller listens to DOM event, manipulates model directly, and then update DOM elements.

However, if you prefer using data event like in Backbone.js, Rikulo also supports it via [ListModel](https://github.com/rikulo/rikulo/blob/master/lib/src/model/ListModel.dart). You can register callbacks to listen to data events, which is fired when model is updated.



##View Representation

To render UI from a page request, some component-based frameworks introduce their own ways of specifying UI layout, to relief user from bizzare Swing-like component construction. 

Rikulo uses [UXL](http://docs.rikulo.org/rikulo/latest/UXL/Fundamentals/UXL_Overview.html), an XML language, to help you specifying widget layout. Rikulo UXL compiler will then compile the xml file to a human-readable dart class which builds up the corresponding component tree for you.

UXL contains some neat features to make UI declaration friendly:

* Expression Language (EL), to access variables from template caller
* Flow control unit, such as for loop and conditional operator
* Template declaration

Here is a snippet of UXL in todoMVC implementation:

	::xml
	<View tag="ul" id="todo-list" layout="type: linear; orient: vertical; spacing: 0">
		<Apply forEach="t in app.todos">
			<View tag="li" class="${t.completed ? 'completed' : ''}" 
			control="new TodoItemControl(app, t)">
				<View class="show">
					<CheckBox class="toggle" value="${t.completed}" 
					on.change="toggleCompleted" />
					<TextView class="title" text="${t.title}" on.dblclick="editTitle" />
					<Button class="destroy" on.click="destroy" />
				</View>
				<TextBox class="edit" profile="width: ignore; height: ignore" 
				value="${t.title}" on.blur="submitTitle" on.keyUp="enterTitle" />
			</View>
		</Apply>
	</View>

You can also read the full [source code](https://github.com/rikulo/todoMVC/blob/master/web/views/app.uxl.xml).



##View Modularization

Due to the need of rendering a collection of items, view modularization is a necessity in a MVC framework. Component-based frameworks have a natural layer for packing DOM elements into a view unit. However, frameworks with DOM-based view (i.e. pure HTML) may also introduce a thin layer of view unit to provide the right granularity of views.

When combined with the need of view representation, this part is often assisted by template definition utilities. For instance,

* Backbone.js: uses Underscore.js to define HTML template
* Dart Web UI: has a template infrastructure that implements Web Components standard

Rikulo offers template declaration ability naturally with UXL infrastructure.



##Code Structure

Code structure is about how model, view, and controller code is organized in your code base. The purpose of maintaining a code structure is to reduce development overhead in large projects.

Most MVC/MVVM frameworks encourage user to separate view, model, and controller, so user can focus on views and models individually, and then think about putting them together with controllers. However, there is no best answer to this question; it is really up to the paradigm of the framework to decide what is the fittest code structure. For example, Dart Web UI emphasizes on component encapsulation, so it promotes packing model/view/controller code together in the unit of components.

In Rikulo, like most frameworks, model, view, and controller are kept as separate files. Views are represented by XML, models can be arbitrary classes, and controllers are classes extended from a base class.

<img src="http://static.rikulo.org/blogs/general/todoMVC/code-structure.png" />



#Conclusion

Rikulo, as an MVC framework, provides model data events, UXL view representation, and controller skeleton for an easy and scalable development experience. Explore our website and join [our community](https://plus.google.com/u/2/117602514255061155793) on Google+!


