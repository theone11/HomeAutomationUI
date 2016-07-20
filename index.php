<?php

ini_set('display_errors', '1');

$cfg_file = "settings.json";

if (file_exists($cfg_file)) {
  $myJSONconfig = json_decode(file_get_contents($cfg_file), true);
} else {
  $myJSONconfig = "No File Found";
}

#$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
#var_dump(json_decode($json));
#var_dump(json_decode($json, true));

?>

<html>
  <head>
    <!-- <meta charset="utf-8" /> -->
    <meta http-equiv="content-type" content="text/html;charset=iso-8859-8-i">
    <title>בית חכם</title>
    <link rel="stylesheet" type="text/css" href="css/MyStyles.css">
  </head>

  <body>
    <script src="Javascript/MyScripts.js"></script>
    
    myJSONconfig
    "<?php echo $myJSONconfig ?>"
    
    <div>
      <div style="width: 20%; float: right;">
        <div>
          <center>Clock</center>
        </div>
        <div>
          <center>Weather</center>
        </div>
      </div>

      <div style="width: 60%; float: right;">
        <ul class="tab">
        <?php foreach ($myJSONconfig["LAYOUT"]["TABS"] as $tab) { ?>
          <li><a href="#" class="tablinks" onclick="openCity(event, '<?php echo $tab["ID"] ?>')"><?php echo $tab["TITLE"] ?></a></li>
        <?php } ?>
        </ul>

        <?php foreach ($myJSONconfig["LAYOUT"]["TABS"] as $tab) { ?>
        <div id="<?php echo $tab["ID"] ?>" class="tabcontent">
          <h3><?php echo $tab["TITLE"] ?></h3>
          <p>London is the capital city of England.</p>
        </div>
        <?php } ?>
    
      <div style="width: 20%; float: right;">
        <center>Status</center>
      </div>

  </body>

</html>
