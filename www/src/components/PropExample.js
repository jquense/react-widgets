import get from 'lodash/get'
import PropTypes from 'prop-types';
import React from 'react';

import EditableExample from './EditableExample';

const examples = require.context('../examples', false)
const keys = examples.keys();

const propTypes = {
  prop: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
};

function PropExample({ prop, displayName }) {
  let example = get(prop, 'doclets.example', null);
  let exampleName = example;
  let args;

  if (typeof example === 'string')
    example = eval(example);

  if (Array.isArray(example)) {
    [exampleName, args] = example
  }

  if (exampleName === false) return null;
  if (!exampleName) exampleName = prop.name;
  if (!keys.includes(`./${exampleName}`)) return null;

  args = args == null ? [] : [].concat(args);

  return (
    <EditableExample
      codeText={examples(`./${exampleName}`).default(displayName, ...args)}
    />
  );
}

PropExample.propTypes = propTypes;

export default PropExample;

export const propFragment = graphql`
  fragment PropExample_prop on ComponentProp {
    name
    doclets
  }
`
