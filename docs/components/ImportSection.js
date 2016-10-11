import React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';

const propTypes = {
  widgetName: React.PropTypes.string.isRequired
};

function Pre({ code }) { // eslint-disable-line react/prop-types
  let syntax = Prism.languages.jsx;
  let highlighted = Prism.highlight(code, syntax);
  return (
    <pre className='prism-block prism-theme-one-light'>
      <code dangerouslySetInnerHTML={{ __html: highlighted}} />
    </pre>
  )
}

function ImportSection({ widgetName }) {
  let widgetImport = `import ${widgetName} from 'react-widgets/lib/${widgetName}'`;
  let mainImport = `import { ${widgetName} } from 'react-widgets'`;

  return (
    <div className='import-section pg-code-section'>
      <div>
        <div className='import-section-label'>> Individual component</div>
        <Pre code={widgetImport} />
      </div>
      <div>
        <div className='import-section-label'>> Main export</div>
        <Pre code={mainImport} />
      </div>
    </div>
  );
}

ImportSection.propTypes = propTypes;

export default ImportSection;
