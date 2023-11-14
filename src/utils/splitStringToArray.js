const splitStringToArray = (input) => {
  let items = input.split(",");
  let menuItems = [];

  items.forEach((item) => {
    let [name, quantity] = item.split("-");
    menuItems.push({ name, quantity: parseInt(quantity) });
  });

  return menuItems;
};
export default splitStringToArray;
