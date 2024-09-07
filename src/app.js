import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
/*
app.use(...): This is how you add middleware to your Express application. Middleware functions are executed in the order they are added, and they have access to the request and response objects.

express.json(...): This is a built-in middleware function in Express that parses incoming requests with JSON payloads. It takes the raw request body (which is typically a string) and transforms it into a JavaScript object that you can easily work with in your route handlers.

{ limit: "16kb" }: This is an option passed to the express.json() middleware. It sets a limit on the size of the incoming JSON payload. In this case, the limit is set to 16 kilobytes.

What it Does

This line of code tells your Express app to:

Parse JSON: Automatically parse any incoming requests that have a Content-Type header of application/json.
Limit Payload Size: Reject any requests with a JSON payload larger than 16 kilobytes. This helps protect your server from potential denial-of-service (DoS) attacks or excessive memory usage caused by large payloads.
*/

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))
/*
Let's take a look at a practical example of how this middleware functions.

Scenario: Handling a Form Submission

Imagine you have an HTML form where users can submit their name and email address:

HTML
<form action="/submit" method="POST">
  <input type="text" name="name" placeholder="Your Name">
  <input type="email" name="email" placeholder="Your Email">   

  <button type="submit">Submit</button>
</form>
Use code with caution.
On the server-side, you have an Express route to handle this form submission:

JavaScript
app.post('/submit', (req, res) => {
  console.log(req.body); // Access the parsed form data
  // ... process the form data and send a response
});
Use code with caution.
Without the Middleware

If you don't include app.use(express.urlencoded({ extended: true })), the req.body object in your route handler will be undefined. Express doesn't automatically parse URL-encoded data.
With the Middleware

By adding app.use(express.urlencoded({ extended: true })), Express will now parse the incoming form data and populate req.body with a JavaScript object representing the form fields and their values.

For the above form submission, req.body would look like this:

JavaScript
{
  name: 'John Doe',
  email: 'john.doe@example.com'
}
Use code with caution.
 You can then easily access and use these values in your route handler to process the form data.

Key Points

The extended: true option enables the use of the 'qs' library, which allows for parsing more complex data structures (nested objects and arrays) in the form payload.
The limit: "16kb" option helps protect your server from overly large form submissions that could potentially cause issues.
*/

app.use(express.static("public"));
/*
This line tells your Express app to serve static files (like 
images, CSS, JavaScript) located in the "public" directory. 
When a user's browser requests a file within this directory, 
Express will automatically locate and send it, without you 
needing to define specific routes for each file.
*/

// Mere server se user browser ke cookies access kar paun and
// uske upar CRUD operations kar paun
// In browser you have secure cookies which can bed accesssed
// by server
app.use(cookieParser());


export { app }