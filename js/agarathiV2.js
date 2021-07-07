$(document).ready(function () {
    //Initial method call
    var jqxhr = $.when().then(function () {});
    // Set another completion function for the request above
    jqxhr.always(function () {
        //Elements event Functionality Starts
        //Elements event Functionality Ends
		$('#sel_first_letter,#sel_edhugai_letter,#sel_last_letter').empty();
				$('#sel_first_letter,#sel_edhugai_letter,#sel_last_letter').append($('<option>', {
                            value: null,
                            text: ""
                        }));
				$('#sel_edhugai_letter').append($('<option>', {
                            value: "அனைத்தும்",
                            text: "அனைத்தும்"
                        }));
						
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

        $('#MyTableContainer').jtable({

            //General options comes here
			title: 'சொற்கள',
            paging: true,
            pageSize: 10,
            sorting: true,
            actions: {
                listAction: function (postData, jtParams) {
					
					var first_letter = $("#sel_first_letter").val()
					var last_letter = $("#sel_last_letter").val()
					var edhugai_letter = $("#sel_edhugai_letter").val()
                    var records = tamil_lettersJSON.getGeneratedWords(
						{
							tam_first_letters: [first_letter],
							edhukai_letters: [edhugai_letter],
							tam_last_letters: [last_letter],
							jtParams:jtParams
						}
					)

                    return records;
                }
            },
            fields: {
                first_letter: {
                    title: "மோனை"
                },
				edhukai: {
                    title: "எதுகை"
                },
				last_letter: {
                    title: "ஈற்று"
                },
				word: {
                    title: "சொல் "
                },
            }

            //Event handlers...
        })

    
	 $('#MyTableContainer').jtable("load");
	});

    setMayankuMeykal = function () {

        var sel_edhugai_letterVal = $('#sel_edhugai_letter').val()
				
				
            if (sel_edhugai_letterVal === null || sel_edhugai_letterVal === "") {
                $.each(tamil_lettersJSON.tam_last_letters, function (index, value) {
                    $('#sel_last_letter').append($('<option>', {
                            value: value,
                            text: value
                        }));
                });
            } else if(sel_edhugai_letterVal !== "அனைத்தும்"){
                
				
				$('#sel_last_letter').empty();
				$('#sel_last_letter').append($('<option>', {
                            value: null,
                            text: ""
                        }));
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
		$('#MyTableContainer').jtable("load");

    });
	$('#sel_first_letter,#sel_last_letter').on("change", function () {

        $('#MyTableContainer').jtable("load");

    });
    $('#btnCreateWord').click(function () {

        $('#MyTableContainer').jtable("load");

    });

});
