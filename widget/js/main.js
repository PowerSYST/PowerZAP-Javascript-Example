/* Copyright (c) 2010-2016 Marcus Westin */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.store = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  "object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;u>r;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;u>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i),o&&f.push(quote(n)+(gap?": ":":")+o));return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(t,e,o)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

},{}],2:[function(require,module,exports){
  require("./json2"),module.exports=require("./store");
},{"./json2":1,"./store":3}],3:[function(require,module,exports){
  (function (global){
    "use strict";module.exports=function(){function e(){try{return o in n&&n[o]}catch(e){return!1}}var t,r={},n="undefined"!=typeof window?window:global,i=n.document,o="localStorage",a="script";if(r.disabled=!1,r.version="1.3.20",r.set=function(e,t){},r.get=function(e,t){},r.has=function(e){return void 0!==r.get(e)},r.remove=function(e){},r.clear=function(){},r.transact=function(e,t,n){null==n&&(n=t,t=null),null==t&&(t={});var i=r.get(e,t);n(i),r.set(e,i)},r.getAll=function(){},r.forEach=function(){},r.serialize=function(e){return JSON.stringify(e)},r.deserialize=function(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e||void 0}},e())t=n[o],r.set=function(e,n){return void 0===n?r.remove(e):(t.setItem(e,r.serialize(n)),n)},r.get=function(e,n){var i=r.deserialize(t.getItem(e));return void 0===i?n:i},r.remove=function(e){t.removeItem(e)},r.clear=function(){t.clear()},r.getAll=function(){var e={};return r.forEach(function(t,r){e[t]=r}),e},r.forEach=function(e){for(var n=0;n<t.length;n++){var i=t.key(n);e(i,r.get(i))}};else if(i&&i.documentElement.addBehavior){var c,u;try{u=new ActiveXObject("htmlfile"),u.open(),u.write("<"+a+">document.w=window</"+a+'><iframe src="/favicon.ico"></iframe>'),u.close(),c=u.w.frames[0].document,t=c.createElement("div")}catch(l){t=i.createElement("div"),c=i.body}var f=function(e){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(t),c.appendChild(t),t.addBehavior("#default#userData"),t.load(o);var i=e.apply(r,n);return c.removeChild(t),i}},d=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),s=function(e){return e.replace(/^d/,"___$&").replace(d,"___")};r.set=f(function(e,t,n){return t=s(t),void 0===n?r.remove(t):(e.setAttribute(t,r.serialize(n)),e.save(o),n)}),r.get=f(function(e,t,n){t=s(t);var i=r.deserialize(e.getAttribute(t));return void 0===i?n:i}),r.remove=f(function(e,t){t=s(t),e.removeAttribute(t),e.save(o)}),r.clear=f(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(o);for(var r=t.length-1;r>=0;r--)e.removeAttribute(t[r].name);e.save(o)}),r.getAll=function(e){var t={};return r.forEach(function(e,r){t[e]=r}),t},r.forEach=f(function(e,t){for(var n,i=e.XMLDocument.documentElement.attributes,o=0;n=i[o];++o)t(n.name,r.deserialize(e.getAttribute(n.name)))})}try{var v="__storejs__";r.set(v,v),r.get(v)!=v&&(r.disabled=!0),r.remove(v)}catch(l){r.disabled=!0}return r.enabled=!r.disabled,r}();

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2])(2)
});

!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),s=r.split("Twitter"),"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

function ContentController(powerzap) {
  'use strict';

  var self = this;

  var NAME_STORE_CONFIG = 'pzw_widget_configs';

  var boxInitialContent = $('#initialContent');
  var boxChangeContent  = $('#changeContent');

  var routes = {
    chat      : (_url_widget + '/Index/chat/'),
    box       : (_url_widget + '/Index/box/'),
    atendente : (_url_widget + '/Index/atendente/'),
    whatsapp  : (_url_widget + '/Index/whatsapp/'),
    mensagem  : (_url_widget + '/Index/mensagem/'),
    satisfacao: (_url_widget + '/Index/satisfacao/')
  };

  /*
   * Templates loaded
   */
  var templates = {
    chat      : false,
    box       : false,
    atendente : false,
    whatsapp  : false,
    mensagem  : false,
    satisfacao: false
  };

  /*
   * Define configuraÃ§Ãµes padrÃµes para o chat
   */
  var configChat = {
    customer : {
      name: null,
      whatsapp: null,
      email: null,
      id: null,
      presence: null,
      rating: 0,
      rating_msg: null
    },
    department : null,
    chatID : 0,
    hash : null
  };

  var merge_options = function (obj1, obj2)
  {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  };

  var storeConfig = store.get(NAME_STORE_CONFIG);
  if(storeConfig) {
    configChat = merge_options(configChat, storeConfig);
  }

  function saveConfigs()
  {
    store.set(NAME_STORE_CONFIG, configChat);
  };

  /*
   * Analisa se a tecla entre foi pressionada
   */
  function isPressEnter(event)
  {
      return (event.keyCode ? event.keyCode : event.which) == 13;
  };

  this.setTemplates = function (list)
  {
    for(var i in list) {
      templates[i] = list[i];
    }
  };

  var rgb2hex = function (red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
  };

  this.whatColorBlackOrWhite = function(color) {

    if(!color) {
      return 'color-black';
    }

    if(color.substr(0,3).toLowerCase() == 'rgb') {
      color = color.match(/[0-9]+/g);
      if(color.length < 1) {
        return 'color-black';
      }
      color = rgb2hex(color[0], color[1], color[2]);
    }

    var hex = color.substr(1);

    var c_r = parseInt(hex.substr(0, 2), 16);
    var c_g = parseInt(hex.substr(2, 2), 16);
    var c_b = parseInt(hex.substr(4, 2), 16);

    var brightness = ( ( c_r * 299 ) + ( c_g * 587 ) + ( c_b * 114 ) ) / 1000;

    return brightness > 155 ? 'color-black' :'color-white';
  };

  this.openWhatsapp = function(whatsapp, msg) {
      var paramString = 'phone=' + whatsapp + '&text=' + msg;
      var url = window.encodeURI('whatsapp://send?' + paramString);
      var fallbackUrl = window.encodeURI('https://web.whatsapp.com/send?' + paramString);

      if (isMobile.any) {
          fallbackUrl = 'https://www.whatsapp.com/download/';
          window.location = url;
      } else {
          window.open(fallbackUrl);
          return false;
      }

      // Mobile detection
      var now = Date.now();
      var localAppInstallTimeout = window.setTimeout(function() {
          if (Date.now() - now > 1250) return;
          window.open(fallbackUrl,'_blank');
      }, 5000);

      // Desktop detection
      window.addEventListener('blur', function() {
          window.clearTimeout(localAppInstallTimeout);
      });
  };

  var getGreeting = function () {
      var myDate = new Date();

    /* hour is before noon */
      if ( myDate.getHours() < 12 )
      {
          return 'bom dia';
      }
      else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
      if ( myDate.getHours() >= 12 && myDate.getHours() <= 17 )
      {
          return 'boa tarde';
      }
      else  /* the hour is after 5pm, so it is between 6pm and midnight */
      if ( myDate.getHours() > 17 && myDate.getHours() <= 24 )
      {
          return 'boa noite';
      }
      return "";
  };

  function replaceVarsChat(msg)
  {
      var name = (configChat.customer.name ? configChat.customer.name : '');
      var name_split = name.split(' ');
      var first_name = name_split[0];
      var last_name = name.substr(first_name.length);
      return capitalize(msg.split('[CLIENTE_NOME]').join(name)
          .split('[CLIENTE_PRIMEIRO_NOME]').join(first_name)
          .split('[CLIENTE_SEGUNDO_NOME]').join(last_name)
          .split('[CLIENTE_NUMBER]').join((configChat.customer.whatsapp ? configChat.customer.whatsapp : ''))
          .split('[SAUDACAO_TEMPO]').join(getGreeting())
          .split('[CLIENTE_EMAIL]').join((configChat.customer.email ? configChat.customer.email : '')));
  }

  function capitalize(s) {
      return s && s[0].toUpperCase() + s.slice(1);
  }

  /*
   * Replace links on text
   */
  var replaceLinksInText = function(text)
  {

    text = text.replace(
        /\b(https?:\/\/[^\s\(\)\'\"\<\>]+)/ig,
        "<a ref='nofollow' target='_blank' href='$1'>$1</a>"
    );

    return text;
  };

  /*
   * Template para as mensagens do chat
   */
  var templateMessage = '<div><div><p></p><span class="status"></span></div></div>';

  /*
   * Adiciona uma mensagem no chat
   * @param message - mensagem
   * @param me - bool - analisa se a mensagem vem do usuÃ¡rio ou do servidor
   */
  function addMessageChatBox(message, me)
  {
    var element = $(templateMessage);
    var position =  (me ? 'right' : 'left');
    if(message.text) {
      $(element).find("p").html(replaceLinksInText(message.text.replace(/\n/g, "<br />"))).parent().addClass('message-bubble-' + position);
    }
    var file = (message.file) ? message.file : message.url;
    var type = ('type' in message && message.type) ? message.type : 0;
    var text = '';
    switch(parseInt(type)) {
      case 1: //Image
        text = '<a class="btn-image" href="' + file + '" target="_blank"><img src="' + file + ((file.substr(0,4) != "blob" ? '?w=160' : '')) + '" width="160" alt="Foto" /></a>';
        break;
      case 2: //Audio
        text = '<div class="play-audio"><audio controls><source src="' + file + '"></audio></div>';
        break;
      case 3: //Video
        text = '<div class="play-video"><video controls><source src="' + file+ '"></video></div>';
        break;
      case 5: //Localizacao
        text =  '<a target="_blank" href="https://maps.google.com/?q=' + text + '">Ver localizaÃ§Ã£o</a>';
        break;
      case 6: //Contact (Vcard)
        text =  '<a class="btn-vcard" target="_blank" href="' + file + '">Download do contato</a>';
        break;
      case 7: //Document
        text =  '<a target="_blank" href="' + file + '">Ver arquivo</a>';
        break;
    }
    if(text.length) {
      $(element).find("p").prepend(text).parent().addClass('message-bubble-' + position);
    }
    $(element).addClass('message-' + position);
    $(".messages-box").append(element);
    return element;
  }

  /*
   * Valida E-mail
   */
  function isEmail (email)
  {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  /*
   * Limpa todas as mensagens do box
   */
  function clearBoxMessages()
  {
    $(".messages-box").html('');
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
   * Trata nÃºmero da empresa (73 - 80)
   */
  var companyWhatsApp = configs.company.whatsapp;
  var countryCode = companyWhatsApp.substr(0,2);
  var codeArea = companyWhatsApp.substr(2,2);
  var number = companyWhatsApp.substr(4);

  if (number.length > 8) {
      number = number.substr(0,1) + " " + number.substr(1);
  }

  /*
   * Formata o nÃºmero da empresa e insere na view
   */
  var formatedNumber = "+" + countryCode + " (" + codeArea + ") " + number;
  $('.user-phone span').append(formatedNumber);
  $('.user-phone').click(function() {
    if(configs.company.whatsapp) {
      window.location = 'tel:' + configs.company.whatsapp.substr(2)
    }
  });

  /*
   * Adiciona o status da empresa na view
   */
  if (configs.online) {
      $('#status').append('<p>Estamos online</p>');
  } else {
      $('#status').append('<p>Estamos offline</p>');
  }

  /*
   * Checa se a empresa possui um WhatsApp disponÃ­vel para habilitar a opÃ§Ã£o
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
   * Rola para o fim do chat quando uma nova mensagem Ã© adicionada
   */
  var scrollBottomMessageBox = function () {
      $('.messages-box').animate({scrollTop: $('.messages-box').get(0).scrollHeight}, 100);
  };

  /*
   * Volta para a pÃ¡gina inicial ao clicar em elemento com a classe '.back-home'
   */
  var goHome = function() {
    $('.back-home').click(function() {
      $(boxChangeContent).html('');
      $(boxInitialContent).show();
    });
  };

  var showChatBox = function(welcomeMessage, callback) {
    var process = function() {

      /*
       * Oculta o menu por padrÃ£o. SÃ³ Ã© habilitado caso o usuÃ¡rio envie
       * uma mensagem (linha 233)
       */
      $('#dotMenu').hide();
      $('#dotMenu').click(function() {
        $('.dot-menu-box').toggle('fast', function() {
          $('#printChat').click(function() {
            $('.dot-menu-box').hide('fast', function() {
              powerzap.printConversation({});
            });
          });
          $('#closeChat').click(function() {
            $('.dot-menu-box').hide('fast', function() {
              powerzap.closeChat({});
              showSurvey();
              saveConfigs();
            });
          });
        });
      });

      /*
       * Insere a mensagem de boas vindas no chat
       */
      if(welcomeMessage) {
        addMessageChatBox({
          text: replaceVarsChat(configs.msgs.welcome)
        }, false);
        if(configs.msgs.welcome_file) {
          addMessageChatBox({
            url: configs.msgs.welcome_file,
            file: configs.msgs.welcome_file,
            type: configs.msgs.welcome_file_type
          }, false);
        }
        if (configs.show_departments && 'departments' in configs && configs.departments.length > 0) {
          var text = "";
          var i = 0;
          for(var u in configs.departments) {
            i++;
            text += i + ' - ' + configs.departments[u].father.name + '\n';
          }
          addMessageChatBox({
            text: text
          }, false);
        }
      }

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
          welcome = false;
          powerzap.initChat({
            hash_chat : configChat.hash,
            presence : configChat.customer.presence,
            name : configChat.customer.name,
            email : configChat.customer.email,
            whatsapp : (configChat.customer.whatsapp.length > 8 ? configChat.customer.whatsapp : ''),
            message : context.val(),
            department : configChat.department
          }, function(data) {
            configChat.chatID = data.chatID;
            configChat.hash = data.hash;
            configChat.customer.presence = data.presence;
            configChat.customer.whatsapp = data.whatsapp;
            $(message).find('.status').removeClass("sending").addClass("sent");
          }, function(data) {
            $('#alertEmpty').empty().append('<div class="alert"><b>' + data.message + '</b></div>');
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
          }, function(data) {
            $('#alertEmpty').empty().append('<div class="alert"><b>' + data.message + '</b></div>');
          });
        }
        context.val('');
        event.preventDefault();
        return false;
      };

      $(".message-input").keydown(function(event) {
        if (isPressEnter(event)) {
          messageSender($(this));
          return false;
        }
      });

      $('.message-options .send-message').click(function(event) {
        messageSender($('.message .message-input'));
      });

      if(callback) {
        callback();
      }

    };
    /*
     * Carrega a pÃ¡gina do chat
     */
    if(templates.box) {
      $(boxChangeContent).html(templates.box);
      process();
    } else {
      $(boxChangeContent).load(routes.box, process);
    }

  };

  $('#openFormChat').click(function() {
    /*
     * Carrega o formulÃ¡rio para atendimento online
     */
    $(boxInitialContent).hide();

    var process = function() {

      goHome();

      $('input[name="nome"]').focus();
      $('#phone').intlTelInput({
        initialCountry: "br"
      });

      $('input[name="nome"]').val((configChat.customer.name ? configChat.customer.name : ''));
      $('input[name="whatsapp"]').val((configChat.customer.whatsapp ? configChat.customer.whatsapp : '+55 '));
      $('input[name="email"]').val((configChat.customer.email ? configChat.customer.email : ''));

      $('input').keyup(function(e) {
        if(e.which == 13 || e.keyCode == 13) {
          e.preventDefault();
          $('.form').submit();
        }
      });

      if(configs.request_phone) {
          $('input[name="whatsapp"]').parent().parent().find('.optional').hide();
      }
      if(configs.request_email) {
          $('input[name="email"]').parent().find('.optional').hide();
      }

      powerzap.sendPing();

      var submitForm = function() {

        configChat.customer.name = $('input[name="nome"]').val();
        configChat.customer.whatsapp = $('input[name="whatsapp"]').val();
        configChat.department = $('select[name="department"]').val();
        configChat.customer.email = $('input[name="email"]').val();
        configChat.chatID = null;
        configChat.hash = null;

        var name = $('input[name="nome"]').val();
        var email = $('input[name="email"]').val();
        var phone = $('input[name="whatsapp"]').val();
        var splitName = name.split(' ');
        var whatsapp = $('input[name="whatsapp"]').val();


        if(name.trim().length < 1) {
          $('#alertEmpty').empty().append('<div class="alert"><b>Digite seu nome</b></div>');
          $('input[name="nome"]').focus();
          return false;
        }
        if(splitName.length < 2) {
          $('#alertEmpty').empty().append('<div class="alert"><b>DigÃ­te seu nome completo</b></div>');
          $('input[name="nome"]').focus();
          return false;
        }
        if((configs.request_phone || phone.trim().length > 4) && phone.trim().length < 8) {
          $('#alertEmpty').empty().append('<div class="alert"><b>Digite seu telefone corretamente</b></div>');
          $('input[name="whatsapp"]').focus();
          return false;
        }
        if(configs.request_email && email.trim().length < 1) {
          $('#alertEmpty').empty().append('<div class="alert"><b>Digite seu E-mail</b></div>');
          $('input[name="email"]').focus();
          return false;
        }
        if(email.trim().length > 0 && !isEmail(email.trim())) {
          $('#alertEmpty').empty().append('<div class="alert"><b>Digite seu E-mail corretamente exemplo@server.com</b></div>');
          $('input[name="email"]').focus();
          return false;
        }

        saveConfigs();

        showChatBox(true);
      };

      $('#openChat').click(submitForm);
      $('.form').submit(submitForm);
    };

    if(templates.atendente) {
      $(boxChangeContent).html(templates.atendente);
      process();
    } else {
      $(boxChangeContent).load(routes.atendente, process);
    }
  });

  $('#openWhatsAppForm').click(function() {
    /*
     * Carrega a pÃ¡gina de formulÃ¡rio do WhatsApp
     */
    $(boxInitialContent).hide();

    var process = function() {
      $('#phone').intlTelInput({
        initialCountry: "br",
        numberType: "MOBILE"
      });

      $('input[name="nome"]').focus();

      $('input[name="nome"]').val((configChat.customer.name ? configChat.customer.name : ''));
      $('input[name="whatsapp"]').val((configChat.customer.whatsapp ? configChat.customer.whatsapp : '+55 '));
      $('input[name="email"]').val((configChat.customer.email ? configChat.customer.email : ''));

      goHome();

      $('#callMe').click(function() {
        var name = $('input[name="nome"]').val();
        var whatsapp = $('input[name="whatsapp"]').val();

        if (name.length > 0 && whatsapp.length > 4) {
          configChat.customer.name = $('input[name="nome"]').val();
          configChat.customer.whatsapp = $('input[name="whatsapp"]').val();
          configChat.customer.email  = $('input[name="email"]').val();

          powerzap.requestCallWhatsApp({
            hash_chat : configChat.hash,
            presence : configChat.customer.presence,
            name : configChat.customer.name,
            email : configChat.customer.email,
            whatsapp : configChat.customer.whatsapp,
            department : configChat.department
          }, function(data) {

          });

          /*
           * Carrega a pÃ¡gina de mensagem
           */
          $(boxChangeContent).load(routes.mensagem, function () {
            goHome();
          });

        } else {
          $('#alertEmpty').empty().append('<div class="alert"><b>Todos os campos devem ser preenchidos</b></div>');
        }
      });
    };

    if(templates.whatsapp) {
      $(boxChangeContent).html(templates.whatsapp);
      process();
    } else {
      $(boxChangeContent).load(routes.whatsapp, process);
    }
  });

  var showSurvey = function() {

    $(boxInitialContent).hide();

    var process = function() {
      /*
       * Carrega a pÃ¡gina de feedback
       */
      $('#sendRating').click(function() {

        configChat.customer.rating = $('select[name="select_rating"]').val();
        configChat.customer.rating_msg = $('textarea[name="message"]').val();

        powerzap.sendFeeback({
          score: configChat.customer.rating,
          message: configChat.customer.rating_msg,
        }, function(data) {
          powerzap.clearSession();
        }, function() {
          powerzap.clearSession();
        });

        if(templates.mensagem) {
          $(boxChangeContent).html(templates.mensagem);
          goHome();
        } else {
          $(boxChangeContent).load(routes.mensagem, function () {
            goHome();
          });
        }

        saveConfigs();

      });

      saveConfigs();

    };

    if(templates.satisfacao) {
      $(boxChangeContent).html(templates.satisfacao);
      process();
    } else {
      $(boxChangeContent).load(routes.satisfacao, process);
    }
  };

  var welcome = false;
  powerzap.notificationListener(function(res) {
    /*
     * Actions
     */
    if(res.actions) {
      for(var j in res.actions) {
        var action = res.actions[j];
        switch (action.action) {
          case 'openWidget':
            configChat.chatID = action.chatID;
            configChat.hash   = action.hash;
            clearBoxMessages();
            break;
          case 'updateData':
            configChat.customer.name = action.name;
            configChat.customer.whatsapp = action.phone;
            configChat.customer.email = action.email;

            $('input[name="nome"]').val((configChat.customer.name ? configChat.customer.name : ''));
            $('input[name="whatsapp"]').val((configChat.customer.whatsapp ? configChat.customer.whatsapp : '+55 '));
            $('input[name="email"]').val((configChat.customer.email ? configChat.customer.email : ''));

            saveConfigs();
            break;
        }
      }
    }
    /*
     * Insere mensagens no chat
     */
    for(var i in res.messages) {
      /*if(!welcome) {
        welcome = !welcome;
        continue;
      }*/
      addMessageChatBox(res.messages[i], false);
    }

    /*
     * Muda o status da mensagem de enviada para lida
     */
    for(i in res.reads) {
      $('#message-' + res.reads[i].id).find('.status').removeClass("sent").addClass("read");
    }

    /*
     * Verifica se existem mensagens no chat, existindo, rola atÃ© a Ãºltima
     * mensagem no chat
     */
    if(res.messages.length > 0) {
      scrollBottomMessageBox();
    }

    /*
     * Verifica se o chat foi finalizado, se sim, vai para a pÃ¡gina de feedback
     * do atendimento.
     */
    if (res.closed) {
      var pwz_params = powerzap.getParams();
      if(pwz_params.chatID != 0) {
        showSurvey();
      }
      saveConfigs();
    }
  });

  (function() {

    var pwz_params = powerzap.getParams();

    if(pwz_params.chatID != 0) {
      powerzap.getMessages(function (data) {
        configChat.chatID = data.chatID;
        configChat.hash = data.hash;
        configChat.customer.presence = data.presence;
        configChat.customer.whatsapp = data.whatsapp;

        $(boxInitialContent).hide();
        showChatBox(false, function() {
          welcome = true;
          for(var i = (data.messages.length - 1); i >= 0; i--) {
            var mySelf = (data.messages[i].senderType == 3);
            var message = addMessageChatBox(data.messages[i], mySelf);
            if(mySelf) {
              if (data.messages[i].readAt) {
                $(message).find('.status').addClass("read");
              } else {
                $(message).find('.status').addClass("sent");
              }
            }
          }
          scrollBottomMessageBox();
          $('#dotMenu').show();
          window.setTimeout(function() {
            $('.message-input').focus();
          }, 1000);
        });

      }, function (data) {
        if(data.code == 100) {
          showSurvey();
          saveConfigs();
        }
      });
    }

    $('#user-phone').each(function() {
      $(this).addClass(self.whatColorBlackOrWhite($(this).find('span').css('background-color')));
    });

    $('.user-description').each(function() {
      $(this).addClass(self.whatColorBlackOrWhite($('body').css('background-color')));
    });

  })();

};