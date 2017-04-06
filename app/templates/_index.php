<!doctype html>
<?php
    require_once 'classes/App.php';
    $app = new App();
    $param = $app->isHome();
    $page = (count($param) > 1) ? $param[count($param)-1] : 'home';
?>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <title><%= site_name %></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link rel="shortcut icon" href="/favicon.ico">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- fileblock:css css -->
        <!-- endfileblock -->
        <!-- process:remove:build -->
        <!-- build:css styles/vendor.css -->
        <!-- bower:css -->
        
        <!-- endbower -->
        <!-- endbuild -->
        <link rel="stylesheet" href="<?php $app->getBaseUrl()?>styles/main.css">
        <!-- /process -->
    </head>
    <body>

    <header id="main-header">
        <div class="container">
            <h1 class="logo">
                <a href="javascript:;" class="logo__link"><%= site_name %></a>
            </h1>
            <a href="javascript:;" class="bt-menu-mobile">
                Abrir menu
                <span class="bt-menu-mobile__line --top"></span>
                <span class="bt-menu-mobile__line --middle"></span>
                <span class="bt-menu-mobile__line --bottom"></span>
            </a>
            <div id="menu">
                <nav class="main-menu">
                    <a href="javascript:;" class="main-menu__link">Link menu</a>
                </nav>
                <nav class="social-media">
                    <a class="social-media__link" href="https://www.facebook.com/" aria-label="Facebook" target="_blank">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a class="social-media__link" href="https://www.youtube.com/" aria-label="Youtube" target="_blank">
                        <i class="fa fa-youtube-play" aria-hidden="true"></i>
                    </a>
                    <a class="social-media__link" href="https://www.instagram.com/" aria-label="Instagram" target="_blank">
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                </nav>
            </div>
        </div>
    </header>
    <div class="bg-menu-mobile"></div>

    <?php $app->getPagina(); ?>

    <footer></footer>

    <!-- process:remove:build  -->
    <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
   
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:js scripts/main.js -->
    <!-- fileblock:js app -->
    
    <!-- endfileblock -->
    <!-- endbuild -->
    <!-- /process -->

    <!-- fileblock:js js -->
    <!-- endfileblock -->

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','UA-XXXXX-X');ga('send','pageview');
    </script>
</body>
</html>
