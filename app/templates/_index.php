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
        <!-- process:[href]:build <?=$app->getBaseUrl()?>styles/ -->
        <!-- build:css styles/vendor.css -->
        <!-- bower:css -->
        <!-- endbower -->
        <!-- endbuild -->
        <!-- build:css(.tmp) /styles/main.css -->
        <link rel="stylesheet" href="<?php $app->getBaseUrl()?>../.tmp/styles/main.css">
        <!-- endbuild -->
        <!-- /process -->
        <!-- process:[src]:build <?=$app->getBaseUrl()?>/scripts/vendor/ -->
        <!-- build:js scripts/vendor/modernizr.js -->
            <script src="<?php $app->getBaseUrl()?>../bower_components/modernizr/modernizr.js"></script>
        <!-- endbuild -->
        <!-- /process -->
    </head>
    <body>
    <!--[if lt IE 10]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

   <header></header>

    <section id="<?php echo $page; ?>"><?php $app->getPagina(); ?></section>

    <footer></footer>

    <!-- process:[src]:build <?=$app->getBaseUrl()?>scripts/ -->
       <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:js scripts/main.js -->
    <!-- fileblock:js app -->
    <script src="scripts/main.js"></script>
    <!-- endfileblock -->
    <!-- endbuild -->
    <!-- /process -->

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
