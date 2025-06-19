<?php
require_once 'includes/config.php';

// 确保在检查POST前没有输出任何内容
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // 调试输出 - 仅用于测试，完成后删除
    error_log("登录尝试: 用户名=$username, 密码=$password");
    
    if ($username === $admin_username && $password === $admin_password) {
        $_SESSION['authenticated'] = true;
        // 确保在重定向前没有输出
        header('Location: editor.php');
        exit;
    } else {
        // 添加错误信息到session，避免URL中出现敏感信息
        $_SESSION['login_error'] = '用户名或密码错误';
        header('Location: admin-login.php');
        exit;
    }
}

// 如果不是POST请求，直接重定向回登录页
header('Location: admin-login.php');
exit;
?>