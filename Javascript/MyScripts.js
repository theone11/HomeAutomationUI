function onloadIntervals() {
  CreateHTML();
  CheckHardwareStatus();
  UpdateDomoticzLog();
  setInterval(UpdateDomoticzLog, myXMLconfig.js_parameters.UpdateDomoticzLogInterval);
  setInterval(CheckHardwareStatus, myXMLconfig.js_parameters.CheckHardwareStatusInterval);
  //console.log(myXMLconfig);
}


function CreateHTML () {

  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

  //Create new DIV for tabs
  var DIVtabs = document.getElementById("tabs_div");

  //Create List Parent Element
  var newLIST = document.createElement("ul");
  newLIST.id = "tabs_list";
  newLIST.className = "tab";
  DIVtabs.appendChild(newLIST);

  console.log(myXMLconfig.layout.tabs.tab.length);
  for (i = 0; i < myXMLconfig.layout.tabs.tab.length; i++) {
    // Create new Tab Element
    var newLISTitem = document.createElement("li");
    newLISTitem.id = "tab_li_" + i;
    document.getElementById("tabs_list").appendChild(newLISTitem); //Append new tab to list
    //Create new Tab element name - Header Name
    var newA = document.createElement("a");
    newA.id = "tab_a_" + i;
    newA.className = "tablinks";
    newA.href = "#";
    newA.setAttribute('onclick','openTab(event, ' + "'" + myXMLconfig.layout.tabs.tab[i].id + "'" + ')')
    newA.innerHTML = myXMLconfig.layout.tabs.tab[i].title;
    document.getElementById("tab_li_" + i).appendChild(newA); //Append header name to tab
    //Create new Tab content element
    var newTAB = document.createElement("div");
    newTAB.id = myXMLconfig.layout.tabs.tab[i].id;
    newTAB.className = "tabcontent";
    DIVtabs.appendChild(newTAB); //Append content to tab
    
    switch(myXMLconfig.layout.tabs.tab[i].id) {
      case "Hardware":
        // Create Hardware list element
        var newLIST = document.createElement("ul");
        newLIST.id = "Hardware_List";
        newLIST.dir = "ltr";
        document.getElementById(myXMLconfig.layout.tabs.tab[i].id).appendChild(newLIST); //Append Hardware List to tab content (div)
        console.log(myXMLconfig.hardware.component.length);
        for (j = 0; j < myXMLconfig.hardware.component.length; j++) {
          // Create new Hardware Element
          var newLISTitem = document.createElement("li");
          newLISTitem.id = myXMLconfig.hardware.component[j].name + "_Status";
          newLISTitem.innerHTML = "Name:" + myXMLconfig.hardware.component[j].name + " IP:" + myXMLconfig.hardware.component[j].ip + " Port:" + myXMLconfig.hardware.component[j].port;
          document.getElementById("Hardware_List").appendChild(newLISTitem); //Append new hardware to Hardware list
        }
        break;
      case "Log":
        var newDIV = document.createElement("div");
        newDIV.id = "Log Content";
        newDIV.dir = "ltr";
        document.getElementById(myXMLconfig.layout.tabs.tab[i].id).appendChild(newDIV);
        break;
      default:
        var newDIV = document.createElement("div");
        newDIV.id = "DIV_" + myXMLconfig.layout.tabs.tab[i].id;
        newDIV.dir = "ltr";
        document.getElementById(myXMLconfig.layout.tabs.tab[i].id).appendChild(newDIV);
        console.log(myXMLconfig.devices.device.length);
        for (j = 0; j < myXMLconfig.devices.device.length; j++) {
          console.log(myXMLconfig.devices[j].device.tab + " / " + myXMLconfig.layout.tabs.tab[i].id);
          if (myXMLconfig.devices[j].tab == myXMLconfig.layout.tabs.tab[i].id) {
            var newP = document.createElement("p");
            newP.id = "IDX_" + myXMLconfig.devices[j].device.idx;
            document.getElementById("DIV_" + myXMLconfig.layout.tabs.tab[i].id).appendChild(newP);
          }
        }
        break;
    }
  }
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


function UpdateDomoticzLog() {

  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  
  var index;
  var DomoticzLogURL = "";
  for (i = 0; i < myXMLconfig.hardware.component.length; i++) {
    if (myXMLconfig.hardware.component[i].type == "Domoticz Server") {
      DomoticzLogURL = 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + myXMLconfig.hardware.component[i].logURL;
      //console.log(DomoticzLogURL);
      index = i;
      break;
    }
  }

  //$.getJSON(DomoticzLogURL, {format: "json"}, function(data) {DomoticzLogAnalyze(data);});
  $.ajax({
          url: DomoticzLogURL,
          dataType: "json",
          async: true,
          timeout: ((Object.keys(myXMLconfig.hardware.component[i].timeout).length === 0 && myXMLconfig.hardware.component[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware.component[i].timeout),
          indexValue: index,
          success: function(data) {DomoticzLogAnalyze(data, this.indexValue);},
          error: function () {
                   document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Status").style.color = "red";
                   document.getElementById("Log Content").innerHTML = "Server could not be reached";
                 }
        });

  function DomoticzLogAnalyze(json, index) {

    //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

    //console.log(json);
    if (json.status == "OK") {
      document.getElementById(myXMLconfig.hardware.component[index].type + "_Status").style.color = "lightgreen";
      var logtext = "";
      for (i = (json.result.length - 1); i >= 0; i--) {
        logtext += json.result[i].message + "<br>";
      }
      document.getElementById("Log Content").innerHTML = logtext;
    } else {
      document.getElementById(myXMLconfig.hardware.component[index].type + "_Status").style.color = "red";
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
      case "Domoticz Server" :
        //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + myXMLconfig.hardware.component[i].dataURL);
        //$.getJSON(DomoticzDataURL, {format: "json"}, function(data) {DomoticzDataAnalyze(data);});
        $.ajax({
          url: 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + myXMLconfig.hardware.component[i].dataURL,
          dataType: "json",
          async: true,
          timeout: ((Object.keys(myXMLconfig.hardware.component[i].timeout).length === 0 && myXMLconfig.hardware.component[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware.component[i].timeout),
          indexValue: i,
          success: function(data) {DomoticzDataAnalyze(data, this.indexValue);},
          error: function () { document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Status").style.color = "red";  }
        });
      case "MKTronic LAN Relay Board" :
        //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + ' ' + Math.round(new Date().getTime()) + ' [ms]');
        break;
      case "Broadlink RM Bridge" :
        //console.log('http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1000, command:'registered_devices'})) + '&callback=BroadlinkDataAnalyze' + ' ' + Math.round(new Date().getTime()) + ' [ms]');
        $.ajax({
          url: 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1001, command:'probe_devices'})),
          dataType: "jsonp",
          async: true,
          timeout: ((Object.keys(myXMLconfig.hardware.component[i].timeout).length === 0 && myXMLconfig.hardware.component[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware.component[i].timeout),
          indexValue: i,
          success: function(data) {BroadlinkProbeDevices(data, this.indexValue);},
          error: function () {
              document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Status").style.color = "red"; 
              document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Nodes"));
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
          xhr.timeout = ((Object.keys(myXMLconfig.hardware.component[i].timeout).length === 0 && myXMLconfig.hardware.component[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware.component[i].timeout);
          xhr.send();
        })(i);
    }
  }
}

function DomoticzDataAnalyze(json, i) {

  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

  //console.log(json);
  if (json.status == "OK") {
    document.getElementById("sunrise").innerHTML = "Sunrise " + json.Sunrise;
    document.getElementById("sunset").innerHTML = "Sunset " + json.Sunset;
  } else {
    document.getElementById("sunrise").innerHTML = "Sunrise error";
    document.getElementById("sunset").innerHTML = "Sunset error";
  }
}

function BroadlinkProbeDevices(json, i) {

  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

  //console.log(json);
  if (json.code == 0) {
    $.ajax({
      url: 'http://' + myXMLconfig.hardware.component[i].ip + ':' + myXMLconfig.hardware.component[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1000, command:'registered_devices'})),
      dataType: "jsonp",
      async: true,
      timeout: ((Object.keys(myXMLconfig.hardware.component[i].timeout).length === 0 && myXMLconfig.hardware.component[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware.component[i].timeout),
      indexValue: i,
      success: function(data) {BroadlinkRegisteredDevices(data, this.indexValue);},
      error: function () {
          document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Status").style.color = "red";
          document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Nodes"));
        }
    });
  } else {
    document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").style.color = "red";
    document.getElementById(myXMLconfig.hardware.component[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware.component[i].type + "_Nodes"));
  }
}

function BroadlinkRegisteredDevices(json, i) {

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
