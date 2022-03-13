import Head from 'next/head'
import Script from 'next/script'

export default function Home() {
  function changeLang() {
    document.getElementById('form_lang').submit();
  }
  function choosePic() {
    images = ["/assets/img/av1.png", "/assets/img/av2.png", "/assets/img/av3.png", "/assets/img/av4.png", "/assets/img/av5.png", "/assets/img/av6.png",];
    var random = images[Math.floor(Math.random() * images.length)];
    document.getElementById('avatar').src = random;
  }
  const navContainer = '<div class="container"><a class="navbar-brand" id="branding" href="#">1998 MEDIA</a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol"><span class="navbar-toggler-icon"></span></button> <div class="collapse navbar-collapse" id="navcol"> <ul class="navbar-nav ms-auto" id="nav"> <li class="nav-item dropdown" id="navItem"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Showcase&nbsp;</a> <div class="dropdown-menu" id="menuDropDown"><a class="dropdown-item" href="https://photoblog.1998.media" target="_blank"><i class="fas fa-camera"></i>&nbsp;Photoblog</a><a class="dropdown-item" href="https://portfolio.1998.media" target="_blank"><i class="fas fa-grip-horizontal"></i>&nbsp;Design Portfolio</a><a class="dropdown-item" href="https://www.behance.net/1998design" target="_blank"><i class="fab fa-behance"></i>&nbsp;Behance</a><a class="dropdown-item" href="https://dribbble.com/1998design" target="_blank"><i class="fab fa-dribbble"></i>&nbsp;Dribbble</a></div> </li> <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Coding&nbsp;</a> <div class="dropdown-menu" id="menuDropDown"><a class="dropdown-item" href="https://github.com/1998code" target="_blank"><i class="fab fa-github"></i>&nbsp;Github</a><a class="dropdown-item" href="https://github.com/sponsors/1998code" target="_blank"><i class="fas fa-money-check-alt"></i>&nbsp;Sponsor</a></div> </li> <li class="nav-item"><a class="nav-link" href="https://1998design.medium.com" target="_blank">Blog</a></li> <li class="nav-item"><a class="nav-link" href="mailto:contact@1998.media" target="_blank">Contact</a></li> <li class="nav-item"><a class="nav-link" href="https://status.1998.media" target="_blank">Status</a></li> <li class="nav-item d-md-flex align-items-md-center"><a class="nav-link d-md-flex align-items-md-center" href="https://shop.1998.media"><i class="fas fa-shopping-bag"></i></a></li> <li class="nav-item dropdown d-md-flex align-items-md-center"><a class="dropdown-toggle nav-link d-md-flex align-items-md-center" aria-expanded="false" data-bs-toggle="dropdown" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00001 2C7.55229 2 8.00001 2.44772 8.00001 3V4H8.73223C8.744 3.99979 8.75581 3.99979 8.76765 4H11C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6H9.57801C9.21635 7.68748 8.63076 9.29154 7.85405 10.7796C8.14482 11.1338 8.44964 11.476 8.76767 11.8055C9.15124 12.2028 9.14007 12.8359 8.74272 13.2195C8.34537 13.603 7.7123 13.5919 7.32873 13.1945C7.13962 12.9986 6.95468 12.7987 6.77405 12.5948C5.88895 13.9101 4.84387 15.1084 3.66692 16.1618C3.2554 16.5301 2.6232 16.4951 2.25487 16.0836C1.88655 15.672 1.92157 15.0398 2.3331 14.6715C3.54619 13.5858 4.60214 12.3288 5.4631 10.9389C4.90663 10.1499 4.40868 9.31652 3.97558 8.44503C3.7298 7.95045 3.93148 7.35027 4.42606 7.10449C4.92064 6.8587 5.52083 7.06039 5.76661 7.55497C6.00021 8.02502 6.25495 8.48278 6.52961 8.92699C6.947 7.99272 7.28247 7.01402 7.52698 6H3.00001C2.44772 6 2.00001 5.55228 2.00001 5C2.00001 4.44772 2.44772 4 3.00001 4H6.00001V3C6.00001 2.44772 6.44772 2 7.00001 2ZM13 8C13.3788 8 13.725 8.214 13.8944 8.55279L16.8854 14.5348C16.8919 14.5471 16.8982 14.5596 16.9041 14.5722L17.8944 16.5528C18.1414 17.0468 17.9412 17.6474 17.4472 17.8944C16.9532 18.1414 16.3526 17.9412 16.1056 17.4472L15.382 16H10.618L9.89444 17.4472C9.64745 17.9412 9.04677 18.1414 8.5528 17.8944C8.05882 17.6474 7.85859 17.0468 8.10558 16.5528L9.09589 14.5722C9.10187 14.5596 9.1081 14.5471 9.11458 14.5348L12.1056 8.55279C12.275 8.214 12.6212 8 13 8ZM11.618 14H14.382L13 11.2361L11.618 14Z" fill="currentColor"></path> </svg></a> <div class="dropdown-menu" id="menuDropDown"><div id="google_translate_element"></div> <script type="text/javascript"> function googleTranslateElementInit() { new google.translate.TranslateElement({pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL}, "google_translate_element"); } </script> <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script></div> </li> </ul> </div> </div>'
  const ads = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1941913120815371" data-ad-slot="1600474556" data-ad-format="auto" data-full-width-responsive="true"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>'

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta charset="utf-8" />
        <meta name="theme-color" media="(prefers-color-scheme:light)" content="#b3c9ff" key="Light" />
        <meta name="theme-color" media="(prefers-color-scheme:dark)" content="#000237" key="Dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>1998 MEDIA (Official Website)</title>
        <meta name="twitter:description" content="The Official Website of 1998 MEDIA." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://1998.media/assets/img/54872601.jpeg" />
        <meta name="description" content="The Official Website of 1998 MEDIA." />
        <meta property="og:type" content="website" />
        <meta name="twitter:image" content="https://1998.media/assets/img/54872601.jpeg" />
        <meta name="twitter:title" content="1998 MEDIA (Official Website)" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="icon" type="image/jpeg" sizes="460x460" href="assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />
        <link rel="manifest" href="manifest.json?h=aee7c9c304330f1166f5a351f0604634" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=ABeeZee" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
        <link rel="stylesheet" href="assets/css/BackTop.css?h=9512ee751dbc980e699f6b5cf9d05e1e" />
        <link rel="stylesheet" href="assets/css/Brands.css?h=55b208e77be2b9e84508696669ca8fbb" />
        <link rel="stylesheet" href="assets/css/FooterBasic.css?h=ac709030f0fa208ad851c35779cb4154" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
        <link rel="stylesheet" href="assets/css/NavigationClean.css?h=bdc5f2fa516741f2812cd4e1b8886c6e" />
        <link rel="stylesheet" href="assets/css/styles.css?h=392a8a145ca0b3b44664542d7e027717"></link>
      </Head>

      <body onload="choosePic()">
        <section class="d-flex d-lg-flex align-items-center align-items-lg-center" id="hero">
            <div class="container d-flex d-lg-flex flex-column justify-content-lg-center align-items-lg-start" id="heroContainer">
                <div class="flex-grow-1"><img class="rounded-circle img-fluid flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" id="avatar" src="assets/img/av1.png?h=455cd139442f5f06d9317f400725df51" /></div>
                <h1 class="flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="1000" data-aos-once="true" id="headingGreeting">Hi,&nbsp;<span data-aos="fade" data-aos-duration="1000" data-aos-delay="1500" id="headingName">I'm <strong>MING</strong>!</span><br /></h1>
                <h1 class="text-break flex-grow-1" data-aos="fade" data-aos-duration="1000" data-aos-delay="2000" data-aos-once="true"><strong>UI Designer&nbsp;</strong><span id="and">&amp;</span>&nbsp;<strong>Software&nbsp;Engineer</strong><br /><span id="wwdc21"><strong>&nbsp;WWDC Award Winner</strong></span></h1>
                <div data-aos="fade" data-aos-duration="1000" data-aos-delay="2500" data-aos-once="true" id="appleBusinessChatBanner" class="apple-business-chat-banner-container" data-apple-business-id="0b908b93-eb72-4f51-a8de-55d1d58d5301" data-apple-icon-title="Any questions? I am here to help." data-apple-banner-context="Chat with me via iMessage. Available for iPhone / iPad / Mac user." data-apple-business-intent-id="15672e94-a30a-42c0-bf8b-b2a79a99417e" data-apple-banner-background-color="rgba(0,0,0,0.25)" data-apple-banner-cta="Questions? I can help." data-apple-banner-text-color="rgb(255, 255, 255)"></div><i class="fas fa-arrow-down d-flex d-lg-flex flex-grow-1 align-items-end my-auto align-items-lg-end" data-aos="fade" data-aos-duration="1000" data-aos-delay="3000" data-aos-once="true" id="arrowDown"></i>
            </div>
        </section>

        <nav class="navbar navbar-light navbar-expand-lg sticky-top navigation-clean" dangerouslySetInnerHTML={{ __html: navContainer }}></nav>

        <section id="about">
            <div class="container" id="aboutContainer">
                <h1><strong>About</strong></h1>
                <div class="row">
                    <div class="col-md-12 col-lg-12 col-xl-4 col-xxl-4 d-flex d-sm-flex d-md-flex d-xxl-flex flex-column justify-content-center justify-content-sm-center justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" data-aos="fade-up" data-aos-once="true" id="who">
                        <div id="whoDiv">
                            <h2 id="whoHeading">Who am I</h2>
                            <p id="whoParagraph">An outgoing &amp; motivated person with unlimited creativity, studying within a great IT environment. Eager to work in a large and professional MNC in Design and Programming related industry in the future.</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-4 col-xxl-4 d-flex d-sm-flex d-md-flex d-xxl-flex flex-column justify-content-center justify-content-sm-center justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" data-aos="fade-up" data-aos-once="true" id="edu">
                        <div class="d-xxl-flex flex-column" id="eduDiv">
                            <h2 id="eduHeading">Bachelor's degree</h2>
                            <p class="flex-grow-1" id="eduParagraph">A science student graduated at The Hong Kong Polytechnic University and City University of Hong Kong.<br />Passed Korean TOPIK language exam in 2018.</p><a class="text-truncate" id="cityuCert" href="https://www.cityu.edu.hk/e-certification/nvkrwyua" target="_blank"><i class="fas fa-user-check"></i>&nbsp;CityU e-Cert Verification&nbsp;<i class="fas fa-external-link-alt"></i></a>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-4 col-xxl-4 d-flex d-sm-flex d-md-flex d-xxl-flex flex-column justify-content-center justify-content-sm-center justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" data-aos="fade-up" data-aos-once="true" id="do">
                        <div id="doDiv">
                            <h2 id="doHeading">What I Do</h2>
                            <p id="doParagraph">UI &amp; UX Design<br />iOS&nbsp;&amp; iPadOS&nbsp;&amp; macOS&nbsp;&amp; Web Application Development<br />2D&nbsp;&amp; 3D Product Mockup<br />Deep Machine Learning<br />Photography<br />Short Video Production</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-5 col-xxl-5" data-aos="fade-up" data-aos-once="true" id="exp">
                        <h2 id="expHeading"><strong>Experience</strong></h2>
                        <div class="accordion" role="tablist" id="accordion-exp">
                            <div class="accordion-item" id="2022">
                                <h2 class="accordion-header" role="tab"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion-exp .item-1" aria-expanded="true" aria-controls="accordion-exp .item-1">2022</button></h2>
                                <div class="accordion-collapse collapse show item-1" role="tabpanel" data-bs-parent="#accordion-exp">
                                    <div class="accordion-body">
                                        <p class="mb-0">Swivel Software Limited<br />‣ Software Engineer <br />‣‣ User Interface Design and Web System Development<br /><br /></p>
                                        <p class="mb-0">Start photo &amp; 3D artworks on Unsplash platforms<br /><br /></p>
                                        <p class="mb-0">Articles Writer on Medium<br /><br /></p>
                                        <p class="mb-0">Apple App Developer (iOS, watchOS, iPadOS, macOS)<br /></p>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item" id="2021">
                                <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-exp .item-2" aria-expanded="false" aria-controls="accordion-exp .item-2">2020 - 2021</button></h2>
                                <div class="accordion-collapse collapse item-2" role="tabpanel" data-bs-parent="#accordion-exp">
                                    <div class="accordion-body">
                                        <p class="mb-0">Swivel Software Limited<br />‣ Software Engineer ‣ User Interface Design and Web System Development<br /><br />Alpha Fund Solutions&nbsp;Limited<br />‣&nbsp;I.T. Support Staff&nbsp;‣ Survey &amp; Data Processing System Development<br /><br />Articles Writer on Medium<br /><br />Apple App Developer (iOS, watchOS, iPadOS, macOS)<br /><br />The Hong Kong Polytechnic University<br />‣ Student Assistant (PT)&nbsp;‣ Data analytics and visualisation<br />‣ Student Developer&nbsp;‣ Participate in Artificial Intelligence (A.I.) and Natural Language Processing (N.L.P) research field<br />‣ Student Assistant (PT)&nbsp;‣ Develop website &amp; design booklet for College's Language Scolar Program<br /></p>
                                        <p class="mb-0"><br />Volunteer Works:<br /><span id="atlassian">- Atlassian, Australia -- As a Translator (Chinese, Korean) language of the BitBucket.org Team</span><br /><span id="tmg">- Tokyo Metropolitan Government, Japan -- As a CHT Translator of the StopCovid19Tokyo Team with Code of Japan</span><br /></p>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item" id="2019">
                                <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-exp .item-3" aria-expanded="false" aria-controls="accordion-exp .item-3">2019</button></h2>
                                <div class="accordion-collapse collapse item-3" role="tabpanel" data-bs-parent="#accordion-exp">
                                    <div class="accordion-body">
                                        <p class="mb-0">Start Freelance works on different platforms (Adobe Stock, Behance, Dribbble)<br /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 id="awardsHeading">Awards</h2>
                        <img class="img-fluid" id="wwdc21Winner" src="assets/img/WWDC21Winner.png?h=635e76ae457bd315d787163181b80dd7" />
                    </div>
                    <div class="col-xl-7 col-xxl-7" data-aos="fade-up" data-aos-once="true" id="skillsLang">
                        <h2 id="skillsLangHeading">Skills &amp; Languages</h2>
                        <div id="skills">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Softwares*</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Adobe Creative Cloud</td>
                                            <td>Apple Xcode</td>
                                            <td>Microsoft Office</td>
                                        </tr>
                                        <tr>
                                            <td>Adobe XD</td>
                                            <td>Apple Keynote</td>
                                            <td>Google Worksuite</td>
                                        </tr>
                                        <tr>
                                            <td>Adobe Dimension</td>
                                            <td>Apple Pages</td>
                                            <td>PowerBI</td>
                                        </tr>
                                        <tr>
                                            <td>Adobe Photoshop</td>
                                            <td>Final Cut Pro</td>
                                            <td>Motion</td>
                                        </tr>
                                        <tr>
                                            <td>Adobe Premiere Pro</td>
                                            <td>Figma</td>
                                            <td>Sketch</td>
                                        </tr>
                                        <tr>
                                            <td>Adobe Lightroom</td>
                                            <td>Framer</td>
                                            <td>Microsoft SQL Server</td>
                                        </tr>
                                        <tr>
                                            <td>Adobe Dreamweaver</td>
                                            <td>Unity Engine</td>
                                            <td>MySQLWorkbench</td>
                                        </tr>
                                        <tr>
                                            <td>C4D</td>
                                            <td>Shapr3D</td>
                                            <td>Table Plus</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Programming Languages*</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>JS</td>
                                            <td>Vue</td>
                                            <td>VuetifyJS</td>
                                            <td>NuxtJS</td>
                                        </tr>
                                        <tr>
                                            <td>CSS</td>
                                            <td>Bootstrap 5</td>
                                            <td>TailwindCSS</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Swift</td>
                                            <td>SwiftUI</td>
                                            <td>CoreData</td>
                                            <td>CloudKit</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p id="skillsRemark">*Random sort - does not mean the order of proficient level</p>
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
                                            <td>Cantonese (Chinese Traditional)</td>
                                            <td>Korean (Passed the Test of Proficiency in Korean in 2018)</td>
                                            <td>Japanese</td>
                                        </tr>
                                        <tr>
                                            <td>English (the United Kingdom, United States of America)</td>
                                            <td>Mandarin&nbsp;(Chinese Simplified)</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" id="proj">
            <div class="container" id="projContainer">
                <h1 id="projHeading"><strong>Recent Projects</strong></h1>
                <div class="d-flex align-items-center" id="projDiv">
                    <div class="card" id="projCard">
                        <div class="card-body" id="mlType">
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Upcoming in 2022 Q2</h6>
                            <h4 class="card-title">CoreML Collection</h4>
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Mobile Pre-trained models - Machine Learning</h6>
                            <p class="card-text" id="cardPara"><span id="firstChar">A</span>pple CoreML models collection, which is ready to use and deploy.</p>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-5" checked disabled /><label class="form-check-label" for="formCheck-5">Free Usage</label></div>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-6" checked disabled /><label class="form-check-label" for="formCheck-6">Open Source</label></div><a class="card-link" href="#">Preview&nbsp;<i class="fas fa-external-link-alt"></i></a><a class="card-link" href="#">Github&nbsp;<i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <div class="card" id="projCard">
                        <div class="card-body">
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Published in 2022 Q1</h6>
                            <h4 class="card-title">Return YouTube Dislike</h4>
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Quality Rating before watch - Safari Extension</h6>
                            <p class="card-text" id="cardPara"><span id="firstChar">W</span>aste less time on the content farm and untrustful content.<br /></p>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-9" checked disabled /><label class="form-check-label" for="formCheck-9">Free Usage</label></div>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-10" checked disabled /><label class="form-check-label" for="formCheck-10">Open Source</label></div><a class="card-link" href="http://localhost:3000/api/dlRYDmac" target="_blank">Install&nbsp;<i class="fas fa-cloud-download-alt"></i></a><a class="card-link" href="https://github.com/1998code/return-youtube-dislike/tree/main/Extensions/SafariApp">Github&nbsp;<i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <div class="card" id="projCard">
                        <div class="card-body" id="mlType">
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Published in 2022 Q1</h6>
                            <h4 class="card-title">Baby Name Generator</h4>
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Natural Language Processing - Deep ML</h6>
                            <p class="card-text" id="cardPara"><span id="firstChar">A</span>user-friendly application that suggests to parents their baby's name.</p>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-1" checked disabled /><label class="form-check-label" for="formCheck-1">Free Usage</label></div>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-2" checked disabled /><label class="form-check-label" for="formCheck-2">Open Source</label></div><a class="card-link" href="#">Preview&nbsp;<i class="fas fa-external-link-alt"></i></a><a class="card-link" href="#">Github&nbsp;<i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <div class="card" id="projCard">
                        <div class="card-body">
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Published in 2020 Q2</h6>
                            <h4 class="card-title">Bootstrap Themes</h4>
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Pre-made framework templates for developers</h6>
                            <p class="card-text" id="cardPara"><span id="firstChar">V</span>arious modern web templates are ready to use for training purposes.<br /></p>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-3" checked disabled /><label class="form-check-label" for="formCheck-3">Free Usage</label></div>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-4" checked disabled /><label class="form-check-label" for="formCheck-4">Open Source</label></div><a class="card-link" href="#">Preview&nbsp;<i class="fas fa-external-link-alt"></i></a><a class="card-link" href="#">Github&nbsp;<i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    {/* repeat */}
                    <div class="card" id="projCard">
                        <div class="card-body" id="mlType">
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Upcoming in 2022 Q2</h6>
                            <h4 class="card-title">CoreML Collection</h4>
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Mobile Pre-trained models - Machine Learning</h6>
                            <p class="card-text" id="cardPara"><span id="firstChar">A</span>pple CoreML models collection, which is ready to use and deploy.</p>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-5" checked disabled /><label class="form-check-label" for="formCheck-5">Free Usage</label></div>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-6" checked disabled /><label class="form-check-label" for="formCheck-6">Open Source</label></div><a class="card-link" href="#">Preview&nbsp;<i class="fas fa-external-link-alt"></i></a><a class="card-link" href="#">Github&nbsp;<i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <div class="card" id="projCard">
                        <div class="card-body">
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Published in 2022 Q1</h6>
                            <h4 class="card-title">Return YouTube Dislike</h4>
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Quality Rating before watch - Safari Extension</h6>
                            <p class="card-text" id="cardPara"><span id="firstChar">W</span>aste less time on the content farm and untrustful content.<br /></p>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-9" checked disabled /><label class="form-check-label" for="formCheck-9">Free Usage</label></div>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-10" checked disabled /><label class="form-check-label" for="formCheck-10">Open Source</label></div><a class="card-link" href="http://localhost:3000/api/dlRYDmac" target="_blank">Install&nbsp;<i class="fas fa-cloud-download-alt"></i></a><a class="card-link" href="https://github.com/1998code/return-youtube-dislike/tree/main/Extensions/SafariApp">Github&nbsp;<i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <div class="card" id="projCard">
                        <div class="card-body" id="mlType">
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Published in 2022 Q1</h6>
                            <h4 class="card-title">Baby Name Generator</h4>
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Natural Language Processing - Deep ML</h6>
                            <p class="card-text" id="cardPara"><span id="firstChar">A</span>user-friendly application that suggests to parents their baby's name.</p>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-1" checked disabled /><label class="form-check-label" for="formCheck-1">Free Usage</label></div>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-2" checked disabled /><label class="form-check-label" for="formCheck-2">Open Source</label></div><a class="card-link" href="#">Preview&nbsp;<i class="fas fa-external-link-alt"></i></a><a class="card-link" href="#">Github&nbsp;<i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    <div class="card" id="projCard">
                        <div class="card-body">
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Published in 2020 Q2</h6>
                            <h4 class="card-title">Bootstrap Themes</h4>
                            <h6 class="text-muted card-subtitle mb-2 smallHeading">Pre-made framework templates for developers</h6>
                            <p class="card-text" id="cardPara"><span id="firstChar">V</span>arious modern web templates are ready to use for training purposes.<br /></p>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-3" checked disabled /><label class="form-check-label" for="formCheck-3">Free Usage</label></div>
                            <div class="form-check d-xxl-flex align-items-xxl-start smallHeading"><input class="form-check-input" type="checkbox" id="formCheck-4" checked disabled /><label class="form-check-label" for="formCheck-4">Open Source</label></div><a class="card-link" href="#">Preview&nbsp;<i class="fas fa-external-link-alt"></i></a><a class="card-link" href="#">Github&nbsp;<i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" id="faq">
            <div class="container" id="faqContainer">
                <h1 id="faqHeading"><strong>Question and Answering</strong></h1>
                <div class="accordion" role="tablist" id="accordion-qa">
                    <div class="accordion-item">
                        <h2 class="accordion-header" role="tab"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion-qa .item-1" aria-expanded="true" aria-controls="accordion-qa .item-1">[Support]&nbsp;How to support your projects?</button></h2>
                        <div class="accordion-collapse collapse show item-1" role="tabpanel" data-bs-parent="#accordion-qa">
                            <div class="accordion-body">
                                <p class="text-truncate mb-0"><i class="fab fa-github"></i>&nbsp;Github for sponsor:&nbsp;<a href="https://github.com/sponsors/1998code" target="_blank"><span>https://github.com/sponsors/1998code</span></a><br /><br /><i class="fab fa-google"></i>&nbsp;Google Ads:<br /><br />
                                <div dangerouslySetInnerHTML={{ __html: ads }}></div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-qa .item-2" aria-expanded="false" aria-controls="accordion-qa .item-2">[OSS] Where do your Open Source works hosts?</button></h2>
                        <div class="accordion-collapse collapse item-2" role="tabpanel" data-bs-parent="#accordion-qa">
                            <div class="accordion-body">
                                <p class="mb-0">Github: <a href="https://github.com/1998code">https://github.com/1998code&nbsp;</a><i class="fas fa-external-link-alt" id="externalLink"></i><br />Vercel:&nbsp;<a href="https://vercel.com/?utm_source=1998code&amp;utm_campaign=oss">https://vercel.com</a>&nbsp;<i class="fas fa-external-link-alt" id="externalLink"></i></p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-qa .item-3" aria-expanded="false" aria-controls="accordion-qa .item-3">[Job] How to contact you?</button></h2>
                        <div class="accordion-collapse collapse item-3" role="tabpanel" data-bs-parent="#accordion-qa">
                            <div class="accordion-body">
                                <p class="mb-0">Please contact by email: <a href="mailto:job@1998.media">job@1998.media</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-qa .item-4" aria-expanded="false" aria-controls="accordion-qa .item-4">[ML] Wanna chat with my A.I. bot?</button></h2>
                        <div class="accordion-collapse collapse item-4" role="tabpanel" data-bs-parent="#accordion-qa">
                            <div class="accordion-body">
                                <p class="mb-0">Open&nbsp;<a href="https://console.dialogflow.com/api-client/demo/embedded/7588efa8-1c68-497c-819e-3d1dfef8f164" target="_blank">Google Dialogflow</a>&nbsp;<i class="fas fa-external-link-alt" id="externalLink"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" id="contact">
          <div class="container" id="contactContainer">
            <div class="row">
                <div class="col-sm-6 col-lg-5 col-xxl-4 d-sm-flex d-xxl-flex flex-column justify-content-sm-center align-items-sm-start justify-content-md-center align-items-md-start justify-content-lg-center align-items-lg-start justify-content-xl-center align-items-xl-start justify-content-xxl-center align-items-xxl-start">
                    <h3 class="d-md-flex d-lg-flex d-xl-flex d-xxl-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start justify-content-xxl-center align-items-xxl-start"><span id="contactSpan"><strong>Contact</strong><br /></span><br />Email: <a href="mailto:contact@1998.media" target="_blank">contact@1998.media</a><br /><br />iMessage:<br /></h3>
                    <div id="contactDiv" class="apple-business-chat-banner-container" data-apple-business-id="0b908b93-eb72-4f51-a8de-55d1d58d5301" data-apple-icon-title="Any questions? I am here to help." data-apple-banner-context="Chat with me via iMessage. Available for iPhone / iPad / Mac user." data-apple-business-intent-id="15672e94-a30a-42c0-bf8b-b2a79a99417e" data-apple-banner-background-color="rgba(0,0,0,0.25)" data-apple-banner-cta="Questions? I can help." data-apple-banner-text-color="rgb(255, 255, 255)"></div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-7 col-xl-7 col-xxl-8 text-truncate text-center d-xxl-flex justify-content-xxl-end">
                    <img class="img-fluid" id="mapImage" src="https://snapshot.apple-mapkit.com/api/v1/snapshot?center=22.34501591896432%2C114.17990720272064&t=standard&scale=1&spn=0.3175427580212222%2C0.34332275390625&size=500x500&lang=en-US&poi=0&annotations=%5B%7B%22point%22%3A%2222.428117752075195%2C114.208251953125%22%2C%22markerStyle%22%3A%22large%22%2C%22color%22%3A%22006d8f%22%2C%22glyphText%22%3A%22S%22%7D%2C%7B%22point%22%3A%2222.30408477783203%2C114.17972564697266%22%2C%22markerStyle%22%3A%22balloon%22%2C%22color%22%3A%22b92d5d%22%2C%22glyphText%22%3A%22P%22%7D%2C%7B%22point%22%3A%2222.336124420166016%2C114.1732177734375%22%2C%22markerStyle%22%3A%22balloon%22%2C%22color%22%3A%22e63b7a%22%2C%22glyphText%22%3A%22C%22%7D%5D&referer=https%3A%2F%2F1998.media&teamId=9PAHLTG8AD&keyId=FD3N2TP9F5&signature=cMUpsMslTgOfgVbufj4CT7TW9VSEuehcyixCs0nOAJTaX-Ol_nsFN7bmD1o3S_BwXDzbTbn2fhLlzk4utsY3Hw" />
                </div>
            </div>
          </div>
        </section>

        <div data-aos="fade" data-aos-once="true" class="brands">
          <div class="container d-flex justify-content-center align-items-center justify-content-md-center justify-content-lg-center justify-content-xl-center">
            <p class="d-none d-sm-inline d-md-inline d-lg-inline d-xl-inline d-xxl-inline" id="thanks"><strong>Special thanks to:</strong></p><a id="vercel" href="https://vercel.com/?utm_source=1998code&amp;utm_campaign=oss" target="_blank"><img id="vercelImage" src="assets/img/powered-by-vercel.svg?h=91084ef203023a391277bb16f564cc4f" /></a><a id="betterUptime" href="https://betteruptime.com/?ref=i41" target="_blank"><img id="butImage" src="assets/img/betteruptime-light.png?h=ff4472a36a4efb3c1919010865406953" /></a>
          </div>
        </div>

        <footer data-aos="fade" data-aos-once="true" class="footer-basic">
          <div class="social"><a href="https://dribbble.com/1998design" target="_blank"><i class="fab fa-dribbble"></i></a><a href="https://behance.net/1998design" target="_blank"><i class="fab fa-behance"></i></a><a href="https://1998design.medium.com" target="_blank"><i class="fab fa-medium-m"></i></a><a href="https://twitter.com/1998design" target="_blank"><i class="fab fa-twitter"></i></a><a href="https://github.com/1998code" target="_blank"><i class="fab fa-github"></i></a></div>
          <p class="copyright">
            Made with&nbsp;♥&nbsp;by MING.
            <br />
            <small>Ver. 22.3.13 | Since 2020</small>
          </p>
        </footer><a id="topArrow" class="cd-top js-cd-top cd-top--fade-out cd-top--show" href="#0">Top</a>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="assets/js/bs-init.js?h=02a8f8d0119ea38ce4670281c1438789"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
        <Script src="https://static.cdn-apple.com/businesschat/start-chat-button/2/index.js" strategy="lazyOnload" />
        <Script src="assets/js/backTop.js?h=25fe335c21086050d7d683aa1d563dd6" />
      </body>
    </div>
  )
}
