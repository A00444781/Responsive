var SERVER_URL = 'http://dev.cs.smu.ca:8106';



function saveInfo(){
    if (validateData()) {
                //create an object
                var university = {
                    "Name": $("#name").val(),
                    "Address": $("#address").val(),
                    "PhoneNumber": $("#phone").val()
                };
        //now send the request
        $.post(SERVER_URL + "/addUniversity",
            university,
            function (data) {
                alert("Result saved successfully!");
                $("#name").val('');
                $("#address").val('');
                $("#phone").val('');
            }).fail(function (error) {
                alert("Error: " +error.responseText);
            });
  }//end if
}

function validateData(){
    //first get the values from the fields 
    var name = $("#name").val();
    var address = $("#address").val();
    var phone = $("#phone").val(); 



    //check empty fields
    if (name == '') {
        alert("Please enter the name of the university!");
        $("#name").focus();
        return false;
    }
    else if (address == '') {
        alert("Please enter the address of the university!");
        $("#address").focus();
        return false;
    }
    else if (phone == '') {
        alert("Please enter the phone number of the university!");
        $("#phone").focus();
        return false;
    }else{
       var tokens = phone.split('-');
       for (var i = 0; i < tokens.length; i++) {
        if (isNaN(tokens[i])) {
            alert("Please use only numbers or hyphens!");
            $("#phone").focus();
            return false;
            }//end if
        }//end for

        var firstChar = address.trim().substr(0, 1);
        if (isNaN(firstChar)) {
            alert("Address should start with a number!");
            $("#address").focus();
            return false;
        }

        var pattern = /[a-z]/i;

        if (!(pattern.test(address))) {
            alert("Address should contain letters!");
            $("#address").focus();
            return false;
        }else{
            return true;
        }



    }

}

function searchInfo(){
    var newObj = {
        "Name": $("#search").val()
    };

    $.post(SERVER_URL + "/getUniversity",
        newObj,
        function (data) {
            university = data;

            if (university == null || university.length == 0) {           
                    alert("No record found"); //no record whatsoever, let the user know
                    $("#name").val('');
                    $("#address").val('');
                    $("#phone").val('');
                }
                else {
                    //alert('Found matched university!!');
                    var name = university[0].Name;
                    var address = university[0].Address;
                    var phone = university[0].PhoneNumber;
                    //now fill the form
                    $("#name").val(name);
                    $("#address").val(address);
                    $("#phone").val(phone);
                    }//end else 

                }).fail(function (error) {
                    alert("Error: " +error.responseText);
                });
            }




            function deleteInfo(){

                var newObj = {
                    "Name": $("#name").val()
                };

                $.post(SERVER_URL + "/deleteUniversity",
                    newObj,
                    function (data) {
                        alert("Result deleted");
                        //now clean up the form
                        $("#name").val('');
                        $("#address").val('');
                        $("#phone").val('');
                    }).fail(function (error) {
                        alert("Error: " +error.responseText);
                    });
                }



                function displayRecords(){

                    $.post(SERVER_URL + '/allUniversities',
    // you could also pass null,  or an empty string etc
    function (data) {
        universities = data;

        if (universities == null || universities.length == 0) {           
            alert("No record found"); //no record whatsoever, let the user know
        }
        else {
          $("#displayTable").html(
            "   <tr>" +
            "     <th>Name</th>" +
            "     <th>Address</th>" +
            "     <th>Phone</th>" +
            "   </tr>"
            );

          var table = document.getElementById('displayTable');
          for (var i = 0; i < universities.length; i++) {

                    var name = universities[i].Name;//Name attribute
                    var address = universities[i].Address; // Address attribute
                    var phone = universities[i].PhoneNumber; //PhoneNumber attribute

                    var r = table.insertRow();
                    r.insertCell(-1).innerHTML = name;
                    r.insertCell(-1).innerHTML = address;
                    r.insertCell(-1).innerHTML = phone;}
            }//end else 

        }).fail(function (error) {
            alert(error.responseText);
        });
    }