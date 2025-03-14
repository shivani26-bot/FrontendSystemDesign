// npm init to install package.json
// npm i nodemon apollo-server
// Apollo Server is a popular open-source server that works with GraphQL to help build APIs.
// apollo graphql is used to handle graphql queries and build server
// if type is not mentioned as module in package.json, we will use require instead of import
const { gql, ApolloServer } = require("apollo-server");
const users = [
  {
    id: 0,
    name: "JS Cafe",
    problems: [0, 1],
  },
  {
    id: 1,
    name: "Roadside Coder",
    problems: [1, 2],
  },
];

const problems = [
  {
    id: 0,
    title: "Two Sum",
    solvers: [0], // this proble was done by users with id 0
  },
  {
    id: 1,
    title: "Three Sum",
    solvers: [0, 1], // this proble was done by users with id 0,1
  },
  {
    id: 2,
    title: "Four Sum",
    solvers: [1], // this proble was done by users with id 1
  },
];
//defining schema of users and problems
const typeDefs = gql(`
    type User {
    id:ID,
    name: String,
    problems: [Problem] 
    }

    type Problem{
    id: ID,
    title: String,
    solvers:[User] 
    }

    type Query{
    users: [User],
    problems:[Problem]
    }
    `);

// resolver
// A resolver determines the exact query that needs to be executed when someone wants to fetch a user. It specifies the actions required to retrieve
//  a particular type of data. Similarly, when someone needs to find a problem, the resolver outlines the necessary query to execute in order to fetch
//   that specific problem.

// When a query is run, either for users or for problems, the resolver defines which command or database call should be made. It structures the
//  SQL query to fetch the correct user data or the related user problems.
// The only resolver we’ll need is for the problems and solvers fields because ID and name can be automatically resolved. However, since problems
// and solvers are related fields, GraphQL cannot automatically understand how to generate the data for these fields. Therefore, we need to define a
//  resolver to specify how to fetch the problems and solvers correctly.

// Resolver - A server function that fulfills a request of a certain field. Usually, the first resolver to be called is the query/mutation resolver,
//  followed by the resolver of every field returned in the response.

const resolvers = {
  Query: {
    // write your database calls or raw sqls
    users: () => {
      return users;
    },
    problems: () => {
      return problems;
    },
  },
  User: {
    // inside User we get user
    problems: (user) => {
      return problems.filter((problem) => problem.solvers.includes(user.id));
    },
  },
  Problem: {
    // inside Problem we get problem
    solvers: (problem) => {
      return users.filter((user) => user.problems.includes(problem.id));
    },
  },
};

// create apollo server instance
const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000).then(({ url }) => {
  console.log(`GraphQl started on ${url}`);
});

//npm start
