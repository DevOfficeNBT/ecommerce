exports.paging = (arr, page = 1, pageSize = 999999) => {
  return arr.slice(pageSize * page - (pageSize * page) / page, pageSize * page);
};
