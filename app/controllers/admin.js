var callApi = new CallApi();
var validation = new Validation();
function getEle(ele) {
  return document.getElementById(ele);
}

function getListProduct() {
  callApi
    .fetchListData()
    .then(function (result) {
      console.log(result.data);
      renderProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  Reset();
}
getListProduct();
function renderProduct(data) {
  var content = "";
  data.forEach(function (product) {
    content += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src="${product.img}" width="50"/>
            </td>
            <td>${product.desc}</td>
            <td>
                <button class="btn btn-danger" onclick="handleDelete(${product.id})" >Xoá</button>
                <button class="btn btn-info">Xem</button>
            </td>
        </tr>
    `;
  });
  getEle("tableDanhSach").innerHTML = content;
}

function Reset() {
  getEle("tenSP").value = "";
  getEle("giaSP").value = "";
  getEle("hinhSP").value = "";
  getEle("MoTa").value = "";
}

// HanderDelete
function handleDelete(id) {
  callApi
    .deleteProduct(id)
    .then(function () {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//
getEle("btnThem").addEventListener("click", function () {
  document.getElementsByClassName("model-title")[0].innerHTML = "Thêm sản phẩm";
  var btnAdd = `<button class="btn btn-success" onclick="handleAdd()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

//HandleAdd
function handleAdd() {
  var tenSP = getEle("tenSP").value;
  var giaSP = getEle("giaSP").value;
  var hinhSP = getEle("hinhSP").value;
  var moTa = getEle("MoTa").value;
  console.log(tenSP, giaSP, hinhSP, moTa);

  var isValid = true;

  isValid &=
    validation.kiemTraRong(tenSP, "tbTenSP", "Vui lòng nhập tên sản phẩm") &&
    validation.kiemTraChuoiKyTu(
      tenSP,
      "tbTenSP",
      "Không nhập ký tự đặc biệt"
    ) &&
    validation.kiemTraDoDaikyTu(
      tenSP,
      "tbTenSP",
      "Vui lòng nhập đủ 8 -> 18 ký tự",
      8,
      18
    );
  isValid &=
    validation.kiemTraRong(giaSP, "tbGiaSP", "Vui lòng nhập giá sản phẩm") &&
    validation.kiemTraSo(giaSP, "tbGiaSP", "Vui lòng nhập số");
  isValid &=
    validation.kiemTraRong(
      hinhSP,
      "tbHinhSP",
      "Vui lòng nhập địa chỉ hình ảnh"
    ) &&
    validation.kiemTraLinkURL(hinhSP, "tbHinhSP", "Vui lòng nhập đúng địa chỉ");
  isValid = validation.kiemTraRong(moTa, "tbMoTa", "Vui lòng nhập mô tả");

  if (!isValid) return null;

  var product = new Product("", tenSP, giaSP, "", "", "", hinhSP, moTa, "");

  console.log(product);
  callApi
    .addProduct(product)
    .then(function () {
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
