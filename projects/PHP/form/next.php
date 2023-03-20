<!DOCTYPE html>
<html lang="en">
	<head>
    	<meta charset="UTF-8" />
    	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    	<title>Forum Result</title>
  	</head>
  	<body>
      <?php

            $fName = $_POST['fname'];
            echo $fName . "<br>";

            $lName = $_POST['lname'];
            echo $lName . "<br>";

            $rName = $_POST['fav_race'];
            echo $rName . "<br>";

            $cName = $_POST['fav_class'];
            echo $cName . "<br>";

        ?>
	</body>
</html>