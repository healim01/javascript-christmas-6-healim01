import {
  ALL_MENUS,
  BADGE,
  DEC_START,
  DESERT_MENU,
  DISCOUNT_AMOUNT,
  EXTRAGIFT,
  MAIN_MENU,
  NOTHING,
} from "../constants/system.js";

class OrderMenu {
  getOriginPrice(rMenu) {
    let sum = 0;
    for (const menuItem of rMenu) {
      const foundMenu = ALL_MENUS.find((menu) => menu.name === menuItem.name);
      if (foundMenu) {
        sum += foundMenu.price * menuItem.quantity;
      }
    }
    return sum;
  }

  getExtraGift(orginPrice) {
    if (orginPrice >= 120000) {
      return EXTRAGIFT;
    }
    return NOTHING;
  }

  discountPrice(rDate, rMenu, originPrice) {
    const xmasDiscount = this.christmasDiscount(rDate, originPrice);

    const day = (Number(rDate) + DEC_START) % 7;
    let weekDiscount = 0,
      weekendDiscount = 0;
    if (day % 7 < 5) {
      weekDiscount = this.weekDiscount(rMenu);
    } else {
      weekendDiscount = this.weekendDiscount(rMenu);
    }

    const specialDiscount = this.specialDiscount(day, rDate);

    const extraGiftDscount = this.extraGiftDiscount(originPrice);

    return {
      xmasDiscount,
      weekDiscount,
      weekendDiscount,
      specialDiscount,
      extraGiftDscount,
    };
  }

  christmasDiscount(rdate, orginPrice) {
    return 1000 + (rdate - 1) * 100;
  }

  weekDiscount(rMenu) {
    let sum = 0;
    for (const menuItem of rMenu) {
      const foundMenu = DESERT_MENU.find((menu) => menu.name === menuItem.name);
      if (foundMenu) {
        sum += DISCOUNT_AMOUNT * menuItem.quantity;
      }
    }
    return sum;
  }

  weekendDiscount(rMenu) {
    let sum = 0;
    for (const menuItem of rMenu) {
      const foundMenu = MAIN_MENU.find((menu) => menu.name === menuItem.name);
      if (foundMenu) {
        sum += DISCOUNT_AMOUNT * menuItem.quantity;
      }
    }
    return sum;
  }

  specialDiscount(day, rDate) {
    if (day === 0 || rDate === 25) {
      return 1000;
    }
    return 0;
  }

  extraGiftDiscount(orginPrice) {
    if (orginPrice >= 120000) {
      return 25000;
    }
    return 0;
  }

  getEventBadge(totalDiscount) {
    if (totalDiscount <= -20000) return BADGE.santa;
    else if (totalDiscount <= -10000) return BADGE.tree;
    else if (totalDiscount <= -5000) return BADGE.star;
    else return NOTHING;
  }
}
export default OrderMenu;
