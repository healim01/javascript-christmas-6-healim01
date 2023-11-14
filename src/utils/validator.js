import {
  appetizer_menu,
  desert_menu,
  drink_menu,
  main_menu,
} from "../constants/system.js";

const all_menus = [
  ...appetizer_menu,
  ...main_menu,
  ...desert_menu,
  ...drink_menu,
];

export const isOutOfRange = (value, min, max) => value < min || value > max;

export const isOnMenu = (menu) => {
  for (const menuName in menu) {
    if (all_menus.find((item) => item.name === menuName) === undefined) {
      return false;
    }
  }
};
