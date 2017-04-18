var myXMLconfig = JSON.parse(data);
  
function onloadIntervals() {
  //console.log(data);
  console.log(myXMLconfig);
  CreateHTML();
  CheckDeviceStatus();
  CheckHardwareStatus();
  UpdateDomoticzLog();
  setInterval(CheckDeviceStatus, myXMLconfig.js_parameters.CheckDeviceStatusInterval);
  setInterval(UpdateDomoticzLog, myXMLconfig.js_parameters.UpdateDomoticzLogInterval);
  setInterval(CheckHardwareStatus, myXMLconfig.js_parameters.CheckHardwareStatusInterval);
  console.log(myXMLconfig);
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

  // Create tabs according to settings.xml
  myXMLconfig.layout.tabs.tab.forEach(function(tab, i) {
    // Create new Tab Element
    var newLISTitem = document.createElement("li");
    newLISTitem.id = "tab_li_" + i;
    document.getElementById("tabs_list").appendChild(newLISTitem); //Append new tab to list
    //Create new Tab element name - Header Name
    var newIMG = document.createElement("IMG");
    newIMG.id = "IMG_tab_icon_" + i;
    newIMG.src = tab.imagesrc_icon;
    document.getElementById("tab_li_" + i).appendChild(newIMG);
    var newA = document.createElement("a");
    newA.id = "tab_a_" + i;
    newA.className = "tablinks";
    newA.href = "#";
    newA.setAttribute('onclick','openTab(event, ' + "'" + tab.id + "'" + ')')
    newA.innerHTML = tab.title;
    document.getElementById("tab_li_" + i).appendChild(newA); //Append header name to tab
    //Create new Tab content element
    var newTAB = document.createElement("div");
    newTAB.id = tab.id;
    newTAB.dir = tab.direction;
    newTAB.className = "tabcontent";
    DIVtabs.appendChild(newTAB); //Append content to tab
    
    switch(tab.id) { // Create elements inside each tab according to the tab type "ID"
      case "Hardware":
        // Create Hardware list element
        var newLIST = document.createElement("ul");
        newLIST.id = "Hardware_List";
        newLIST.dir = "ltr";
        document.getElementById(tab.id).appendChild(newLIST); //Append Hardware List to tab content (div)
        //console.log(myXMLconfig.hardware.component.length);
        myXMLconfig.hardware.component.forEach(function(component) {
          // Create new Hardware Element
          var newLISTitem = document.createElement("li");
          newLISTitem.id = component.name + "_Status";
          newLISTitem.innerHTML = "Name:" + component.name + " IP:" + component.ip + " Port:" + component.port;
          document.getElementById("Hardware_List").appendChild(newLISTitem); //Append new hardware to Hardware list
        });
        break;
      case "Log":
        break;
      case "Multimedia":
        myXMLconfig.hardware.component.forEach(function(component) {
          if (component.type == "Logitech Media Server") {
            var newIFRAME = document.createElement("iframe");
            newIFRAME.id = "Logitech Media Server";
            newIFRAME.src = "http://" + component.ip + ":" + component.port;
            newIFRAME.align = "middle";
            newIFRAME.height = 820;
            newIFRAME.width = 720;
            document.getElementById(tab.id).appendChild(newIFRAME);
          }
        });
        break;
      case "Shades_Lights":
        myXMLconfig.devices.device.forEach(function(device) {
          //console.log(device.tab + " / " + tab.id);
          if (device.tab == tab.id) {
            //Create DIV for every device
            var newDIV = document.createElement("div");
            newDIV.id = "DIV_IDX_" + device.idx;
            newDIV.className = "Shades_DIV";
            document.getElementById(tab.id).appendChild(newDIV);
            //Create P for every device name
            var newP = document.createElement("p");
            newP.id = "P_IDX_" + device.idx;
            newP.innerHTML = device.idx + " " + device.label
            document.getElementById("DIV_IDX_" + device.idx).appendChild(newP);
            //Create IMG for every device OPEN
            var newIMG = document.createElement("IMG");
            newIMG.id = "IMG_OPEN_IDX_" + device.idx;
            newIMG.addEventListener("click", function(){ ChangeBlindState(device.type, device.idx, "OPEN", 0); }, false);
            newIMG.src = tab.imagesrc_open;
            document.getElementById("DIV_IDX_" + device.idx).appendChild(newIMG);
            //Create DIV for every device slider
            var newDIV = document.createElement("div");
            newDIV.id = "DIV_SLIDER_IDX_" + device.idx;
            newDIV.className = "Slider_Container_DIV";
            document.getElementById("DIV_IDX_" + device.idx).appendChild(newDIV);
            //Create Slider for every device
            var newSlider = document.createElement("INPUT");
            newSlider.id = "SLIDER_IDX_" + device.idx;
            newSlider.setAttribute("type", "range");
            newSlider.onchange = function(){ ChangeBlindState(device.type, device.idx, "LEVEL", newSlider.value); };
            newSlider.setAttribute("orient", "vertical");
            document.getElementById("DIV_SLIDER_IDX_" + device.idx).appendChild(newSlider);
            //Create IMG for every device CLOSE
            var newIMG = document.createElement("IMG");
            newIMG.id = "IMG_CLOSE_IDX_" + device.idx;
            newIMG.onclick = function(){ ChangeBlindState(device.type, device.idx, "CLOSE", 0); };
            newIMG.src = tab.imagesrc_close;
            document.getElementById("DIV_IDX_" + device.idx).appendChild(newIMG);
            //Create P for every device (space)
            var newP = document.createElement("p");
            document.getElementById("DIV_IDX_" + device.idx).appendChild(newP);
            //Create IMG for every device STOP
            var newIMG = document.createElement("IMG");
            newIMG.id = "IMG_STOP_IDX_" + device.idx;
            newIMG.onclick = function(){ ChangeBlindState(device.type, device.idx, "STOP", 0); };
            newIMG.src = tab.imagesrc_stop;
            document.getElementById("DIV_IDX_" + device.idx).appendChild(newIMG);
          }
        });
        break;
      case "Irrigation":
        myXMLconfig.devices.device.forEach(function(device) {
          //console.log(device.tab + " / " + tab.id);
          if (device.tab == tab.id) {
            var newDIV = document.createElement("div");
            newDIV.id = "DIV_IDX" + device.idx;
            newDIV.style.cssFloat = 'right';
            newDIV.style.styleFloat = 'right'; // IE
            document.getElementById(tab.id).appendChild(newDIV);
            var newP = document.createElement("p");
            newP.id = "IDX_" + device.idx;
            newP.innerHTML = device.idx + " : " + device.label
            document.getElementById("DIV_IDX" + device.idx).appendChild(newP);
          }
        });
        break;
      default:
        //console.log(myXMLconfig.devices.device.length);
        myXMLconfig.devices.device.forEach(function(device) {
          //console.log(device.tab + " / " + tab.id);
          if (device.tab == tab.id) {
            var newP = document.createElement("p");
            newP.id = "IDX_" + device.idx;
            newP.innerHTML = device.idx + " : " + device.label
            document.getElementById(tab.id).appendChild(newP);
          }
        });
        break;
    }
  });
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
      document.getElementById("Log").innerHTML = logtext;
    } else {
      document.getElementById(myXMLconfig.hardware.component[index].type + "_Status").style.color = "red";
      document.getElementById("Log").innerHTML = "Server returned Status = " + json.status;
    }
    console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  }
}


function CheckDeviceStatus() {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
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
          success: function(data) {DomoticzDeviceAnalyze(data, this.indexValue);},
          error: function () { document.getElementById(myXMLconfig.hardware.component[this.indexValue].type + "_Status").style.color = "red";  }
        });
      case "MKTronic LAN Relay Board" :
        break;
      case "Broadlink RM Bridge" :
        break;
      default :
        break;
    }
  }
}


function DomoticzDeviceAnalyze(json, i) {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  //console.log(json);
  for (k = 0; k < myXMLconfig.layout.tabs.tab.length; k++) {
    switch(myXMLconfig.layout.tabs.tab[k].id) { // Create elements inside each tab according to the tab type "ID"
      case "Shades_Lights":
        for (j = 0; j < myXMLconfig.devices.device.length; j++) {
          if (myXMLconfig.devices.device[j].tab == myXMLconfig.layout.tabs.tab[k].id) {
            index = json.result.findIndex(x => x.idx==myXMLconfig.devices.device[j].idx);
            //console.log(index);
            if (index > -1) {
              //console.log(json.result[index].Level);
              if (json.result[index].Level < 50) {
                //console.log("IMG_OPEN_IDX_" + myXMLconfig.devices.device[j].idx);
                document.getElementById("IMG_OPEN_IDX_" + myXMLconfig.devices.device[j].idx).src = myXMLconfig.layout.tabs.tab[k].imagesrc_open_select;
                document.getElementById("IMG_CLOSE_IDX_" + myXMLconfig.devices.device[j].idx).src = myXMLconfig.layout.tabs.tab[k].imagesrc_close;
              }
              else {
                //console.log("IMG_CLOSE_IDX_" + myXMLconfig.devices.device[j].idx);
                document.getElementById("IMG_OPEN_IDX_" + myXMLconfig.devices.device[j].idx).src = myXMLconfig.layout.tabs.tab[k].imagesrc_open;
                document.getElementById("IMG_CLOSE_IDX_" + myXMLconfig.devices.device[j].idx).src = myXMLconfig.layout.tabs.tab[k].imagesrc_close_select;
              }
              document.getElementById("SLIDER_IDX_" + myXMLconfig.devices.device[j].idx).value = 100 - json.result[index].Level;
            }
          }
        }
        break;
      default:
        break;
    }
  }

  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms] - End');
}


function CheckHardwareStatus() {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
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
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
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


function ChangeBlindState(type, idx, command, level) {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms] - ' + idx + "/" + command + "/" + level);
  var jsoncommand = "";
  var i = myXMLconfig.hardware.component.findIndex(x => x.type==type);
  var component = myXMLconfig.hardware.component[i];
  console.log(component);
  
  switch (command) {
    case "OPEN":
      jsoncommand = 'http://' + component.ip + ':' + component.port + component.SwitchOffURL.replace("REPLACE_IDX", idx);
      document.getElementById("commandline").innerHTML = jsoncommand;
      DomoticzSendJSONCommand(jsoncommand, component);
      break;
    case "CLOSE":
      jsoncommand = 'http://' + component.ip + ':' + component.port + component.SwitchOnURL.replace("REPLACE_IDX", idx);
      document.getElementById("commandline").innerHTML = jsoncommand;
      DomoticzSendJSONCommand(jsoncommand, component);
      break;
    case "STOP":
      jsoncommand = 'http://' + component.ip + ':' + component.port + component.SwitchGetURL.replace("REPLACE_IDX", idx);
      $.ajax({
        url: jsoncommand,
        dataType: "json",
        async: true,
        timeout: ((Object.keys(component.timeout).length === 0 && component.timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : component.timeout),
        success: function(data) {
                   jsoncommand = component.SwitchSetURL.replace("REPLACE_IDX", idx);
                   jsoncommand = 'http://' + component.ip + ':' + component.port + jsoncommand.replace("REPLACE_LEVEL", (data.result[0].Level));
                   document.getElementById("commandline").innerHTML = data.status + " " + data.result[0].Level + " " + jsoncommand;
                   DomoticzSendJSONCommand(jsoncommand, component);
                 },
        error: function () { document.getElementById("commandline").innerHTML = "fail"; }
      });
      break;
    case "LEVEL":
      jsoncommand = component.SwitchSetURL.replace("REPLACE_IDX", idx);
      jsoncommand = 'http://' + component.ip + ':' + component.port + jsoncommand.replace("REPLACE_LEVEL", (100-level));
      document.getElementById("commandline").innerHTML = jsoncommand;
      DomoticzSendJSONCommand(jsoncommand, component);
      break;
    default:
      break;
  }
}


function DomoticzSendJSONCommand(jsoncommand, component) {
  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  //console.log(jsoncommand + " " + i);
  $.ajax({
    url: jsoncommand,
    dataType: "json",
    async: true,
    timeout: ((Object.keys(component.timeout).length === 0 && component.timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : component.timeout),
    success: function(data) {
               if (data.status == "OK")
                 document.getElementById("commandline").style.color = "lightgreen";
               else
                 document.getElementById("commandline").style.color = "red";
             },
    error: function () { document.getElementById("commandline").style.color = "red"; }
  });
}

