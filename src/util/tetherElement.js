import Tether from 'tether';
import { render, unmountComponentAtNode } from 'react-dom';

class TetherElement {
	constructor(component, options){
		this.component = component;
		this.node = document.createElement('div');
		this.node.style.position = 'absolute';
		document.body.appendChild(this.node);
		this.tether = new Tether({ ... options, element: this.node});
		this.update(component);

	}

	update(component = this.component){

		render(
			component,
			this.node,
			() => this.tether.position()
		);

		this.component = component;
	}

	destroy(){
		unmountComponentAtNode(this.node);
		this.node.parentNode.removeChild(this.node);
		this.tether.destroy();
	}
}

export default TetherElement;
