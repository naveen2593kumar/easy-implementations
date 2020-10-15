import StateManager from './StateManager.js';

export default class ComponentDisplay {

  constructor() {
    this.stateManager = new StateManager();

    this.div = document.createElement('div');
    this.div.classList.add('area-display');

    document.body.appendChild(this.div);

    this.refresh();
    window.addEventListener('state-updated', () => {
      this.refresh();
    });
  }

  refresh() {
    this.div.innerHTML = JSON.stringify(this.stateManager.getState());
  }

}