import { Console } from "@woowacourse/mission-utils";
import MESSAGES from "../constants/messages.js";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGES.readDate);
  },
};
export default InputView;
