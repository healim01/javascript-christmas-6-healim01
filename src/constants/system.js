export const min = 1;
export const max = 31;

export const orderDate = (date) => {
  return `12월 ${date}일`;
};

export const appetizer_menu = Object.freeze([
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

export const main_menu = Object.freeze([
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

export const desert_menu = Object.freeze([
  {
    name: "초코케이크",
    price: 15000,
  },
  {
    name: "아이스크림",
    price: 5000,
  },
]);

export const drink_menu = Object.freeze([
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
