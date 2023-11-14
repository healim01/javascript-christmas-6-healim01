import { ERROR } from "../constants/error.js";
import { max, min } from "../constants/system.js";
import splitStringToArray from "../utils/splitStringtoArray.js";
import { isOutOfRange, isOnMenu } from "../utils/validator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

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
    OutputView.welcome();
    await this.#getDate();
    await this.#getMenu();
  }

  async #getDate() {
    let isValidDate = false;

    while (!isValidDate) {
      try {
        this.#rDate = await InputView.readDate();
        this.#validateDate(this.#rDate);
        isValidDate = true;
      } catch (error) {
        OutputView.error(error.message);
      }
    }
  }

  #validateDate(date) {
    if (isOutOfRange(date, min, max)) {
      throw new Error(ERROR.OutOfRange);
    }
  }

  async #getMenu() {
    let isValidMenu = false;
    while (!isValidMenu) {
      try {
        const iMenu = await InputView.readMenu();
        this.#rMenu = splitStringToArray(iMenu);
        this.#validateMenu(this.#rMenu);
        isValidMenu = true;
      } catch (error) {
        OutputView.error(error.message);
      }
    }
  }

  #validateMenu(menu) {
    if (!isOnMenu(menu)) {
      throw new Error(ERROR.InvalidMenu);
    }
  }
}
export default Controller;
