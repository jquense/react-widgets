import React from 'react';
import CodeBlock from './CodeBlock';

const propTypes = {
  widgetName: React.PropTypes.string.isRequired
};

function ImportSection({ widgetName }) {
  let widgetImport = `import ${widgetName} from 'react-widgets/lib/${widgetName}'`;
  let mainImport = `import { ${widgetName} } from 'react-widgets'`;

  return (
    <div className='import-section'>
      <div className='import-section-label'>> Individual component</div>
      <CodeBlock code={widgetImport}/>

      <div className='import-section-label'>> Main export</div>
      <CodeBlock code={mainImport}/>
    </div>
  );
}

ImportSection.propTypes = propTypes;

export default ImportSection;
