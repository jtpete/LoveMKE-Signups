$( document ).ready( () => {
  $( "#submit" ).on( "click", () => {
    var firstName = $( "#firstNameInput" ).val();
    var lastName = $( "#lastNameInput" ).val();
    var phoneNum = $( "#phoneNumInput" ).val();
    var emailUsed = $( "#emailInput" ).val();
  console.log(firstName + " " + lastName + " " + phoneNum + " " + emailUsed);
  let sendSearch = {lName: lastName,
                    fName: firstName,
                    phone: phoneNum,
                    email: emailUsed,};

  console.log(sendSearch);
  sendSearch = JSON.stringify(sendSearch);
  console.log(sendSearch);

  $.ajax( {
    url: '/api/ccb',
    type: "post",
    dataType: "JSON",
    data: sendSearch,
    contentType: "application/json",
    processData: false,
    success: ( data ) => {
      let parser, xmlDoc;
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(data,"text/xml");
      console.log(xmlDoc.getElementByTagName("full_name")[0].childNodes[0].nodeValue);
    },
    error: ( data ) => {
      console.log(data);
    },
    });
  });
});
