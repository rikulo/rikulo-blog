Date: 2012-9-28
Title: Rikulo EL, an Expression Language for and in Dart
Tags: Expression Language, EL, rikulo-el, rikulo, dart
Author: Henri Chen
summary: <p>Rikulo EL is an implementation of the <a href="http://en.wikipedia.org/wiki/Unified_Expression_Language">Unified Expression Language</a> specification plus some enhancements for and in Dart.</p>

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
 want to check the [EL specificationn](http://download.oracle.com/otndocs/jcp/expression_language-2.2-mrel-eval-oth-JSpec/)
 for details.

Nevertheless, I will show you the enhancements that Rikulo EL added that
 are specific for Dart language.

##Access variables 

Following is a typical "Hello World" example. The variable to be
evaluated is provided by use of [VariableMapper](http://api.rikulo.org/el/latest/rikulo_el/VariableMapper.html).

    ::dart
    import 'dart:mirrors' show reflect;
    import 'package:rikulo_el/el.dart';
    
    class Person {
      String name;
      Person(this.name);
    }

    void main() {
      //Prepare an expression factory.
      ExpressionFactory ef = new ExpressionFactory();
    
      //Prepare the expression script
      //expression inside #{...} is to be evaluated
      String script = 'Hello, #{person.name}!'; 
    
      //Prepare an expression context.
      ELContext ctx = new ELContext();
      ctx.variableMapper.setVariable('person',
          ef.createVariable(new Person('Rikulo')));
      
      //Parse the script and create a value expression which expect a String type
      ValueExpression ve = ef.createValueExpression(ctx, script, reflect('').type);
      
      //Evaluate the expression and return the evaluated result
      print(ve.getValue(ctx)); //'Hello, Rikulo!'
    }

> If you don't want to save `ValueExpression` for repeating use, you can use [ELUtil.eval()](http://api.rikulo.org/el/latest/rikulo_el/ELUtil.html#eval) instead.

> Instead of reflecting the string's type (with `reflect()`), you can use [STRING_MIRROR](http://api.rikulo.org/commons/latest/rikulo_mirrors.html) instead.

##Access functions 

Following is still a typical "Hello World" example. Here we use [FunctionMapper](http://api.rikulo.org/el/latest/rikulo_el/FunctionMapper.html).

    ::dart
    import 'dart:mirrors' show reflect;
    import 'package:rikulo_el/el.dart';
    
    class Person {
      String name;
      Person(this.name);
    }

    //Implements a function mapper
    class _FuncMapper implements FunctionMapper {
      Function resolveFunction(String name) {
        switch (name) {
          case "currentPerson":
            return () => new Person('Rikulo');
        }
      }
    }
	
    void main() {
      //Prepare an expression factory.
      ExpressionFactory ef = new ExpressionFactory();
    
      //Prepare the expression script
      //expression inside #{...} is to be evaluated
      String script = 'Hello, #{currentPerson().name}!'; 
    
      //Prepare an expression context.
      ELContext ctx = new ELContext(functionMapper: new _FuncMapper());
      
      //Parse the script and create a value expression which expect a String type
      ValueExpression ve = ef.createValueExpression(ctx, script, reflect('').type);
      
      //Evaluate the expression and return the evaluated result
      print(ve.getValue(ctx)); //'Hello, Rikulo!'
    }

##Allow using Dart array syntax in EL expression

There is no counter part in EL specification and Rikulo EL enhances 
the parser and evaluator to handle the Dart arrays. Following is a
simple example.

    ::dart
    import 'dart:mirrors';
    import 'package:rikulo_el/el.dart';
    
    class Person {
      String name;
      Person(this.name);
    }

    void main() {
      //Prepare an expression factory.
      ExpressionFactory ef = new ExpressionFactory();
    
      //Prepare the expression script
      //expression inside #{...} is to be evaluated
      String script = 'Hello, #{[henri, john, mary][0].name}!'; 
    
      //Prepare an expression context.
      ELContext ctx = new ELContext();
      ctx.variableMapper
        ..setVariable('henri', ef.createVariable(new Person('Henri')))
        ..setVariable('john', ef.createVariable(new Person('John')))
        ..setVariable('mary', ef.createVariable(new Person('Mary')));

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
    import 'dart:mirrors';
    import 'package:rikulo_el/el.dart';
    import 'package:rikulo_el/impl.dart';
    
    class Person {
      String name;
      Person(this.name);
    }

    void main() {
      //Prepare an expression factory.
      ExpressionFactory ef = new ExpressionFactory();
    
      //Prepare the expression script
      //expression inside #{...} is to be evaluated
      String script = 
        "Hello, #{{'henri' : henri, 'john' : john, 'mary' : mary}['henri'].name}!"; 
    
      //Prepare an expression context.
      ELContext ctx = new ELContext();
      ctx.variableMapper
        ..setVariable('henri', ef.createVariable(new Person('Henri')))
        ..setVariable('john', ef.createVariable(new Person('John')))
        ..setVariable('mary', ef.createVariable(new Person('Mary')));
      
      //Parse the script and create a value expression which expect a String type
      ValueExpression ve = ef.createValueExpression(ctx, script, reflect('').type);
      
      //Evaluate the expression and return the evaluated result
      print(ve.getValue(ctx)); //'Hello, Henri!'
    }	

> Note that such Dart map instance is created everytime the value expression is 
> evaluated and its life scope is only within that "Evaluation". That is, after the 
> evaluation is done, it will be left as is and finally garbage collected.

#Conclusion

Rikulo EL implements the Unified Expression Language specification and adds some enhancement
 features specific for Dart language. Authoring the presentation layer(web pages)
 in Dart and Rikulo will be easier and more versatile. It will serve as the important base 
 templating engine for [Rikulo UXL](https://github.com/rikulo/rikulo-uxl) UI eXtensible Language
 and the [Rikulo ORM](https://github.com/rikulo/rikulo-orm) libraries. Stay tuned.
 
