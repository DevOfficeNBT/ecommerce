exports.filter = async (param) => {
  const { name, category, gp, lp } = param;
  let item = {};
  if (name) {
    item.name = {
      $regex: name,
      $options: "i",
    };
  }
  if (category) {
    item.category = category;
  }
  if (gp || lp) {
    item.price = { $gte: lp, $lte: gp };
  }
  return item;
};
