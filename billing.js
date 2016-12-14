$(document).ready(function() {

    // ******************************************************************************* //
    // Start *** using array object *** //
    // ******************************************************************************* //

    var table_columns = 6;

    var array = [
        { foodName: 'burger', price: 19.99, quantity: 3 },
        { foodName: 'hotdog', price: 22.65, quantity: 15 },
        { foodName: 'shrimp', price: 24.85, quantity: 22 },
        { foodName: 'package 1', price: 98.99, quantity: 1 },
        { foodName: 'utensils', price: 12.99, quantity: 25 },
    ]

    populate()

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

                if (i == 2 || i == 3) {
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

            // target columns and populate cells with pertinent cart information from columns 1 to 6
            var RowTds = $('table').children().eq(1).children('tr').eq(j).children('td');

            RowTds.eq(0).text(j + 1);
            RowTds.eq(1).text(array[j].foodName); // item id value: e.g. burger
            RowTds.eq(2).text(array[j].price); // item each
            RowTds.eq(3).html(); // item quantity: array[j].quantity
            RowTds.eq(4).html(); // update list item button: "button here"
            RowTds.eq(5).text((array[j].price * array[j].quantity).toFixed(2));

        } // end for-loop populating cart

        charges();  //
    } // end populate function

// ******************************************************************************* //
// Start *** cart charges calculation *** //
// ******************************************************************************* //

    function charges() {
        var subtotal = 0.00;
        var totalCharge = 0.00;
        var shipping = 20;
        var tax = 0.0825;

        // adds items prices
        for (var i = 0; i < array.length; i++) {
            subtotal += parseFloat(array[i].price * array[i].quantity);
            $("#subtotal").html(subtotal.toFixed(2));
        }

        $("#tax").html((subtotal * tax).toFixed(2));

        if (subtotal == 0) {
            shipping = 0;
            $("#shipping").html("0.00");
        } else {
            $("#shipping").html(shipping.toFixed(2));
        }

        totalCharge = subtotal * (1 + tax) + shipping;
        $("#totalCharge").html(totalCharge.toFixed(2));

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

// !!! have to update databse too !!! 
// !!! have to update databse too !!! 
// !!! have to update databse too !!! 

                array[$(this).data("update")].quantity = inputVal;

// !!! have to update databse too !!! 
// !!! have to update databse too !!! 
// !!! have to update databse too !!! 

                $('table').children().eq(1).children('tr').eq($(this).data("update")).children('td').eq(5).html((array[$(this).data("update")].price * inputVal).toFixed(2));
            } else {
                console.log("no change to initial value");
            }
            charges();
            return false;
        }); // end update order

// ******************************************************************************* //
// Start *** go back to mainpage *** //
// ******************************************************************************* //

// !!! have to update databse too !!! 
// !!! have to update databse too !!! 
// !!! have to update databse too !!! 

    $("#cancel").on("click", function() {
        // empty order array in database
    }); // end cancel order

    $("#save_cart").on("click", function(){
        // update database cart
    })


// ******************************************************************************* //
// Start *** Shippin Information Form *** //
// ******************************************************************************* //
    var shipAddr;

    $("#shipInfo").on("click", function() {
        var firstName = $("#firstName").val().trim();
        var lastName = $("#lastName").val().trim();
        var address1 = $("#address1").val().trim();
        var address2 = $("#address2").val().trim();
        var city = $("#city").val().trim();
        var state = $("#state").val().trim();
        var zipCode = $("#zip").val().trim();
        var email1 = $("#email1").val().trim();
        var email2 = $("#email2").val().trim();
        var phone = $("#phone").val().trim();

        // if (zipcode !== )





        var shipAddr = [
            {firstName: firstName,
            lastName: lastName,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zipCode: zip,
            email1: email1,
            email2: email2,
            phone: phone,}
        ]

        localStorage.setItem("shipAddr", shipAddr);


        return false;
    });
    
    localStorage.getItem("shipAddr");
    // console.log(shipAddr[0].firstName);







// ******************************************************************************* //
// Start ***  bootsnip code below ***
// ******************************************************************************* //
// ******************************************************************************* //
// Start *** initialize tooltips ***
// ******************************************************************************* //

    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

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
