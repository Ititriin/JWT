function deleteProduct(element) {
  var productId = element.dataset.productId;

  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/product/" + productId, true);
  xhr.onreadystatechange = function () {
    if (this.status == 202 && this.readyState == 4) {
      alert(this.responseText);
      const row = document.getElementById(productId);
      row.parentNode.removeChild(row);
    }
  };
  xhr.onerror = function () {
    alert("Failed to delete product " + productId);
  };

  xhr.send();
}
