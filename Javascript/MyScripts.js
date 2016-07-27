function onloadIntervals() {
  UpdateDomoticzData();
  UpdateDomoticzLog();
  CheckHardwareStatus();
  setInterval(UpdateDomoticzLog, myXMLconfig.js_parameters.LogUpdateInterval);
  setInterval(UpdateDomoticzData, myXMLconfig.js_parameters.DataUpdateInterval);
  setInterval(CheckHardwareStatus, myXMLconfig.js_parameters.CheckUpdateStatusInterval);
}

function openTab(evt, tabName) {
 
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

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


function UpdateDomoticzData(){

  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  
  var DomoticzDataURL = 'http://' + myXMLconfig.server.domoticz.ip + ':' + myXMLconfig.server.domoticz.port + myXMLconfig.server.domoticz.dataURL;
  //console.log(DomoticzDataURL);

//  $.getJSON(DomoticzDataURL, {format: "json"}, function(data) {DomoticzDataAnalyze(data);});

   $.ajax({
          url: DomoticzDataURL,
          dataType: "json",
          async: true,
          timeout: ((myXMLconfig.server.domoticz.timeout == "") ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.server.domoticz.timeout),
          success: function(data) {DomoticzDataAnalyze(data);},
          error: function () {}
        });

  function DomoticzDataAnalyze(json) {
    //console.log(json);
    if (json.status == "OK") {
      document.getElementById("sunrise").innerHTML = "Sunrise " + json.Sunrise;
      document.getElementById("sunset").innerHTML = "Sunset " + json.Sunset;
    } else {
      document.getElementById("sunrise").innerHTML = "Sunrise error";
      document.getElementById("sunset").innerHTML = "Sunset error";
    }
    //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  }
}


function UpdateDomoticzLog() {

  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  
  var DomoticzLogURL = 'http://' + myXMLconfig.server.domoticz.ip + ':' + myXMLconfig.server.domoticz.port + myXMLconfig.server.domoticz.logURL;
  //console.log(DomoticzLogURL);

//  $.getJSON(DomoticzLogURL, {format: "json"}, function(data) {DomoticzLogAnalyze(data);});

  $.ajax({
          url: DomoticzLogURL,
          dataType: "json",
          async: true,
          timeout: ((myXMLconfig.server.domoticz.timeout == "") ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.server.domoticz.timeout),
          success: function(data) {DomoticzLogAnalyze(data);},
          error: function () {
                   document.getElementById("Domoticz Server" + "_Status").style.color = "red";
                   document.getElementById("Log Content").innerHTML = "Server could not be reached";
                 }
        });

  function DomoticzLogAnalyze(json) {
    //console.log(json);
    if (json.status == "OK") {
      document.getElementById("Domoticz Server" + "_Status").style.color = "lightgreen";
      var logtext = "";
      for (i = (json.result.length - 1); i >= 0; i--) {
        logtext += json.result[i].message + "<br>";
      }
      document.getElementById("Log Content").innerHTML = logtext;
    } else {
      document.getElementById("Domoticz Server" + "_Status").style.color = "red";
      document.getElementById("Log Content").innerHTML = "Server returned Status = " + json.status;
    }
    console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  }
}


function CheckHardwareStatus() {

  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

  //console.log(myXMLconfig.hardware.component.length);
  for (var i = 0; i < myXMLconfig.hardware.component.length; i++) {
    //console.log(myXMLconfig.hardware.component[i].type);
    switch (myXMLconfig.hardware.component[i].type) {
      case "MKTronic LAN Relay Board" :
        //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + ' ' + Math.round(new Date().getTime()) + ' [ms]');
        break;
      case "Broadlink RM Bridge" :
        //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1000, command:'registered_devices'})) + '&callback=BroadlinkDataAnalyze' + ' ' + Math.round(new Date().getTime()) + ' [ms]');
        $.ajax({
          url: 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1001, command:'probe_devices'})),
          dataType: "jsonp",
          async: true,
          timeout: ((myXMLconfig.hardware.component[i].timeout == "") ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware.component[i].timeout),
          indexValue: i,
          success: function(data) {BroadlinkProbeDevices(data, this.indexValue);},
          error: function () {
              document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").style.color = "red"; 
              document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware.component[i].type + "_Nodes"));
            }
        });
        break;
      default :
        (function(i) {
          var xhr = new XMLHttpRequest();
            //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + ' ' + Math.round(new Date().getTime()) + ' [ms]');
            xhr.open("GET", 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port, true);
            xhr.onreadystatechange = function () {
            if ((xhr.readyState == 4) && (xhr.status == 200)) {
              //console.log(myXMLconfig.hardware.component[i].name + "_Status");
              document.getElementById(myXMLconfig.hardware.component[i].name + "_Status").style.color = "lightgreen";
            } else {
              //console.log(myXMLconfig.hardware.component[i].name + "_Status (else)");
              document.getElementById(myXMLconfig.hardware.component[i].name + "_Status").style.color = "red";
            }
          };
          xhr.timeout = myXMLconfig.js_parameters.XMLHttpRequestTimeout;
          xhr.send();
        })(i);
    }
  }
}

function BroadlinkProbeDevices(json, i){

  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

  //console.log(json);
  if (json.code == 0) {
    $.ajax({
      url: 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1000, command:'registered_devices'})),
      dataType: "jsonp",
      async: true,
      timeout: ((myXMLconfig.hardware.component[i].timeout == "") ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware.component[i].timeout),
      indexValue: i,
      success: function(data) {BroadlinkRegisteredDevices(data, this.indexValue);},
      error: function () {
          document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").style.color = "red";
          document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware.component[i].type + "_Nodes"));
        }
    });
  } else {
    document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").style.color = "red";
    document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware.component[i].type + "_Nodes"));
  }
}

function BroadlinkRegisteredDevices(json, i){

  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

  //console.log(json);
  if (json.code == 0) {
    document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").style.color = "lightgreen";
    if (document.getElementById(myXMLconfig.hardware.component[i].type + "_Nodes") != null) {
      document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware.component[i].type + "_Nodes"));
    }
    var newNode = document.createElement("ul");
    newNode.id = myXMLconfig.hardware.component[i].type + "_Nodes"
    document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").appendChild(newNode);
    for (var j = 0; j < json.list.length; j++) {
      var newNode = document.createElement("li");
      newNode.id = myXMLconfig.hardware.component[i].type + " " + j;
      document.getElementById(myXMLconfig.hardware.component[i].type + "_Nodes").appendChild(newNode);
      document.getElementById(myXMLconfig.hardware.component[i].type + " " + j).innerHTML = "Name: " + json.list[j].name + " MAC: " + json.list[j].mac;
    }
  } else {
    document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").style.color = "red";
    document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware.component[i].type + "_Nodes"));
  }
}
