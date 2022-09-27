<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF8">
    <title>Project Files</title>
    <link rel="icon" href="./Assets/folder_black_24dp.svg">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

<body>

    <?php

        ini_set('display_errors', 1);

        function Main() {

        $ANumber = 10;  
        $NeedBreak = false;  

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
                    echo '<button type="button" class="btn btn-default" data-toggle="collapse" data-target="#P' . $ANumber . '"><img src="./Assets/folder_black_24dp.svg"> <b>' . $CurrentFile . '</b></button><a type="button" class="btn btn-link" href="' . $Directory . "/" . $CurrentFile . '">Open</a>';
                    echo '<div id="P' . $ANumber . '" class="collapse">';
                    echo ' <div class="well well-sm">';
                    //echo "<b>" . $CurrentFile . "</b>";
                    MainLoop($Directory . "/" . $CurrentFile, false);
                    echo "</div></div><br>";
                    $NeedBreak = false;
                }
                
                else 
                {
                    echo '<img src="./Assets/description_black_24dp.svg"> <b>' . $CurrentFile . '</b> <a type="button" class="btn btn-link" href="' . $Directory . "/" . $CurrentFile . '">Open</a>';
                    $NeedBreak = true;
                };

                echo "<br>";
            };

        };

        echo "<div class=\"well\">";

        echo '<h1>Projects File Directory<br></h1><h3>Made by Jacob Humston<br></h3><h5>Some links will lead to a download instead of viewing in the browser depending on the file type. You can go to <b>Example > ProjectDirectoryViewer.zip</b> if you would like to use this yourself.</h5><br>';

        MainLoop(".", true);

        echo "</div>";

    };

    Main();

    ?>
</body>

</html>