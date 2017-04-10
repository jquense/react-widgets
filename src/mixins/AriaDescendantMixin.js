import PropTypes from 'prop-types';
import compat from '../util/compat'

let shape = PropTypes.shape({
  //setActive: PropTypes.func,
  reconcile: PropTypes.func
});

function defaultReconcile(key, id) {
  return id;
}

function flushAriaToNode(id, nodeOrComponent, ctx) {
  let node = typeof nodeOrComponent === 'function'
        ? nodeOrComponent(ctx)
        : typeof nodeOrComponent === 'string'
            ? ctx.refs[nodeOrComponent]
            : ctx

  if (node) {
    if (id)
      compat.findDOMNode(node).setAttribute('aria-activedescendant', id)
    else
      compat.findDOMNode(node).removeAttribute('aria-activedescendant')
  }
}

export default function(nodeOrComponent, reconcileChildren = defaultReconcile){

  return {
    propTypes: {
      ariaActiveDescendantKey: PropTypes.string.isRequired
    },

    contextTypes: {
      activeDescendants: shape
    },

    childContextTypes: {
      activeDescendants: shape
    },

    ariaActiveDescendant(id, key = this.props.ariaActiveDescendantKey) {
      let { activeDescendants } = this.context;
      let current = this.__ariaActiveDescendantId

      if (id === undefined)
        return current;

      id = reconcileChildren.call(this, key, id);

      if (id === undefined)
        id = current
      else {
        this.__ariaActiveDescendantId = id
        flushAriaToNode(id, nodeOrComponent, this)
      }

      activeDescendants
        && activeDescendants.reconcile(key, id)
    },

    getChildContext() {
      return this._context || (this._context = {
        activeDescendants: {
          reconcile: (key, id) => this.ariaActiveDescendant(id, key)
        }
      })
    }
  };
}
