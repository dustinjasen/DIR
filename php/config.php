
<?php
	
 	$cd_host = "127.0.0.1";
	$cd_port = 3306;
	$cd_socket = "";

	// database name, username and password for live site

	$cd_dbname = "u897195989_companydir";
	$cd_user = "u897195989_DirLogin";
	$cd_password = "DirPassword2021";

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	// connection details for MySQL database == local development 

	// database name, username and password == local

	// $cd_dbname = "companydirectory";
	// $cd_user = "companydirectory";
	// $cd_password = "companydirectory";
	

?>
