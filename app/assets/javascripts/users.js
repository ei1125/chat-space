$(function() {
  var search_list = $("#user-search-result");

  function  addUser(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
    $("#user-search-result").append(html)
  }

  function  addNoUser(msg){
    var html = `
                 <div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${msg}</p>
                 </div>
               `
   $("#user-search-result").append(html)
  }
  
  function addDeleteUser(name, id){
    var html = `
                <div class="chat-group-user" id="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>
               `
  $(".js-add-user").append(html)
  }
  function addMember(userId) {
    var html = `<input name='group[user_ids][]' type='hidden' value="${userId}">` //この記述によりuserがDBに保存される
    $(`#${userId}`).append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: "json",
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
    })
    .done(function(users){
      search_list.empty();

      if (users.length !== 0) {
        users.forEach(function(user){
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser("ユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();  //クリックした親要素を削除
    addDeleteUser(userName, userId);  //チャットメンバーに削除したユーザーを追加
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });
});