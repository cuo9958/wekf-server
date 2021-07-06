const jwt = require("njwt");
const jwt_key = "123";
const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhIjoxLCJqdGkiOiIyNmEwZTQ1Yi0wM2EyLTQ1YjgtOTEwNi1kYjYzZmU3NmEzY2YiLCJpYXQiOjE2MjU1NjcxNzIsImV4cCI6MTYyNTU3MDc3Mn0.RjUw3LuKbb26wNJMf5pERBHdf6F6JbD4yCe9RpP1AXU";

const data = jwt.verify(token, jwt_key);

console.log(data);
