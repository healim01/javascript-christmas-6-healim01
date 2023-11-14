import { Console } from "@woowacourse/mission-utils";
import MESSAGES from "../constants/messages.js";

const InputView = {
  welcome() {
    Console.print(MESSAGES.welcome);
  },

  async readDate() {
    const input = await Console.readLineAsync(MESSAGES.readDate);
    return input;
  },

  async readMenu() {
    const input = await Console.readLineAsync(MESSAGES.readMenu);
    return input;
  },
};
export default InputView;
