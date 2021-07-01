$(document).ready(function () {

    var tamil_lettersJSON = {};
    GetAgarathiV2 = function (funcData) {

        $.getJSON("https://thanithamizhakarathikalanjiyam.github.io/ttakJs/tam_letters.json", function (ResponseJsonE) {
            tamil_lettersJSON = ResponseJsonE;
            $.each(ResponseJsonE.tam_first_letters, function (index, value) {

                $('#sel_first_letter').append($('<option>', {
                        value: value,
                        text: value
                    }));
            });

            $.each(ResponseJsonE.tam_last_letters, function (index, value) {

                $('#sel_last_letter').append($('<option>', {
                        value: value,
                        text: value
                    }));
            });

            $.each(ResponseJsonE.tam_mey_plus_uyirmey_letters, function (index, value) {

                $('#sel_edhugai_letter').append($('<option>', {
                        value: value,
                        text: value
                    }));
            });

        });
    }
    fill_lstMayankuMey = function (ninraMey) {}

    $("#sel_edhugai_letter").on("change", function () {

        var edhukai_letter = $("#sel_edhugai_letter").val();
        var MayankuMeykal = getMayankuMey(edhukai_letter);
        $('#sel_edhugai_letter').empty();
        $.each(MayankuMeykal, function (index, value) {

            $('#sel_edhugai_letter').append($('<option>', {
                    value: value,
                    text: value
                }));
        });

    });

    getMayankuMey = function (ninraMey) {
        var MayankuMey = [];
        $.each(tamil_lettersJSON.MayankuMeykal, function (index, value) {
            if (value.ninraMey === ninraMey) {
                MayankuMey = value.MayankuMey
            }
        });

        return MayankuMey;
    }

    createRandomWords = function () {

        var lengthOfWord = (parseInt($("#lengthOfWord").val()) + 1)
        var thead_row = $("<tr>")
            $("#theadGeneratedWords").empty();
        for (var i = 0; i < lengthOfWord; i++) {
            if (i === 0) {
                thead_row.append('<th scope="col">#</th>')
            } else if (i === 1) {
                thead_row.append('<th scope="col">முதல்</th>')
            } else if (i === (lengthOfWord - 1)) {
                thead_row.append('<th scope="col">இறுதி</th>')
            } else {
                var colSpanInt = lengthOfWord - 3;
                thead_row.append('<th scope="col"colspan=' + colSpanInt + '>இடை</th>')
                i = (lengthOfWord - 2);
            }
        }
        $("#theadGeneratedWords").append(thead_row);

        var gen_Words = getGeneratedWords(
                [
                    $("#sel_first_letter").val()
                ],
                [
                    $("#sel_last_letter").val()
                ], $("#lengthOfWord").val())

            $.each(gen_Words, function (index, value) {
                thead_row = $("<tr>")
                    thead_row.append('<td>' + value.word + '</td>')
                    $.each(value.letters, function (letter_index, letter_value) {
                        thead_row.append('<td>' + letter_value + '</td>')
                    });
                $("#tbodyGeneratedWords").append(thead_row);
            })

    }

    createRandomWords2 = function () {

        var gen_Words = getGeneratedWords(
                [
                    $("#sel_first_letter").val()
                ],
                [
                    $("#sel_last_letter").val()
                ], $("#lengthOfWord").val())
            $("#tabGeneratedWords").empty()

            $.each(gen_Words, function (index, value) {
                var link = $("<a>");
                link.attr("target", "_blank");
                link.attr("href", "https: //thanithamizhakarathikalanjiyam.github.io/?q=" + value.word);
                link.text(value.word + "|");
                $("#tabGeneratedWords").append(link);
            })

    }

    getGeneratedWords = function (tam_first_letters, tam_last_letters, wordLettersCount, edhukai_letters) {
        if (tam_first_letters === null || tam_first_letters === undefined) {
            tam_first_letters = tamil_lettersJSON.tam_first_letters
        }

        if (tam_last_letters === null || tam_last_letters === undefined || tam_last_letters[0] === "") {
            tam_last_letters = tamil_lettersJSON.tam_last_letters
        }
        if (wordLettersCount === null || wordLettersCount === undefined) {
            wordLettersCount = 2
        }
        if (edhukai_letters === null || edhukai_letters === undefined) {
            edhukai_letters = tamil_lettersJSON.tam_mey_plus_uyirmey_letters
        }

        if (wordLettersCount === 3) {
            $.each(tam_first_letters, function (index, first_letter) {
                $.each(edhukai_letters, function (index, edhukai_letter) {
					first_letter = first_letter + edhukai_letter;
				});
            });
			console.log(tam_first_letters)
        }

        var generatdWord = [];

        $.each(tam_first_letters, function (index, first_letter) {

            $.each(tam_last_letters, function (index, last_letter) {
                var generatdWordLetters = [];
                generatdWordLetters.push(first_letter);
                generatdWordLetters.push(last_letter);

                generatdWord.push({
                    word: generatdWordLetters.join(""),
                    letters: generatdWordLetters
                })
            });

        });

        //Insert an empty space between last and first letter
        $.each(generatdWord, function (index, value) {
            if (value.letters.length !== wordLettersCount) {
                var emptySpaceNeeded = wordLettersCount - value.letters.length;
                for (j = 0; j < emptySpaceNeeded; j++) {
                    generatdWord[index].letters.splice(1, 0, "H")
                }
            }
        });

        return generatdWord
    }

    $("#btnCreateWord").click(function () {
        $("#tbodyGeneratedWords").empty();
        //createRandomWords("Hi all");
        createRandomWords2("Hi all");
    });

    //Initial method call
    var jqxhr = $.when().then(function () {
            GetAgarathiV2()
            $('#myTable').DataTable();
        });
    // Set another completion function for the request above
    jqxhr.always(function () {
        //Elements event Functionality Starts
        //Elements event Functionality Ends

    });

});
