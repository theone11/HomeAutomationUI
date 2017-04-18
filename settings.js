var data = '{ ' +
             '"js_parameters" : ' +
                                '{ "CheckHardwareStatusInterval" : 30000, ' +
                                  '"UpdateDomoticzLogInterval" : 20000, ' +
                                  '"CheckDeviceStatusInterval" : 3000, ' +
                                  '"XMLHttpRequestTimeout" : 2000' +
                                '} ' +
             ', ' +
             '"layout" : ' +
                         '{ "tabs" : ' +
                         '{ "tab" : ' +
                                     '[' +
                                       '{ "id" : "Shades_Lights", "title" : "תריסים ותאורה",  "direction" : "rtl", "imagesrc_icon" : "images/blinds.png", "imagesrc_open" : "images/blindsopen48.png", "imagesrc_close" : "images/blinds48.png", "imagesrc_open_select" : "images/blindsopen48sel.png", "imagesrc_close_select" : "images/blinds48sel.png", "imagesrc_stop" : "images/blindsstop.png" },' +
                                       '{ "id" : "Irrigation",    "title" : "השקייה",         "direction" : "rtl", "imagesrc_icon" : "",                  "imagesrc_open" : "", "imagesrc_close" : "", "imagesrc_open_select" : "", "imagesrc_close_select" : "", "imagesrc_stop" : "" },' +
                                       '{ "id" : "HVAC",          "title" : "מיזוג",          "direction" : "rtl", "imagesrc_icon" : "",                  "imagesrc_open" : "", "imagesrc_close" : "", "imagesrc_open_select" : "", "imagesrc_close_select" : "", "imagesrc_stop" : "" },' +
                                       '{ "id" : "Boiler",        "title" : "דוד חשמל",       "direction" : "rtl", "imagesrc_icon" : "",                  "imagesrc_open" : "", "imagesrc_close" : "", "imagesrc_open_select" : "", "imagesrc_close_select" : "", "imagesrc_stop" : "" },' +
                                       '{ "id" : "Sensors",       "title" : "חיישנים",        "direction" : "rtl", "imagesrc_icon" : "",                  "imagesrc_open" : "", "imagesrc_close" : "", "imagesrc_open_select" : "", "imagesrc_close_select" : "", "imagesrc_stop" : "" },' +
                                       '{ "id" : "Cameras",       "title" : "מצלמות",         "direction" : "rtl", "imagesrc_icon" : "",                  "imagesrc_open" : "", "imagesrc_close" : "", "imagesrc_open_select" : "", "imagesrc_close_select" : "", "imagesrc_stop" : "" },' +
                                       '{ "id" : "Multimedia",    "title" : "מולטימדיה",      "direction" : "rtl", "imagesrc_icon" : "",                  "imagesrc_open" : "", "imagesrc_close" : "", "imagesrc_open_select" : "", "imagesrc_close_select" : "", "imagesrc_stop" : "" },' +
                                       '{ "id" : "Hardware",      "title" : "חומרה",            "direction" : "ltr", "imagesrc_icon" : "",                  "imagesrc_open" : "", "imagesrc_close" : "", "imagesrc_open_select" : "", "imagesrc_close_select" : "", "imagesrc_stop" : "" },' +
                                       '{ "id" : "Log",           "title" : "לוג",          "direction" : "ltr", "imagesrc_icon" : "images/log.png",    "imagesrc_open" : "", "imagesrc_close" : "", "imagesrc_open_select" : "", "imagesrc_close_select" : "", "imagesrc_stop" : "" }' +
                                     ']' +
                         '}' +
                         '}' +
             ', ' +
             '"devices" : ' +
                         '{ "device" : ' +
                          '[' +
                            '{ "idx" : "1",  "type" : "Domoticz Server", "tab" : "Shades_Lights", "label" : "ויטרינה" },' +
                            '{ "idx" : "35", "type" : "Domoticz Server", "tab" : "Shades_Lights", "label" : "סלון" },' +
                            '{ "idx" : "30", "type" : "Domoticz Server", "tab" : "Shades_Lights", "label" : "חדר אוכל" },' +
                            '{ "idx" : "63", "type" : "Domoticz Server", "tab" : "Shades_Lights", "label" : "חדר שישי" },' +
                            '{ "idx" : "50", "type" : "Domoticz Server", "tab" : "Shades_Lights", "label" : "אלה" },' +
                            '{ "idx" : "56", "type" : "Domoticz Server", "tab" : "Shades_Lights", "label" : "נגה צפוני" },' +
                            '{ "idx" : "69", "type" : "Domoticz Server", "tab" : "Shades_Lights", "label" : "נגה מערבי" },' +
                            '{ "idx" : "21", "type" : "Domoticz Server", "tab" : "Irrigation",    "label" : "ממטרות מערב" },' +
                            '{ "idx" : "22", "type" : "Domoticz Server", "tab" : "Irrigation",    "label" : "ממטרות צפון" },' +
                            '{ "idx" : "23", "type" : "Domoticz Server", "tab" : "Irrigation",    "label" : "טפטפות" }' +
                          ']' +
                         '}' +
             ', ' +
             '"hardware" : ' +
                         '{ "component" : ' +
                           '[' +
                             '{ "name" : "Domoticz Server", ' +
                               '"type" : "Domoticz Server", ' +
                               '"ip" : "192.168.2.19", ' + 
                               '"port" : "8080", ' +
                               '"user" : "", ' +
                               '"password" : "", ' +
                               '"timeout" : 3000, ' +
                               '"logURL" : "/json.htm?type=command&param=getlog&jsoncallback=?", ' +
                               '"dataURL" : "/json.htm?type=devices&filter=all&used=true&order=Name&jsoncallback=?", ' +
                               '"SwitchOnURL" : "/json.htm?type=command&param=switchlight&idx=REPLACE_IDX&switchcmd=On", ' +
                               '"SwitchOffURL" : "/json.htm?type=command&param=switchlight&idx=REPLACE_IDX&switchcmd=Off", ' +
                               '"SwitchSetURL" : "/json.htm?type=command&param=switchlight&idx=REPLACE_IDX&switchcmd=Set%20Level&level=REPLACE_LEVEL", ' +
                               '"SwitchGetURL" : "/json.htm?type=devices&rid=REPLACE_IDX" ' +
                             '}, ' +
                             '{ "name" : "LMS", ' +
                               '"type" : "Logitech Media Server", ' +
                               '"ip" : "192.168.2.117", ' + 
                               '"port" : "9000", ' +
                               '"user" : "", ' +
                               '"password" : "", ' +
                               '"timeout" : 3000 ' +
                             '}, ' +
                             '{ "name" : "ESP Cloud Witty #3", ' +
                               '"type" : "ESP Easy", ' +
                               '"ip" : "192.168.2.23", ' + 
                               '"port" : "80", ' +
                               '"user" : "", ' +
                               '"password" : "", ' +
                               '"timeout" : 3000 ' +
                             '}, ' +
                             '{ "name" : "Broadlink RM Bridge", ' +
                               '"type" : "Broadlink RM Bridge", ' +
                               '"ip" : "192.168.2.60", ' + 
                               '"port" : "7474", ' +
                               '"user" : "", ' +
                               '"password" : "", ' +
                               '"timeout" : 3000 ' +
                             '}, ' +
                             '{ "name" : "MKTronic LAN Ethernet IP 8 Channels WEB Relay Board", ' +
                               '"type" : "MKTronic LAN Relay Board", ' +
                               '"ip" : "192.168.2.20", ' + 
                               '"port" : "80", ' +
                               '"user" : "", ' +
                               '"password" : "", ' +
                               '"timeout" : 3000 ' +
                             '} ' +
                           ']' +
                         '}' +
           '}';