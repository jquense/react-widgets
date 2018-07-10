const React = require('react')

global.navigator = {}

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key={1}
      href="https://fonts.googleapis.com/css?family=Lobster|Raleway:400,700,800,900"
      rel="stylesheet"
    />,
    <link
      key="2"
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.1.0/css/solid.css"
      integrity="sha384-TbilV5Lbhlwdyc4RuIV/JhD8NR+BfMrvz4BL5QFa2we1hQu6wvREr3v6XSRfCTRp"
      crossorigin="anonymous"
    />,
    <link
      key="4"
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.1.0/css/brands.css"
      integrity="sha384-7xAnn7Zm3QC1jFjVc1A6v/toepoG3JXboQYzbM0jrPzou9OFXm/fY6Z/XiIebl/k"
      crossorigin="anonymous"
    />,
    <link
      key="3"
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.1.0/css/fontawesome.css"
      integrity="sha384-ozJwkrqb90Oa3ZNb+yKFW2lToAWYdTiF1vt8JiH5ptTGHTGcN7qdoR1F95e0kYyG"
      crossorigin="anonymous"
    />,
  ])
}
