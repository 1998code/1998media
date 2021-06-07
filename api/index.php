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

<!DOCTYPE html>
<html lang="en" style="overflow-x: hidden;font-family: futura!important;">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>1998 MEDIA (Official Website)</title>
    <meta name="twitter:description" content="The Official Website of 1998 MEDIA.">
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:image" content="https://1998.media/assets/img/54872601.jpeg">
    <meta name="description" content="The Official Website of 1998 MEDIA.">
    <meta property="og:type" content="website">
    <meta name="twitter:image" content="https://1998.media/assets/img/54872601.jpeg">
    <meta name="twitter:title" content="1998 MEDIA (Official Website)">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
    <link rel="manifest" href="../manifest.json?h=e2fa655b292aa0a9821c43f4313512be">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=ABeeZee">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
    <link rel="stylesheet" href="../assets/css/styles.min.css?h=c9b0d95e52b9b3ae307bf02f9bac669d">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <script src="https://static.cdn-apple.com/businesschat/start-chat-button/2/index.js"></script>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</head>

<body onload="choosePic()">    
    <script>
        function changeLang(){
         document.getElementById('form_lang').submit();
        }
        function choosePic() {
           images = ["/assets/img/av1.png","/assets/img/av2.png","/assets/img/av3.png","/assets/img/av4.png","/assets/img/av5.png","/assets/img/av6.png",];

           var random = images[Math.floor(Math.random()*images.length)];
           document.getElementById('avatar').src= random;

        }
    </script>
    <div class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex justify-content-sm-end justify-content-lg-end align-items-lg-center justify-content-xxl-end align-items-xxl-center" style="height: 3vh;margin-bottom: -3vh;width: 100vw;"><a data-aos="fade" data-aos-duration="1000" data-aos-delay="3000" data-aos-once="true" href="https://alt.1998.media" style="color: rgba(255,255,255,0.5);text-decoration: none;font-family: futura;font-size: 10px;margin-right: 0.5vw;">alt version</a></div>
    <section class="d-flex d-lg-flex align-items-center align-items-lg-center" style="height: 100vh;background: url(../assets/img/mesh-gradient.png?h=1489e3ae3c1a78e7c4683d180dbc4a10) no-repeat;background-size: cover;">
        <div class="container d-flex d-lg-flex flex-column justify-content-lg-center align-items-lg-start" style="height: 50vh;max-width: 75%;">
            <div class="flex-grow-1"><img class="flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" id="avatar" src="../assets/img/av1.png?h=7ea1e0bba9582d3e49cf424737e2fe36" style="width: 10vw;border-style: none;"></div>
            <h1 class="flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="1000" data-aos-once="true" style="color: rgba(108,117,125,0.5);"><span style="color: rgb(148,160,190);"><?= _Hello ?></span><span style="color: var(--bs-white);"><?= _Im ?><strong> <?= _MING ?>!</strong></span><br></h1>
            <h1 class="text-break flex-grow-1" data-aos="fade" data-aos-duration="1000" data-aos-delay="2000" data-aos-once="true" style="line-height: 55px;"><span style="color: rgb(33,37,41);"><strong><?= _UI ?> <?= _Designer ?></strong></span>&nbsp;<span style="color: rgba(108,117,125,0.5);"><strong>&amp;</strong></span>&nbsp;<span style="color: rgb(33,37,41);"><strong><?= _App ?> <?= _Developer ?></strong></span><br><span style="background: -webkit-linear-gradient(#ffffff, #00ffc2);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"><strong> WWDC21 <?= _Scholar ?></strong><br /></span></h1>
            <div data-aos="fade" data-aos-duration="1000" data-aos-delay="2500" data-aos-once="true" class="apple-business-chat-banner-container" data-apple-business-id="0b908b93-eb72-4f51-a8de-55d1d58d5301" data-apple-icon-title="Any questions? I am here to help." data-apple-banner-context="Chat with me via iMessage. Available for iPhone / iPad / Mac user." data-apple-business-intent-id="15672e94-a30a-42c0-bf8b-b2a79a99417e" data-apple-banner-background-color="rgba(255,255,255,0.5)" data-apple-banner-cta="Questions? I can help." style="border-radius:15px!important"></div><i class="fas fa-arrow-down d-flex d-lg-flex flex-grow-1 align-items-end my-auto align-items-lg-end" data-aos="fade" data-aos-duration="1000" data-aos-delay="3000" data-aos-once="true" style="font-size: 25px;color: rgba(108,117,125,0.5);"></i>
        </div>
    </section>
</body>

</html>