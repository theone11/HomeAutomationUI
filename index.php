<?php
ini_set('display_errors', '1');

$cfg_file = "settings.xml";

if (file_exists($cfg_file)) {
  $myXMLconfig = simplexml_load_file($cfg_file);
} else {
  $myXMLconfig = "No File Found";
}

$DomoticzURL = "";

foreach ($myXMLconfig->hardware->component as $component) {
  if (trim($component->name) == "Domoticz Server") {
    $DomoticzURL = 'http://' . trim($component->user) . ':' . trim($component->password) . '@' . trim($component->ip) . ':' . trim($component->port) . '/json.htm?type=devices&filter=all&used=true&order=Name';
    break;
  }
}

$DomoticzData = json_decode(file_get_contents($DomoticzURL));

?>

<html>
  <head>
    <!-- iso-8859-8-i -->
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta http-equiv="content-type" content="text/xml;charset=utf-8">
    <meta http-equiv="content-type" content="application/json;charset=utf-8">

    <title>Home Automation</title>
    <link rel="stylesheet" type="text/css" href="css/MyStyles.css">

    <script type='text/javascript'>
      var DomoticzData = <?php echo json_encode($myXMLconfig); ?>;
    </script>
    <script src="Javascript/MyScripts.js"></script>
    <script src="Javascript/jquery-2.1.4.js"></script>

  </head>

  <body onload="setInterval(UpdateLogData, 5000);">
<!--  <body onload="setInterval( function() {UpdateLogData('<?php echo addslashes(json_encode($myXMLconfig->hardware->component[0])); ?>');}, 5000);">-->
<!-- <body onload="setInterval( function() {UpdateLogData('\"name\"');}, 5000);"> -->
  
<!--
    <pre>
    <?php echo $DomoticzURL; ?>
    <?php print_r($DomoticzData); ?>
    <?php print_r($myXMLconfig); ?>
    </pre>
-->    

    <div dir="rtl">
      <div style="width: 20%; float: right;">
        <div>
          <center><iframe src="http://free.timeanddate.com/clock/i5amr909/n676/tlil18/tt0/th1/tb4" frameborder="0" width="167" height="36"></iframe></center>
          <p>
          <center>Sunrise: <?php echo $DomoticzData->Sunrise ?></center>
          <center>Sunset: <?php echo $DomoticzData->Sunset ?></center>
        </div>
        <div>
          <center>Weather</center>
        </div>
      </div>

      <div style="width: 60%; float: right;">
        <ul class="tab">
        <?php foreach ($myXMLconfig->layout->tabs->tab as $tab) { ?>
          <li><a href="#" class="tablinks" onclick="openTab(event, '<?php echo $tab->id ?>')"><?php echo $tab->title ?></a></li>
        <?php } ?>
        </ul>

        <?php foreach ($myXMLconfig->layout->tabs->tab as $tab) { ?>
        <div id="<?php echo $tab->id ?>" class="tabcontent">
          <?php switch (trim($tab->id)) {
                  case "Hardware":
                    echo "<ul id=\"Hardware Content\" dir=\"ltr\">";
                    foreach ($myXMLconfig->hardware->component as $component) { ?>
                      <li id="<?php echo $component->name ?>">Name:<?php echo $component->name ?> IP:<?php echo $component->ip ?> PORT:<?php echo $component->port ?></li>
                    <?php } echo "</ul>"; break;
                  case "Log": ?>
                    <div id="Log Content" dir="ltr">
                    </div> <?php
                    break;
                  default:
                    foreach ($myXMLconfig->elements->element as $element) {
                      #echo ($element->tab . " ". $element->idx . " " . $tab->id);
                      $str1 = trim($element->tab);
                      #print_r($str1);
                      $str2 = trim($tab->id);
                      #print_r($str2);
                      if ($str1 == $str2) {
                        echo trim($element->idx) . " ";
                      }
                      echo "<p>";
                    }
                }
          ?>
        </div>
        <?php } ?>
      </div>
    
      <div style="width: 20%; float: right;">
        <center>Status</center>
      </div>
    </div>

  </body>

</html>
