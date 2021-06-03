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

<body onload="choosePic()">    <script>
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
    <section class="d-flex d-lg-flex align-items-center align-items-lg-center" style="height: 100vh;background: url(&quot;../assets/img/mesh-gradient.png?h=1489e3ae3c1a78e7c4683d180dbc4a10&quot;) no-repeat;background-size: cover;">
        <div class="container d-flex d-lg-flex flex-column justify-content-lg-center align-items-lg-start" style="height: 50vh;max-width: 75%;">
            <div class="flex-grow-1"><img class="flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" id="avatar" src="../assets/img/av1.png?h=7ea1e0bba9582d3e49cf424737e2fe36" style="width: 10vw;border-style: none;" onclick="choosePic()"></div>
            <h1 class="flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="1000" data-aos-once="true" style="color: rgba(108,117,125,0.5);"><span style="color: rgb(148,160,190);"><?= _Hello ?></span><span style="color: var(--bs-white);"><?= _Im ?><strong> <?= _MING ?>!</strong></span><br></h1>
            <h1 class="text-break flex-grow-1" data-aos="fade" data-aos-duration="1000" data-aos-delay="2000" data-aos-once="true" style="line-height: 55px;"><span style="color: rgb(33,37,41);"><strong><?= _UI ?> <?= _Designer ?></strong></span>&nbsp;<span style="color: rgba(108,117,125,0.5);"><strong>&amp;</strong></span>&nbsp;<span style="color: rgb(33,37,41);"><strong><?= _App ?> <?= _Developer ?></strong></span><br><span style="background: -webkit-linear-gradient(#ffffff, #00ffc2);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"><strong> WWDC21 <?= _Scholar ?></strong><br /></span></h1>
            <div data-aos="fade" data-aos-duration="1000" data-aos-delay="2500" data-aos-once="true" class="apple-business-chat-banner-container" data-apple-business-id="0b908b93-eb72-4f51-a8de-55d1d58d5301" data-apple-icon-title="Any questions? I am here to help." data-apple-banner-context="Chat with me via iMessage. Available for iPhone / iPad / Mac user." data-apple-business-intent-id="15672e94-a30a-42c0-bf8b-b2a79a99417e" data-apple-banner-background-color="rgba(255,255,255,0.5)" data-apple-banner-cta="Questions? I can help." style="border-radius:15px!important"></div><i class="fas fa-arrow-down d-flex d-lg-flex flex-grow-1 align-items-end my-auto align-items-lg-end" data-aos="fade" data-aos-duration="1000" data-aos-delay="3000" data-aos-once="true" style="font-size: 25px;color: rgba(108,117,125,0.5);"></i>
        </div>
    </section>
    <nav class="navbar navbar-light navbar-expand-md sticky-top navigation-clean" data-aos="fade-up" style="margin-top: -9vh;height: 10vh;">
        <div class="container"><a class="navbar-brand" href="#">1998 MEDIA</a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" href="#about">About</a></li>
                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Showcase&nbsp;</a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="https://photoblog.1998.media" target="_blank">Photoblog</a><a class="dropdown-item" href="https://portfolio.1998.media" target="_blank">Design Portfolio</a></div>
                    </li>
                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Coding&nbsp;</a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="https://www.behance.net/1998design" target="_blank">Behance@Adobe</a><a class="dropdown-item" href="https://github.com/1998code" target="_blank">OSS@Github</a></div>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="https://github.com/sponsors/1998code" target="_blank">Sponsors</a></li>
                    <li class="nav-item"><a class="nav-link" href="mailto:contact@1998.media" target="_blank">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="https://status.1998.media" target="_blank">Status</a></li>
                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Language&nbsp;</a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="?lang=en"><i class="fas fa-globe-americas"></i> <?= _English ?></a><a class="dropdown-item" href="?lang=zh"><i class="fas fa-globe-asia"></i> <?= _Chinese ?></a><a class="dropdown-item disabled" href="?lang=ko"><i class="fas fa-globe-asia"></i> <?= _Korean ?></a><a class="dropdown-item disabled" href="?lang=jp"><i class="fas fa-globe-asia"></i> <?= _Japanese ?></a></div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <section data-aos="fade-up" style="margin-top: 5%;font-family: futura;margin-bottom: 5%;">
        <div class="container" style="max-width: 75%;"><h1 style="margin-bottom: 3vw;"><strong><?= _About ?></strong></h1>
            <div class="row">
                <div class="col-xxl-12 d-flex d-sm-flex d-md-flex d-xxl-flex flex-column justify-content-center justify-content-sm-center justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" style="background: url(&quot;../assets/img/johannes-plenio-IoY8fvDGCNs-unsplash.jpg?h=9ce8dfc7dba1f7685731a15a8a8e27f9&quot;) center / cover no-repeat;border-radius: 25px;padding: 3vw;margin-bottom: 1.5vh;border: 5px solid rgb(255,255,255);height: 50vh;">
                    <h2 style="color: rgb(255,255,255);">Who am I</h2>
                    <p style="color: rgb(255,255,255);">An outgoing &amp; motivated person with unlimited creativity, studying within a great IT environment. Eager to work in a large and professional MNC in Design and Programming related industry in the future.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xxl-5 d-md-flex d-xxl-flex flex-column justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" style="background: url(&quot;../assets/img/mymind-tZCrFpSNiIQ-unsplash.jpg?h=0408858ea21758a14f1feda2b3e56c90&quot;) bottom / cover no-repeat;border-radius: 25px;padding: 3vw;border: 5px solid rgb(255,255,255);">
                    <h2>My Education Level</h2>
                    <h3 style="color: rgb(0,0,0);">Bachelor's degree</h3>
                    <p>A science student graduated at The Hong Kong Polytechnic University and City University of Hong Kong. Passed Korean TOPIK language exam in 2018.<br></p>
                </div>
                <div class="col-xxl-7 d-lg-flex d-xxl-flex flex-column justify-content-lg-center align-items-lg-start justify-content-xxl-center align-items-xxl-start" style="background: url(&quot;../assets/img/asoggetti-cfKC0UOZHJo-unsplash.jpg?h=141c0dbe4ed31d499999b6ffb8f9f106&quot;) top / cover no-repeat;border-radius: 25px;padding: 3vw;border: 5px solid rgb(255,255,255);">
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
                <div class="col-xxl-12" style="padding: 3vw;border-radius: 25px;border: 3px solid rgb(12,99,228);margin-top: 5vw;">
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
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Adobe Photoshop</td>
                                    <td>Final Cut Pro</td>
                                    <td></td>
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
    <section data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" style="margin-bottom: 5%;font-family: futura;">
        <div class="container" style="max-width: 75%;padding: 3vw;border-style: solid;border-radius: 25px;">
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
                    <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-3" aria-expanded="false" aria-controls="accordion-1 .item-3">[Job Opportunities] Looking for full-time, part-time or part-time job.</button></h2>
                    <div class="accordion-collapse collapse item-3" role="tabpanel" data-bs-parent="#accordion-1">
                        <div class="accordion-body">
                            <p class="mb-0">Please contact by email: <a href="mailto:job@1998.media">job@1998.media</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" style="margin-top: 5%;margin-bottom: 15%;font-family: futura;">
        <div class="container" style="max-width: 75%;padding: 3vw;">
            <h1 style="margin-bottom: 15px;"><strong>Connect</strong></h1>
            <div class="row">
                <div class="col-md-6 col-xxl-6"><div align="center"><a class="twitter-timeline" data-width="600" data-dnt="true"  data-tweet-limit="3" href="https://twitter.com/1998design?ref_src=twsrc%5Etfw">Tweets by 1998design</a>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></div>
                <div class="col-md-6 col-xxl-6"><div style="padding:5%">
<div class="github-card" data-github="1998code" data-theme="default" data-width="100%"></div>
<script src="https://cdn.jsdelivr.net/github-cards/latest/widget.js"></script>
</div>

<div style="padding:5%">
<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.behance.net/1998design" data-iframely-url="https://cdn.iframe.ly/7njRIfw"></a></div></div><script async src="https://cdn.iframe.ly/embed.js" charset="utf-8"></script>
</div>

<div style="padding:5%">
<div class="iframely-embed"><div class="iframely-responsive"><a href="https://1998design.medium.com" data-iframely-url="https://cdn.iframe.ly/vxI1Wuo"></a></div></div><script async src="https://cdn.iframe.ly/embed.js" charset="utf-8"></script>
</div>

<div style="padding:5%">
<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 75%; padding-top: 120px;"><a href="https://dribbble.com/1998design" data-iframely-url="https://cdn.iframe.ly/5G5c0pY?media=0"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>
</div></div>
            </div>
        </div>
    </section>
    <section data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" style="margin-top: 15%;font-family: futura;margin-bottom: 15%;">
        <div class="container" style="max-width: 75%;">
            <h1><strong>Contact</strong></h1>
            <div class="row">
                <div class="col-sm-6 col-lg-4 col-xxl-4 d-sm-flex d-xxl-flex align-items-sm-center align-items-xxl-center">
                    <h3>Email: <a href="mailto:contact@1998.media" target="_blank">contact@1998.media</a></h3>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8 text-truncate text-center d-xxl-flex justify-content-xxl-center"><h3 style="padding-top:5%">Location:</h3>

<div style="padding:5%">
<iframe style="border-radius:5%" width="500" height="500" src="https://snapshot.apple-mapkit.com/api/v1/snapshot?center=22.341549380226525%2C114.12976433573806&t=standard&scale=2&spn=0.6647131481197732%2C0.718663199852358&size=250x250&lang=en-US&poi=1&annotations=%5B%7B%22point%22%3A%2222.366249084472656%2C114.15977478027344%22%2C%22markerStyle%22%3A%22large%22%2C%22color%22%3A%2200a3d7%22%7D%5D&teamId=9PAHLTG8AD&keyId=FD3N2TP9F5&signature=Kpb-Pz6C8Fx5V_zdtt6BKSo6ni7WBiWwhNXF19E0LNgtinOm8dFcA2H6kZtPGh_t92OZbJknyjehxvunv-MCHA"></iframe>
</div></div>
            </div>
        </div>
    </section>
    <div data-aos="fade" data-aos-duration="1000" data-aos-once="true" id="get-started" class="brands" style="margin-top: 1%;width: 100%;padding: 2%;">
        <div class="container d-flex justify-content-center align-items-center justify-content-md-center justify-content-lg-center justify-content-xl-center">
            <p class="d-none d-sm-inline d-md-inline d-lg-inline d-xl-inline d-xxl-inline" style="margin-bottom: 0px;margin-left: 15px;"><strong>Special thanks to:</strong></p><a href="https://vercel.com/?utm_source=1998code&amp;utm_campaign=oss" style="height: 32px;padding: 0px;margin-left: 15px;max-width: 168px;" target="_blank"><img src="../assets/img/powered-by-vercel.svg?h=91084ef203023a391277bb16f564cc4f" style="filter: grayscale(0%) hue-rotate(0deg) invert(0%) saturate(100%);height: 32px;margin: 0px;"></a><a href="https://betteruptime.com/?ref=i41" style="height: 32px;padding: 0px;margin-left: 15px;max-width: 80px;" target="_blank"><img src="../assets/img/betteruptime-light.png?h=ff4472a36a4efb3c1919010865406953" style="filter: grayscale(0%) hue-rotate(0deg) invert(0%) saturate(100%);height: 32px;margin: 0px;"></a>
        </div>
    </div>
    <footer data-aos="fade" data-aos-duration="1500" data-aos-once="true" class="footer-basic">
        <div class="social"><a href="https://dribbble.com/1998design" target="_blank"><i class="fab fa-dribbble"></i></a><a href="https://behance.net/1998design" target="_blank"><i class="fab fa-behance"></i></a><a href="https://1998design.medium.com" target="_blank"><i class="fab fa-medium-m"></i></a><a href="https://twitter.com/1998design" target="_blank"><i class="fab fa-twitter"></i></a><a href="https://github.com/1998code" target="_blank"><i class="fab fa-github"></i></a></div>
        <p class="copyright">Made&nbsp;by MING with&nbsp;♥ from Hong Kong.</p>
    </footer><a class="cd-top js-cd-top cd-top--fade-out cd-top--show" style="width: 32px;height: 32px;background: url(&quot;../assets/img/cd-top-arrow.svg?h=b73f3c59a7f1ec91a545b91f7333e08d&quot;) center no-repeat, rgb(190,201,255);border-radius: 10px;" href="#0">Top</a>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script src="../assets/js/script.min.js?h=b1baa46f5676b8d9d4beb3344733b42b"></script>
</body>

</html>