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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover">
    <title>Welcome | 1998 MEDIA</title>
    <meta name="twitter:description" content="The Official Website of 1998 MEDIA.">
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:image" content="https://1998.media/assets/img/54872601.jpeg">
    <meta name="description" content="The Official Website of 1998 MEDIA.">
    <meta property="og:type" content="website">
    <meta name="twitter:image" content="https://1998.media/assets/img/54872601.jpeg">
    <meta name="twitter:title" content="1998 MEDIA (Official Website)">
    <meta name="theme-color" content="#b3c9ff">
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

<body onload="choosePic()" style="background: #fff6eb;">   
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
            <h1 class="flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="1000" data-aos-once="true" style="color: rgba(108,117,125,0.5);"><span style="color: rgb(148,160,190);"><?= _Hello ?>&nbsp;</span><span style="color: var(--bs-white);"><?= _Im ?><strong>&nbsp;<?= _MING ?>!</strong></span><br></h1>
            <h1 class="text-break flex-grow-1" data-aos="fade" data-aos-duration="1000" data-aos-delay="2000" data-aos-once="true" style="line-height: 55px;"><span style="color: rgb(33,37,41);"><strong><?= _UIDesigner ?></strong></span>&nbsp;<span style="color: rgba(108,117,125,0.5);"><strong>&amp;</strong></span>&nbsp;<span style="color: rgb(33,37,41);"><strong><?= _AppDeveloper ?></strong></span><br><span style="background: -webkit-linear-gradient(#ffffff, #00ffc2);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"><strong> WWDC21 <?= _Scholar ?></strong><br /></span></h1>
            <div data-aos="fade" data-aos-duration="1000" data-aos-delay="2500" data-aos-once="true" class="apple-business-chat-banner-container" data-apple-business-id="0b908b93-eb72-4f51-a8de-55d1d58d5301" data-apple-icon-title="Any questions? I am here to help." data-apple-banner-context="Chat with me via iMessage. Available for iPhone / iPad / Mac user." data-apple-business-intent-id="15672e94-a30a-42c0-bf8b-b2a79a99417e" data-apple-banner-background-color="rgba(255,255,255,0.5)" data-apple-banner-cta="Questions? I can help." style="border-radius:15px!important"></div><i class="fas fa-arrow-down d-flex d-lg-flex flex-grow-1 align-items-end my-auto align-items-lg-end" data-aos="fade" data-aos-duration="1000" data-aos-delay="3000" data-aos-once="true" style="font-size: 25px;color: rgba(108,117,125,0.5);"></i>
        </div>
    </section>
    <nav class="navbar navbar-light navbar-expand-md sticky-top navigation-clean" data-aos="fade-up" style="margin-top: -9vh;height: 10vh;">
        <div class="container"><a class="navbar-brand" href="#">1998 MEDIA</a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Showcase&nbsp;</a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="https://photoblog.1998.media" target="_blank">Photoblog</a><a class="dropdown-item" href="https://portfolio.1998.media" target="_blank">Design Portfolio</a></div>
                    </li>
                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Coding&nbsp;</a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="https://www.behance.net/1998design" target="_blank">Behance@Adobe</a><a class="dropdown-item" href="https://github.com/1998code" target="_blank">OSS@Github</a></div>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="https://github.com/sponsors/1998code" target="_blank">Sponsors</a></li>
                    <li class="nav-item"><a class="nav-link" href="mailto:contact@1998.media" target="_blank">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="https://status.1998.media" target="_blank">Status</a></li>
                    <li class="nav-item d-md-flex align-items-md-center"><a class="nav-link d-md-flex align-items-md-center" href="https://shop.1998.media"><i class="fas fa-shopping-bag"></i></a></li>
                    <li class="nav-item dropdown d-md-flex align-items-md-center"><a class="dropdown-toggle nav-link d-md-flex align-items-md-center" aria-expanded="false" data-bs-toggle="dropdown" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">

                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00001 2C7.55229 2 8.00001 2.44772 8.00001 3V4H8.73223C8.744 3.99979 8.75581 3.99979 8.76765 4H11C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6H9.57801C9.21635 7.68748 8.63076 9.29154 7.85405 10.7796C8.14482 11.1338 8.44964 11.476 8.76767 11.8055C9.15124 12.2028 9.14007 12.8359 8.74272 13.2195C8.34537 13.603 7.7123 13.5919 7.32873 13.1945C7.13962 12.9986 6.95468 12.7987 6.77405 12.5948C5.88895 13.9101 4.84387 15.1084 3.66692 16.1618C3.2554 16.5301 2.6232 16.4951 2.25487 16.0836C1.88655 15.672 1.92157 15.0398 2.3331 14.6715C3.54619 13.5858 4.60214 12.3288 5.4631 10.9389C4.90663 10.1499 4.40868 9.31652 3.97558 8.44503C3.7298 7.95045 3.93148 7.35027 4.42606 7.10449C4.92064 6.8587 5.52083 7.06039 5.76661 7.55497C6.00021 8.02502 6.25495 8.48278 6.52961 8.92699C6.947 7.99272 7.28247 7.01402 7.52698 6H3.00001C2.44772 6 2.00001 5.55228 2.00001 5C2.00001 4.44772 2.44772 4 3.00001 4H6.00001V3C6.00001 2.44772 6.44772 2 7.00001 2ZM13 8C13.3788 8 13.725 8.214 13.8944 8.55279L16.8854 14.5348C16.8919 14.5471 16.8982 14.5596 16.9041 14.5722L17.8944 16.5528C18.1414 17.0468 17.9412 17.6474 17.4472 17.8944C16.9532 18.1414 16.3526 17.9412 16.1056 17.4472L15.382 16H10.618L9.89444 17.4472C9.64745 17.9412 9.04677 18.1414 8.5528 17.8944C8.05882 17.6474 7.85859 17.0468 8.10558 16.5528L9.09589 14.5722C9.10187 14.5596 9.1081 14.5471 9.11458 14.5348L12.1056 8.55279C12.275 8.214 12.6212 8 13 8ZM11.618 14H14.382L13 11.2361L11.618 14Z" fill="currentColor"></path>
                            </svg></a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="?lang=en"><i class="fas fa-globe-americas"></i> <?= _English ?></a><a class="dropdown-item" href="?lang=zh"><i class="fas fa-globe-asia"></i> <?= _Chinese ?></a><a class="dropdown-item disabled" href="?lang=ko"><i class="fas fa-globe-asia"></i> <?= _Korean ?></a><a class="dropdown-item disabled" href="?lang=jp"><i class="fas fa-globe-asia"></i> <?= _Japanese ?></a></div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Intro -->    
    <section data-aos="fade-up" style="margin-top: 5%;font-family: futura;margin-bottom: 5%;">
        <div class="container" style="max-width: 75%;"><h1 style="margin-bottom: 3vw;"><strong><?= _About ?></strong></h1>
            <div class="row">
            <div class="col-xxl-12 d-flex d-sm-flex d-md-flex d-xxl-flex flex-column justify-content-center justify-content-sm-center justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" style="background: linear-gradient(-165deg, rgba(255,246,235,0.35), rgba(255,255,255,0)), url(&quot;../assets/img/johannes-plenio-IoY8fvDGCNs-unsplash.jpg?h=9ce8dfc7dba1f7685731a15a8a8e27f9&quot;) center / cover no-repeat;padding: 3vw;height: 50vh;border-style: none;border-color: rgb(255,255,255);margin-bottom: 1.5vh;border-radius: 5px;">
                    <h2 style="color: rgb(255,255,255);"><?= _WhoAmI ?></h2>
                    <p style="color: rgb(255,255,255);"><?= _WhoAmI_detail ?></p>
                </div>
            </div>
            <div class="row" style="border-radius: 5px;border: 0px solid rgba(33,37,41,0) ;">
                <div class="col-xxl-5 d-md-flex d-xxl-flex flex-column justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" style="background: linear-gradient(-125deg, rgb(255,246,235) 0%, rgba(255,255,255,0) 98%), url(&quot;../assets/img/mymind-tZCrFpSNiIQ-unsplash.jpg?h=0408858ea21758a14f1feda2b3e56c90&quot;) bottom / cover no-repeat;padding: 3vw;">
                    <h3 style="color: rgb(0,0,0);">Bachelor's degree</h3>
                    <p>A science student graduated at The Hong Kong Polytechnic University and City University of Hong Kong. Passed Korean TOPIK language exam in 2018.<br></p>
                </div>
                <div class="col-xxl-7 d-lg-flex d-xxl-flex flex-column justify-content-lg-center align-items-lg-start justify-content-xxl-center align-items-xxl-start" style="background: linear-gradient(rgb(255,246,235), rgba(255,255,255,0)), url(&quot;../assets/img/asoggetti-cfKC0UOZHJo-unsplash.jpg?h=141c0dbe4ed31d499999b6ffb8f9f106&quot;) top / cover no-repeat;padding: 3vw;">
                    <h2>What I Do</h2>
                    <div class="row" style="width: 100%;">
                        <div class="col">
                            <p>- UI/UX Design<br>- iOS / iPadOS / macOS Application Development<br>- Photo Shooting &amp; Editing<br>- Movie and Short Video Shooting &amp; Editing</p>
                        </div>
                        <div class="col">
                            <p>(Check-out my latest work on dribbble and behance.)<br>(Available on App Store and Mac App Store.)<br>(Available on Adobe Stock.)<br>(Enquiry via email.)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xxl-12" style="padding: 3vw;border: 3px solid rgb(12,99,228);margin-top: 5vw;background: #ffffff;border-radius: 5px;">
                    <h2 style="margin-bottom: 20px;">Experience</h2>
                    <div class="accordion" role="tablist" id="accordion-2" style="border-radius: 15px;border: 1px solid rgb(231,241,255);margin-bottom: 20px;">
                        <div class="accordion-item" style="border-radius: 15px 15px 0px 0px;border-width: 0px;">
                            <h2 class="accordion-header" role="tab" style="border-color: rgb(231,241,255);"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion-2 .item-1" aria-expanded="true" aria-controls="accordion-2 .item-1" style="border-radius: 15px 15px 0px 0px;">2020 Q4 - Now</button></h2>
                            <div class="accordion-collapse collapse show item-1" role="tabpanel" data-bs-parent="#accordion-2">
                                <div class="accordion-body">
                                    <p class="mb-0">PolyU, HONG KONG - As a Student Assistant (PT) Develop website &amp; design booklet for College's Language Scolar Program</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                            <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-2 .item-2" aria-expanded="false" aria-controls="accordion-2 .item-2">2020 Q3</button></h2>
                            <div class="accordion-collapse collapse item-2" role="tabpanel" data-bs-parent="#accordion-2">
                                <div class="accordion-body">
                                    <p class="mb-0">PolyU, HONG KONG - As a Student Assistant (PT) Data analytics and visualization<br><br>PolyU, HONG KONG - As a student developer Participate in artificial intelligence and Natural language processing research field</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                            <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-2 .item-3" aria-expanded="false" aria-controls="accordion-2 .item-3">2020 Q2</button></h2>
                            <div class="accordion-collapse collapse item-3" role="tabpanel" data-bs-parent="#accordion-2">
                                <div class="accordion-body">
                                    <p class="mb-0">Atlassian, Australia - As a Translator (Chinese, Korean) language of the BitBucket.org Team<br><br>Tokyo Metropolitan Government, Japan - As a CHT Translator of the StopCovid19Tokyo Team with Code of Japan</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" style="border-width: 0px;border-radius: 15px;">
                            <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-2 .item-4" aria-expanded="false" aria-controls="accordion-2 .item-4" style="border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;">2020 Q1</button></h2>
                            <div class="accordion-collapse collapse item-4" role="tabpanel" data-bs-parent="#accordion-2">
                                <div class="accordion-body">
                                    <p class="mb-0">Freelance works on different platform<br></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 style="margin-bottom: 20px;margin-top: 20px;">Awards</h2><img class="img-fluid" src="../assets/img/WWDC21Winner.png?h=635e76ae457bd315d787163181b80dd7">
                    <h2 style="margin-bottom: 20px;margin-top: 20px;">Skills</h2>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Software</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Adobe Creative Cloud</td>
                                    <td>Apple Xcode</td>
                                    <td>Microsoft SQL Server</td>
                                </tr>
                                <tr>
                                    <td>Adobe XD</td>
                                    <td>Apple Keynote</td>
                                    <td>Microsoft Office</td>
                                </tr>
                                <tr>
                                    <td>Adobe Dimension</td>
                                    <td>Apple Pages</td>
                                    <td>Sketch</td>
                                </tr>
                                <tr>
                                    <td>Adobe Photoshop</td>
                                    <td>Final Cut Pro</td>
                                    <td>Shapr3D</td>
                                </tr>
                                <tr>
                                    <td>Adobe Premiere Pro</td>
                                    <td>Figma</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Adobe Lightroom</td>
                                    <td>Framer</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Adobe Dreamweaver</td>
                                    <td>Unity Engine</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 style="margin-bottom: 20px;margin-top: 20px;">Languages</h2>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Proficient in both spoken and written&nbsp;</th>
                                    <th>Proficient in spoken</th>
                                    <th>Basic in</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Chinese (Cantonese,&nbsp;Mandarin)</td>
                                    <td>Korean (Passed the Test of Proficiency in Korean in 2018)</td>
                                    <td>Japanese</td>
                                </tr>
                                <tr>
                                    <td>English (the United Kingdom, United States of America)</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- QA -->   
    <section data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" style="margin-bottom: 5%;font-family: futura;">
        <div class="container" style="max-width: 75%;padding: 3vw;border-style: solid;background: #ffffff;border-radius: 5px;">
            <h1 style="margin-bottom: 15px;"><strong>Question and Answering</strong></h1>
            <div class="accordion" role="tablist" id="accordion-1">
                <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                    <h2 class="accordion-header" role="tab"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-1" aria-expanded="true" aria-controls="accordion-1 .item-1">[Support]&nbsp;How to sponsor your projects?</button></h2>
                    <div class="accordion-collapse collapse show item-1" role="tabpanel" data-bs-parent="#accordion-1">
                        <div class="accordion-body">
                            <p class="mb-0">Github for sponsor:&nbsp;<a href="https://github.com/sponsors/1998code">https://github.com/sponsors/1998code</a><br>Google Ads:</p><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- M-ADS Q1 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1941913120815371"
     data-ad-slot="1600474556"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
                        </div>
                    </div>
                </div>
                <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                    <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-2" aria-expanded="false" aria-controls="accordion-1 .item-2">[OSS] Where do your Open Source works hosts?</button></h2>
                    <div class="accordion-collapse collapse item-2" role="tabpanel" data-bs-parent="#accordion-1">
                        <div class="accordion-body">
                            <p class="mb-0">Github: <a href="https://github.com/1998code">https://github.com/1998code&nbsp;</a><i class="fas fa-external-link-alt" style="color: rgb(19,112,253);"></i><br>Vercel:&nbsp;<a href="https://vercel.com/?utm_source=1998code&amp;utm_campaign=oss">https://vercel.com</a>&nbsp;<i class="fas fa-external-link-alt" style="color: rgb(19,112,253);"></i></p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                    <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-3" aria-expanded="false" aria-controls="accordion-1 .item-3">[Job Cooperation] How to contact?</button></h2>
                    <div class="accordion-collapse collapse item-3" role="tabpanel" data-bs-parent="#accordion-1">
                        <div class="accordion-body">
                            <p class="mb-0">Please contact by email: <a href="mailto:job@1998.media">job@1998.media</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Contact --> 
    <section data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" style="margin-top: 15%;font-family: futura;margin-bottom: 15%;">
        <div class="container" style="max-width: 75%;background: #fcfcfc;padding: 25px;border-style: solid;border-color: rgb(13,110,253);border-radius: 5px;">
            <h1><strong>Contact</strong></h1>
            <div class="row">
                <div class="col-sm-6 col-lg-4 col-xxl-4 d-sm-flex d-xxl-flex flex-column align-items-sm-center justify-content-xxl-center align-items-xxl-center">
                    <h3 class="d-xxl-flex flex-column justify-content-xxl-center align-items-xxl-start">Email: <a href="mailto:contact@1998.media" target="_blank">contact@1998.media</a><br><br>iMessage:<br></h3>
                    <div data-aos="fade" data-aos-duration="1000" data-aos-delay="2500" data-aos-once="true" class="apple-business-chat-banner-container" data-apple-business-id="0b908b93-eb72-4f51-a8de-55d1d58d5301" data-apple-icon-title="Any questions? I am here to help." data-apple-banner-context="Chat with me via iMessage. Available for iPhone / iPad / Mac user." data-apple-business-intent-id="15672e94-a30a-42c0-bf8b-b2a79a99417e" data-apple-banner-background-color="rgba(255,255,255,0.5)" data-apple-banner-cta="Questions? I can help." style="border-radius:15px!important"></div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8 text-truncate text-center d-xxl-flex justify-content-xxl-center"><div style="padding:5%">
<iframe style="border-radius:25px" width="500" height="500" src="https://snapshot.apple-mapkit.com/api/v1/snapshot?center=22.341549380226525%2C114.12976433573806&t=standard&scale=2&spn=0.6647131481197732%2C0.718663199852358&size=250x250&lang=en-US&poi=1&annotations=%5B%7B%22point%22%3A%2222.366249084472656%2C114.15977478027344%22%2C%22markerStyle%22%3A%22large%22%2C%22color%22%3A%2200a3d7%22%7D%5D&teamId=9PAHLTG8AD&keyId=FD3N2TP9F5&signature=Kpb-Pz6C8Fx5V_zdtt6BKSo6ni7WBiWwhNXF19E0LNgtinOm8dFcA2H6kZtPGh_t92OZbJknyjehxvunv-MCHA"></iframe>
</div></div>
            </div>
        </div>
    </section>
    <!-- Credit -->
    <div data-aos="fade" data-aos-duration="1000" data-aos-once="true" id="get-started" class="brands" style="margin-top: 1%;width: 100%;padding: 2%;">
        <div class="container d-flex justify-content-center align-items-center justify-content-md-center justify-content-lg-center justify-content-xl-center">
            <p class="d-none d-sm-inline d-md-inline d-lg-inline d-xl-inline d-xxl-inline" style="margin-bottom: 0px;margin-left: 15px;"><strong>Special thanks to:</strong></p><a href="https://vercel.com/?utm_source=1998code&amp;utm_campaign=oss" style="height: 32px;padding: 0px;margin-left: 15px;max-width: 168px;" target="_blank"><img src="../assets/img/powered-by-vercel.svg?h=91084ef203023a391277bb16f564cc4f" style="filter: grayscale(0%) hue-rotate(0deg) invert(0%) saturate(100%);height: 32px;margin: 0px;"></a><a href="https://betteruptime.com/?ref=i41" style="height: 32px;padding: 0px;margin-left: 15px;max-width: 80px;" target="_blank"><img src="../assets/img/betteruptime-light.png?h=ff4472a36a4efb3c1919010865406953" style="filter: grayscale(0%) hue-rotate(0deg) invert(0%) saturate(100%);height: 32px;margin: 0px;"></a>
        </div>
    </div>
    <footer data-aos="fade" data-aos-duration="1500" data-aos-once="true" class="footer-basic">
        <div class="social"><a href="https://dribbble.com/1998design" target="_blank"><i class="fab fa-dribbble"></i></a><a href="https://behance.net/1998design" target="_blank"><i class="fab fa-behance"></i></a><a href="https://1998design.medium.com" target="_blank"><i class="fab fa-medium-m"></i></a><a href="https://twitter.com/1998design" target="_blank"><i class="fab fa-twitter"></i></a><a href="https://github.com/1998code" target="_blank"><i class="fab fa-github"></i></a></div>
        <p class="copyright">Made&nbsp;by MING with&nbsp;♥ from Hong Kong.</p>
    </footer><a class="cd-top js-cd-top cd-top--fade-out cd-top--show" style="width: 32px;height: 32px;background: url(../assets/img/cd-top-arrow.svg?h=b73f3c59a7f1ec91a545b91f7333e08d) center no-repeat, rgb(190,201,255);border-radius: 10px;" href="#0">Top</a>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script src="../assets/js/script.min.js?h=b1baa46f5676b8d9d4beb3344733b42b"></script>
</body>

</html>