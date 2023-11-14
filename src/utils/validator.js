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

export const isOnMenu = (menuItems) => {
  for (const menuItem of menuItems) {
    if (!all_menus.some((item) => item.name === menuItem.name)) {
      return false;
    }
  }

  return true;
};

export const isAllDrink = (menuItems) => {
  for (const menuItem of menuItems) {
    if (!drink_menu.some((item) => item.name === menuItem.name)) {
      return false;
    }
  }
  return true;
};

export const isTooMany = (menuItems) => {
  let sum = 0;
  for (const menuItem of menuItems) {
    sum += menuItem.quantity;
  }

  return sum > 20;
};

export const isAlreadyOrder = (menuItems) => {
  const menuNames = new Set();

  for (const menuItem of menuItems) {
    if (menuNames.has(menuItem.name)) {
      return true;
    }
    menuNames.add(menuItem.name);
  }

  return false;
};
