##Overview
Our Web Application designed as a social platform which allow users to draw, share and comment.


##Getting Started
	
Run App:

~~~		
npm install
~~~

~~~		
node server.js
~~~

######User And Authentication
	
For your first time running the App, system will create an Super Admin for you; and it will provide a password for you, you can **remember the pasword** <u>(the password will only show once)</u>, or **change the password later** after Login 

##Folder Structure
The folder structure follow the `MEAN.JS`, and we simplify it according to our demand.

###config
- assert

Include all the path,(e.g. css and javascript path) we will use in our application

- env

Inlcude all the config infomation of our application

- lib

Init Nodejs application, with middleware, local variable ...

###modules

- core

Main layout, home page and other structure of fontend, backend render `swig` as templete

- sketchpad

All the Sketch functionality of our application, e.g. sketch picture, comment for sketch

- users

All the User functionality of our application, e.g. signin, admin and superadmin functionality

**(**all three modules include client(fontend) and server(backend)**)**

###public

Inculde alla the fontend library.

##Functionality

