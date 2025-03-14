// make a network call inside setInterval at regular Interval
// npm init
// npm i express cors nodemon
import express from "express";
import cors from "cors";
// The cors() middleware in Express.js allows your server to respond to requests from other domains (origins).
// app.use(cors()) enables CORS for all routes and all origins by default. This means any domain can send requests to your server without being blocked by the browser's same-origin policy.
const app = express();

// parse incoming json request
app.use(express.json());
app.use(cors());
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

app.get("/api/problems", (req, res) => {
  res.json(problems);
});

app.post("/api/problems", (req, res) => {
  const body = req.body;
  problems = [...problems, body];
  res.json(problems);
});

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
