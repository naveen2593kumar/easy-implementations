export default class StateManager {

  constructor() {
    if (!StateManager.INSTANCE) {
      StateManager.INSTANCE = {};
    }
    StateManager.INSTANCE
    window.state = this.state;
  }

  getState() {
    return StateManager.INSTANCE;
  }

  setState(value) {
    StateManager.INSTANCE = value;
    window.dispatchEvent(new CustomEvent('state-updated', { detail: value }));
  }

}