import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import Link from 'gatsby-link';
import * as PropTypes from 'prop-types'
import React from 'react';
import Helmet from 'react-helmet'
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import ImportSection from '../components/ImportSection';
import ApiMenuItem from '../components/ApiMenuItem';
import PropHeader from '../components/PropHeader';
import PropExample from '../components/PropExample';
import PropDescription from '../components/PropDescription';


require('../components/locales')

function basename(path) {
  return path.slice(path.lastIndexOf('/') + 1)
}

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
    const { data: { componentMetadata }, pathContext } = this.props;
    const { displayName, props, doclets } = componentMetadata;

    const { frontmatter = {}, html } = get(componentMetadata, 'description.childMarkdownRemark', {});

    let WidgetDemo = require(`../demos/${displayName}`).default;

    if (WidgetDemo.default) WidgetDemo = WidgetDemo.default;

    const sorted = sortBy(props, p => p.name.trim().toLowerCase())
      .filter(p => !p.doclets.ignore);

    const composes = (componentMetadata.composes || [])
      .map(basename)
      .filter(p => pathContext.publicComponents.includes(p))
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
                {!!composes.length && [
                  <MenuItem key="1" header>Composes:</MenuItem>,
                  ...composes.map(composes =>
                    <MenuItem
                      key={composes}
                      href={`/react-widgets/api/${composes}`}
                    >
                      {composes}
                    </MenuItem>
                  ),
                  <MenuItem key="2" divider />,
                ]}
                {sorted.map(prop =>
                  <ApiMenuItem key={prop.name}>{prop.name}</ApiMenuItem>
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
              You must configure a <Link to='localization'>localizer</Link> to use this component!
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
          <section key={prop.name}>
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
      composes
      props {
        name
        ...PropHeader_prop
        ...PropExample_prop
        ...PropDescription_prop
      }
      description {
        childMarkdownRemark {
          frontmatter {
            localized
            shortcuts { key, label }
          }
          html
        }
      }
    }
  }
`
