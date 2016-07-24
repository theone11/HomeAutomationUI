function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function UpdateLogData() {
  console.log(DomoticzData);
  console.log(DomoticzData.hardware.component[0]);
  //alert(JSON.parse(DomoticzData));
  //alert(DomoticzData.ActTime);
  // Declare all variables
  var DomoticzURL = "http://192.168.2.117:33333/json.htm?type=command&param=getlog"; //&jsoncallback=?
  var xhr = new XMLHttpRequest(); // From https://www.kirupa.com/html5/making_http_requests_js.htm

  xhr.open('GET', DomoticzURL, true);
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, false);
  
  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      var logtext = "";
      for (i = (response.result.length - 1); i >= 0; i--) {
        logtext += response.result[i].message + "<br>";
      }
      document.getElementById("Log Content").innerHTML = logtext;
    }
  }
}


//function CheckHardware(arraydata) {
//  alert(arraydata);

/*
  var ListHarware = document.getElementById("Hardware Content");
  var HardwareLIs = document.getElementByTagName("li");
  var ServerNames = [];
  var ServerNames = [];
  var ServerNames = [];
  
  for(var i = 0; i < HardwareLIs.length; i++) {
*/
  //logtext += response.result[i].message + "<br>";
//  }

//    var myXMLconfig = <?php echo $myXMLconfig; ?>;
//    alert(myXMLconfig);

    // Declare all variables
/*     var DomoticzURL = "http://192.168.2.117:33333/"; //&jsoncallback=?
    var xhr = new XMLHttpRequest(); // From https://www.kirupa.com/html5/making_http_requests_js.htm

    
    xhr.open('GET', DomoticzURL, true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);
    
    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById("Log Content").innerHTML = logtext;
      }
    }*/
//}