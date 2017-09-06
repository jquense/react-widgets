import React from 'react'
import transform from 'lodash/transform';

function displayObj(obj){
  return JSON.stringify(obj, null, 2).replace(/"|'/g, '')
}

function getDisplayTypeName(typeName) {
  if (typeName === 'func') {
    return 'function';
  } else if (typeName === 'bool') {
    return 'boolean';
  } else if (typeName === 'object') {
    return 'Object';
  }

  return typeName;
}

function renderObject(props){
  return transform(props, (obj, val, key) => {
    obj[val.required ? key : key + '?'] = simpleType(val)

  }, {})
}

function simpleType(type = {}) {
  let name = getDisplayTypeName(type.name);

  switch (name) {
    case 'instanceOf':
      return type.value;
    case 'node':
      return 'ReactNode';
    case 'function':
      return 'Function';
    case 'elementType':
      return 'ReactClass<any>';
    case 'object':
    case 'Object':
      if (type.value)
        return renderObject(type.value)
      return name;
    case 'array':
    case 'Array': {
      let child = simpleType(type.value);

      return 'Array<' + child + '>';
    }
    case 'union':
      return type.value.map(val => {
        let result = simpleType(typeof val === 'string' ? { name: val } : val);
        return result
      }).join(' | ')
    case 'custom':
    default:
      return name;
  }
}

function renderType(type) {
  let name = getDisplayTypeName(type.name);

  switch (name) {
    case 'node':
      return 'any';
    case 'function':
      return 'Function';
    case 'elementType':
      return 'ReactClass<any>';
    case 'instanceOf':
      return type.value;
    case 'object':
    case 'Object':
    case 'shape':
      if (type.value)
        return displayObj(renderObject(type.value))

      return name;
    case 'union':
      return type.value.reduce((current, val, i, list) => {
        val = typeof val === 'string' ? { name: val } : val;
        let item = renderType(val);

        if (React.isValidElement(item)) {
          item = React.cloneElement(item, {key: i});
        }

        current = current.concat(item);

        return i === (list.length - 1) ? current : current.concat(' | ');
      }, []);
    case 'array':
    case 'Array':
    case 'arrayOf': {
      if (!type.value) return 'Array'
      let child = renderType(type.value);

      return <span>{'Array<'}{ child }{'>'}</span>;
    }
    case 'enum':
      return renderEnum(type);
    case 'custom':
    default:
      return name;
  }
}

function renderEnum(enumType) {
  const enumValues = (enumType.value || []).map( v => v.value);
  return enumValues.join(' | ');
}

export default function Type({ type }) {
  return (
    <span className='prop-header__type'>
      <span className='prop-header__label'>{'type: '}</span>
      <span style={{ whiteSpace: 'pre' }}>{renderType(type)}</span>
    </span>
  );
}
