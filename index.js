const messageContent = $('.msgs-content');
const messageInput = $('.msg-input');
const messageSubmit = $('.msg-submit');
const avatarImage = "logo.png";

const fakeMessages = [
    'Hi there, I\'m AsmrProg and you?',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'That\'s awesome',
    'Youtube is a nice place to share video',
    'I think you\'re a nice person',
    'Why do you think that?',
    'Can you explain?',
    'Anyway I\'ve gotta go now',
    'It was a pleasure chat with you',
    'Time to make a new video',
    'Bye',
    ':)'
  ];

  let minutes = 0;

  // initialize scrollbar and display fake message on window load
$(window).on('load', function(){
    messageContent.mCustomScrollbar();
    setTimeout(fakeMessages, 100);
})

// update scrollbar to bottom and add timestamp

function updateScrollbar(){
    messageContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom'{
        scrollInertia: 10,
        timeout: 0
    })
}

function addTimestamp(){
    const date = new Date();
    const minutesNow = date.getMinutes();

    if(minutes !== minutesNow){
        minutes = minutesNow;
        const timeStamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${minutes}`);
        $('.msg:last').append(timeStamp);
    }
}

function addMessageToPage(msg, isPersonal = false){
    const message = $('<div class="msg"></div>').text(msg);
    if(isPersonal){
        message.addClass(
            'msg-personal'
        )
    } else {
        const figure = $('<figure class="avatar"></figure>');
        const image = $('<img>').attr('src', avatarImage);
        figure.append(image);
        message.addClass('new').prepend(figure);
    }
    $('.mCSB_container').append(message);
    addTimestamp();
    updateScrollbar();
}

// function to insert user message and trigger fake message after 1 second
function inserMessage(){
    const messageText = messageInput.val().trim();
    if(messageText === '') {
        return false;
    }
    addMessageToPage(messageText, true);
    messageInput.val(null);
    setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100);
}

// message input and submit button event listener
messageInput.on('keydown', function(e){
    // if user presses Enter, send message
    if(e.which === 13){
        insertMessage();
        return false;
    }
})

messageSubmit.on('click', inserMessage);

// function to display loading message and replace with fake message after 1-2 seconds

function fakeMessage(){
    if(messageInput.val() !== ''){
        return false;
    }
    const loadingMessage = $('<div class="msg loading new"></div>');
    const figure = $('<figure class="avatar"></figure>');
    const image = $('<img>').attr('src', avatarImage);
    figure.append(image);
    loadingMessage.append(figure).append($(<span></span>));
    $('.mCSB_container').append(loadingMessage);
    updateScrollbar();

    setTimeout(function (){
        loadingMessage.remove();
        addMessageToPage(fakeMessages.shift());
    }, 1000 + (Math.random() * 20) * 100);
}
