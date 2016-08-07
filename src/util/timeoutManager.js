import spyOnComponent from 'spy-on-component';
import mountManager from './mountManager';

export default function createTimeoutManager(componentInstance) {
  let isMounted = mountManager(componentInstance);
  let timers = Object.create(null);
  let manager;

  spyOnComponent(componentInstance, {
    componentWillUnmount() {
      for (var k in timers) clearTimeout(timers[k])
      timers = null;
    }
  })

  return manager = {
    clear(key) {
      clearTimeout(timers[key])
    },

    set(key, fn, ms) {
      if (!isMounted()) return

      manager.clear(key)
      timers[key] = setTimeout(fn, ms)
    }
  }
}
