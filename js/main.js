var ContentController = function(powerzap) {
  'use strict';

/*
 * Define configurações padrões para o chat
 */
  var configChat = {
    customer : {
      name: null,
      whatsapp: null,
      id: null,
      presence: null,
      rating: 0,
      rating_msg: null
    },
    department : null,
    chatID : 0,
    hash : null
  };

  /*
   * Analisa se a tecla entre foi pressionada
   */
  function isPressEnter(event)
  {
      return (event.keyCode ? event.keyCode : event.which) == 13;
  };

  function replaceVarsChat(msg)
  {
      return  msg.replace("[CLIENTE_NOME]", configChat.customer.name)
                 .replace("[CLIENTE_number]", configChat.customer.whatsapp)
  };

  /*
   * Template para as mensagens do chat
   */
  var templateMessage = '<div><div><p></p><span class="status"></span></div></div>';

  /*
   * Adiciona uma mensagem no chat
   * @param message - mensagem
   * @param me - bool - analisa se a mensagem vem do usuário ou do servidor
   */
  function addMessageChatBox(message, me)
  {
    var element = $(templateMessage);
    var position =  (me ? 'right' : 'left');
    $(element).find("p").html(message.text).parent().addClass('message-bubble-' + position);
    $(element).addClass('message-' + position);
    $(".messages-box").append(element);
    return element;
  }

  var configs = powerzap.getConfigs();

  /*
   * Adiciona o nome da empresa na view
   */
  var companyName = configs.company.name;
  if (companyName) {
    $('#company-name').append(configs.company.name);
  }

  /*
   * Adiciona a foto da empresa na view
   */
  var companyAvatar = configs.company.photo;
  if (companyAvatar) {
    $('#avatar').append('<img src="' + configs.company.photo + '" alt=' + configs.company.name +'>');
  }

  /*
   * Trata número da empresa (73 - 80)
   */
  var companyWhatsApp = configs.company.whatsapp;
  var countryCode = companyWhatsApp.substr(0,2);
  var codeArea = companyWhatsApp.substr(2,2);
  var number = companyWhatsApp.substr(4);

  if (number.length > 8) {
      number = number.substr(0,1) + " " + number.substr(1);
  }

  /*
   * Formata o número da empresa e insere na view
   */
  var formatedNumber = "+" + countryCode + " (" + codeArea + ") " + number;
  $('.user-phone').append(formatedNumber);

  /*
   * Adiciona o status da empresa na view
   */
  if (configs.online) {
      $('#status').append('<p>Estamos online</p>');
  } else {
      $('#status').append('<p>Estamos offline</p>');
  }

  /*
   * Checa se a empresa possui um WhatsApp disponível para habilitar a opção
   * me chama no WhatsApp
   */
  if (!configs.whatsapp) {
    $('.call-me-on-whatsapp').hide();
  }

  /*
   * Preenche a lista de departamentos na view
   */
  var fillDepartments = function(element, father, nivel)
  {
     if (!nivel) { nivel = 0 }
     var option = $("<option></option>");
     $(option).val(father.id);

     if (father.child.length != 0) {
         $(option).attr('disabled', 'disabled');
     }
     $(option).html(father.label + " - " + father.name);
     $(option).attr("data-name", father.name);

     nivel++;
     $(element).append(option);
     $.each(father.child, function() {
         fillDepartments(element, this.father, nivel);
     });
  };

  /*
   * Rola para o fim do chat quando uma nova mensagem é adicionada
   */
  var scrollBottomMessageBox = function () {
      $('.messages-box').animate({scrollTop: $('.messages-box').get(0).scrollHeight}, 100);
  };

  /*
   * Volta para a página inicial ao clicar em elemento com a classe '.back-home'
   */
  var goHome = function() {
    $('.back-home').click(function() {
      window.location.replace('./index.html');
    });
  }

  $('#openFormChat').click(function() {
    /*
     * Carrega o formulário para atendimento online
     */
    $('#changeContent').load('./form-atendente.html', function() {

      goHome();

      $('input[name="nome"]').focus();
      $('#phone').intlTelInput({
        initialCountry: "br"
      });

      var departments = $("select[name='department']");

      if (configs.departments) {
         if (configs.departments.length < 1) {
            $(departments).parent().hide();
         } else {
            $.each(configs.departments, function() {
                fillDepartments(departments, this.father);
            });
         }
      } else {
          $(departments).parent().hide();
      }

      $('#openChat').click(function() {

        configChat.customer.name = $('input[name="nome"]').val();
        configChat.customer.whatsapp = $('input[name="whatsapp"]').val();
        configChat.department = $('select[name="department"]').val();

        var name = $('input[name="nome"]').val();
        var whatsapp = $('input[name="whatsapp"]').val();

        if (name.length > 0) {
          /*
           * Carrega a página do chat do WhatsApp
           */
          $('#changeContent').load('./chat-box.html', function() {

            /*
             * Oculta o menu por padrão. Só é habilitado caso o usuário envie
             * uma mensagem (linha 233)
             */
            $('#dotMenu').hide();
            $('#dotMenu').click(function() {
              $('.dot-menu-box').toggle('fast', function() {
                $('#printChat').click(function() {
                  powerzap.printConversation({});
                });
                $('#closeChat').click(function() {
                  powerzap.closeChat({});
                });
              });
            });

            /*
             * Insere a mensagem de boas vindas no chat
             */
            addMessageChatBox({
              text : replaceVarsChat(configs.msgs.welcome)
            }, false);

            $('textarea[type="text"]').focus();

            var messageSender = function(context) {
              var text = context.val().trim();
              if (text.length < 1) {
                  return false;
              }

              var message = addMessageChatBox({
                text : text
              }, true);
              $(message).find('.status').addClass("sending");

              scrollBottomMessageBox();

              if (!configChat.chatID) {
                powerzap.initChat({
                  hash_chat : configChat.hash,
                  presence : configChat.customer.presence,
                  name : configChat.customer.name,
                  whatsapp : (configChat.customer.whatsapp.length > 8 ? configChat.customer.whatsapp : ''),
                  message : context.val(),
                  department : configChat.department
                }, function(data) {
                  configChat.chatID = data.chatID;
                  configChat.hash = data.hash;
                  configChat.customer.presence = data.presence;
                  configChat.customer.whatsapp = data.whatsapp;
                  $(message).find('.status').removeClass("sending").addClass("sent");
                });
                $('#dotMenu').show();
              } else {
                powerzap.sendMessage({
                  message : text,
                  hash_chat : configChat.hash,
                  chatID : configChat.chatID
                }, function(data) {
                    $(message[0]).attr('id', 'message-'+data.id);

                    $(message).find('.status').removeClass("sending").addClass("sent");
                });
              }
              context.val('');
              event.preventDefault();
              return false;
            };

            $(".message-input").keyup(function(event) {
              if (!isPressEnter(event)) return false;
              messageSender($(this));
            });

            $('.message-options .send-message').click(function(event) {
              messageSender($('.message .message-input'));
            });
          });
       } else {
         $('#alertEmpty').empty().append('<div class="alert"><b>Todos os campos devem ser preenchidos</b></div>');
       }
      });
    });
  });

  $('#openWhatsAppForm').click(function() {
    /*
     * Carrega a página de formulário do WhatsApp
     */
    $('#changeContent').load('./form-whatsapp.html', function() {
      $('#phone').intlTelInput({
        initialCountry: "br",
        numberType: "MOBILE"
      });

      $('input[name="nome"]').focus();

      goHome();

      $('#callMe').click(function() {
          var name = $('input[name="nome"]').val();
          var whatsapp = $('input[name="whatsapp"]').val();

          if (name.length > 0 && whatsapp.length > 4) {
            configChat.customer.name = $('input[name="nome"]').val();
            configChat.customer.whatsapp = $('input[name="whatsapp"]').val();

             powerzap.requestCallWhatsApp({
               hash_chat : configChat.hash,
               presence : configChat.customer.presence,
               name : configChat.customer.name,
               whatsapp : configChat.customer.whatsapp,
               department : configChat.department
             }, function(data) {
               console.log(data);
             });

        /*
         * Carrega a página de mensagem
         */
        $('#changeContent').load('./mensagem.html', function () {
          goHome();
        });

      } else {
        $('#alertEmpty').empty().append('<div class="alert"><b>Todos os campos devem ser preenchidos</b></div>');
      }
      });
    });
  });

  powerzap.notificationListener(function(res) {
    /*
     * Insere mensagens no chat
     */
    for(var i in res.messages) {
      addMessageChatBox(res.messages[i], false);
    }

    /*
     * Muda o status da mensagem de enviada para lida
     */
    for(i in res.reads) {
      $('#message-' + res.reads[i].id).find('.status').removeClass("sent").addClass("read");
    }

    /*
     * Verifica se existem mensagens no chat, existindo, rola até a última
     * mensagem no chat
     */
    if(res.messages.length > 0) {
      scrollBottomMessageBox();
    }

    /*
     * Verifica se o chat foi finalizado, se sim, vai para a página de feedback
     * do atendimento.
     */
    if (res.closed) {
      $('#changeContent').load('./satisfacao.html', function() {
        /*
         * Carrega a página de feedback
         */
        $('#sendRating').click(function() {

          configChat.customer.rating = $('select[name="select_rating"]').val();
          configChat.customer.rating_msg = $('textarea[name="message"]').val();

          powerzap.sendFeeback({
            score: configChat.customer.rating,
            message: configChat.customer.rating_msg,
          }, function(data) {

          });
          $('#changeContent').load('./mensagem.html', function () {
            goHome();
          });
        });
      });
    }
  });

}
