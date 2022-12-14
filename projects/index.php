<!DOCTYPE html>
<html>

<!-- Author: Jacob Humston -->

<head>
    <meta charset="UTF8">
    <title>Project Files</title>
    <link rel="icon" href="./ViewerAssets/folder_black_24dp.svg">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

<body>

    <?php

    ini_set('display_errors', 1);

    function Main() {

        $StartTime = (int)microtime();

        $ANumber = 0;  
        $NeedBreak = false;  

        function GetImageOfFileType($Ext) {
            $Image = null;
            if ($Ext == "svg" || $Ext == "png" || $Ext == "jpg" || $Ext == "jpeg" || $Ext == "webp") $Image = '<img src="./ViewerAssets/FileTypes/image_black_24dp.svg">';
            if ($Ext == "php" || $Ext == "js" || $Ext == "html" || $Ext == "css") $Image = '<img src="./ViewerAssets/FileTypes/code_black_24dp.svg">';
            if ($Ext == "txt" || $Ext == "md") $Image = '<img src="./ViewerAssets/FileTypes/text_fields_black_24dp.svg">';
            if ($Ext == "ttf" || $Ext == "otf") $Image = '<img src="./ViewerAssets/FileTypes/title_black_24dp.svg">';
            if ($Ext == "json") $Image = '<img src="./ViewerAssets/FileTypes/data_object_black_24dp.svg">';
            if ($Ext == "zip") $Image = '<img src="./ViewerAssets/FileTypes/folder_zip_black_24dp.svg">';
            if ($Ext == "Unknown") $Image = '<img src="./ViewerAssets/FileTypes/question_mark_black_24dp.svg">';
            return $Image;
        };

        function MainLoop($Directory, $IsStart) {

            global $ANumber;
            global $NeedBreak;
        
            $Files = scandir($Directory);
            $FileCount = sizeof($Files);

            for ($Index = 0; $Index < $FileCount; $Index++) 
            {

                ++$ANumber;

                $CurrentFile = $Files[$Index];
                $PathInfo = pathinfo($Directory . "/" . $CurrentFile);
                $IsDirectory = is_dir($Directory . "/" . $CurrentFile);

                if ($CurrentFile == "." || $CurrentFile == "..") continue;
                       
                if ($IsDirectory == true) {
                    if ($NeedBreak == true) echo "<br>";
                    echo '<a target="blank" type="button" class="btn btn-success btn-xs" href="' . $Directory . "/" . $CurrentFile . '">Open</a> <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#P' . $ANumber . '"><img src="./ViewerAssets/folder_black_24dp.svg"> <b>' . $CurrentFile . '</b></button>';
                    echo '<div id="P' . $ANumber . '" class="collapse">';
                    echo '<div class="well well-sm">';
                    MainLoop($Directory . "/" . $CurrentFile, false);
                    echo "</div></div>";
                    if ($Index + 1 != $FileCount) echo "<br>";
                    $NeedBreak = false;
                }
                
                else 
                {
                    $Image = '<img src="./ViewerAssets/description_black_24dp.svg">';
                    $PathExtension = null;
                    if (isset($PathInfo["extension"]) == true) {
                       $PathExtension = $PathInfo["extension"];
                    } else {
                        $PathExtension = "Unknown";
                    };
                    $ImageFound = GetImageOfFileType($PathExtension);
                    if ($ImageFound != null) $Image = $ImageFound;
                    echo '<a target="blank" type="button" class="btn btn-success btn-xs" href="' . $Directory . "/" . $CurrentFile . '">Open</a> ' . $Image . ' <b>' . $CurrentFile . '</b>';
                    $NeedBreak = true;
                };

                echo "<br>";
            };

        };

        echo "<div class=\"well\">";

        echo '<h1 style="margin-top:5px;">Projects File Directory<br></h1><h3>Made by Jacob Humston<br></h3><h5>Some links will lead to a download instead of viewing in the browser depending on the file type. You can go to <b>Example > ProjectDirectoryViewer.zip</b> if you would like to use this yourself.</h5>';

        echo '<p><img src="./ViewerAssets/iconmonstr-github-1.svg" height="30px"> <b>GitHub Repository:</b> <a href="https://github.com/jacobhumston-school/htdocs" target="blank">https://github.com/jacobhumston-school/htdocs</a></p>';
        
        MainLoop(".", true);

        echo "<br>";

        global $ANumber;

        echo '<img src="./ViewerAssets/info_black_48dp.svg" width="25px" height="25px"> Total Files: <b>' . $ANumber . '</b> (<b>' . ((int)microtime() - $StartTime) . '</b>ms)';

        echo "<br><br>";

        echo '<button type="button" id="ShowAll" class="btn btn-primary">Show All</button> <button type="button" id="HideAll" class="btn btn-primary">Hide All</button>';

        echo "</div>";

    };

    Main();

    ?>

    <script>
    function Main(Hide) {
        const Elements = document.getElementsByClassName("collapse");
        for (let I = 0; I < Elements.length; I++) {
            const Element = Elements.item(I);
            if (Hide === false) {
                Element.classList.add("in");
            } else {
                Element.classList.remove("in");
            }
        }
    }

    document.getElementById("ShowAll").onclick = function() {
        Main(false);
    }
    document.getElementById("HideAll").onclick = function() {
        Main(true);
    }
    </script>
</body>

</html>