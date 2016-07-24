function onloadIntervals() {
  setInterval(UpdateLogData, 20000);
  setInterval(CheckHardwareStatus, 30000);
}

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
  console.log("UpdateLogData");
  //console.log(DomoticzData);
  //console.log(myXMLconfig);
  //console.log(DomoticzData.Sunset);
  //console.log(myXMLconfig.hardware.component[0]);
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

function CheckHardwareStatus() {

  // From http://stackoverflow.com/questions/25220486/xmlhttprequest-in-for-loop
  // and http://stackoverflow.com/questions/24773307/sending-post-request-in-for-loop/24774532#24774532
  
  //console.log(myXMLconfig.hardware.component.length);
  for(var i = 0; i < myXMLconfig.hardware.component.length; i++) {
    (function(i) {
      var xhr = new XMLHttpRequest();
      console.log("http://" + myXMLconfig.hardware.component[i].ip + ":" + myXMLconfig.hardware.component[i].port)
      xhr.open("GET", "http://" + myXMLconfig.hardware.component[i].ip + ":" + myXMLconfig.hardware.component[i].port, true);
      xhr.onreadystatechange = function () {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
          //console.log(myXMLconfig.hardware.component[i].name + "_Status");
          document.getElementById(myXMLconfig.hardware.component[i].name + "_Status").style.color = "green";
        } else {
          //console.log(myXMLconfig.hardware.component[i].name + "_Status2");
          document.getElementById(myXMLconfig.hardware.component[i].name + "_Status").style.color = "red";
        }
      };
      xhr.timeout = 2000;
      xhr.send();
      //console.log(xhr);
    })(i);
  }

/*

  // From https://bbs.archlinux.org/viewtopic.php?id=58640
  
  console.log(myXMLconfig.hardware.component.length);
  var xhr = new Array(myXMLconfig.hardware.component.length);
  for(var i = 0; i < myXMLconfig.hardware.component.length; i++) {
    xhr[i] = new XMLHttpRequest();
    console.log("http://" + myXMLconfig.hardware.component[i].ip + ":" + myXMLconfig.hardware.component[i].port)
    xhr[i].open("GET", "http://" + myXMLconfig.hardware.component[i].ip + ":" + myXMLconfig.hardware.component[i].port, true);
    xhr[i].onreadystatechange = function () {
      function responsef(index) {
        console.log(index);
        if ((xhr[index].readtState == 4) && (xhr[index].status == 200)) {
          console.log(myXMLconfig.hardware.component[index].name + "_Status");
          document.getElementById(myXMLconfig.hardware.component[index].name + "_Status").style.color = "green";
        } else {
          console.log(myXMLconfig.hardware.component[index].name + "_Status2");
          document.getElementById(myXMLconfig.hardware.component[0].name + "_Status").style.color = "red";
        }
      }
    }(i);
    xhr[i].timeout = 2000;
    xhr[i].send();
    console.log(xhr[i]);
  }
*/
}
