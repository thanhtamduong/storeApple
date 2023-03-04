function CallApi() {
  this.arr = [];
  this.fetchListData = function () {
    return axios({
      url: "https://63df6ffd59bccf35dab344b0.mockapi.io/api/products",
      method: "GET",
    });
  };

  this.deleteProduct = function (id) {
    return axios({
      url: `https://63df6ffd59bccf35dab344b0.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });
  };

  this.addProduct = function (product) {
    return axios({
      url: "https://63df6ffd59bccf35dab344b0.mockapi.io/api/products",
      method: "POST",
      data: product,
    });
  };
}
