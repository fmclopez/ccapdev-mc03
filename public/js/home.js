$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#number` text field.
            The code checks if the current number entered by the user in the
            text field does not exist in the database.

            If the current number exists in the database:
            - `#number` text field background color turns to red
            - `#error` displays an error message `Number already registered`
            - `#submit` is disabled

            else if the current number does not exist in the database:
            - `#number` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#number').keyup(function () {
        // your code here
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if both text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            The new contact should be displayed immediately, and without
            refreshing the page, after the values are saved in the database.

            The name and the number fields are reset to empty values.
    */
    $('#submit').click(function () {
        // your code here
        if(!$('#name').val() || !$('#number').val()){
            $('#error').text('Please fill-up missing fields!');
            if(!$('#name').val()){
                $('#name').css({"background-color": "red"});
            }
            if(!$('#number').val()){
                $('#number').css({"background-color": "red"});
            }
        }
        else{
            var name = $('#name').val();
            var number = $('#number').val();
            console.log(name);
            console.log(number);

            var newContact= {
               name: name,
               number: number,
            };

        $.get('/add', newContact, function(data, status) {
                //console.log(data);
                
                //console.log() in js -> chrome 
                //console.log() in node -> cmd prmpt
                if(data != null) {
                 $('#error').text('');
                   $('#contacts').append(data);
                   console.log('hello');
                    $('#name').val('');
                    $('#number').val('')
                    $('#name').css({"background-color": "#E3E3E3"});
                    $('#number').css({"background-color": "#E3E3E3"});
                }
             });
        }
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#contacts`.
            The code deletes the specific contact associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.contact`.
    */
    $('#contacts').on('click', '.remove', function () {
        // your code here

        //class before x -> prev()
        //classes inside that prev class -> children() 
        var contact = $(this).prev().children()[1];
        var number = { //to be called in req.query create object first
            number : contact.innerHTML //innerHTML get directly... not function
        }
        console.log(number);
        var box = $(this).parent() //place outside of get req this pertains to x 
        $.get('/delete', number, function(data, status) {
            console.log(data);
            console.log(this); //this here would be the get req itself NOT x
            if(data){
                box.remove();
            }
        });
    });

});