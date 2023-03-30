<!DOCTYPE html>
<html lang="en">

<!-- 

    Directory Viewer
    https://github.com/Lovely-Experiences/Directory-Viewer

    Licensed under the Apache License 2.0

-->

<?php

/* --- SETTINGS/CONFIGURATION --- */

$path = './'; // Path to be viewed. It's important that you include the '/' at the end.
$recursive = true; // If true, child directories will be viewable as well.
$ignoredFiles = ['.', '..']; // File extensions or the names of files/folders that should be excluded.
$cssPath = 'index.css'; // Path to the css file.

$displayLink = true; // If true, the file/folder name will also be a link to the file/folder.
$displayLink_NewTab = true; // If true, file/folder links will open in a new tab.
$displaySize = true; // If true, the size of files will be displayed.
$displayDownloadLink = true; // If true, the download link to each file is provided.
$displayModifiedTime = true; // If true, the date of which each file was last modified will be displayed.
$displayModifiedTime_Format = 'D, d M Y H:i:s'; // Format of which 'displayModifiedTime' is to be displayed in.
$displayDifferentFileIcons = true; // If true, different file types will have different icons.

$mobileMode = true; // If true, small mobile devices will only include the files/folders and download (if enabled) sections.
$oldPHPSupport = true; // If true, some features may be removed or limited to support older versions of PHP.

// Please remove the following 4 lines if you are using this in production.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
clearstatcache();

?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory Viewer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo $cssPath ?>">

    <?php
    if ($mobileMode) {
        echo '<style>';
        echo '@media screen and (max-width: 650px) { .file-size-content, .file-last-modified-content { display: none; } }';
        echo '</style>';
    }
    ?>

</head>

<body>

    <?php
    $currentlyNotOnMain = false;
    $currentPreviewFolder = null;
    if ($recursive and isset($_GET['f'])) {
        $childFolder = htmlspecialchars($_GET['f']);
        $currentPreviewFolder = $childFolder;
        if (!$oldPHPSupport) {
            if (str_contains($childFolder, '..')) {
                echo '<h1>Path not allowed.</h1>';
                echo '</body>';
                exit();
            }
        }
        if ($childFolder) {
            $path = $path . str_replace('..', '', $childFolder) . '/';
            $currentlyNotOnMain = true;
        }
        if (!is_dir($path)) {
            echo '<h1>Invalid directory.</h1>';
            echo '</body>';
            exit();
        }
    }
    ?>

    <h1>Directory Files</h1>

    <p>
        Viewing the contents of
        <b>
            <a href="<?php echo $path ?>"><?php echo $path ?></a>
        </b>
    </p>

    <table>
        <tr>
            <th>Folders</th>
        </tr>

        <?php
        if ($currentlyNotOnMain) {
            echo '<tr><td><a href="javascript:history.back()"><span class="material-icons-round">arrow_back_ios</span>Previous</a></td></tr>';
        }

        $files_Folders = [];
        $files_Normal = [];

        foreach (scandir($path) as $file) {
            $filePath = $path . $file;
            if (is_dir($filePath)) {
                $files_Folders[] = $file;
            } else {
                $files_Normal[] = $file;
            }
        }

        $alreadyCreatedFileHeaders = false;
        $noVisibleFolders = true;
        $files = array_merge($files_Folders, $files_Normal);
        foreach ($files as $file) {
            $filePath = $path . $file;
            if (is_dir($filePath)) {
                if (!in_array($file, $ignoredFiles)) {
                    $noVisibleFolders = false;
                    echo '<tr><td><span class="material-icons-round">folder</span> ';
                    if ($displayLink) {
                        echo '<a href="' . $path . $file . '" ';
                        if ($displayLink_NewTab) {
                            echo 'target="_blank"';
                        }
                        echo ">" . $file . "</a>";
                    } else {
                        echo $file;
                    }
                    if ($recursive) {
                        if ($currentPreviewFolder) {
                            echo ' | <a href="./?f=' . $currentPreviewFolder . '/' . $file . '">View Files</a>';
                        } else {
                            echo ' | <a href="./?f=' . $file . '">View Files</a>';
                        }
                    }
                    echo '</td></tr>';
                }
            } else {
                if (!$alreadyCreatedFileHeaders) {
                    if ($noVisibleFolders) {
                        echo '<tr><td><span class="material-icons-round">close</span> No Folders</td></tr>';
                        $noVisibleFolders = false;
                    }
                    echo '<tr>';
                    echo '<th>Files</th>';
                    if ($displaySize)
                        echo '<th class="file-size-content">Size</th>';
                    if ($displayDownloadLink)
                        echo '<th>Download</th>';
                    if ($displayModifiedTime)
                        echo '<th class="file-last-modified-content">Modified</th>';
                    echo '</tr>';
                    $alreadyCreatedFileHeaders = true;
                }
                $fileExpanded = explode('.', $file);
                $fileExtension = end($fileExpanded);
                $fileName = reset($fileExpanded);
                if (!in_array($fileExtension, $ignoredFiles) and !in_array($fileName, $ignoredFiles)) {
                    $fileIcon = 'description';
                    if ($displayDifferentFileIcons) {
                        $e = $fileExtension;
                        if ($e == 'txt' or $e == 'md')
                            $fileIcon = 'article';
                        if ($e == 'html' or $e == 'php' or $e == 'css' or $e == 'js')
                            $fileIcon = 'code';
                        if ($e == 'zip')
                            $fileIcon = 'folder_zip';
                        if ($e == 'png' or $e == 'jpg' or $e == 'jpeg' or $e == 'svg' or $e == 'webp')
                            $fileIcon = 'image';
                        if ($e == 'ttf' or $e == 'otf')
                            $fileIcon = 'text_fields';
                    }
                    echo '<tr>';
                    echo '<td><span class="material-icons-round">' . $fileIcon . '</span> ';
                    if ($displayLink) {
                        echo '<a href="' . $path . $file . '" ';
                        if ($displayLink_NewTab) {
                            echo 'target="_blank"';
                        }
                        echo ">" . $file . "</a>";
                    } else {
                        echo $file;
                    }
                    echo '</td>';
                    if ($displaySize)
                        try {
                            echo '<td class="file-size-content">' . filesize($filePath) . ' bytes</td>';
                        } catch (Exception $error) {
                            echo '<td class="file-size-content">' . 'Failed to fetch.' . '</td>';
                        }
                    if ($displayDownloadLink)
                        echo '<td><a href="' . $filePath . '" download>Download</a></td>';
                    if ($displayModifiedTime)
                        try {
                            echo '<td class="file-last-modified-content">' . date($displayModifiedTime_Format, filemtime($filePath)) . '</td>';
                        } catch (Exception $error) {
                            echo '<td class="file-last-modified-content">' . 'Failed to fetch.' . '</td>';
                        }
                    echo '</tr>';
                }
            }
        }
        if ($noVisibleFolders) {
            echo '<tr><td><span class="material-icons-round">close</span> No Folders or Files</td></tr>';
        }
        ?>

    </table>
</body>

</html>