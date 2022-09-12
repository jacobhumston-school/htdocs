<!DOCTYPE html>
<html>
  <head>
  <meta charset="UTF8">
    <title>Area Contents</title>
  
  <style>
/*           Hoping for mainly self contained for ease of use */
    body
      {
        background-color:#202020;
      }
      
    table
      {
        width:75%; 
        margin-left:auto;  
        margin-right:auto; 
        margin-top:40px;
      }
      
    td
      {
        vertical-align:text-top; 
        border-radius: 5px; 
        background-color: #404040; 
        border: 5px solid #606060;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    a
      {
        color: white;
        text-decoration: none;
      }
      
  </style>
  </head>
  
  <body style="color: white"> 
  <table>
    <tbody>
      <tr>
        <td>
       
  <?php
    $LineCount = 0;
    $files = scandir('.');
    $FileCount = sizeof($files);
    usort($files, 'strnatcasecmp');
    
    
    for ( $i = 0 ; $i < $FileCount ; $i++ ) 
      {
        if ( $files[$i] != "." && $files[$i] != ".." && $files[$i] != "Maint" &&$files[$i] != "index.php" && $files[$i] != "index.php~"  && is_dir($files[$i]) == true )
          {
            echo "  <a href=\"" . $files[$i]."\"><img src='Maint/folder.png'  width='24px'> " . $files[$i] . " </a><br>";
            
              $LineCount++;
              if ( $LineCount >= 24 )
            {
              $LineCount = 0;
              echo  "<td>  ";
            }
          }
      }
     
      $LineCount = 0;

      echo '<td>';
      
      for ( $i = 0 ; $i < $FileCount ; $i++ ) 
      {
        if ( $files[$i] != ".directory" && $files[$i] != "." && $files[$i] != ".." &&$files[$i] != "index.php" && $files[$i] != "index.php~"  && is_dir($files[$i]) == false )
          {
            $path_parts = pathinfo($files[$i]);
          
            if ( $path_parts['extension'] =="png" || $path_parts['extension'] =="bmp" || $path_parts['extension'] =="jpg" || $path_parts['extension'] =="gif")
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/image.png' width='24px'> " . $files[$i] . " </a><br>";
              }
              
            else if ( $path_parts['extension'] =="cpp")
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/cpp.png' width='24px'> " . $files[$i] . " </a><br>";
              }
                      
            else if ( $path_parts['extension'] =="gz" || $path_parts['extension'] =="zip")
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/compress.png' width='24px'> " . $files[$i] . " </a><br>";
              }
              
            else if ( $path_parts['extension'] =="html")
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/html.png' width='24px'> " . $files[$i] . " </a><br>";
              }
                
            else if ( $path_parts['extension'] =="php")
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/php.png' width='24px'> " . $files[$i] . " </a><br>";
              }
                 
            else if ( $path_parts['extension'] =="txt")
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/txt.png' width='24px'> " . $files[$i] . " </a><br>";
              }
            
            else if ( $path_parts['extension'] =="blend")
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/blender.png' width='24px'> " . $files[$i] . " </a><br>";
              }
              
            else if ( $path_parts['extension'] =="doc" || $path_parts['extension'] =="odt" || $path_parts['extension'] =="docx")
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/doc.png' width='24px'> " . $files[$i] . " </a><br>";
              }
              
            else
              {
                echo "  <a href=\"" . $files[$i]."\"><img src='Maint/file.png' width='24px'> " . $files[$i] . " </a><br>";
              }
            
            $LineCount++;
              if ( $LineCount >= 24 )
            {
              $LineCount = 0;
              echo  "<td> ";
            }
          }
      }

  ?>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <tr>
        <td>
                    <a href="../" alt="back"> Back </a>
        </td>
      </tr>
    </table>   
  </body>
</html>
