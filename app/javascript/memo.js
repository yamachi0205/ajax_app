function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType="json";
    XHR.send(formData);
    XHR.onload = () => {
      //レスポンスとして返されたメモのレコードデータ
      const item = XHR.response.post;
      //HTMLを描画する場所を指定する際に使用する「描画する親要素」
      const list = document.getElementById("list");
      //メモの入力フォームをりせっとするため
      const formText = document.getElementById("content");
      //メモとして描画する部分のHTMLを定義している
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-data">
            投稿日時：${item.create_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
      //listにインサートでHTMLを追加している
      list.insertAdjacentHTML("afterend", HTML);
      //入力フォームに入力されたままの文字をリセットする
      formText.value = "";

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };
    XHR.onerror = function () {
      alert("Request failed");
    };
    e.preventDefault();
  })
}
window.addEventListener("load", memo)