Date: 2013-5-7
Title: CouchClient
Tags: Rikulo, NoSQL, Couchbase, Map-Reduce, Big Data, Cloud Computing, Memcached, Asynchronous Programming
Author: Henri Chen
summary: <p>CouchClient is the client SDK that enables accessing to the NoSQL document database [Couchbase](http://www.couchbase.com/) in Dart language. It brings the high-throughput reads and writes and flexible Map-Reduce queries into the Dart world. As the trend for Internet comes to big data, big users, and cloud computing, CouchClient enables you a new way to capture and process NoSQL data in Dart langugate.</p>

CouchClient is our attempt to access NoSQL document database. It is a [Couchbase](http://www.couchbase.com/) client library for Dart language. Just finished the first version and we would like to talk a bit about how to use it. If you are interested in behind-the-hood implemention details, here are the [source code](https://github.com/rikulo/couchclient) in Github.

Our implementation of Couchbase client in Dart language is inspired by the official [Couchbase Java Client Library 1.1](http://www.couchbase.com/develop/java/current) thus the APIs are quite similar to those ones found in official Java client. However, we adapted only asynchronous version of those Java APIs because they fit to the asynchronous natural of Dart's `dart:io` module. Also, we tends to limit the number of APIs and arguments in each API such that the learning experience of using this Couchbase client is as simple and easy as possible.

Cannot guarantee all APIs will not be changed afterward. There are still a lot of functions that we have not implemented. Couchbase reconfiguration and automatic rebalance are still on the way and this is an implementation of early stage. Asynchronous programming is quite an interesting topic and we anticipate that the code would be refactored serveral times. Some APIs might have to be added/deleted/changed accordingly.

Nevertheless, following we will introduce the most basic way to use this Dart client first, namly, by explaining a "Hello Couchbase" example and a "Query Couchbase" example. You are welcome to try them. By the way, the examples used in this article are shamlessly stolen from those of the official Java client's with minor modification and make it a Dart version. All credits shall go to the ones that writes the Java examples.

Enough chichat. Let us go straight to the classic "Hello Couchbase".

#Before Everything

##Intall a Couchbase Server if you have not had one

[Get and Install Couchbase Server](http://www.couchbase.com/download). Remember to load the sample bucket *beer-sample*.

##Install the CouchClient

Like all other Dart libraries, simply add a dependency line in `pubspec.yaml` of your application:

    dependencies:
	  couchclient:

Then run the Pub Package Manager (comes with the Dart SDK):

    pub install
	
Or if you want to try the stuff still in development, add this to your `pubspec.yaml` of your application:

    dependencies:
	  couchclient:
        git: git://github.com/rikulo/couchclient.git
		
#Hello Couchbase!

Following is a typical use pattern of the CouchClient:

1. Create a client connecting to a cluster of Couchbase servers asynchrously.
2. When the client is ready, access the Couchbase cluster with APIs.

HelloCouch.dart

    import "dart:uri";
    import "dart:utf";
    import "dart:async";
    import "package:couchclient/couchclient.dart";
    
    void main() {
      // Connect to server per the provided URIs
      // Here assume your Couchbase Server is installed on localhost
      // Use "default" bucket with no password
      CouchClient.connect([Uri.parse("http://localhost:8091/pools")], "default", "")
      // When client is ready, access the database
      .then((client) => access(client))
      // Catch all possible errors/exceptions
      .catchError((err) => print('Exception: $err'));
    }
    
    // The unique document id of the document
    final String DOC_ID = "beer_Wrath";
    
    // The JSON encoded document
    final String VALUE =
      '{"name":"Wrath","abv":9.0,'
      '"type":"beer","brewery_id":"110f1a10e7",'
      '"updated":"2010-07-22 20:00:20",'
      '"description":"WRATH Belgian-style ",'
      '"style":"Other Belgian-Style Ales",'
      '"category":"Belgian and French Ale"}';
    
    Future access(CouchClient client) {
      // Do a set
      return client.set(DOC_ID, encodeUtf8(VALUE))
      // Check if set succeeded and show message
      .then((ok) => print(ok ? "Set Succeeded" : "Set failed"))
      // Then get the value back by document id
      .then((_) => client.get(DOC_ID))
      // Check if get data equals to set one
      .then((val) => decodeUtf8(val.data) == VALUE)
      // Show message
      .then((ok) => print(ok ? "Get Succeeded" : "Get failed"))
      // Close the client
      .then((_) => client.close());
    }

Let us go through the above example.

	CouchClient.connect(List<Uri> servers, String bucket, String password);
	
This is the entry point of all CouchClient operations. It accepts URIs of servers in a cluster, the target bucket name, and the password to login the bucket, and then returns a Future<CouchClient> that will give the client connecting to the specified bucket. After the connection is created successfully(the Future is completed), you are allowed to use the client. 

Someone might ask why we have to specify *ALL* servers in the cluster in the `connect()` API. Actually, you don't have to. It is more of an insurance to avoid if the specified server happens to be down. That is, the servers are only for booting up the connection to the cluster. If either one of them is connected successfully, the client would be connected to the whole cluster. In other words, you can specify only one server URI in the cluster if you like; as long as the specified server is active and ready to be connected.

OK. After the client is ready, you can call the access APIs as your wish. Here in the example we call `set()` to store a document and then `get()` to retrieve the document we just set. And check if the value read back equals to the one we wrote into database.

Following is the `set()` API.

    Future<bool> set(String docID, List<int> document)
	
Use it to persist a document with the provided document id. The returned Future<bool> would give true if the `set()` operation is completed successfully:

Following is the `get()` API.

    Future<GetResult> get(String docID);

Use it to read back a document per the provided document id. The returned Future<getResult> would provide detail information about the document(including document id, flags, cas, and data) in a `GetResult` object when the get operation is completed.
	 
Actually almost all APIs in CouchClient are asynchrous and will return a Future to the proper results. Here we also makes `access()` application function to returns a Future such that we can chain the Futures together and catch all errors in one place(see main() function) during the whole process.

The result of this "Hello Couch" program should be

    Set Succeeded
    Get Succeeded

> If you need full source code, [here](https://github.com/rikulo/couchclient/blob/master/test/HelloCouch.dart) it is.

#Query Couchbase

In previous example, we have demonstrated the way to set and get document by *document id*. In this example, we will focus on how to *query* documents per the given map function and `Query` conditions on JSON-based documents.

To query Couchbase, you would have to define map functions in JavaScript language and add them into the *design document* of the database. Later on, you can use these predefined map functions to *query* the database and retrieve documents that match the query conditions.

QueryCouch.dart

    import 'dart:async';
    import 'dart:utf';
    import 'dart:uri';
    import 'dart:json' as json;
    import 'package:memcached_client/memcached_client.dart';
    import 'package:couchclient/couchclient.dart';
    
    void main() {
      // Connect to server per the provided URIs
      // Here assume your Couchbase Server is installed on localhost
      // Use "beer-sample" bucket with no password
      CouchClient
      .connect([Uri.parse("http://localhost:8091/pools")], "beer-sample", "")
      //when client is ready, query the database
      .then((client) => queryByView(client))
      .catchError((err) => print("$err"));
    }

Let us go through the above example.

	CouchClient.connect(List<Uri> servers, String bucket, String password);
	
Again, this is the entry point of all CouchClient operations. It accepts URIs of servers in a cluster, the target bucket name, and the password to login the bucket, and then returns a Future<CouchClient> that will give the client connecting to the specified bucket. After the connection is created successfully(the Future is completed), we call queryByView(client) application function to access the map function. 

Following is the definition of `queryByView()` function.

    /**
     * Read a document whose name is "Wrath" using the map function.
     */
    Future queryByView(CouchClient client) {
      // Prepare map function with name "by_name"
      ViewDesign vd = new ViewDesign("by_name", MAP_FUNC);
      // Prepare design document with the name "beer"
      DesignDoc dd = new DesignDoc("beer", views: [vd]);
    
      // Add the design document "beer" with "by_name" map function into database
      return client.addDesignDoc(dd)
      // Get map function "by_name" from design document "beer"
      .then((_) => client.getView("beer", "by_name"))
      // When ViewDesign function is ready
      .then((view) {
        // Configurate Query object
        Query query = new Query();
        // Retreive the beer with name "Wrath"
        query.key = "Wrath";
        // Include associated document as well
        query.includeDocs = true;
    
        // Query the server and return the ViewResponse
        return client.query(view, query);
      })
      // Process the query results
      .then((results) {
        for (ViewRow row in results.rows) {
          // Convert List<int> to String
          String data = decodeUtf8(row.doc.data);
          // Print out some infos about the document
          print("The Key is: ${row.key}");
          print("The full document is : ${data}");
    
          // Convert it back to an object with json
          Map bm = json.parse(data);
          Beer beer = new Beer.fromMap(bm);
    
          print("Hi, my name is ${beer.name}!");
        }
      })
      // Close the client
      .then((_) => client.close());
    }

This function creates a map function *by_name*, stores it into design document *beer* and then add the design document into the database. The map function can then be used in query database document per the query conditions. In the example, the map function would retrieve only those ducments with type equals to *beer*(as filtered by the map function) and with name equals to *Wrath*(as constrained by the `Query` object). To conclude, the query will return documents whose type is *beer* and whose name is *Wrath*.

Following is the map function(in JavaScript) used in this example. It checks each document and emit only those documents has a document name with type equals to *beer*.

    String MAP_FUNC = '''
    function (doc, meta) {
      if (doc.type && doc.name && doc.type == "beer") {
        emit(doc.name, meta.id); //emit document name as the key and document id as the value
      }
    }''';

Following is the code snippet that prepare a map function in design document and add it into database.
 	
    // Prepare map function with name "by_name"
    ViewDesign vd = new ViewDesign("by_name", MAP_FUNC);
    // Prepare design document with the name "beer"
    DesignDoc dd = new DesignDoc("beer", views: [vd]);
    // Add the design document "beer" into database
    return client.addDesignDoc(dd)
	    ...

As long as the map function is added into the database, your can read the map function back per the design document name and map function name and then use it to query the database per the given `Query` condition.
		
	// Configurate Query object
	Query query = new Query();
	// Retreive the beer with name "Wrath"
	query.key = "Wrath";
	// Include associated document as well
	query.includeDocs = true;
	// Query the server and return the ViewResponse
	return client.query(view, query);

The `client.query()` method would return documents in a ViewResponse object that match the provided map function and the `Query` conditions. You can then process the results accordingly.

Note that we make `queryByView()` function to returns a Future such that we can chain the Futures together and catch all errors in one place(see main() function) during the whole process. This is a typical practice to handle asynchrnous error handing.

The result of this "Query Couch" program should be

    The Key is: Wrath
    The full document is : {"name":"Wrath","abv":8.2,"ibu":0.0,"srm":0.0,... // omitted
    Hi, my name is Wrath!
	
> If you need full source code, you can find them [here](https://github.com/rikulo/couchclient/blob/master/test/QueryCouch.dart).

#Summary

Though we show only the `set()`, `get()`, and `query()` APIs in this article, they did demonstrate the typical usage of the client's APIs. There are other APIs that will help you handle things more than create, retrieve, update, delete(CRUD), and query documents. Take a look of the [CouchClient class](http://api.rikulo.org/couchclient/latest/couchclient/CouchClient.html) to find details.

Happy trying and do privide us feedbacks!
