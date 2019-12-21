$(function() {
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: "json",
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
    })
    .done(function(users){
      console.log("成功");
    })
    .fail(function() {
      console.log("失敗です");
    });
  });
});