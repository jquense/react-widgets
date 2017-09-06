import get from 'lodash/get'
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  prop: PropTypes.object.isRequired,
};

function PropDescription({ prop }) {
  const html = get(prop, 'description.childMarkdownRemark.html', '');

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

PropDescription.propTypes = propTypes;

export default PropDescription;

export const propFragment = graphql`
  fragment PropDescription_prop on ComponentProp {
    description {
      childMarkdownRemark {
        html
      }
    }
  }
`
