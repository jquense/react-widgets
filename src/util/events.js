

var evts = module.exports = {

  once: function(node, eventName, handler){
    
    return handleOnce

    function handleOnce(){
      evts.off(none, eventName, handleOnce)
      return handler.apply(this, arguments)
    }
  },

  on: function(node, eventName, handler){
    if (node.addEventListener) 
      node.addEventListener(eventName, handler, false);
    
    else if (node.attachEvent) 
      node.attachEvent('on' + eventName, handler);
    
    else 
      node['on' + eventName] = handler;
  },

  off: function(node, eventName, handler){
    if (node.addEventListener) 
      node.removeEventListener(eventName, handler, false);
    
    else if (node.attachEvent) 
      node.detachEvent('on' + eventName, handler);
    
    else 
      node['on' + eventName] = null;
  },

  trigger: function(node, type){
    var event = document.createEvent('Events')
    event.initEvent(type, true, true)
    node.dispatchEvent(event);
  },
}
