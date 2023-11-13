import MESSAGES from "../constants/messages.js";
import InputView from "../view/InputView.js";

class Controller {
  #rDate;

  constructor() {
    this.#rDate = 0;
  }
  async start() {
    this.#constomerInfo();
  }

  async #constomerInfo() {
    console.log(MESSAGES.welcome);
    this.#rDate = await InputView.readDate();
  }
}
export default Controller;
