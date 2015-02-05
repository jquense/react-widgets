var testsContext = require.context("./test", true, /\.browser\.(js$|jsx$)/);
testsContext.keys().forEach(testsContext);