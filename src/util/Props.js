

export function pick(props, componentClass) {
  let keys = Object.keys(componentClass.propTypes);
  let result = {};
  Object.keys(props).forEach(key => {
    if (keys.indexOf(key) === -1) return
    result[key] = props[key];
  })
  return result
}

export function omitOwn(component, ...others) {
  let initial = Object.keys(component.constructor.propTypes);
  let keys = others.reduce((arr, compClass) => [
    ...arr,
    ...Object.keys(compClass.propTypes)], initial
  );

  let result = {};
  Object.keys(component.props).forEach(key => {
    if (keys.indexOf(key) !== -1) return
    result[key] = component.props[key];
  })
  return result
}
