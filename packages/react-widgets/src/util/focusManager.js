import { focusManager } from 'react-component-managers';

export default function createFocusManager(component, options) {
  const didHandle = options.didHandle;

  return focusManager(component, {
    ...options,
    onChange: focused => component.setState({ focused }),
    isDisabled: () => component.props.disabled === true,
    didHandle(focused, event) {
      let handler = this.props[focused ? 'onFocus' : 'onBlur']
      handler && handler(event);

      if (didHandle && !event.isWidgetDefaultPrevented)
        didHandle(focused, event);
    }
  })
}
