<!doctype html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- ************** Bootstrap 5.1 ****************-->
  <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
  <!-- *************** Custom Style ****************-->
  <link href="css/theCRMStyle.css" rel="stylesheet" type="text/css">

  <title>Company Directory</title>
  <link rel="shortcut icon" type="image/png" href="favicon.ico">

</head>

<body>

  <!----------- navigation bar rendered via JS  -------------------------------------->
  <div id="navBarRender" class="container-fluid"></div>

  <!----------- main content rendered via JS  ----------------------------------------->
  <!-- JavaScript will render content for Mobile or Desktop based on width of screen -->
  <div class="container-fluid mTop">
    <div class="row">
      <div class="col-8 g-0" id="directoryData"></div>
      <div class="col-4 g-0" id="previewData"></div>
    </div>
  </div>
  <!------- modal providing confirmation of C-UD actions ------------------------------>
  <div id="confirmModal"></div>

  <!--///////////////////// JavaScript \\\\\\\\\\\\\\\\\ -->
  <!-- // Font awesome internal lib stored on server \\\ -->
  <script src="fontawesome/js/all.min.js" crossorigin="anonymous"></script>
  <script src="js/jquery-3.6.0.min.js" type="text/javascript"></script>
  <script src="js/bootstrap.bundle.min.js" type="text/javascript"></script>
  <!-- //////////// Custom JS File \\\\\\\\\\\\\\\\\\\\\ -->
  <script src="js/theCRMScript.js" type="text/javascript"></script>

</body>

</html>