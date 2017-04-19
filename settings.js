var data = '{ ' +
             ' "js_parameters" : ' +
                                '{  "CheckHardwareStatusInterval" : 30000 ' +
                                  ',"UpdateDomoticzLogInterval" : 20000 ' +
                                  ',"CheckDeviceStatusInterval" : 3000 ' +
                                  ',"XMLHttpRequestTimeout" : 2000' +
                                '} ' +
             ',"tabs" : ' +
                         '[' +
                           ' { "id" : "Shades_Lights", "label" : "תריסים ותאורה",  "direction" : "rtl", "img_icon" : "images/blinds.png" }' +
                           ',{ "id" : "Irrigation",    "label" : "השקייה",         "direction" : "rtl", "img_icon" : ""                  }' +
                           ',{ "id" : "HVAC",          "label" : "מיזוג",          "direction" : "rtl", "img_icon" : ""                  }' +
                           ',{ "id" : "Boiler",        "label" : "דוד חשמל",       "direction" : "rtl", "img_icon" : ""                  }' +
                           ',{ "id" : "Sensors",       "label" : "חיישנים",        "direction" : "rtl", "img_icon" : ""                  }' +
                           ',{ "id" : "Cameras",       "label" : "מצלמות",         "direction" : "rtl", "img_icon" : ""                  }' +
                           ',{ "id" : "Multimedia",    "label" : "מולטימדיה",      "direction" : "rtl", "img_icon" : ""                  }' +
                           ',{ "id" : "Hardware",      "label" : "חומרה",          "direction" : "ltr", "img_icon" : ""                  }' +
                           ',{ "id" : "Log",           "label" : "לוג",            "direction" : "ltr", "img_icon" : "images/log.png"    }' +
                         ']' +
             ',"obj_type" : ' +
                           '[' +
                             ' {  "id" : "Blinds_Slider" ' +
                                ',"img_open" : "images/blindsopen48.png" ' + 
                                ',"img_close" : "images/blinds48.png" ' +
                                ',"img_open_select" : "images/blindsopen48sel.png" ' +
                                ',"img_close_select" : "images/blinds48sel.png" ' +
                                ',"img_stop" : "images/blindsstop.png" ' +
                             ' } ' +
                             ',{ "id" : "Domoticz" ' +
                             ' } ' +
                             ',{ "id" : "LMS" ' +
                             ' } ' +
                             ',{ "id" : "ESP_EASY" ' +
                             ' } ' +
                             ',{ "id" : "Broadlink" ' +
                             ' } ' +
                             ',{ "id" : "MKTronic" ' +
                             ' } ' +
                           ']' +
             ',"ctrl_type" : ' +
                           '[' +
                             '{  "id" : "Domoticz" ' +
                               ',"timeout" : 3000 ' +
                               ',"logURL" : "/json.htm?type=command&param=getlog&jsoncallback=?" ' +
                               ',"dataURL" : "/json.htm?type=devices&filter=all&used=true&order=Name&jsoncallback=?" ' +
                               ',"SwitchOnURL" : "/json.htm?type=command&param=switchlight&idx=REPLACE_IDX&switchcmd=On" ' +
                               ',"SwitchOffURL" : "/json.htm?type=command&param=switchlight&idx=REPLACE_IDX&switchcmd=Off" ' +
                               ',"SwitchSetURL" : "/json.htm?type=command&param=switchlight&idx=REPLACE_IDX&switchcmd=Set%20Level&level=REPLACE_LEVEL" ' +
                               ',"SwitchGetURL" : "/json.htm?type=devices&rid=REPLACE_IDX" ' +
                             ' } ' +
                             ',{ "id" : "LMS" ' +
                               ',"timeout" : 3000 ' +
                             ' } ' +
                             ',{ "id" : "ESP_EASY" ' +
                               ',"timeout" : 3000 ' +
                             ' } ' +
                             ',{ "id" : "Broadlink" ' +
                               ',"timeout" : 3000 ' +
                             ' } ' +
                             ',{ "id" : "MKTronic" ' +
                               ',"timeout" : 3000 ' +
                             ' } ' +
                           ']' +
             ',"objects" : ' +
                          '[' +
                            ' { "id" : "1",  "obj_type" : "Blinds_Slider", "ctrl_type" : "Domoticz", "tab" : "Shades_Lights", "label" : "ויטרינה" }' +
                            ',{ "id" : "35", "obj_type" : "Blinds_Slider", "ctrl_type" : "Domoticz", "tab" : "Shades_Lights", "label" : "סלון" }' +
                            ',{ "id" : "30", "obj_type" : "Blinds_Slider", "ctrl_type" : "Domoticz", "tab" : "Shades_Lights", "label" : "חדר אוכל" }' +
                            ',{ "id" : "63", "obj_type" : "Blinds_Slider", "ctrl_type" : "Domoticz", "tab" : "Shades_Lights", "label" : "חדר שישי" }' +
                            ',{ "id" : "50", "obj_type" : "Blinds_Slider", "ctrl_type" : "Domoticz", "tab" : "Shades_Lights", "label" : "אלה" }' +
                            ',{ "id" : "56", "obj_type" : "Blinds_Slider", "ctrl_type" : "Domoticz", "tab" : "Shades_Lights", "label" : "נגה צפוני" }' +
                            ',{ "id" : "69", "obj_type" : "Blinds_Slider", "ctrl_type" : "Domoticz", "tab" : "Shades_Lights", "label" : "נגה מערבי" }' +
                            ',{ "id" : "21", "obj_type" : "Water",         "ctrl_type" : "Domoticz", "tab" : "Irrigation",    "label" : "ממטרות מערב" }' +
                            ',{ "id" : "22", "obj_type" : "Water",         "ctrl_type" : "Domoticz", "tab" : "Irrigation",    "label" : "ממטרות צפון" }' +
                            ',{ "id" : "23", "obj_type" : "Water",         "ctrl_type" : "Domoticz", "tab" : "Irrigation",    "label" : "טפטפות" }' +

                            ',{ "id" : "", "obj_type" : "Domoticz",  "ctrl_type" : "Domoticz",  "tab" : "Hardware",   "label" : "Domoticz Server",       "ip" : "192.168.2.19",  "port" : "8080", "user" : "", "password" : ""}' +
                            ',{ "id" : "", "obj_type" : "LMS",       "ctrl_type" : "LMS",       "tab" : "Multimedia", "label" : "Logitech Media Server", "ip" : "192.168.2.117", "port" : "9000", "user" : "", "password" : ""}' +
                            ',{ "id" : "", "obj_type" : "ESP_Easy",  "ctrl_type" : "ESP_Easy",  "tab" : "Multimedia", "label" : "ESP Cloud Witty #3",    "ip" : "192.168.2.23",  "port" : "80",   "user" : "", "password" : ""}' +
                            ',{ "id" : "", "obj_type" : "Broadlink", "ctrl_type" : "Broadlink", "tab" : "Hardware",   "label" : "Broadlink RM Bridge",   "ip" : "192.168.2.60",  "port" : "7474", "user" : "", "password" : ""}' +
                            ',{ "id" : "", "obj_type" : "MKTronic",  "ctrl_type" : "MKTronic",  "tab" : "Multimedia", "label" : "MKTronic LAN Ethernet IP 8 Channels WEB Relay Board",    "ip" : "192.168.2.20",  "port" : "80",   "user" : "", "password" : ""}' +
                          ']' +
           '}';