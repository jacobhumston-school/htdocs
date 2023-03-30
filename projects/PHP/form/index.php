<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form</title>
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <!-- Content Wrapper -->
    <div id="content-wrapper">
        <form action="next.php" method="post">
            <!-- Error Messages -->
            <div id="error-bar">
                <?php echo $_GET['err']; ?>
            </div>

            <!-- Game Header -->
            <h1>Warrior Legends ULTIMATE</h1>

            <!-- Account Details -->
            <div class="section-wrapper">
                <!-- Header -->
                <h2>Accounts Details</h2>

                <!-- First Name Field -->
                <label>First Name</label>
                <br />
                <input class="text-field" type="text" name="firstName" required placeholder="First Name"
                    value="<?php $_POST['firstName']; ?>" />
                <br />

                <!-- Last Name Field -->
                <label>Last Name</label>
                <br />
                <input class="text-field" type="text" name="lastName" required placeholder="Last Name"
                    value="<?php $_POST['lastName']; ?>" />
                <br />

                <!-- Username Field -->
                <label>Username</label>
                <br />
                <input class="text-field" type="text" name="userName" required placeholder="Username"
                    value="<?php $_POST['userName']; ?>" />
                <br />

                <!-- Email Field -->
                <label>Email</label>
                <br />
                <input class="text-field" type="email" name="userEmail" required placeholder="Email"
                    value="<?php $_POST['userEmail']; ?>" />
                <input class="text-field" type="email" name="userEmailAgain" required placeholder="Re-Enter Email"
                    value="<?php $_POST['userEmailAgain']; ?>" />
                <br />

                <!-- Password Field -->
                <label>Password</label>
                <br />
                <input class="text-field" type="password" name="userPassword" required placeholder="Password"
                    minlength="5" maxlength="12" />
                <input class="text-field" type="password" name="userPasswordAgain" required
                    placeholder="Re-Enter Password" minlength="5" maxlength="12" />
            </div>

            <!-- Customization -->
            <div class="section-wrapper">
                <!-- Header -->
                <h2>Customization</h2>

                <!-- Character Name Field -->
                <label>Character Name</label>
                <br />
                <input class="text-field" type="text" name="characterName" required placeholder="Character Name"
                    value="<?php $_POST['characterName']; ?>" />
                <br />

                <!-- Race Fields -->
                <h3>Race</h3>

                <!-- Radio Input Wrapper -->
                <div class="radio-input-wrapper">
                    <input type="radio" name="race" value="Human" required /> <label>Human</label>
                    <br />
                    <input type="radio" name="race" value="Dwarf" required /> <label>Dwarf</label>
                    <br />
                    <input type="radio" name="race" value="Elf" required /> <label>Elf</label>
                    <br />
                </div>
                <br />

                <!-- Class Fields -->
                <h3>Class</h3>

                <!-- Radio Input Wrapper -->
                <div class="radio-input-wrapper">
                    <input type="radio" name="class" value="Warrior" required /> <label>Warrior</label>
                    <br />
                    <input type="radio" name="class" value="Cleric" required /> <label>Cleric</label>
                    <br />
                    <input type="radio" name="class" value="Mage" required /> <label>Mage</label>
                    <br />
                </div>
            </div>

            <!-- Finalize -->
            <div class="section-wrapper">
                <!-- Header -->
                <h2>Finalize</h2>

                <!-- Submit and Reset Button -->
                <input type="submit" value="Submit" /> <input type="reset" />
            </div>
        </form>
    </div>
</body>

</html>