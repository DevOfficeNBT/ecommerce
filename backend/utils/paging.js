exports.paging = (arr, page = 1, pageSize = 15) => {
  return arr.slice(pageSize * page - (pageSize * page) / page, pageSize * page);
};
