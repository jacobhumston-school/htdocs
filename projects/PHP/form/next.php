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

    // Variables
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $userName = $_POST['userName'];
    $userEmail = $_POST['userEmail'];
    $userEmailAgain = $_POST['userEmailAgain'];
    $userPassword = $_POST['userPassword'];
    $userPasswordAgain = $_POST['userPasswordAgain'];
    $characterName = $_POST['characterName'];
    $race = $_POST['race'];
    $class = $_POST['class'];

    // Error handling.
    $error = null;

    if ($userEmailAgain !== $userEmailAgain)
        $error = 'Email fields do not match.';

    if ($userPassword !== $userPasswordAgain)
        $error = 'Password field do not match.';

    if ($characterName == $userName)
        $error = 'Character name cannot be the same as your username.';

    if ($error) {
        header('Location: index.php?err=' . '<b>Error!</b> ' . $error);
    }

    // If everything is good, we echo all the user details.
    echo "<p>";
    echo $firstName . "<br>";
    echo $lastName . "<br>";
    echo $userName . "<br>";
    echo $userEmail . "<br>";
    echo $userEmailAgain . "<br>";
    echo $userPassword . "<br>";
    echo $userPasswordAgain . "<br>";
    echo $characterName . "<br>";
    echo $race . "<br>";
    echo $class . "<br>";
    echo "</p>";
    ?>
</body>

</html>