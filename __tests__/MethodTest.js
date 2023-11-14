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

describe("기능 테스트", () => {
  test("할인 전 금액 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1,초코케이크-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["70,000원"];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("증정 메뉴 증정 여부 확인 (증정)", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<증정 메뉴>", "샴페인 1개"];

    expectLogContains(getOutput(logSpy), expected);
  });
  test("증정 메뉴 증정 여부 확인 (미증정)", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "바비큐립-1,초코케이크-2,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<증정 메뉴>", "없음"];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("크리스마스 할인 여부 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["10", "바비큐립-1,초코케이크-2,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["-1,900원"];

    expectLogContains(getOutput(logSpy), expected);
  });
  test("평일 할인 여부 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["4", "초코케이크-2"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["평일 할인: -4,046원"];

    expectLogContains(getOutput(logSpy), expected);
  });
  test("주말 할인 여부 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["8", "티본스테이크-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["주말 할인: -2,023원"];

    expectLogContains(getOutput(logSpy), expected);
  });
  test("특별 할인 여부 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["24", "티본스테이크-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["특별 할인: -1,000원"];

    expectLogContains(getOutput(logSpy), expected);
  });
  test("증정품 할인 여부 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["25", "티본스테이크-10"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["증정 이벤트: -25,000원"];

    expectLogContains(getOutput(logSpy), expected);
  });
  test("없을시 없음 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["1", "타파스-1,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["없음"];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("총 해택 금액 일치 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<총혜택 금액>", "-31,246원"];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("예상 결제 금액 일치 확인", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<할인 전 총주문 금액>", "142,000원"];

    expectLogContains(getOutput(logSpy), expected);
  });
});
