$(document).ready(function () {
    //Initial method call
    var jqxhr = $.when().then(function () {});
    // Set another completion function for the request above
    jqxhr.always(function () {
        //Elements event Functionality Starts
        //Elements event Functionality Ends
        $.each(tamil_lettersJSON.tam_first_letters, function (index, value) {

            $('#sel_first_letter').append($('<option>', {
                    value: value,
                    text: value
                }));
        });

       
		 $.each(tamil_lettersJSON.tam_mey_plus_uyirmey_letters, function (index, value) {

                    $('#sel_edhugai_letter').append($('<option>', {
                            value: value,
                            text: value
                        }));
                });
        setMayankuMeykal();
    });

    setMayankuMeykal = function () {

     var sel_edhugai_letterVal = $('#sel_edhugai_letter').val()

            if (sel_edhugai_letterVal === "") {
                $.each(tamil_lettersJSON.tam_last_letters, function (index, value) {

            $('#sel_last_letter').append($('<option>', {
                    value: value,
                    text: value
                }));
        });
            } else {
				$('#sel_last_letter').empty();
                var getMayankuMeyKal = tamil_lettersJSON.getMayankuMey(sel_edhugai_letterVal)
                    $.each(getMayankuMeyKal, function (index, value) {
                        $('#sel_last_letter').append($('<option>', {
                                value: value,
                                text: value
                            }));
                    });
            }

    }

    $('#sel_edhugai_letter').on("change", function () {
		
		setMayankuMeykal()
		
	});

});
