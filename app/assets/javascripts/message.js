$(function(){
  function buildHTML(message){
    if (message.image.url) {
      var html = `<div class="message-list__title">
                    <div class="message-list__title__user">
                      ${message.user_name}
                    </div>
                    <div class="message-list__title__day">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message-list__comment">
                    <p class="message-list__comment__content">
                      ${message.content}
                    </p>
                    <img class="message-list__comment__image" src="${message.image.url}">
                  </div>`
    } else {
      var html = `<div class="message-list__title">
                    <div class="message-list__title__user">
                      ${message.user_name}
                    </div>
                    <div class="message-list__title__day">
                      ${message.created_at}
                     </div>
                  </div>
                  <div class="message-list__comment">
                    <p class="message-list__comment__content">
                      ${message.content}
                    </p>
                 </div>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-lists').append(html);
      console.log($('.message-list__comment')[0].scrollHeight);
      $('.chat-main__message-lists').animate({ scrollTop: $('.chat-main__message-lists')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});