var callAPI = new CallApi();
function getEle(ele) {
  return document.getElementById(ele);
}
function getListProduct() {
  var promise = callAPI.fetchListData();
  promise
    .then(function (result) {
      console.log(result.data);
      renderData(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();

function renderData(data) {
  var content = "";
  data.forEach(function (product) {
    content += `
<div class="card">
    <div class="brand">
        <i class="fab fa-apple"></i>
        <em class="stocks">In Stock</em>
    </div>
    <div class="product_img">
        <img class="img"
            src="${product.img}"
            alt="">

    </div>
    <div class="details">
        <div class="name_product">
            <strong class="product_name">${product.name}</strong>
            <button onclick="" class="heart"><i class="fas fa-heart"></i></button>
        </div>
        <div class="describe">
            <h5>${product.desc}</h5>
            <p>${product.backCamera} ${product.frontCamera}</p>
        </div>
        <div class="buy">
            <p class="price">$ ${product.price}</p>
            <span class="btn">
                <div>
                    <button onclick="" class="btn_add">Add<i
                            class="fas fa-chevron-right"></i></button>
                </div>
            </span>
        </div>
    </div>
</div>
     `;
  });
  getEle("list__card").innerHTML = content;
}
