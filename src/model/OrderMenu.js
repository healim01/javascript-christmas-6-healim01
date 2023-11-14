import { all_menus, extraGift, nothing } from "../constants/system.js";

class OrderMenu {
  getOriginPrice(rMenu) {
    let sum = 0;
    for (const menuItem of rMenu) {
      const foundMenu = all_menus.find((menu) => menu.name === menuItem.name);
      if (foundMenu) {
        sum += foundMenu.price * menuItem.quantity;
      }
    }
    return sum;
  }

  getExtraGift(orginPrice) {
    if (orginPrice >= 120000) {
      return extraGift;
    }
    return nothing;
  }
}
export default OrderMenu;
