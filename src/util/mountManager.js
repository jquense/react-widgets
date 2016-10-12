import spyOnComponent from 'spy-on-component';

export default function spyOnMount(componentInstance) {
  let mounted = true;

  spyOnComponent(componentInstance, {
    componentWillUnmount() {
      mounted = false;
    }
  })

  return () => mounted
}
