import React from 'react';

global.navigator = {};

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key={1} href="https://fonts.googleapis.com/css?family=Lobster|Raleway:400,700,800,900" rel="stylesheet" />,
    <link key={2} href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>,
  ])
}
