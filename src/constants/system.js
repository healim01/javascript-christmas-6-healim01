export const MIN = 1;
export const MAX = 31;
export const DEC_START = 4; // 금요일을 기준으로 12월 1일이 4일이다.
export const DISCOUNT_AMOUNT = 2023;

export const orderDate = (date) => {
  return `12월 ${date}일`;
};

export const EXTRAGIFT = Object.freeze("샴페인 1개");
export const NOTHING = Object.freeze("없음");

export const APPETIZER_MENU = Object.freeze([
  {
    name: "양송이수프",
    price: 6000,
  },
  {
    name: "타파스",
    price: 5500,
  },
  {
    name: "시저샐러드",
    price: 8000,
  },
]);

export const MAIN_MENU = Object.freeze([
  {
    name: "티본스테이크",
    price: 55000,
  },
  {
    name: "바비큐립",
    price: 54000,
  },
  {
    name: "해산물파스타",
    price: 35000,
  },
  {
    name: "크리스마스파스타",
    price: 25000,
  },
]);

export const DESERT_MENU = Object.freeze([
  {
    name: "초코케이크",
    price: 15000,
  },
  {
    name: "아이스크림",
    price: 5000,
  },
]);

export const DRINK_MENU = Object.freeze([
  {
    name: "제로콜라",
    price: 3000,
  },
  {
    name: "레드와인",
    price: 60000,
  },
  {
    name: "샴페인",
    price: 25000,
  },
]);

export const ALL_MENUS = [
  ...APPETIZER_MENU,
  ...MAIN_MENU,
  ...DESERT_MENU,
  ...DRINK_MENU,
];

export const DISCOUNT_EVENT = Object.freeze({
  xmas: "크리스마스 디데이 할인",
  week: "평일 할인",
  weekend: "주말 할인",
  special: "특별 할인",
  extra: "증정 이벤트",
});
