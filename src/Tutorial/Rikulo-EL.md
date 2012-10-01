Date: 2012-9-28
Title: Rikulo EL, an Expression Language for and in Dart
Tags: Expression Language, EL, rikulo-el, rikulo, dart
Author: Henri Chen
summary: <p>Rikulo EL is an implementation of the [Unified Expression
 Language](http://en.wikipedia.org/wiki/Unified_Expression_Language) 
 specification plus some enhancements for and in Dart.</p>

#Isn't EL for Java and JSP/JSF?

Yes, it is. And with Rikulo EL, you are now enabled to use EL for and 
in Dart, too.

And No, it is not. 

EL indeed is more of a specification than an implementation.
 You can see it as a light weight scripting mechanism allowing you 
 to easily access application logic and data with simple expression.
 You can see it as a templating engine that helps you generate proper 
 text format of your choice. You can hook it with your presentation
 layer and do things similar to JSP pages. Or you can even use it to
 establish the whole data binding system that support MVVM design 
 patterns.
 
#Use Rikulo EL
Rikulo EL implements the EL specification thus you can use it as what 
 you have used it before if you are familiar with it. Or maybe you 
 want to check the EL specification(http://download.oracle.com/otndocs/jcp/expression_language-2.2-mrel-eval-oth-JSpec/)
 for details.

Nevertheless, I will show you the enhancements that Rikulo EL added that
 are specific for Dart language.

##Access top level variables seemlessly 

Following is a typical "Hello World" example. The variable to be
evaluated is a Dart top level variable.

    ::dart
    #import('dart:mirrors');
    #import('package:rikulo_el/api.dart');
    #import('package:rikulo_el/impl.dart');
    
    class Person {
      String name;
      Person(this.name);
    }

    //Top level variable to be evaluated in EL expression
	Person person = new Person('Rikulo');
	
    void main() {
      //Prepare an expression factory.
      ExpressionFactory ef = new ExpressionFactory();
    
      //Prepare the expression script
	  //expression inside #{...} is to be evaluated
      String script = 'Hello, #{person.name}!'; 
    
	  //Prepare an expression context.
	  ELContext ctx = new ELContext();
      
      //Parse the script and create a value expression which expect a String type
      ValueExpression ve = ef.createValueExpression(ctx, script, reflect('').type);
      
      //Evaluate the expression and return the evaluated result
      print(ve.getValue(ctx)); //'Hello, Rikulo!'
    }	

> The default ELResolver implemenation of the Rikulo EL supports resolving top 
> variables of the *root library* only.

##Access top level functions seemlessly 

Following is still a typical "Hello World" example. The function to be
evaluated is a Dart top level function.

    ::dart
    #import('dart:mirrors');
    #import('package:rikulo_el/api.dart');
    #import('package:rikulo_el/impl.dart');
    
    class Person {
      String name;
      Person(this.name);
    }

    //Top level function to be evaluated in EL expression
	Person currentPerson() => new Person('Rikulo');
	
    void main() {
      //Prepare an expression factory.
      ExpressionFactory ef = new ExpressionFactory();
    
      //Prepare the expression script
	  //expression inside #{...} is to be evaluated
      String script = 'Hello, #{currentPerson().name}!'; 
    
	  //Prepare an expression context.
	  ELContext ctx = new ELContext();
      
      //Parse the script and create a value expression which expect a String type
      ValueExpression ve = ef.createValueExpression(ctx, script, reflect('').type);
      
      //Evaluate the expression and return the evaluated result
      print(ve.getValue(ctx)); //'Hello, Rikulo!'
    }	

> The default FunctionMapper implementation of the Rikulo EL supports resolving 
> top functions of the *root library* only.
	
##Allow using Dart array syntax in EL expression

There is no counter part in EL specification and Rikulo EL enhances 
the parser and evaluator to handle the Dart arrays. Following is a
simple example.

    ::dart
    #import('dart:mirrors');
    #import('package:rikulo_el/api.dart');
    #import('package:rikulo_el/impl.dart');
    
    class Person {
      String name;
      Person(this.name);
    }

    //Top level variables
	Person henri = new Person('Henri');
	Person tom = new Person('Tom');
	Person simon = new Person('Simon');
	Person tim = new Person('Tim');
	
    void main() {
      //Prepare an expression factory.
      ExpressionFactory ef = new ExpressionFactory();
    
      //Prepare the expression script
	  //expression inside #{...} is to be evaluated
      String script = 'Hello, #{[henri, tom, simon, tim][0].name}!'; 
    
	  //Prepare an expression context.
	  ELContext ctx = new ELContext();
      
      //Parse the script and create a value expression which expect a String type
      ValueExpression ve = ef.createValueExpression(ctx, script, reflect('').type);
      
      //Evaluate the expression and return the evaluated result
      print(ve.getValue(ctx)); //'Hello, Henri!'
    }	

> Note that such Dart array instance is created everytime the value expression is 
> evaluated and its life scope is only within that "Evaluation". That is, after the 
> evaluation is done, it will be left as is and finally garbage collected.

##Allow using Dart map syntax in EL expression

    ::dart
    #import('dart:mirrors');
    #import('package:rikulo_el/api.dart');
    #import('package:rikulo_el/impl.dart');
    
    class Person {
      String name;
      Person(this.name);
    }

    //Top level variables
	Person henri = new Person('Henri');
	Person tom = new Person('Tom');
	Person simon = new Person('Simon');
	Person tim = new Person('Tim');
	
    void main() {
      //Prepare an expression factory.
      ExpressionFactory ef = new ExpressionFactory();
    
      //Prepare the expression script
	  //expression inside #{...} is to be evaluated
      String script = 
		"Hello, #{{'henri' : henri, 'tom' : tom, 'simon' : simon, 'tim' : tim}['henri'].name}!"; 
    
	  //Prepare an expression context.
	  ELContext ctx = new ELContext();
      
      //Parse the script and create a value expression which expect a String type
      ValueExpression ve = ef.createValueExpression(ctx, script, reflect('').type);
      
      //Evaluate the expression and return the evaluated result
      print(ve.getValue(ctx)); //'Hello, Henri!'
    }	

> Note that such Dart map instance is created everytime the value expression is 
> evaluated and its life scope is only within that "Evaluation". That is, after the 
> evaluation is done, it will be left as is and finally garbage collected.

#Things can be better

+ Currently some APIs require the programmers to provide `ClassMirror` of an object 
  instead of, IMO more appropriate, Dart `runtimeType`. It is because that this Dart 
  feature is not ready yet in current Dart build. I expect to modify this part when 
  Dart done supporting the `Object.runtimeType`. Hope it is not too far away.
+ There are still some enhancements we can do, e.g. supporting named optional arguments
  for top level functions and class methods. And there must be still some bugs there. We
  need your feed back to make Rikulo EL more stable and complete. Please try it and post
  enhancements/bugs issue here(https://github.com/rikulo/rikulo-el/issues/new). We will
  appreciate it very much.

#Conclusion

Rikulo EL implments the Unified Exprssion Language specification and adds some enhancement
 features specific for Dart language. Authoring the presentation layer(web pages)
 in Dart and Rikulo will be easier and more vesatile. It will serves as the important base 
 templating engine for Rikulo UXL(https://github.com/rikulo/rikulo-uxl) UI eXtensible Language
 and the Rikulo ORM(https://github.com/rikulo/rikulo-orm) libraries. Stay tuned.
 
