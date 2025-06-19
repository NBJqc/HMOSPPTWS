<?php
require_once 'includes/config.php';

if (!is_authenticated()) {
    redirect_to_login();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_POST['file'] ?? '';
    $content = $_POST['content'] ?? '';
    
    $file_path = $edit_dir . $file;
    
    if (!empty($file) && in_array(pathinfo($file, PATHINFO_EXTENSION), $allowed_extensions)) {
        file_put_contents($file_path, $content);
        header('Location: editor.php?file=' . urlencode($file) . '&saved=1');
        exit;
    }
}

header('Location: editor.php');
exit;
?>