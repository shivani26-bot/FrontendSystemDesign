const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
};

// npm run build: it will create a dist folder where we have the compressed version of our app in main.js file , we can see the file size of main.js in network tab
// in production build it has size of 11 kb
// after using gzip, the production build file is reduced to 1kb

// If you refresh your production app and still see the JavaScript file as 11 KB in size instead of the smaller gzip-compressed version, it indicates that the server is not configured to serve gzip files. To resolve this, you need to make changes to the server setup to enable gzip compression.

// Here’s what needs to be done:

// Set Up an Nginx Server:

// We will set up an Nginx server on an Ubuntu machine hosted on an Amazon EC2 instance.
// Enable Gzip Compression:

// On the Nginx server, we will configure gzip compression. This involves modifying the Nginx configuration file to ensure the server serves compressed versions of JavaScript and other static files.
// Deploy the Production Build:

// Deploy the production build of the application to the Nginx server.
// Verify the Gzip Files:

// After enabling gzip compression, the server will serve the compressed files, significantly reducing their size compared to the original uncompressed files.

//entry:First, we need to tell webpack where to start bundling the javascript files, this we can do by specifying entry property
// output:Here we tell webpack to create the final bundled file in dist folder in the root of the project.
// Once the bundled javascript file is created we need to tell webpack to inject it as a script tag to the HTML file. To do that we first need to install a webpack plugin that will help us do it.
// plugins:This will take the /public/index.html and inject script tag to it. And move that HTML file to the dist folder.
// We now need to tell webpack to transpile javascript files using babel before bundling them. To do that we need to define some rules for the module bundling.
// {
//     test: /\.svg$/,
//     use: ["@svgr/webpack"],
//   },
//   {
//     test: /\.(png|jp(e*)g|svg|gif)$/,
//     use: ["file-loader"],
//   },
//   {
//     test: /\.css$/i,
//     use: ["style-loader", "css-loader"],
//   },
