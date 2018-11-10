// Initialize the pusher client (obj)
var pusher = new Pusher('e324515e53bed6b22c9a', {
    cluster: 'ap2',
    forceTLS: true
});

// Bind the channel created with the pusher
var my_channel = pusher.subscribe('a_channel');
my_channel.bind('an_event', function(data) {
    console.log(data);
    var new_message = `<li class="left clearfix"><span class="chat-img pull-left">
                                <img src="http://placehold.it/50/55C1E7/fff&amp;text=`+data.name+`" alt="User Avatar" class="img-circle">
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">` + data.name + `</strong> <small class="pull-right text-muted">
                                </div>
                                <p>
                                   ` + data.message +`
                                </p>
                            </div>
                        </li>`;
    $('#chat').append(new_message);
});

// If user press enter or submit send the message
$(document).ready(function() {
    $("#btn-input").on("keypress", function(e) {
        if (e.which == 13 || e.which == 10) {
            var message = $('#btn-input').val();

            $.post({
                url: 'ajax/chat/',
                data: {
                    'message': message
                },
                success: function(data) {
                    $('#btn-input').val('');

                }
            });
        }
    })
    $("#btn-chat").click(function() {
        var message = $('#btn-input').val();

        $.post({
            url: 'ajax/chat/',
            data: {
                'message': message
            },
            success: function(data) {
                $('#btn-input').val('');

            }
        });
    })
})

