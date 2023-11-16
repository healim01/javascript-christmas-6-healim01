import { ALL_MENUS, DRINK_MENU } from "../constants/system.js";

export const isOutOfRange = (value, max, min) => value < min || value > max;

export const isNumber = (value) => {
  return isNaN(value);
};

export const isOnMenu = (menuItems) => {
  for (const menuItem of menuItems) {
    if (!ALL_MENUS.some((item) => item.name === menuItem.name)) {
      return false;
    }
  }

  return true;
};

export const isAllDrink = (menuItems) => {
  for (const menuItem of menuItems) {
    if (!DRINK_MENU.some((item) => item.name === menuItem.name)) {
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

export const isValidInput = (items) => {
  for (const item of items) {
    if (!item.includes("-")) return false;
  }
  return true;
};
