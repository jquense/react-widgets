const { stripIndent } = require('common-tags');

const localizationWarning = stripIndent`
  <div className='alert alert-warning'>
   <i className='fa fa-exclamation-triangle'/>
   You must configure a <a href='#/i18n'>localizer</a> to use this component!
  </div>
`

module.exports = function({ attributes, props, body, heading, toHtml }) {
  const widgetName = attributes.name

  return stripIndent`
    import Editor from '@monastic.panic/component-playground/Editor';
    import React from 'react';
    import DropdownButton from 'react-bootstrap/lib/DropdownButton';
    import { Link } from 'react-router';

    import ImportSection from '../ImportSection';
    import MenuItem from '../ApiMenuItem';
    import PropHeader from '../PropHeader';
    import WidgetDemo from '../demos/${widgetName}';
    import EditableExample from '../EditableExample';

    let widgetName = '${widgetName}';

    module.exports = React.createClass({
        childContextTypes: {
          prefix: React.PropTypes.string.isRequired
        },

        getChildContext() {
          return { prefix: '${widgetName.toLowerCase()}/' };
        },

        render() {
          const { scope, className, style } = this.props;
          return (
            <section
              className={className + ' pg-api'}
              style={style}
            >
              <h1 className="page-header">
                ${widgetName}
                <span className='pull-right'>
                  <DropdownButton
                    pullRight
                    bsSize="large"
                    bsStyle='link'
                    title='props'
                    id='props-${widgetName}'
                  >
                    ${props.map(prop => `
                    <MenuItem>${prop}</MenuItem>`).join('')}
                  </DropdownButton>
                </span>
              </h1>
              ${heading || ''}
              ${attributes.localized && localizationWarning || ''}
              <ImportSection widgetName={widgetName} />

              <WidgetDemo shortcuts={${toHtml(attributes.shortcuts)}} />

              ${body}
            </section>
          )
       }
    })
  `;
}
