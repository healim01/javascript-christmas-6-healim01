import { Console } from "@woowacourse/mission-utils";
import MESSAGES from "../constants/messages.js";
import { orderDate } from "../constants/system.js";

const OutputView = {
  print(message) {
    Console.print(message);
  },

  welcome() {
    this.print(MESSAGES.welcome);
  },

  startCheckOrder(date) {
    const rdate = orderDate(date);
    this.print(`${rdate}${MESSAGES.startCheckOrder}`);
  },

  printMenu(menus) {
    this.print(MESSAGES.printMenu);
    menus.forEach((item) => {
      this.print(`${item.name} ${item.quantity}개`);
    });
  },

  printOriginPrice(price) {
    this.print(MESSAGES.orginPrice);
    this.print(`${price}원`);
  },

  printExtraGift(gift) {
    this.print(MESSAGES.extraGift);
    this.print(gift);
  },

  printDiscount(item, price) {
    this.print(`${item}: -${price}원`);
  },

  printTotalDiscount(price) {
    this.print(MESSAGES.totalDiscount);
    this.print(`-${price}원`);
  },

  error(error) {
    this.print(error);
  },
};

export default OutputView;
