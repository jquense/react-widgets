import { isShallowEqual } from './_';

export default function (component, props, state) {
  return (
    !isShallowEqual(component.props, props) ||
    !isShallowEqual(component.state, state)
  );
}
