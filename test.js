var testsContext = require.context("./test", true, /\.browser\.js$/);
testsContext.keys().forEach(testsContext);