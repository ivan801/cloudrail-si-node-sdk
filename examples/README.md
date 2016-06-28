This folder contains examples on how to use the CloudRail SI node.js library

* The "simple" folder contains a very basic example of how to use a service where the redirectReceiver parameter to the service constructor can be null (interfaces Payment, Email, SMS, Point of Interest)
* The "local-oauth" folder contains a simple example of how to use a service that needs a redirectReceiver implementation, using one that works for local testing (interfaces Cloud Storage, (Social) Profiles)
* The "express-mongo-oauth" folder has an example that showcases how to proceed with a more complex real world setup including a server and a database on the example of the ME(A)N stack.
It makes sure authentication with OAuth works even when there are mutliple instances of the server running behind the same address and redirects cannot be guaranteed to always land on the instance that started the authentication
* The folder "typescript-promises" has an example that shows how to use the library with Typescript and how the library's API can be promisified to be used with Promises instead of callbacks