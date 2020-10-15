import StateManager from './StateManager.js';

export default class ComponentMinus {
  constructor() {
    const div = document.createElement('div');
    div.classList.add('area-minus');

    const button = document.createElement('button');
    const stateManager = new StateManager();

    button.innerText = 'Minus -1';
    button.addEventListener('click', () => {
      stateManager.setState({ count: (stateManager.getState().count || 0) - 1 });
    });

    div.appendChild(button);
    document.body.appendChild(div);
  }
}