// npm i express nodemon @grpc/grpc-js @grpc/proto-loader
// grpc server using contract in problems.proto
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./problems.proto";
// boiler plate options,
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
// import packageDefinition, gives all the package definitions
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
// extract proto
const problemsProto = grpc.loadPackageDefinition(packageDefinition);
// create server
const server = new grpc.Server();
//in real project we will fetch data from actual database
// in proto file it's mentioned that id, title, description are string

let problems = [
  {
    id: "0",
    title: "Polyfill of Array.map",
    description: "some description",
  },
  {
    id: "1",
    title: "Polyfill of Promise.all(",
    description: "some description",
  },
];
// add service
server.addService(problemsProto.ProblemService.service, {
  // define methods in options
  //   methods created in the ProblemService ie. getAllProblems and UpdateProblem
  //  make a database call inside methods to modify or tweek database
  getAllProblems: (_, callback) => {
    // callback function is responsible for sending the data
    // getAllProblems should return problem list which is array of problems
    callback(null, { problems: problems });
  },
  updateProblem: (call, callback) => {
    const id = call.request.id;
    console.log(call.request);
    problems = problems.map((p) => {
      if (id === p.id) {
        return { ...p, ...call.request };
      }
      return p;
    });
    const updatedProblem = problems.find((p) => p.id === id);
    callback(null, { ...updatedProblem });
  },
});
//  "127.0.0.1:50051"->localhost:port
// createInsecure() allows non https call
server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("grpc is up and running");
    server.start();
  }
);
// contract
// syntax= "proto3"

// in proto we create a message, wich contains structure of Problem here

// message Problem{
//     string id=1;
//     string title=2;
//     string description=3;
// }

// // create a service , using which we will call our apis
// // inside Problemservice we will make a remote procedure call
// // 2 apis are GetAllProblems and UpdateProblem
// // GetAllProblems except nothing, hence empty, we will define empty as well
// // it returns ProblemList which is an array
// // UpdateProblem takes object Problem as Parameter and return updated Problem

// service ProblemService{
//     rpc GetAllProblems (Empty) return (ProblemList) {}
// here we want Problem as parameter, ie id, title and description, if description is not provided the it will attach description with "" empty strings
//     rpc UpdateProblem (Problem) return (Problem) {}
// }

// message Empty {}

// // array is represented by repeated keyword
// // repeated Problem -> array of problems
// // variable name is problems here which hold the array
// message ProblemList{
//     repeated Problem problems=1;
// }

// node .\server.js
