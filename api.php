<?php
  header('Content-Type: application/json');


  include "server.php";
  

  echo json_encode($database);
?>
