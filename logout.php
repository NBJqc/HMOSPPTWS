<?php
require_once 'includes/config.php';

$_SESSION = [];
session_destroy();

header('Location: admin-login.php');
exit;
?>