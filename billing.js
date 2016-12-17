$(document).ready(function() {

// ******************************************************************************* //
// Start *** firebase user data *** //
// ******************************************************************************* //

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCA4E2Fdn7pj2xL_KoA6rjwd1pjhlAidlw",
    authDomain: "test-4dbd3.firebaseapp.com",
    databaseURL: "https://test-4dbd3.firebaseio.com",
    storageBucket: "test-4dbd3.appspot.com",
    messagingSenderId: "258893315250"
  };
  firebase.initializeApp(config);

    // Reference to the database service
    var database = firebase.database();

    // ******************************************************************************* //
    // Start *** using array object *** //
    // ******************************************************************************* //

    var table_columns = 6;
    var array = [];
    var next_step = true;
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// Remove or comment out before deploying @@@@@@@@@@@@@@@@@@@@@@@@ //
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    // var myarray = [
    //     { foodName: 'burger', price: 19.99, quantity: 3 },
    //     { foodName: 'hotdog', price: 22.65, quantity: 15 },
    //     { foodName: 'shrimp', price: 24.85, quantity: 22 },
    //     { foodName: 'package 1', price: 98.99, quantity: 1 },
    //     { foodName: 'utensils', price: 12.99, quantity: 25 }
    // ]

    // store
    // localStorage.clear();
    // localStorage.setItem("myarray", JSON.stringify(myarray));

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    //retrieve
    array = JSON.parse(localStorage.getItem("myarray"));

    // display object values
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& //
                for (var a=0; a < array.length; a++) {
            console.log("value initial: " + Object.values(array[a]));
   } 
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& //


    populate();

// ******************************************************************************* //
// Start *** populates table with cart items *** //
// ******************************************************************************* //

    function populate() {

        for (var j = 0; j < array.length; j++) {

            // adds new row in table when needed
            var newRow = $("<tr>");

            // append the necessary number of columns in table
            for (var i = 0; i < table_columns; i++) {
                var newData = $("<td>");

                if (i == 2 || i == 3 || i==4) {
                    newData.addClass("text-center");    // formatting columns
                }
                if (i == array.length) {
                    newData.addClass("text-right");     // formatting columns
                }

                // adds input field inside table cell
                if (i == 3) {
                    var newInput = $("<input type='text' size='4'>");
                    newInput.addClass("quantity");
                    // assign id to item-update input field
                    newInput.attr("id", "quant_" + j);
                    // placeholder value is inital chosen item-quantity 
                    newInput.attr("placeholder", array[j].quantity);
                    newData.append(newInput);
                }

                // adds button to update items quantity
                if (i == 4) {
                    var newButton = $("<button>");
                    newButton.addClass("update_item_Butt");
                    newButton.addClass("btn btn-primary");
                    newButton.attr("data-update", j);
                    newButton.text("update");
                    newData.append(newButton);
                }

                newRow.append(newData);
            } // end for-loop appending columns to each row

            $("#rows").append(newRow);

            // *** populate page 1 - order details
            // target columns and populate cells with pertinent cart information from columns 1 to 6
            var RowTds = $('table').children().eq(1).children('tr').eq(j).children('td');

            RowTds.eq(0).text(j + 1);
            RowTds.eq(1).text(array[j].foodName); // item id value: e.g. burger
            RowTds.eq(2).text(array[j].price); // item each
            RowTds.eq(3).html(); // item quantity: array[j].quantity
            RowTds.eq(4).html(); // update list item button: "button here"
            RowTds.eq(5).text((array[j].price * array[j].quantity).toFixed(2));

        } // end for-loop populating Order Details cart

        charges();  //
    } // end populate function


    function invoice_pop() {

            $(".rows_invoice").html("");
// Start *** populate page 3 - invoice *** //

               for (var k = 0; k < array.length; k++) {

            // adds new row in table when needed
            var newRow = $("<tr>");

            // append the necessary number of columns in table
            for (var i = 0; i < table_columns - 1 ; i++) {
                var newData = $("<td>");

                if (i == 2 || i == 3) {
                    newData.addClass("text-center");    // formatting columns
                }
                if (i >= array.length - 1) {
                    newData.addClass("text-right");     // formatting columns
                }

                newRow.append(newData);
            } // end for-loop appending columns to each row

            $(".rows_invoice").append(newRow);
            
            // *** populate page 1 - order details
            // target columns and populate cells with pertinent cart information from columns 1 to 6
            var RowTds = $('.tableInv').children().eq(1).children('tr').eq(k).children('td');

            RowTds.eq(0).text(k + 1);
            RowTds.eq(1).text(array[k].foodName); // item id value: e.g. burger
            RowTds.eq(2).text(array[k].price); // item each
            RowTds.eq(3).text(array[k].quantity); // item quantity: array[j].quantity
            RowTds.eq(4).text((array[k].price * array[k].quantity).toFixed(2));

        } // end for-loop populating Invoice

    }   // end function populate invoice

// ******************************************************************************* //
// Start *** cart charges calculation *** //
// ******************************************************************************* //

    function charges() {
        var subtotal = 0.00;
        var totalCharge = 0.00;
        var shipping = 59.99;
        var tax = 0.0825;

        // adds items prices
        for (var i = 0; i < array.length; i++) {
            subtotal += parseFloat(array[i].price * array[i].quantity);
            $(".subtotal").html(subtotal.toFixed(2));
        }

        $(".tax").html((subtotal * tax).toFixed(2));

        if (subtotal == 0) {
            shipping = 0;
            $(".shipping").html("0.00");
        } else {
            $(".shipping").html(shipping.toFixed(2));
        }

        totalCharge = subtotal * (1 + tax) + shipping
        $(".totalCharge").html(totalCharge.toFixed(2));
        // console.log(typeof totalCharge.toFixed(2));
        // console.log(totalCharge);
        // console.log(typeof totalCharge.toFixed(2));

        // go-to populate invoice
        invoice_pop();

// ******************************************************************************* //
// Start *** pass charge to paypal *** //
// ******************************************************************************* //

    toPayPal = subtotal.toFixed(2);
    $('#subtpay').val(toPayPal);
    // console.log($('#subtpay').val());
    } // end charges function

// ******************************************************************************* //
// Start *** update cart at checkout *** //
// ******************************************************************************* //

    // update cart item quantity and subtotal
    $(".update_item_Butt").on("click", function() {
            var newQuant = $(this).data("update");  // button id retrieved once pressed

            // retrieving new item quantity value
            var inputVal = $("#quant_" + newQuant).val();
            if (inputVal !== "") {
                // updates locally quantity updated in array

            // database cart update
                array[$(this).data("update")].quantity = inputVal;
                myarray = array;
                localStorage.setItem("myarray", JSON.stringify(myarray));

                // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& //
                // checking array has been updated in database

                array = JSON.parse(localStorage.getItem("myarray"));
                for (var a=0; a < array.length; a++) {
                    console.log("value after: " + Object.values(array[a]));
                } 

                // end checking array has been updated in database
                // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& //

                $('table').children().eq(1).children('tr').eq($(this).data("update")).children('td').eq(5).html((array[$(this).data("update")].price * inputVal).toFixed(2));
            } else {
                console.log("no change to initial value");
            }
            charges();
            return false;
        }); // end update order

// ******************************************************************************* //
// Start *** shipping address form *** //
// ******************************************************************************* //

    // var billingInfo = {};
    var firstName;
    var lastName;
    var email;
    var zip;
    var city;
    var state;
    var address;
    var phone;
    var delivDate = "12/10/1978";
    var emptyfield = 0
    // start local test data
    // var firstName = "Howdy";
    // var lastName = "Hey";
    // var deliverTo;
    // var email = "hellobuddy@gmail.com";
    // var zip = 12345;
    // var city = "happy";
    // var state = "tx";
    // var address = "123 bright av";
    // var phone = 123456789;
    // end local test data

$("#shipInfo").on("click", function () {
        firstName = $("#firstName").val().trim();
        lastName = $("#lastName").val().trim();
        address = $("#address1").val().trim();
        city = $("#city").val().trim();
        state = ($("#state").val().trim()).toUpperCase();
        zip = $("#zip").val().trim();
        email = $("#email1").val().trim();
        phone = $("#phone").val().trim();


    // delivDate = $("#date").val();


    

// database store shipping info
        database.ref('/users/' + "shipping").set({
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        state: state,
        zip: zip,
        email: email,
        phone: phone,
        // delivDate : delivDate,
    });



	    emptyfield = firstName.length * lastName.length * address.length * city.length * state.length *
                        zip.length * phone.length;
        console.log("emotyfield: " + emptyfield);
        // console.log(delivDate.length);
        // console.log(delivDate);

        $("#deliverTo").html(firstName + " " + lastName + "<br>" +
                    address + "<br>" +
                    city + "<br>" +
                    state + ", " + zip);

        $("#deliverTo2").html(firstName + " " + lastName + "<br>" +
                    address + "<br>" +
                    city + "<br>" +
                    state + ", " + zip);

        checkInputs();

});

// ******************************************************************************* //
// Start *** basic user input validation - shipping info  *** //
// ******************************************************************************* //


function checkInputs () {

        if (emptyfield == 0 || firstName.match(/[^a-zA-Z]/) || lastName.match(/[^a-zA-Z]/) || state.length !==2 ||
            state.match(/[^a-zA-Z]/) || zip.length !== 5 || zip.match(/[^0-9]/) ||
            phone.match(/[^\d]/) || phone.length !== 9) {
            console.log("invalid format");
            // $("#invalid_entry").html("Please correct invalid entries");
            next_step = false;
            console.log("next_step: " + next_step);
        } else {
            next_step = true;
            console.log("next_step: " + next_step);
        }

        // return false;
}

// missing basic email check
// pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"    
    
// ******************************************************************************* //
// Start *** read databse for shipping info  *** //
// ******************************************************************************* //

    database.ref('/users/' + 'shipping').on("value", function(snapshot){
    if (snapshot.child('email').exists()) {
    firstName = snapshot.val().firstName;
    lastName = snapshot.val().lastName;
    address = snapshot.val().address;
    city = snapshot.val().city;
    state = snapshot.val().state;
    zip = snapshot.val().zip;
    email = snapshot.val().email;
    phone = snapshot.val().phone; 

    // console.log("firstName: " + firstName);
    // console.log("lastName: " + lastName);
    //     console.log("address: " + address);
    //     console.log("city: " + city);
    //     console.log("state: " + state);
    //     console.log("zip: " + zip);
    //     console.log("email: " + email);
    //     console.log(phone);
        // console.log(delivDate);  
    } else {
        console.log("user does not exist");
    }      
});

// ******************************************************************************* //
// Start *** shipping address box check autopulate user info  *** //
// ******************************************************************************* //

$(document).on('change', '#checkbox', function() {
    if(this.checked) {
        console.log("checkbox is checked");
        $("#firstName").attr("value", firstName);
        $("#lastName").attr("value", lastName);
        $("#address1").attr("value", address);
        $("#city").attr("value", city);
        $("#state").attr("value", state);
        $("#zip").attr("value", zip);
        $("#phone").attr("value", phone);
        $("#email1").attr("value", email);
    } else {
        $("#firstName").attr("placeholder", "");
        $("#lastName").attr("placeholder", "");
        $("#address1").attr("placeholder", "");
        $("#city").attr("placeholder", "");
        $("#state").attr("placeholder", "");
        $("#zip").attr("placeholder", "");
        $("#phone").attr("placeholder", "");
        $("#email1").attr("placeholder", "");
    }
});

// ******************************************************************************* //
// Start *** cancel & go back to mainpage *** //
// ******************************************************************************* //

// !!! Not working !!! 
// !!! Not working !!! 
// !!! Not working !!! 

    $("#cancel").on("click", function() {
        // empty order array in database
        localStorage.clear();
        array = [];

        // window.location.href = "index.html";
    }); // end cancel order


// ******************************************************************************* //
// Start ***  bootsnip code below ***
// ******************************************************************************* //
// ******************************************************************************* //
// Start *** initialize tooltips ***
// ******************************************************************************* //

    //Initialize tooltips
    // $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });


    $(".next-step").click(function (e) {
        if (next_step) {
         var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);
        } else {
            console.log("invalid form entry");
        }
        next_step = false;
        console.log(next_step);
    });

$(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });

}); // end document ready

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}