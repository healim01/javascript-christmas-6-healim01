const splitStringToArray = (input) => {
  let menu = {};
  let items = input.split(",");

  items.forEach((item) => {
    let [menuName, quantity] = item.split("-");
    menu[menuName] = parseInt(quantity);
  });

  return menu;
};
export default splitStringToArray;
