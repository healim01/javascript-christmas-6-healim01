import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe("예외 테스트", () => {
  test("날짜 범위 예외 테스트", async () => {
    // given
    const INVALID_DATE_MESSAGE =
      "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["3", "해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["0", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_DATE_MESSAGE)
    );
  });

  test("음료만 주문시 예외 테스트", async () => {
    // given
    const INVALID_ORDER_MESSAGE =
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["타파스-2"];
    const logSpy = getLogSpy();
    mockQuestions(["3", "제로콜라-1", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ORDER_MESSAGE)
    );
  });

  test("음식 20개 초과 주문시 예외 테스트", async () => {
    // given
    const INVALID_ORDER_MESSAGE =
      "[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["티본스테이크-5"];
    const logSpy = getLogSpy();
    mockQuestions([
      "3",
      "제로콜라-3,양송이수프-4,양송이수프-7,크리스마스파스타-7",
      ...INPUTS_TO_END,
    ]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ORDER_MESSAGE)
    );
  });

  test("없는 메뉴 주문시 예외 테스트", async () => {
    // given
    const INVALID_ORDER_MESSAGE =
      "[ERROR] 유효하지 않은 메뉴입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["티본스테이크-5"];
    const logSpy = getLogSpy();
    mockQuestions([
      "7",
      "제로콜라-3,양송이수프-4,불고기피자-3",
      ...INPUTS_TO_END,
    ]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ORDER_MESSAGE)
    );
  });
});
