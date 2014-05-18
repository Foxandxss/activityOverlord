io.socket.on('connect', function() {
  io.socket.on('user', cometUserMessageReceivedFromServer);

  io.socket.get('/user/subscribe');
});

function cometUserMessageReceivedFromServer(message) {
  console.log('Here\'s the message: ' + message);

  var userId = message.id;

  updateUserInDom(userId, message);

  if (message.verb !== 'destroyed') {
    displayFlashActivity(message);
  }
}

function displayFlashActivity(message) {
  $('#chatAudio')[0].play();
  $('.navbar').after('<div class="alert alert-success">' + message.data.name + message.data.action + "</div>");
  $('.alert').fadeOut(5000);
}

function updateUserInDom(userId, message) {
  var page = document.location.pathname;

  page = page.replace(/(\/)$/, '');

  switch (page) {
    case '/user':
      if (message.verb === 'updated') {
        UserIndexPage.updateUser(userId, message);
      }

      if (message.verb === 'created') {
        UserIndexPage.addUser(message);
      }

      if (message.verb === 'destroyed') {
        UserIndexPage.destroyUser(userId);
      }
      break;
  }
}

var UserIndexPage = {

  updateUser: function(id, message) {
    var $userRow = $('tr[data-id="' + id + '"] td img').first();

    if (message.data.loggedIn) {
      $userRow.attr('src', '/images/icon-online.png');
    } else {
      $userRow.attr('src', '/images/icon-offline.png');
    }
  },

  addUser: function(user) {
    var obj = {
      user: user.data,
      _csrf: window.overlord.csrf || ''
    };

    $('tr:last').after(
      JST['assets/templates/addUser.ejs'](obj)
    );
  },

  destroyUser: function(id) {
    $('tr[data-id="' + id + '"]').remove();
  }
};