<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Form</title>
    </head>
    <body>
        <form action="next.php" method="post">
            <label for="fname">First name:</label><br>
                <input type="text" id="fname" name="fname" size="32" maxlength="20" required placeholder="first name" value="<?php echo $_POST['fname']; ?>"><br>
            
            <label for="lname">Last name:</label><br>
                <input type="password" id="lname" name="lname"><br>
            
                <input type="radio" id="html" name="fav_class" value="Human">
            <label for="html" checked>Human</label><br>
                <input type="radio" id="css" name="fav_class" value="Dwarf">
            <label for="css">Dwarf</label><br>
                <input type="radio" id="javascript" name="fav_class" value="Elf">
            <label for="javascript">Elf</label><br>
                
                <input type="radio" id="html" name="fav_language" value="Warrior">
            <label for="html" checked>Warrior</label><br>
                <input type="radio" id="css" name="fav_language" value="Cleric">
            <label for="css">Cleric</label><br>
                <input type="radio" id="javascript" name="fav_language" value="Mage">
            <label for="javascript">Mage</label><br>

            <input type="submit" value="Submit"><br>
            <input type="reset">
        </form> 
    </body>
</html>