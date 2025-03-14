import express from "express";
import nodemon from "nodemon";

const app = express();
// parse incoming json request
app.use(express.json());
const PORT = 3000;

let problems = [
  {
    id: 0,
    title: "Polyfill ofArray.map",
    description: "Some description",
  },
  {
    id: 1,
    title: "Polyfill of Promise.all()",
    description: "Some description",
  },
];
// Get: retrive data from a server
// endpoint: https://www.jscafe.dev/api/problems
// method: GET
// body: none
// query params: optional as per need
app.get("/api/problems", (req, res) => {
  res.json(problems);
});
// Post: Send data to server to create a new resource
// endpoint: https://www.jscafe.dev/api/problems
// method: POST
// body: YES
// query params: optional as per need

app.post("/api/problems", (req, res) => {
  const body = req.body;
  problems = [...problems, body];
  res.json(problems);
});

// PUT: update a specific resource
// endpoint: https://www.jscafe.dev/api/problems/:id
// method: PUT
// body: YES
// query params: optional as per need
app.put("/api/problems/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  problems = problems.map((p) => {
    if (p.id == id) {
      return {
        id,
        ...body,
      };
    }
    return p;
  });
  res.json(problems);
});
// delete: remove the specified resource
// endpoint: https://www.jscafe.dev/api/problems/:id
// method: delete
// body: no
// query params: optional as per need
app.delete("/api/problems/:id", (req, res) => {
  const id = req.params.id;
  problems = problems.filter((p) => p.id != id);
  res.json(problems);
});
// patch: partially update a resource
// endpoint: https://www.jscafe.dev/api/problems/:id
// method: patch
// body: yes
// query params: optional as per need
app.patch("/api/problems/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  //   find the problem, spread all the properties of that problem
  const problem = problems.find((p) => p.id == id);
  console.log(problem);
  problems = problems.map((p) => {
    if (p.id == id) {
      return {
        ...problem,
        ...body,
      };
    }
    return p;
  });
  res.json(problems);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// npm init to create package.json
// npm i express nodemon
// inside package.json add below commands
// "start":"nodemon server.js",
//  "type":"module", //enables you to use import other wise require will be used

// npm start->terminal
// install gitignore from vscode extensions , it helps to create a gitignore File, after
// installing write Node in the search bar , it will provide with the gitignore Directory

// reference video:
// https://www.youtube.com/watch?v=M2RpzmyKfvQ

// include
// "start":"nodemon server.js",
// in package.json
