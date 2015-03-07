<?php
    $server = "localhost";
    $db_user = "index";
    $db_pass = "fodbold123";
    $db_name = "isplasher";

    mysql_connect($server, $db_user, $db_pass) or die("Could not connect to server!");
    mysql_select_db($db_name) or die("Could not connect to database!");
?>