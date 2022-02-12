# app.use(express.json());
express.json() is a method inbuilt in express to recognize the incoming RequestObject as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

# app.use(express.urlencoded({ extended: false }));
express.urlencoded({extended: false}) is a body parser for html post form
as express.json() can not parse html post form

# app.get("/", function (request, response) {
 #  response.sendFile(__dirname + "/index.html");
# });
This will show us the form in the rout "/".
__dirname  is an environment variable that tells you the absolute path of the directory containing the currently executing file.

## app.use(express.static("public"))

use the above code to serve images, CSS,html, and JavaScript files in a directory named public:
Now, you can load the files that are in the public directory:

http://localhost:4400/InfoCard.png
http://localhost:4400/index.html
http://localhost:4400/README.md


by using it , we no longer need to use the __dirname to get the path for our html file in 
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

as we can move our html file to the public folder and load it from there using the code:
 app.use(express.static("public"))
 then :

 app.get("/", function (request, response) {
  response.sendFile("/index.html");
});





