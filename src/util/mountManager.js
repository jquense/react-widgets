import spyOnComponent from 'spy-on-component';

export default function spyOnMount(componentInstance) {
  let mounted = true;

  // if (componentInstance.isMounted)
  //   return componentInstance.isMounted.bind(componentInstance);

  spyOnComponent(componentInstance, {
    componentWillUnmount() {
      mounted = false;
    }
  })

  return () => mounted
}
