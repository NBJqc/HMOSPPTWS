<?php
require_once 'includes/config.php';

if (!is_authenticated()) {
    redirect_to_login();
}

// 获取文件列表
$files = [];
if (is_dir($edit_dir)) {
    $dir_files = scandir($edit_dir);
    foreach ($dir_files as $file) {
        if ($file === '.' || $file === '..') continue;
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        if (in_array(strtolower($ext), $allowed_extensions)) {
            $files[] = $file;
        }
    }
}

// 获取要编辑的文件
$current_file = $_GET['file'] ?? '';
$file_path = $edit_dir . $current_file;
$file_content = '';

if (!empty($current_file) && file_exists($file_path) && in_array(pathinfo($current_file, PATHINFO_EXTENSION), $allowed_extensions)) {
    $file_content = htmlspecialchars(file_get_contents($file_path));
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML编辑器 - <?= htmlspecialchars($current_file) ?></title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/dracula.min.css">
</head>
<body>
    <div class="editor-container">
        <header>
            <div class="logo">
                <i class="fas fa-code"></i> HTML编辑器
            </div>
            <div class="user-info">
                <span>管理员</span>
                <a href="logout.php" class="btn logout-btn"><i class="fas fa-sign-out-alt"></i> 退出</a>
            </div>
        </header>
        
        <div class="main-content">
            <div class="sidebar">
                <h3><i class="fas fa-folder-open"></i> 文件列表</h3>
                <ul class="file-list">
                    <?php foreach ($files as $file): ?>
                        <li>
                            <a href="editor.php?file=<?= urlencode($file) ?>" class="<?= $file === $current_file ? 'active' : '' ?>">
                                <i class="fas fa-file-code"></i> <?= htmlspecialchars($file) ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                    <?php if (empty($files)): ?>
                        <li class="no-files">没有可编辑的文件</li>
                    <?php endif; ?>
                </ul>
            </div>
            
            <div class="editor-area">
                <?php if (!empty($current_file)): ?>
                    <div class="editor-header">
                        <h3>正在编辑: <?= htmlspecialchars($current_file) ?></h3>
                        <form action="save.php" method="post" id="save-form">
                            <input type="hidden" name="file" value="<?= htmlspecialchars($current_file) ?>">
                            <button type="submit" class="btn save-btn"><i class="fas fa-save"></i> 保存</button>
                        </form>
                    </div>
                    
                    <textarea id="code-editor" name="content" form="save-form"><?= $file_content ?></textarea>
                    
                    <div class="preview-header">
                        <h3>预览</h3>
                        <button id="refresh-preview" class="btn"><i class="fas fa-sync-alt"></i> 刷新</button>
                    </div>
                    <iframe id="preview" src="<?= !empty($current_file) ? $edit_dir . urlencode($current_file) : '' ?>"></iframe>
                <?php else: ?>
                    <div class="welcome-message">
                        <h2><i class="fas fa-hand-pointer"></i> 请从左侧选择要编辑的文件</h2>
                        <p>或者将HTML文件上传到服务器上的 <?= htmlspecialchars($edit_dir) ?> 目录</p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/htmlmixed/htmlmixed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/xml/xml.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/javascript/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/css/css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/edit/closetag.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/edit/closebrackets.min.js"></script>
    
    <script>
        // 初始化代码编辑器
        const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
            mode: 'htmlmixed',
            theme: 'dracula',
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            lineWrapping: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            extraKeys: {
                'Ctrl-S': function(cm) {
                    document.getElementById('save-form').submit();
                },
                'Cmd-S': function(cm) {
                    document.getElementById('save-form').submit();
                }
            }
        });
        
        // 刷新预览
        document.getElementById('refresh-preview')?.addEventListener('click', function() {
            const preview = document.getElementById('preview');
            preview.src = preview.src;
        });
        
        // 自动调整编辑器高度
        function resizeEditor() {
            const editorArea = document.querySelector('.editor-area');
            const editorElement = document.querySelector('.CodeMirror');
            const preview = document.getElementById('preview');
            
            if (editorElement && preview) {
                const height = editorArea.offsetHeight / 2 - 60;
                editorElement.style.height = height + 'px';
                preview.style.height = height + 'px';
            }
        }
        
        window.addEventListener('resize', resizeEditor);
        window.addEventListener('load', resizeEditor);
    </script>
</body>
</html>