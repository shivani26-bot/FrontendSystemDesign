// client has two parts
// grpc client and node js server itself
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./problems.proto";

// create a express server
const express = require("express");
const app = express();
app.use(express.json());

// utilize and create the client
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

// extract service
const ProblemService =
  grpc.loadPackageDefinition(packageDefinition).ProblemService;

//   create client instance
const client = new ProblemService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// endpoints which will perform actions
app.get("/getAllProblems", (req, res) => {
  // calling grpc micro service
  client.getAllProblems({}, (error, problems) => {
    if (error) {
      throw error;
    }
    res.json(problems);
  });
});

app.post("/updateProblem/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  client.updateProblem({ id, ...body }, (error, problem) => {
    if (error) {
      throw error;
    }
    //respond with updated problem
    res.json(problem);
  });
});

app.listen("3000", () => {
  console.log("client is running");
});

// here 3 systems are involved,
// 1. grpc server that is trans communicating problems information
// 2. dedicated backend service to get all the problems which will utimately
// fetch from client object which will then call grpc server
// 3. express server will be called from frontend client like react,postman,js

// node client.js

// make the following get request in postman
// localhost:3000/getAllProblems
