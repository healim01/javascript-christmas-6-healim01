import { Console } from "@woowacourse/mission-utils";
import MESSAGES from "../constants/messages.js";
import { orderDate } from "../constants/system.js";

const OutputView = {
  print(message) {
    Console.print(message);
  },

  printMenu() {
    Console.print("<주문 메뉴>");
    // ...
  },

  welcome() {
    this.print(MESSAGES.welcome);
  },

  startCheckOrder(date) {
    const date = orderDate;
    this.print(`${date}s${MESSAGES.startCheckOrder}`);
  },

  error(error) {
    this.print(error);
  },
};

export default OutputView;
