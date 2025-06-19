<?php
// 管理员凭据
$admin_username = 'admin';
$admin_password = 'password123'; // 生产环境请使用更安全的密码

// 允许编辑的文件目录
$edit_dir = './';
$allowed_extensions = ['html'];

// 启动会话
session_start();

// 检查用户是否已登录
function is_authenticated() {
    return isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true;
}

// 重定向到登录页
function redirect_to_login() {
    header('Location: admin-login.php');
    exit;
}
?>