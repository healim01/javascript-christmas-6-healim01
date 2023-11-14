// constants
import { ERROR } from "../constants/error.js";
import MESSAGES from "../constants/messages.js";
import { DISCOUNT_EVENT, MAX, MIN, NOTHING } from "../constants/system.js";
// utils
import splitStringToArray from "../utils/splitStringToArray.js";
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
  #originPrice;
  #totaldiscount;

  constructor() {
    this.#rDate = 0;
    this.#rMenu = {};
    this.#orderMenu = new OrderMenu();
    this.#originPrice = 0;
    this.#totaldiscount = 0;
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
    if (isOutOfRange(date, MAX, MIN)) {
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

  #formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(price);
  }

  #checkOrder() {
    OutputView.startCheckOrder(this.#rDate);
    this.#viewOrder();
    this.#showOriginalPrice();
    this.#extraGift();
    this.#checkDiscount();
    this.#showTotalDiscountPrice();
    this.#printTotalPrice();
    this.#printBadge();
  }

  #viewOrder() {
    OutputView.printMenu(this.#rMenu);
  }

  #showOriginalPrice() {
    this.#originPrice = this.#orderMenu.getOriginPrice(this.#rMenu);
    OutputView.printOriginPrice(this.#formatPrice(this.#originPrice));
  }

  #extraGift() {
    const extraGift = this.#orderMenu.getExtraGift(this.#originPrice);
    OutputView.printExtraGift(extraGift);
  }

  #checkDiscount() {
    OutputView.print(MESSAGES.discount);

    let discount;
    if (this.#originPrice > 10000) {
      discount = this.#orderMenu.discountPrice(
        this.#rDate,
        this.#rMenu,
        this.#originPrice
      );

      this.#checkDiscountEvent(discount);

      this.#totaldiscount = Object.values(discount).reduce(
        (acc, cur) => acc - cur,
        0
      );

      if (discount.extraGiftDscount != 0) {
        this.#originPrice += discount.extraGiftDscount;
      }
    }

    if (this.#totaldiscount == 0) {
      OutputView.print(NOTHING);
    }
  }

  #checkDiscountEvent(discount) {
    if (discount.xmasDiscount != 0) {
      OutputView.printDiscount(
        DISCOUNT_EVENT.xmas,
        this.#formatPrice(discount.xmasDiscount)
      );
    }
    if (discount.weekDiscount != 0) {
      OutputView.printDiscount(
        DISCOUNT_EVENT.week,
        this.#formatPrice(discount.weekDiscount)
      );
    }
    if (discount.weekendDiscount != 0) {
      OutputView.printDiscount(
        DISCOUNT_EVENT.weekend,
        this.#formatPrice(discount.weekendDiscount)
      );
    }
    if (discount.specialDiscount != 0) {
      OutputView.printDiscount(
        DISCOUNT_EVENT.special,
        this.#formatPrice(discount.specialDiscount)
      );
    }
    if (discount.extraGiftDscount != 0) {
      OutputView.printDiscount(
        DISCOUNT_EVENT.extra,
        this.#formatPrice(discount.extraGiftDscount)
      );
    }
  }

  #showTotalDiscountPrice() {
    OutputView.printPrice(
      MESSAGES.totalDiscount,
      this.#formatPrice(this.#totaldiscount)
    );
  }

  #printTotalPrice() {
    const totalPrice = this.#originPrice + this.#totaldiscount;
    OutputView.printPrice(MESSAGES.totalPrice, this.#formatPrice(totalPrice));
  }

  #printBadge() {
    const badge = this.#orderMenu.getEventBadge(this.#totaldiscount);
    OutputView.print(MESSAGES.badge);
    OutputView.print(badge);
  }
}
export default Controller;
