<!DOCTYPE html>
<html lang="en">
	<head>
    	<meta charset="UTF-8" />
    	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    	<title>Form Result</title>
  	</head>
  	<body>
      <?php

            $firstName = $_POST['firstName'];
            echo $firstName . "<br>";

            $lastName = $_POST['lastName'];
            echo $lastName . "<br>";

            $userEmail = $_POST['userEmail'];
            echo $userEmail . "<br>";

            $userEmailAgain = $_POST['userEmailAgain'];
            echo $userEmailAgain . "<br>";

            $userPassword = $_POST['userPassword'];
            echo $userPassword . "<br>";

            $userPasswordAgain = $_POST['userPasswordAgain'];
            echo $userPasswordAgain . "<br>";

            $race = $_POST['race'];
            echo $race . "<br>";

            $class = $_POST['class'];
            echo $class . "<br>";

        ?>
	</body>
</html>