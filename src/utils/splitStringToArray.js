import { ERROR } from "../constants/error.js";
import { isValidInput } from "./validator.js";

const splitStringToArray = (input) => {
  try {
    let items = input.split(",");
    if (!isValidInput(items)) {
      throw new Error(ERROR.AlreadyOrder);
    }
    let menuItems = [];

    items.forEach((item) => {
      let [name, quantity] = item.split("-");
      menuItems.push({ name, quantity: parseInt(quantity) });
    });

    return menuItems;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default splitStringToArray;
