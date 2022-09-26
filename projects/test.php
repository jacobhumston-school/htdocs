<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF8">
    <title>Project Files</title>
</head>

<body>
    <?php

        ini_set('display_errors', 1);
    
        function MainLoop($Directory, $IsStart) {
        
            $Files = scandir($Directory);
            $FileCount = sizeof($Files);

            for ($Index = 0; $Index < $FileCount; $Index++) 
            {
                $CurrentFile = $Files[$Index];
                $PathInfo = pathinfo($Directory . "/" . $CurrentFile);
                $IsDirectory = is_dir($Directory . "/" . $CurrentFile);
                
                if ($CurrentFile == "." || $CurrentFile == "..") continue;
                
                if ($IsDirectory == true) {
                    if ($IsStart == true) {
                        echo $CurrentFile . ": <select>";
                    } else {
                        echo "<optgroup>" . $CurrentFile;
                    }
                    MainLoop($Directory . "/" . $CurrentFile, false);
                    if ($IsStart == false) {
                        echo "<optgroup>";
                    } else {
                        echo "</select>";
                    }
                }
                
                else 
                {
                    echo "<option>" . $CurrentFile . "</option>";
                };
            };

            echo "<br>";

        };

        MainLoop(".", true);

    ?>
</body>

</html>