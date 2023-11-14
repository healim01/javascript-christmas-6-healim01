import splitStringToArray from "../utils/splitStringtoArray.js";
import InputView from "../view/InputView.js";

class Controller {
  #rDate;
  #rMenu;

  constructor() {
    this.#rDate = 0;
    this.#rMenu = {};
  }
  async start() {
    this.#constomerInfo();
  }

  async #constomerInfo() {
    InputView.welcome();
    await this.#getDate();
    this.#rMenu = await this.#getMenu();
  }

  async #getDate() {
    this.#rDate = await InputView.readDate();
  }

  async #getMenu() {
    const iMenu = await InputView.readMenu();
    return splitStringToArray(iMenu);
  }
}
export default Controller;
