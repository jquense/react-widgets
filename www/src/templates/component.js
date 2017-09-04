import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import * as PropTypes from 'prop-types'
import React from 'react';
import Helmet from 'react-helmet'
import DropdownButton from 'react-bootstrap/lib/DropdownButton';

import ImportSection from '../components/ImportSection';
import MenuItem from '../components/ApiMenuItem';
import PropHeader from '../components/PropHeader';
import PropExample from '../components/PropExample';
import PropDescription from '../components/PropDescription';


require('../components/locales')


const propTypes = {
  data: PropTypes.shape({
    componentMetadata: PropTypes.object.isRequired,
  }),
};


class ComponentTemplate extends React.Component {
  static childContextTypes = {
    prefix: PropTypes.string.isRequired
  };
  getChildContext() {
    const { data: { componentMetadata } } = this.props;
    return { prefix: componentMetadata.displayName };
  }
  render() {
    const { data: { componentMetadata } } = this.props;
    const { displayName, props, doclets } = componentMetadata;

    const { frontmatter = {}, html } = get(componentMetadata, 'description.childMarkdownRemark', {});

    let WidgetDemo = require(`../demos/${displayName}`).default;

    if (WidgetDemo.default) WidgetDemo = WidgetDemo.default;

    const sorted = sortBy(props, p => p.name.trim().toLowerCase())
      .filter(p => !p.doclets.ignore);

    return (
      <div>
        <Helmet title={displayName} />
        <section className={'pg-api'}>
          <h1 className="page-header">
            {displayName}{' '}<small>{frontmatter.subtitle || ''}</small>
            <span className='pull-right'>
              <DropdownButton
                pullRight
                bsSize="large"
                bsStyle='link'
                title='props'
                id='props-${widgetName}'
              >
                {sorted.map(prop =>
                  <MenuItem>{prop.name}</MenuItem>
                )}
              </DropdownButton>
            </span>
          </h1>
          {html && (
            <p dangerouslySetInnerHTML={{ __html: html }} />
          )}
          {frontmatter.localized && (
            <div className='alert alert-warning'>
              <i className='fa fa-exclamation-triangle'/>
              You must configure a <a href='#/i18n'>localizer</a> to use this component!
            </div>
          )}

          <ImportSection widgetName={displayName} />

          <WidgetDemo shortcuts={frontmatter.shortcuts} />
        </section>

        <h2>
          <div>Props</div>
          {doclets.extends && (
            <small>Also accepts all <code>{doclets.extends}</code> props, unless otherwise noted.</small>
          )}
        </h2>
        {sorted.map(prop => (
          <section>
            <PropHeader prop={prop} />
            <PropDescription prop={prop} />
            <PropExample prop={prop} displayName={displayName} />
          </section>
        ))}
      </div>
    );
  }
}

ComponentTemplate.propTypes = propTypes;

export default ComponentTemplate

export const pageQuery = graphql`
  query PostPage($displayName: String!) {
    componentMetadata(displayName: { eq: $displayName }) {
      displayName
      doclets
      props {
        ...PropHeader_prop
        ...PropExample_prop
        ...PropDescription_prop
        name
      }
      description {
        childMarkdownRemark {
          frontmatter {
            shortcuts { key, label }
          }
          html
        }
      }
    }
  }
`
