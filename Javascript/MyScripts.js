function onloadIntervals() {
  UpdateLogData();
  CheckHardwareStatus();
  setInterval(UpdateLogData, myXMLconfig.js_parameters.LogUpdateInterval);
  setInterval(CheckHardwareStatus, myXMLconfig.js_parameters.CheckUpdateStatusInterval);
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
  console.log("UpdateLogData " + Math.round(new Date().getTime()/1000));
  // Declare all variables
  var DomoticzLogURL = "http://192.168.2.117:33333/json.htm?type=command&param=getlog"; //&jsoncallback=?
  //var DomoticzLogURL = myXMLconfig.js_parameters.DomoticzLogURL;
  var xhr = new XMLHttpRequest(); // From https://www.kirupa.com/html5/making_http_requests_js.htm

  xhr.open('GET', DomoticzLogURL, true);
  xhr.timeout = myXMLconfig.js_parameters.XMLHttpRequestTimeout;
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

function logResults(json){
  //console.log(json);
  //console.log(json.code);
  if (json.code == 0) {
    document.getElementById("BroadLink RM Bridge" + "_Status").style.color = "lightgreen";
  } else {
    document.getElementById("BroadLink RM Bridge" + "_Status").style.color = "red";
  }
}

function CheckHardwareStatus() {

  // From http://stackoverflow.com/questions/25220486/xmlhttprequest-in-for-loop
  // and http://stackoverflow.com/questions/24773307/sending-post-request-in-for-loop/24774532#24774532
  
  console.log("CheckHardwareStatus " + Math.round(new Date().getTime()/1000));
  //console.log(myXMLconfig.hardware.component.length);
  for(var i = 0; i < myXMLconfig.hardware.component.length; i++) {
    switch (myXMLconfig.hardware.component[i].name) {
      case "MKTronic LAN Ethernet IP 8 channels WEB Relay board" :
        //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + ' ' + Math.round(new Date().getTime()/1000));
        break;
      case "BroadLink RM Bridge" :
        //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1000, command:'registered_devices'})) + '&callback=logResults' + ' ' + Math.round(new Date().getTime()/1000));
        $.ajax({  // From https://www.sitepoint.com/jsonp-examples/
          url: 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1001, command:'probe_devices'})) + '&callback=logResults',
          dataType: "jsonp",
          jsonpCallback: "logResults"
        });
        break;
      default :
        (function(i) {
          var xhr = new XMLHttpRequest();
            //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + ' ' + Math.round(new Date().getTime()/1000));
            xhr.open("GET", 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port, true);
          xhr.onreadystatechange = function () {
            if ((xhr.readyState == 4) && (xhr.status == 200)) {
              //alert(JSON.parse(xhr.responseText));
              //console.log(myXMLconfig.hardware.component[i].name + "_Status");
              document.getElementById(myXMLconfig.hardware.component[i].name + "_Status").style.color = "lightgreen";
            } else {
              //console.log(myXMLconfig.hardware.component[i].name + "_Status2");
              document.getElementById(myXMLconfig.hardware.component[i].name + "_Status").style.color = "red";
            }
          };
          xhr.timeout = myXMLconfig.js_parameters.XMLHttpRequestTimeout;
          xhr.send();
        })(i);
    }
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
