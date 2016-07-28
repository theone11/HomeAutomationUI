<?php
ini_set('display_errors', '1');

$cfg_file = "settings.xml";

if (file_exists($cfg_file)) {
  $myXMLconfig = simplexml_load_file($cfg_file);
} else {
  $myXMLconfig = "No File Found";
}
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
        var myXMLconfig = <?php echo json_encode($myXMLconfig); ?>;
    </script>
    <script src="Javascript/MyScripts.js"></script>
    <script src="Javascript/jquery-2.1.4.js"></script>

  </head>

  <body onload="onloadIntervals();">

    <div dir="rtl">
      <div style="width: 20%; float: right;">
        <div>
          <center><iframe src="http://free.timeanddate.com/clock/i5amr909/n676/tlil18/fn15/fs30/tt0/td1/th1/ts1/tb4" frameborder="0" width="320" height="74"></iframe></center>
          <p>
          <center><iframe src="http://free.timeanddate.com/clock/i5amr909/n676/szw160/szh160/cf100/hnce1ead6/fas24/fdi70/mql10/mqw4/mhl10/mhw4/mml5" frameborder="0" width="160" height="160"></iframe></center>
          <p>
          <center id="sunrise"></center>
          <center id="sunset"></center>
        </div>
        <div>
          <center><div id="cont_65465fa53bc3060ca9ac8c88f37a5893"><script type="text/javascript" async src="https://www.theweather.com/wid_loader/65465fa53bc3060ca9ac8c88f37a5893"></script></div></center>
        </div>
        <div>
          <a href="http://www.accuweather.com/en/us/new-york-ny/10007/weather-forecast/349727" class="aw-widget-legal">
          </a><div id="awtd1469737765297" class="aw-widget-36hour"  data-locationkey="" data-unit="c" data-language="he" data-useip="true" data-uid="awtd1469737765297" data-editlocation="true"></div><script type="text/javascript" src="http://oap.accuweather.com/launch.js"></script>
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
                      <li id="<?php echo $component->name . "_Status"; ?>">Name:<?php echo $component->name ?> IP:<?php echo $component->ip ?> PORT:<?php echo $component->port ?></li>
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
