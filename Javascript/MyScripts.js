var myXMLconfig = JSON.parse(data);
  
function onloadIntervals() {
  console.log(myXMLconfig);
  CreateHTML();
  CheckObjectsStatus();
  //CheckControllersStatus();
  //UpdateDomoticzLog();
  setInterval(CheckObjectsStatus, myXMLconfig.js_parameters.CheckObjectsStatusInterval);
  //setInterval(UpdateDomoticzLog, myXMLconfig.js_parameters.UpdateDomoticzLogInterval);
  //setInterval(CheckControllersStatus, myXMLconfig.js_parameters.CheckControllersStatusInterval);
}


function CreateHTML () {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');

  // Create new DIV for tabs
  var DIVtabs = document.getElementById("tabs_div");

  // Create List Parent Element
  var newLIST = document.createElement("ul");
  newLIST.id = "tabs_list";
  newLIST.className = "tab";
  DIVtabs.appendChild(newLIST);

  // Go over all defined Controllers and objects and create tabs as needed
  myXMLconfig.controllers.forEach(function(controller) {
    controller.objects.forEach(function(object) {
      //console.log(controller.id + ' / ' + object.id);
      // Check if tab already exists
      if (document.getElementById("tab_li_" + object.tab) == null) {
        // Find the tab index matching the current object.tab
        var tab_index = myXMLconfig.tabs.findIndex(x => x.id==object.tab);
        // Create new Tab Element
        var newLISTitem = document.createElement("li");
        newLISTitem.id = "tab_li_" + object.tab;
        document.getElementById("tabs_list").appendChild(newLISTitem); //Append new tab to list
        //Create new Tab element name - Header Name
        var newIMG = document.createElement("IMG");
        newIMG.id = "IMG_tab_icon_" + object.tab;
        newIMG.src = myXMLconfig.tabs[tab_index].img_icon;
        document.getElementById("tab_li_" + object.tab).appendChild(newIMG);
        var newA = document.createElement("a");
        newA.id = "tab_a_" + object.tab;
        newA.className = "tablinks";
        newA.href = "#";
        newA.setAttribute('onclick','openTab(event, ' + "'" + object.tab + "'" + ')')
        newA.innerHTML = myXMLconfig.tabs[tab_index].label;
        document.getElementById("tab_li_" + object.tab).appendChild(newA); //Append header name to tab
        //Create new Tab content element
        var newTAB = document.createElement("div");
        newTAB.id = "tab_div_" + object.tab;
        newTAB.dir = myXMLconfig.tabs[tab_index].direction;
        newTAB.className = "tabcontent";
        DIVtabs.appendChild(newTAB); //Append content to tab
      }
      
      // Create object according to obj_type and in the correct tab
      switch(object.obj_type) {
        case "Blinds_Slider":
          // Find the obj_type index matching the current object.obj_type
          var obj_type_index = myXMLconfig.obj_type.findIndex(x => x.id==object.obj_type);
          // Create DIV
          var newDIV = document.createElement("div");
          newDIV.id = "div_idx_" + object.id;
          newDIV.className = "Blinds_DIV";
          document.getElementById("tab_div_" + object.tab).appendChild(newDIV);  // In correct tab
          // Create P for object name
          var newP = document.createElement("p");
          newP.id = "p_idx_" + object.id;
          newP.innerHTML = object.id + " " + object.label
          document.getElementById("div_idx_" + object.id).appendChild(newP);
          // Create IMG for object OPEN function
          var newIMG = document.createElement("img");
          newIMG.id = "img_open_idx_" + object.id;
          //newIMG.addEventListener("click", function(){ ChangeBlindState(object.type, object.id, "OPEN", 0); }, false);
          //newIMG.addEventListener("click", function(){ ChangeBlindState(controller, object, "LEVEL", object.max); }, false);
          newIMG.onclick = function(){ ChangeBlindState(controller, object, "LEVEL", object.max); };
          //newIMG.onclick = function(){ ChangeBlindState(controller, object, "OPEN", 0); };
          newIMG.src = myXMLconfig.obj_type[obj_type_index].img_open;
          document.getElementById("div_idx_" + object.id).appendChild(newIMG);
          // Create DIV for object slider
          var newDIV = document.createElement("div");
          newDIV.id = "div_slider_idx_" + object.id;
          newDIV.className = "Slider_Container_DIV";
          document.getElementById("div_idx_" + object.id).appendChild(newDIV);
          // Create Slider for object
          var newSlider = document.createElement("input");
          newSlider.id = "slider_idx_" + object.id;
          newSlider.setAttribute("type", "range");
          newSlider.onchange = function(){ ChangeBlindState(controller, object, "LEVEL", newSlider.value); };
          newSlider.setAttribute("orient", "vertical");
          document.getElementById("div_slider_idx_" + object.id).appendChild(newSlider);
          // Create IMG for object CLOSE function
          var newIMG = document.createElement("img");
          newIMG.id = "img_close_idx_" + object.id;
          newIMG.onclick = function(){ ChangeBlindState(controller, object, "LEVEL", object.min); };
          //newIMG.onclick = function(){ ChangeBlindState(controller, object, "CLOSE", 0); };
          newIMG.src = myXMLconfig.obj_type[obj_type_index].img_close;
          document.getElementById("div_idx_" + object.id).appendChild(newIMG);
          // Create P (white space)
          var newP = document.createElement("p");
          document.getElementById("div_idx_" + object.id).appendChild(newP);
          // Create IMG for object STOP function
          var newIMG = document.createElement("img");
          newIMG.id = "img_stop_idx_" + object.id;
          newIMG.onclick = function(){ ChangeBlindState(controller, object, "STOP", 0); };
          newIMG.src = myXMLconfig.obj_type[obj_type_index].img_stop;
          document.getElementById("div_idx_" + object.id).appendChild(newIMG);
          break;

/*     case "Hardware":
        // Create Hardware list element
        var newLIST = document.createElement("ul");
        newLIST.id = "Hardware_List";
        newLIST.dir = "ltr";
        document.getElementById(tab.id).appendChild(newLIST); //Append Hardware List to tab content (div)
        //console.log(myXMLconfig.hardware.component.length);
        myXMLconfig.hardware.forEach(function(component) {
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
        myXMLconfig.hardware.forEach(function(component) {
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
      case "Irrigation":
        myXMLconfig.devices.forEach(function(device) {
          //console.log(device.tab + " / " + tab.id);
          if (device.tab == tab.id) {
            var newDIV = document.createElement("div");
            newDIV.id = "DIV_IDX" + device.id;
            newDIV.style.cssFloat = 'right';
            newDIV.style.styleFloat = 'right'; // IE
            document.getElementById(tab.id).appendChild(newDIV);
            var newP = document.createElement("p");
            newP.id = "IDX_" + device.id;
            newP.innerHTML = device.id + " : " + device.label
            document.getElementById("DIV_IDX" + device.id).appendChild(newP);
          }
        });
        break;
 */        default:
          break;
      }
    });
  });
}


function openTab(evt, tabName) {
  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms] - ' + evt + ' / ' + tabName);
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
  document.getElementById("tab_div_" + tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

/* 
function UpdateDomoticzLog() {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  var index;
  var DomoticzLogURL = "";
  for (i = 0; i < myXMLconfig.hardware.length; i++) {
    if (myXMLconfig.hardware[i].type == "Domoticz Server") {
      DomoticzLogURL = 'http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port + myXMLconfig.hardware[i].logURL;
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
          timeout: ((Object.keys(myXMLconfig.hardware[i].timeout).length === 0 && myXMLconfig.hardware[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware[i].timeout),
          indexValue: index,
          success: function(data) {DomoticzLogAnalyze(data, this.indexValue);},
          error: function () {
                   document.getElementById(myXMLconfig.hardware[this.indexValue].type + "_Status").style.color = "red";
                   document.getElementById("Log Content").innerHTML = "Server could not be reached";
                 }
        });

  function DomoticzLogAnalyze(json, index) {
    //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
    //console.log(json);
    if (json.status == "OK") {
      document.getElementById(myXMLconfig.hardware[index].type + "_Status").style.color = "lightgreen";
      var logtext = "";
      for (i = (json.result.length - 1); i >= 0; i--) {
        logtext += json.result[i].message + "<br>";
      }
      document.getElementById("Log").innerHTML = logtext;
    } else {
      document.getElementById(myXMLconfig.hardware[index].type + "_Status").style.color = "red";
      document.getElementById("Log").innerHTML = "Server returned Status = " + json.status;
    }
    console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  }
}

*/

function CheckObjectsStatus() {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  // Go over all defined objects and update status
  myXMLconfig.controllers.forEach(function(controller) {
    controller.objects.forEach(function(object) {
      // Extract ctrl_type from controller and obj_type from object
      var ctrl_type = myXMLconfig.ctrl_type[myXMLconfig.ctrl_type.findIndex(x => x.id==controller.ctrl_type)];
      var obj_type = myXMLconfig.obj_type[myXMLconfig.obj_type.findIndex(x => x.id==object.obj_type)];
      switch (controller.ctrl_type) {
        case "Domoticz":
          //$.getJSON(DomoticzDataURL, {format: "json"}, function(data) {DomoticzDataAnalyze(data);});
          jsoncommand = 'http://' + controller.ip + ':' + controller.port + ctrl_type.SwitchGetURL.replace("REPLACE_IDX", object.id);
          //console.log(jsoncommand);
          $.ajax({
            url: jsoncommand,
            dataType: "json",
            async: true,
            timeout: ((Object.keys(ctrl_type.timeout).length === 0 && ctrl_type.timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : ctrl_type.timeout),
            success: function(data) { ObjectDataAnalyze(data, controller, object, obj_type); },
            error: function () { console.log('error'); }
          });
        default :
          break;
      }
    });
  });
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms] - End');
}

function ObjectDataAnalyze(data, controller, object, obj_type) {
  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms] - ' + data.result[0].idx + ' / ' + data.result[0].Status + ' / ' + data.result[0].Level + ' / ' + controller.id + ' / ' + object.id + ' / ' + obj_type.id);
  switch(controller.ctrl_type) {
    case "Domoticz":
      switch (object.obj_type) {
        case "Blinds_Slider":
          if (data.result[0].Status == "Open") {
            document.getElementById("img_open_idx_" + object.id).src = obj_type.img_open_select;
            document.getElementById("img_close_idx_" + object.id).src = obj_type.img_close;
          }
          else {
            document.getElementById("img_open_idx_" + object.id).src = obj_type.img_open;
            if (data.result[0].Status == "Closed")
              document.getElementById("img_close_idx_" + object.id).src = obj_type.img_close_select;
            else
              document.getElementById("img_close_idx_" + object.id).src = obj_type.img_close;
          }
/*           else {
            if (data.result[0].Level > obj_type.open_limit) {
            document.getElementById("img_open_idx_" + object.id).src = obj_type.img_open_select;
            document.getElementById("img_close_idx_" + object.id).src = obj_type.img_close;
          }
          else {
            document.getElementById("img_open_idx_" + object.id).src = obj_type.img_open;
            if (data.result[0].Level < obj_type.close_limit)
              document.getElementById("img_close_idx_" + object.id).src = obj_type.img_close_select;
            else
              document.getElementById("img_close_idx_" + object.id).src = obj_type.img_close;
          } */
          document.getElementById("slider_idx_" + object.id).value = object.max - data.result[0].Level;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms] - End');
}

/*
function CheckControllersStatus() {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  for (var i = 0; i < myXMLconfig.hardware.length; i++) {
    //console.log(myXMLconfig.hardware[i].type);
    switch (myXMLconfig.hardware[i].type) {
      case "Domoticz Server" :
        //console.log('http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port + myXMLconfig.hardware[i].dataURL);
        //$.getJSON(DomoticzDataURL, {format: "json"}, function(data) {DomoticzDataAnalyze(data);});
        $.ajax({
          url: 'http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port + myXMLconfig.hardware[i].dataURL,
          dataType: "json",
          async: true,
          timeout: ((Object.keys(myXMLconfig.hardware[i].timeout).length === 0 && myXMLconfig.hardware[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware[i].timeout),
          indexValue: i,
          success: function(data) {DomoticzDataAnalyze(data, this.indexValue);},
          error: function () { document.getElementById(myXMLconfig.hardware[this.indexValue].type + "_Status").style.color = "red";  }
        });
      case "MKTronic LAN Relay Board" :
        //console.log('http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port + ' ' + Math.round(new Date().getTime()) + ' [ms]');
        break;
      case "Broadlink RM Bridge" :
        //console.log('http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1000, command:'registered_devices'})) + '&callback=BroadlinkDataAnalyze' + ' ' + Math.round(new Date().getTime()) + ' [ms]');
        $.ajax({
          url: 'http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1001, command:'probe_devices'})),
          dataType: "jsonp",
          async: true,
          timeout: ((Object.keys(myXMLconfig.hardware[i].timeout).length === 0 && myXMLconfig.hardware[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware[i].timeout),
          indexValue: i,
          success: function(data) {BroadlinkProbeDevices(data, this.indexValue);},
          error: function () {
              document.getElementById(myXMLconfig.hardware[this.indexValue].type + "_Status").style.color = "red"; 
              document.getElementById(myXMLconfig.hardware[this.indexValue].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware[this.indexValue].type + "_Nodes"));
            }
        });
        break;
      default :
        (function(i) {
          var xhr = new XMLHttpRequest();
            //console.log('http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port + ' ' + Math.round(new Date().getTime()) + ' [ms]');
            xhr.open("GET", 'http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port, true);
            xhr.onreadystatechange = function () {
            if ((xhr.readyState == 4) && (xhr.status == 200)) {
              //console.log(myXMLconfig.hardware[i].name + "_Status");
              document.getElementById(myXMLconfig.hardware[i].name + "_Status").style.color = "lightgreen";
            } else {
              //console.log(myXMLconfig.hardware[i].name + "_Status (else)");
              document.getElementById(myXMLconfig.hardware[i].name + "_Status").style.color = "red";
            }
          };
          xhr.timeout = ((Object.keys(myXMLconfig.hardware[i].timeout).length === 0 && myXMLconfig.hardware[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware[i].timeout);
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
      url: 'http://' + myXMLconfig.hardware[i].ip + ':' + myXMLconfig.hardware[i].port + '/?cmd=' + encodeURI(JSON.stringify({api_id:1000, command:'registered_devices'})),
      dataType: "jsonp",
      async: true,
      timeout: ((Object.keys(myXMLconfig.hardware[i].timeout).length === 0 && myXMLconfig.hardware[i].timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : myXMLconfig.hardware[i].timeout),
      indexValue: i,
      success: function(data) {BroadlinkRegisteredDevices(data, this.indexValue);},
      error: function () {
          document.getElementById(myXMLconfig.hardware[this.indexValue].type + "_Status").style.color = "red";
          document.getElementById(myXMLconfig.hardware[this.indexValue].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware[this.indexValue].type + "_Nodes"));
        }
    });
  } else {
    document.getElementById(myXMLconfig.hardware[i].type + "_Status").style.color = "red";
    document.getElementById(myXMLconfig.hardware[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware[i].type + "_Nodes"));
  }
}


function BroadlinkRegisteredDevices(json, i) {
  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  //console.log(json);
  if (json.code == 0) {
    document.getElementById(myXMLconfig.hardware[i].type + "_Status").style.color = "lightgreen";
    if (document.getElementById(myXMLconfig.hardware[i].type + "_Nodes") != null) {
      document.getElementById(myXMLconfig.hardware[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware[i].type + "_Nodes"));
    }
    var newNode = document.createElement("ul");
    newNode.id = myXMLconfig.hardware[i].type + "_Nodes"
    document.getElementById(myXMLconfig.hardware[i].type + "_Status").appendChild(newNode);
    for (var j = 0; j < json.list.length; j++) {
      var newNode = document.createElement("li");
      newNode.id = myXMLconfig.hardware[i].type + " " + j;
      document.getElementById(myXMLconfig.hardware[i].type + "_Nodes").appendChild(newNode);
      document.getElementById(myXMLconfig.hardware[i].type + " " + j).innerHTML = "Name: " + json.list[j].name + " MAC: " + json.list[j].mac;
    }
  } else {
    document.getElementById(myXMLconfig.hardware[i].type + "_Status").style.color = "red";
    document.getElementById(myXMLconfig.hardware[i].type + "_Status").removeChild(document.getElementById(myXMLconfig.hardware[i].type + "_Nodes"));
  }
}

*/

function ChangeBlindState(controller, object, command, level) {
  console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms] - ' + object.id + "/" + command + "/" + level);
  var jsoncommand = "";
  var ctrl_type = myXMLconfig.ctrl_type[myXMLconfig.ctrl_type.findIndex(x => x.id==controller.ctrl_type)];
  //console.log(ctrl_type);
  
  switch (command) {
/*     case "OPEN":
      jsoncommand = 'http://' + controller.ip + ':' + controller.port + ctrl_type.SwitchOffURL.replace("REPLACE_IDX", object.id);
      document.getElementById("commandline").innerHTML = jsoncommand;
      DomoticzSendJSONCommand(jsoncommand, ctrl_type);
      break;
    case "CLOSE":
      jsoncommand = 'http://' + controller.ip + ':' + controller.port + ctrl_type.SwitchOnURL.replace("REPLACE_IDX", object.id);
      document.getElementById("commandline").innerHTML = jsoncommand;
      DomoticzSendJSONCommand(jsoncommand, ctrl_type);
      break; */
    case "STOP":
      // Get current object Level
      jsoncommand = 'http://' + controller.ip + ':' + controller.port + ctrl_type.SwitchGetURL.replace("REPLACE_IDX", object.id);
      console.log(jsoncommand);
      $.ajax({
        url: jsoncommand,
        dataType: "json",
        async: true,
        timeout: ((Object.keys(ctrl_type.timeout).length === 0 && ctrl_type.timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : ctrl_type.timeout),
        success: function(data) {
                   jsoncommand = ctrl_type.SwitchSetURL.replace("REPLACE_IDX", object.id);
                   jsoncommand = 'http://' + controller.ip + ':' + controller.port + jsoncommand.replace("REPLACE_LEVEL", (data.result[0].Level));
                   document.getElementById("commandline").innerHTML = "Stopping " + object.id + " at level = " + data.result[0].Level;
                   console.log(jsoncommand);
                   // Set new object LEVEL to same LEVEL as reported - will stop object current place (depending on communication latency)
                   DomoticzSendJSONCommand(jsoncommand, ctrl_type);
                 },
        error: function () { document.getElementById("commandline").innerHTML = "Failed to get current Level for " + object.label; }
      });
      break;
    case "LEVEL":
      jsoncommand = ctrl_type.SwitchSetURL.replace("REPLACE_IDX", object.id);
      jsoncommand = 'http://' + controller.ip + ':' + controller.port + jsoncommand.replace("REPLACE_LEVEL", (object.max - level));
      document.getElementById("commandline").innerHTML = "Setting " + object.id + " level to " + level;
      console.log(jsoncommand);
      DomoticzSendJSONCommand(jsoncommand, ctrl_type);
      break;
    default:
      break;
  }
}


function DomoticzSendJSONCommand(jsoncommand, ctrl_type) {
  //console.log(arguments.callee.name + ' - ' + Math.round(new Date().getTime()) + ' [ms]');
  $.ajax({
    url: jsoncommand,
    dataType: "json",
    async: true,
    timeout: ((Object.keys(ctrl_type.timeout).length === 0 && ctrl_type.timeout.constructor === Object) ? myXMLconfig.js_parameters.XMLHttpRequestTimeout : ctrl_type.timeout),
    success: function(data) {
               if (data.status == "OK")
                 document.getElementById("commandline").style.color = "lightgreen";
               else
                 document.getElementById("commandline").style.color = "red";
             },
    error: function () { document.getElementById("commandline").style.color = "red"; }
  });
}
