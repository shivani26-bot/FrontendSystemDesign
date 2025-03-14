function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

export { sum, multiply };

//   before tree shaking, in build file i get eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ \"./src/math.js\");\n\nconsole.log((0,_math__WEBPACK_IMPORTED_MODULE_0__.multiply)(2, 3));\n\n//npm run dev\n//npm run build - to create a production build\n\n//# sourceURL=webpack://compression/./src/index.js?");
// this means both the sum and multiply functions are exported
// after tree shaking, again npm run build
// eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   multiply: () => (/* binding */ multiply)\n/* harmony export */ });\n/* unused harmony export sum */\nfunction sum(a, b) {\n  return a + b;\n}\nfunction multiply(a, b) {\n  return a * b;\n}\n\n\n//   before tree shaking, in build file i get eval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ \\\"./src/math.js\\\");\\n\\nconsole.log((0,_math__WEBPACK_IMPORTED_MODULE_0__.multiply)(2, 3));\\n\\n//npm run dev\\n//npm run build - to create a production build\\n\\n//# sourceURL=webpack://compression/./src/index.js?\");\n// this means both the sum and multiply functions are exported \n// after tree shaking, again npm run build\n\n//# sourceURL=webpack://compression/./src/math.js?");
// now the sum is unused harmony export
