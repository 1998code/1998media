<?php
session_start();

// Set Language variable
if(isset($_GET['lang']) && !empty($_GET['lang'])){
    $_SESSION['lang'] = $_GET['lang'];
   
    if(isset($_SESSION['lang']) && $_SESSION['lang'] != $_GET['lang']){
     echo "<script type='text/javascript'> location.reload(); </script>";
    }
   }
   
   // Include Language file
   if(isset($_SESSION['lang'])){
    include "lang_".$_SESSION['lang'].".php";
   }else{
    include "lang_en.php";
   }
   ?>
   
   <!doctype html>
   <html>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
    <body >
    <script>
    function changeLang(){
     document.getElementById('form_lang').submit();
    }
    </script>
   
    <!-- Language -->
    <form method='get' action='' id='form_lang' >
      Select Language : <select name='lang' onchange='changeLang();' >
      <option value='en' <?php if(isset($_SESSION['lang']) && $_SESSION['lang'] == 'en'){ echo "selected"; } ?> >English</option>
      <option value='zh' <?php if(isset($_SESSION['lang']) && $_SESSION['lang'] == 'pl'){ echo "selected"; } ?> >Polish</option>
     </select>
    </form>
   
   <!-- Form -->
    <h1><?= _REGISTER ?></h1>
    <form method='post' action=''>
     <?= _NAME ?> : <input type='text' name='name' /><br>
     <?= _USERNAME ?> : <input type='text' name='username' /><br>
     <?= _EMAIL ?> : <input type='text' name='email' /><br>
     <?= _ADDRESS ?> : <input type='text' name='address' /><br>
     <input type='submit' value='<?= _SUBMIT ?>'>
    </form>
    </body>
   </html>
