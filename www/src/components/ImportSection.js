import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  widgetName: PropTypes.string.isRequired
};

const t = (token, content) =>
  <span className={`token ${token}`}>{content}</span>


function ImportSection({ widgetName }) {
  return (
    <div className='import-section pg-code-section'>
      <div>
        <div className='import-section-label'>> Individual component</div>
        <pre className='prism-block'>
          <code>
            {t('keyword', 'import')}{' '}
            {t('string', widgetName)}{' '}
            {t('keyword', 'from')}{' '}
            {t('string', `'react-widgets/lib/${widgetName}'`)}
          </code>
        </pre>
      </div>
      <div>
        <div className='import-section-label'>> Main export</div>
        <pre className='prism-block'>
          <code>
            {t('keyword', 'import')}
              {' { '}{t('string', widgetName)}{' } '}
            {t('keyword', 'from')}{' '}
            {t('string', `'react-widgets'`)}
          </code>
        </pre>
      </div>
    </div>
  );
}

ImportSection.propTypes = propTypes;

export default ImportSection;
