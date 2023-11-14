import { Console } from "@woowacourse/mission-utils";
import MESSAGES from "../constants/messages.js";

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

  error(error) {
    this.print(error);
  },
};

export default OutputView;
