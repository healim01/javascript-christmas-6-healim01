import { all_menus } from "../constants/system.js";

class OrderMenu {
  formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(price);
  }

  getOriginPrice(rMenu) {
    let sum = 0;
    for (const menuItem of rMenu) {
      const foundMenu = all_menus.find((menu) => menu.name === menuItem.name);
      if (foundMenu) {
        sum += foundMenu.price * menuItem.quantity;
      }
    }
    return this.formatPrice(sum);
  }
}
export default OrderMenu;
