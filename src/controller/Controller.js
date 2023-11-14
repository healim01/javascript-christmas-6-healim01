// constants
import { ERROR } from "../constants/error.js";
import { max, min } from "../constants/system.js";
// utils
import splitStringToArray from "../utils/splitStringtoArray.js";
import {
  isOutOfRange,
  isOnMenu,
  isAllDrink,
  isTooMany,
  isAlreadyOrder,
  isNumber,
} from "../utils/validator.js";
// View
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
// Model
import OrderMenu from "../model/OrderMenu.js";

class Controller {
  #rDate;
  #rMenu;
  #orderMenu;

  constructor() {
    this.#rDate = 0;
    this.#rMenu = {};
    this.#orderMenu = new OrderMenu();
  }
  async start() {
    await this.#constomerInfo();
    this.#checkOrder();
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
    if (isNumber(date)) {
      throw new Error(ERROR.NotNumber);
    }
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
    if (isAllDrink(menu)) {
      throw new Error(ERROR.AllDrink);
    }
    if (isTooMany(menu)) {
      throw new Error(ERROR.TooMany);
    }
    if (isAlreadyOrder(menu)) {
      throw new Error(ERROR.AlreadyOrder);
    }
  }

  #checkOrder() {
    OutputView.startCheckOrder(this.#rDate);
    this.#viewOrder();
  }

  #viewOrder() {
    OutputView.printMenu(this.#rMenu);
  }
}
export default Controller;