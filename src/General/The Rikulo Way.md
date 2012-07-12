Date: 2012-7-10
Title: The Rikulo Way
Tags: rikulo, philosophy
Author: Timothy Clare
summary: This blog post discusses Rikulo and the philosophy behind it.

#Introduction

Rikulo is a free and open source framework for creating amazing cross-platform native mobile applications. Our aim is soley to provide developers with the easiest and most powerful ways to create their application. We do this by bringing structure to your user interface.

Dart has brought structured programming to the web allowing code to be run at the client and on the server. With Rikulo we wanted to push this philosophy further and place it into the UI. HTML and CSS are great for websites which contain a lot of textual content and with the advent of HTML 5 and CSS 3 even better features have been introduced. However, when creating complex applications HTML and CSS can cause more problems than it solves due to side-effects introduced when creating and updating complex layouts. 

Our solution is **"Structured UI Model"**.

#Structured UI Model

The Structured UI Model forms a central basis of our philosophy which has been adapted for use since the very first GUI system was introduced, it simply states:

**UI elements should be positioned using coordinates in relation to their parent**

This simple philosophy gives developer's the power they require when laying out their while keeping the implementation simple. This simplicity is the *key*. We shield the developer from any need to interact with the DOM. The following diagram outlines our architecture.

<img src="http://blog.rikulo.org/static/files/general/the-rikulo-way/the-rikulo-way-architecture.png" class="center-blog-image" style="width: 400px;" alt="architecture" />

The above architecture outlines that you do not need to touch the DOM at all, Rikulo's UI Model will do all that work for you. 

You can create your own layout when needed effortlessly, the following example outlines the power of Rikulo by laying out components in a simple and elegant manner.
    
    ::dart
    for (int x = 0; x < 30; ++x) {
        for (int y = 0; y < 30; ++y) {
            View child = new View();
            final String color = CSS.color(250 - x * 4, 250 - y * 4, 200);
            child.style.cssText = "border: 1px solid #553; background-color: $color";
            child.left = x * 50 + 2;
            child.top = y * 50 + 2;
            child.width = child.height = 46;
            view.addChild(child);
        }
    }

As well as being able to effortlessly layout components manually, Rikulo also provides a set of stock layout components.

##Layouts

The layouts are an extensions of Rikulo's **UI Model** a good example of said layout is a Linear layout which can help developers layout their components vertically or horizontally. An example of linear layouts with different sized views is shown below.

<img src="http://blog.rikulo.org/static/files/general/the-rikulo-way/layout.jpg" class="center-blog-image" style="width: 700px" alt="layout" />

In additon to linear layouts Rikulo also provides an Anchor layout. The example below shows an Anchor layout in action.

    ::dart
    TextView welcome = new TextView("Hello World!");
    welcome.profile.text = "anchor: parent; location: center center";

In addition to the provided layouts developers are able to create their own using Rikulo's base layout, more information on layouts can be [found here](http://docs.rikulo.org/rikulo/latest/Layouts/index.html).


##HTML & CSS - you can still use it

The Rikulo philosophy is all about constructing a structured user interface with the minimum of fuss, though of course in all applications there will be areas where developers want total control over the layout, this is easily achieved. Rikulo's View completely supports HTML markup, for example:

    ::dart
    textView.html = "<table><tr><td>${data1}</td><td>${data2}</tr></table>";

This means should you need HTML & CSS capabilities then it is available to you.

#Mobile strength

One of the major areas in which Rikulo and Dart shines is in the mobile arena where JavaScript is not suited to creating large applications but where HTML & CSS alone are not enough. Combining the structure, simplicity and power of Rikulo and Dart means that developers have an exciting way of creating native mobile applications.

#Conclusion

This post serves as a quick introduction to Rikulo's philosophy. To learn more about Rikulo please visit the [learn page](http://rikulo.org/learn).









