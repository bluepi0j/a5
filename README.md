## Overview
Our Web Application designed as a social platform which allow users to draw, share and comment. For more general information please read our report.


## Getting Started
	
How to run this app:

~~~		
npm install
~~~

~~~		
node server.js
~~~

#### User And Authentication
	
At the first time of running the App, system will generate a Super Admin automatically: username and password will be shown in terminal. 
[Note: please **remember the pasword** <u>(the password will only show once)</u>, or **change the password later** after Login.]

Open App on at (if running locally):

~~~
http://127.0.0.1:3000
~~~ 

View an example on hosting server at:

~~~
http://159.203.23.248
~~~
##Folder Structure
The folder structure follow the `MEAN.JS`, and we simplify it according to our demand.

### config
- assert

Include all the path,(e.g. css and javascript path) we will use in our application

- env

Inlcude all the config infomation of our application

- lib

Init Nodejs application, with middleware, local variable ...

### modules

- core

Main layout, home page and other structure of fontend, backend render `swig` as templete

- sketchpad

All the Sketch functionality of our application, e.g. sketch picture, comment for sketch

- users

All the User functionality of our application, e.g. signin, admin and superadmin functionality

**(**all three modules include client(fontend) and server(backend)**)**

### public

Inculde all the fontend library.



