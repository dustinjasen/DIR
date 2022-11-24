/////////////\\\\\\\\\\\\\\
//////Render home page\\\\\\
//////\\\\\\\\\\\\\\\\\\\\\\\

allResults();

/////////////////////////////////////////////////////\\\\\\\\\
//////// populate departments ////////////\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function populateDeptOptions() {
  $.ajax({
    url: "./php/getAllDepartments.php",
    dataType: "json",
    success: function (result) {
      var data = result;

      var deptDropdownNewUser = $("#selectDept");
      deptDropdownNewUser.empty();

      var deptDropdownNewUserDesktop = $("#selectDeptD");
      deptDropdownNewUserDesktop.empty();

      var deptDropdownEditUser = $("#editDept");
      deptDropdownEditUser.empty();

      var deptDropdownEditUserDesktop = $("#editDeptDesktop");
      deptDropdownEditUserDesktop.empty();

      $.each(data, function (key, value) {
        deptDropdownNewUser.append(
          $("<option value=" + value.id + ">" + value.name + "</option>")
        );
        deptDropdownEditUser.append(
          $("<option value=" + value.id + ">" + value.name + "</option>")
        );
        deptDropdownEditUserDesktop.append(
          $("<option value=" + value.id + ">" + value.name + "</option>")
        );
        deptDropdownNewUserDesktop.append(
          $("<option value=" + value.id + ">" + value.name + "</option>")
        );
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        ":" +
          textStatus +
          " : " +
          errorThrown +
          " || Please press F12 to access Network Log for further info"
      );
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// populate by Location linked with dept \\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function populateLocationforDeptOptions(deptLocationID) {
  $.ajax({
    url: "./php/getAllLocations.php",
    dataType: "json",
    success: function (result) {
      var data = result;

      var locationNewDept = $("#editLocationNewDept");
      locationNewDept.empty();

      var editDepartmentLocation = $("#editDepartmentLocation");
      editDepartmentLocation.empty();

      $.each(data, function (key, value) {
        locationNewDept.append(
          $("<option value=" + value.id + ">" + value.name + "</option>")
        );
        editDepartmentLocation.append(
          $("<option value=" + value.id + ">" + value.name + "</option>")
        );
      });

      $("#editDepartmentLocation").val(deptLocationID);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        ":" +
          textStatus +
          " : " +
          errorThrown +
          " || getAllLocations error"
      );
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// populate main screen with all data  \\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function allResults() {
  $.ajax({
    url: "./php/getAll.php",
    dataType: "json",
    type: "POST",
    success: function (result) {
      $("#allDataTable").html("");

      var allData = result["data"];
      var pID, firstName, lastName, dept, location, eMail, dID, lID;

      if ($(document).width() > 990) {
        //Table Data Panel

        let navBarStart =
          '<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark fixed-top">';
        let divOne = '<div class="container-fluid">';
        let logo =
          '<a class="navbar-brand font-monospace navLogo" href="./">dir</a>';
        let divTwo = '<div class="navbar-nav" id="navbarSupportedContent">';
        let iconsDiv = '<div class="ms-auto">';
        let iconThree =
          '<a class="iconsTop" id="addUserDesktopPanel"><i class="fas fa-user-plus"></i></a>';
        let iconFour =
          '<a class="iconsTop" id="deptAdminPanel"><i class="fas fa-users-cog"></i></a>';
        let iconFive =
          '<a class="iconsTop" id="locationAdminPanel"><i class="fas fa-map-marker-alt"></i></a>';
        let iconsDivExit = "</div>";
        let divTwoExit = "</div>";
        let divOneExit = "</div>";
        let navBarExit = "</nav>";

        $("#navBarRender").html(
          navBarStart +
            divOne +
            logo +
            divTwo +
            iconsDiv +
            iconThree +
            iconFour +
            iconFive +
            iconsDivExit +
            divTwoExit +
            divOneExit +
            navBarExit
        );

        let tableStart =
          '<table id="allDataTable" class="table table-striped table-hover">';

        let tHeadStart = "<thead><tr class='noStyle'>";

        let tHead1 =
          '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(2)"></i><input onkeyup="searchFirst()" id="searchFirst" class="form-control colSearch" type="text" placeholder="First"></th>';
        let tHead2 =
          '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(3)"></i><input onkeyup="searchLast()" id="searchLast" class="form-control colSearch" type="text" placeholder="Surname"></th>';
        let tHead3 =
          '<th scope="col" class="col"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(4)"></i><input onkeyup="searchDept()" id="searchDept" class="form-control colSearch" type="text" placeholder="Department"></th>';
        let tHead4 =
          '<th scope="col" class="col"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(5)"></i><input onkeyup="searchLoc()" id="searchLoc" class="form-control colSearch" type="text" placeholder="Location"></th>';
        let tHead5 =
          '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(6)"></i><input onkeyup="searchEmail()" id="searchEmail" class="form-control colSearch" type="text" placeholder="Email"></th>';

        let tHeadEnd = "</tr></thead>";

        let tBody = "<tbody id='mainTable'></tbody>";

        let tableEnd = "</table>";

        $("#directoryData").html(
          tableStart +
            tHeadStart +
            tHead1 +
            tHead2 +
            tHead3 +
            tHead4 +
            tHead5 +
            tHeadEnd +
            tBody +
            tableEnd
        );

        //Loops Start to populate tables in either Desktop or Mobile

        for (var i = 0; i < allData.length; i++) {
          let pID = allData[i]["id"];
          let firstName = allData[i]["firstName"];
          let lastName = allData[i]["lastName"];
          let dept = allData[i]["department"];
          let location = allData[i]["location"];
          let eMail = allData[i]["email"];
          let dID = allData[i]["departmentID"];
          let lID = allData[i]["locationID"];

          //Table structure in variables

          let trStart = "<tr class='clickRow'>";
          let col1 = "<td class='d-none pID' id='userID'>" + pID + "</td>";
          let col2 = "<td class='d-none dID'>" + dID + "</td>";
          let col3 = "<td scope='row' class='fName'>" + firstName + "</td>";
          let col4 = "<td scope='row' class='lName'>" + lastName + "</td>";
          let col5 = "<td scope='row' class='deptName'>" + dept + "</td>";
          let col6 =
            "<td scope='row' class='locationName'>" + location + "</td>";
          let col7 =
            "<td scope='row' class='eAddress'><a style='color: #D03800;' href='mailto:" +
            eMail +
            "'>" +
            eMail +
            "</a></td>";
          let col8 = "<td class='d-none lID'>" + lID + "</td>";
          let trEnd = "</tr>";

          $("#mainTable").append(
            trStart +
              col1 +
              col2 +
              col3 +
              col4 +
              col5 +
              col6 +
              col7 +
              col8 +
              trEnd
          );
        }
      } else {
        $("#previewData").html("");
        $("#directoryData").removeClass("col-8");
        $("#previewData").removeClass("col-4");

        //Top Nav
        let navBarStartTop =
          '<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark fixed-top">';
        let divOneTop = '<div class="container-fluid">';
        let logoTop =
          '<a class="navbar-brand font-monospace navLogo" href="./">dir</a>';
        let divOneExitTop = "</div>";
        let navBarExitTop = "</nav>";

        //Bottom Nav
        let navBarStart =
          '<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark fixed-bottom">';
        let divOne = '<div class="container-fluid">';
        let divTwo = '<div class="navbar-nav" id="navbarSupportedContent">';
        let iconsDiv = '<div id="bottomNav" class="">';
        let iconThree =
          '<a class="iconsBottom" id="addUserDesktopPanel"><i class="fas fa-user-plus"></i></a>';
        let iconFour =
          '<a class="iconsBottom" id="deptAdminPanel"><i class="fas fa-users-cog"></i></a>';
        let iconFive =
          '<a class="iconsBottom" id="locationAdminPanel"><i class="fas fa-map-marker-alt"></i></a>';
        let searchBarMobile =
          '<input type="search" id="mobileSearch" onkeyup="mobileAllSearch()" placeholder="Search..." class="form-control search-input" data-table="mobileDirectory">';
        let iconsDivExit = "</div>";

        let divTwoExit = "</div>";
        let divOneExit = "</div>";
        let navBarExit = "</nav>";

        $("#navBarRender").html(
          navBarStartTop +
            divOneTop +
            logoTop +
            divOneExitTop +
            navBarExitTop +
            navBarStart +
            divOne +
            divTwo +
            iconsDiv +
            iconThree +
            iconFour +
            iconFive +
            searchBarMobile +
            iconsDivExit +
            divTwoExit +
            divOneExit +
            navBarExit
        );

        let tableStart =
          '<table id="allDataTable" class="table table-striped table-hover mobileDirectory">';

        let tBody = "<tbody id='mainTable'></tbody>";

        let tableEnd = "</table>";

        $("#directoryData").html(tableStart + tBody + tableEnd);

        for (var j = 0; j < allData.length; j++) {
          let pID = allData[j]["id"];
          let firstName = allData[j]["firstName"];
          let lastName = allData[j]["lastName"];
          let dept = allData[j]["department"];
          let location = allData[j]["location"];
          let eMail = allData[j]["email"];
          let dID = allData[j]["departmentID"];
          let lID = allData[j]["locationID"];
          //Table structure in variables

          let trStart = "<tr class='clickRow mobileRows'>";
          //col1 - col5 are hidden and included for data use only
          let col1 = "<td class='d-none pID'>" + pID + "</td>";
          let col2 = "<td class='d-none dID'>" + dID + "</td>";
          let col3 = "<td class='d-none lID'>" + lID + "</td>";
          let col4 = "<td class='locationName d-none'>" + location + "</td>";
          let col5 = "<td class='deptName d-none'>" + dept + "</td>";
          let col6 = "<td scope='row' class='fName'>" + firstName + "</td>";
          let col7 = "<td scope='row' class='lName'>" + lastName + "</td>";
          let col8 =
            "<td scope='row'><a style='color: #D03800;' href='mailto:" +
            eMail +
            "'><i class='far fa-envelope'></i></a></td>";

          let col9 = "<td class='d-none eAddress'>" + eMail + "</td>";

          let trEnd = "</tr>";

          $("#mainTable").append(
            trStart +
              col1 +
              col2 +
              col3 +
              col4 +
              col5 +
              col6 +
              col7 +
              col8 +
              col9 +
              trEnd
          );
        }
      }

      // Make rows clickable to show preview and populate edit modal
      $(".clickRow").click(function () {
        var row = $(this).closest("tr");
        var previewID = row.find(".pID").text();
        getUserByID(previewID);
      });

      // Add User Admin Panel

      $("#addUserDesktopPanel").click(function () {
        // New User Form in Desktop

        let heading =
          '<div class="createContactHeader">Create Contact<button class="btn exitButton float-end" onClick="cancelButton()"><i class="fas fa-share-square"></i></button></div>';

        let newUserFormStart =
          '<form autocomplete="off" id="createProfileDesktop" name="createProfileDesktop" method="post">';

        let newFirstNameDiv =
          '<div class="mb-3 form-group"><label for="newFirstName" class="labels">First name</label><input type="text" class="form-control" id="newFirstNameD" name="newFirstName" placeholder="First name" required><div class="col-sm-5 messages"></div></div>';
        let newLastNameDiv =
          '<div class="mb-3 form-group"><label for="newLastName" class="labels">Last name</label><input type="text" class="form-control" id="newLastNameD" name="newLastName" placeholder="Second name" required><div class="col-sm-5 messages"></div></div>';
        let newEmailDiv =
          '<div class="mb-3 form-group"><label for="newEmailAddress" class="labels">Email address</label><input type="email" class="form-control" id="newEmailAddressD" placeholder="name@email.com" name="newEmailAddress" required><div class="col-sm-5 messages"></div></div>';
        let newDeptDiv =
          '<div class="mb-3 form-group"><label for="selectDeptD" class="labels">Department</label><select class="form-select" aria-label="linkDepartmentSelect" name="selectDeptD" id="selectDeptD" required></select><div class="col-sm-5 messages"></div></div>';

        let cancelNewUser =
          '<button type="button" class="btn cancelButton" onClick="cancelButton()" data-bs-dismiss="modal">Cancel</button>';
        let saveNewUser =
          '<button type="submit" class="btn saveButton">Create</button>';

        let newUserFormEnd = "</form>";

        if ($(document).width() > 990) {
          $("#previewData").html("");
          $("#previewData").html(
            heading +
              newUserFormStart +
              newFirstNameDiv +
              newLastNameDiv +
              newEmailDiv +
              newDeptDiv +
              saveNewUser +
              cancelNewUser +
              newUserFormEnd
          );

          populateDeptOptions();
        } else {
          $("#previewData").html("");
          $("#directoryData").removeClass("col-8");
          $("#previewData").removeClass("col-4");
          $("#previewData").addClass("col-10");

          $("#previewData").html(
            heading +
              newUserFormStart +
              newFirstNameDiv +
              newLastNameDiv +
              newEmailDiv +
              newDeptDiv +
              saveNewUser +
              cancelNewUser +
              newUserFormEnd
          );
          populateDeptOptions();
        }

        $("#createProfileDesktop").submit(function (e) {
          e.preventDefault();
          var firstName = $("#newFirstNameD").val();
          var lastName = $("#newLastNameD").val();
          var email = $("#newEmailAddressD").val();
          var departmentId = $("#selectDeptD").val();
          insertProfile(firstName, lastName, email, departmentId);
        });
      });

      //Location Admin Panel

      $("#locationAdminPanel").click(function () {
        $("#previewData").html("");

        if ($(document).width() > 990) {
          allLocationsTable();
        } else {
          $("#directoryData").removeClass("col-8");
          $("#previewData").removeClass("col-4");
          $("#previewData").addClass("col-10");

          allLocationsTable();
        }
      });

      //Department Admin Panel

      $("#deptAdminPanel").click(function () {
        $("#previewData").html("");

        if ($(document).width() > 990) {
          allDeptTable();
        } else {
          $("#previewData").html("");
          $("#directoryData").removeClass("col-8");
          $("#previewData").removeClass("col-4");
          $("#previewData").addClass("col-10");
          //Add location button
          allDeptTable();
        }
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        ":" +
          textStatus +
          " : " +
          errorThrown +
          " || full data function error"
      );
    },
  });
}

/**************************************************************/
//********** Start OF USER FUNCTIONS *************************/
///**********************************************************/

/////////////////////////////////////////////////////\\\\\\\\\
//////// fetch user data & render screen  \\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function getUserByID(previewID) {
  $.ajax({
    url: "./php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: previewID,
    },

    success: function (result) {
      var userData = result.data.personnel;
      var deptOptionData = result.data.department;

      var previewUserID = userData["0"].id;
      var previewFirstName = userData["0"].firstName;
      var previewLastName = userData["0"].lastName;
      var previewEmail = userData["0"].email;
      var previewDeptID = userData["0"].departmentID;

      $("#previewData").html("");

      //Desktop Edit User Form Creation on clicking row in table
      let heading =
        '<div class="createContactHeader">Edit Contact<button class="btn deleteButton float-end" id="deleteProfilebtn"><i class="far fa-trash-alt"></i></button></div>';
      let editFormStart = '<form id="editUserForm" method="post">';

      let editIDDesktop =
        '<div class="mb-3 d-none" id="userEditIDDesktop">' +
        previewUserID +
        "</div>";
      let editFirstNameDiv =
        '<div class="mb-3 form-group"><label for="editFirstNameDesktop" class="labels">Edit First Name</label><input type="text" class="form-control" id="editFirstNameDesktop" name="editFirstNameDesktop" placeholder="" value="' +
        previewFirstName +
        '" required><div class="col-sm-5 messages"></div></div>';
      let editLastNameDiv =
        '<div class="mb-3 form-group"><label for="editLastNameDesktop" class="labels">Edit Last name</label><input type="text" class="form-control" id="editLastNameDesktop" name="editLastNameDesktop" placeholder="" value="' +
        previewLastName +
        '" required><div class="col-sm-5 messages"></div></div>';
      let editEmailDiv =
        '<div class="mb-3 form-group"><label for="editEmailAddressDesktop" class="labels">Edit Email address</label><input type="email" class="form-control" id="editEmailAddressDesktop" placeholder="text@emailaddress.com" name="editEmailAddressDesktop" value=' +
        previewEmail +
        ' required><div class="col-sm-5 messages"></div></div>';
      let editDeptDiv =
        '<div class="mb-3 form-group"><label for="editDeptDesktop" class="labels">Change Department</label><select class="form-select" aria-label="editDeptDesktop" name="editDeptDesktop" id="editDeptDesktop" value=""></select><div class="col-sm-5 messages"></div></div>';

      let saveBtn =
        '<div><button type="submit" class="btn saveButton">Save</button>';
      let cancelBtn =
        '<button type="button" class="btn cancelButton" onClick="cancelButton()" data-bs-dismiss="modal">Cancel</button></div>';

      let editFormEnd = "</form>";

      $("#previewData").html(
        heading +
          editFormStart +
          editIDDesktop +
          editFirstNameDiv +
          editLastNameDiv +
          editEmailDiv +
          editDeptDiv +
          saveBtn +
          cancelBtn +
          editFormEnd
      );

      $.each(deptOptionData, function (key, value) {
        $("#editDeptDesktop").append(
          $("<option value=" + value.id + ">" + value.name + "</option>")
        );
      });

      $("#editDeptDesktop").val(previewDeptID);

      $("#editUserForm").submit(function (e) {
        e.preventDefault();
        var previewID = $("#userEditIDDesktop").text();
        var previewFirstName = $("#editFirstNameDesktop").val();
        var previewLastName = $("#editLastNameDesktop").val();
        var previewEmail = $("#editEmailAddressDesktop").val();
        var previewDeptID = $("#editDeptDesktop").val();
        editProfileAJAX(
          previewID,
          previewFirstName,
          previewLastName,
          previewDeptID,
          previewEmail
        );
      });

      $("#deleteProfilebtn").click(function (e) {
        e.preventDefault();

        var profileID = $("#userEditIDDesktop").text();
        var previewFirstName = $("#editFirstNameDesktop").val();

        let modalDiv =
          '<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content">';
        let modalHead =
          '<div class="modal-header modalHead"><h5 class="modal-title" id="staticBackdropLabel">Confirm Delete</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';
        let modalBody =
          '<div class="modal-body modalBody">' +
          previewFirstName +
          '<span class="d-none" id="profileID">' +
          profileID +
          "</span></div>";
        let modalFoot =
          '<div class="modal-footer modalFoot"><button type="button" class="btn cancelButton" data-bs-dismiss="modal">Cancel</button>';
        let acceptBtn =
          '<button type="button" id="acceptDelete" class="btn saveButton">Understood</button>';
        let closeDivs = "</div></div></div></div>";

        $("#confirmModal").html(
          modalDiv + modalHead + modalBody + modalFoot + acceptBtn + closeDivs
        );

        $("#staticBackdrop").modal("show");

        $("#acceptDelete").click(function (e) {
          e.preventDefault();
          let profileID = $("#profileID").text();
          deleteProfileAJAX(profileID);
          $("#staticBackdrop").modal("hide");
        });
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to delete</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// create new user in a DEPT at a location \\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function insertProfile(firstName, lastName, email, departmentId) {
  $.ajax({
    url: "./php/insertProfile.php",
    type: "POST",
    dataType: "json",
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      departmentId: departmentId,
    },

    success: function () {
      let divOne = "<div class='container-fluid successBox'>";
      let contentSuccessIcon =
        "<p id='successIcon'><i class='far fa-check-circle'></i></p>";
      let contentSuccessText = "<p id='successText'>Successfully Recorded!</p>";
      let divOneExit = "</div>";
      let successScreen = $(
        divOne + contentSuccessIcon + contentSuccessText + divOneExit
      ).fadeOut(2500);

      if ($(document).width() > 990) {
        $("#previewData").append(successScreen);
        allResults();
      } else {
        $("#previewData").append(successScreen);
        setTimeout(allResults, 1800);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to record</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// delete user with validation \//////\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function deleteProfileAJAX(profileID) {
  $.ajax({
    url: "./php/deleteProfile.php",
    type: "POST",
    dataType: "json",
    data: {
      profileID: profileID,
    },

    success: function () {
      let divOne = "<div class='container-fluid deleteSuccessBox'>";
      let contentSuccessIcon =
        "<p id='deleteSuccessIcon'><i class='far fa-check-circle'></i></p>";
      let contentSuccessText =
        "<p id='deleteSuccessText'>Delete Successful</p>";
      let divOneExit = "</div>";
      let successScreen = $(
        divOne + contentSuccessIcon + contentSuccessText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(successScreen);
      setTimeout(function () {
        let clearDiv = $("#previewData").html("");
        allResults();
        clearDiv;
      }, 1500);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to delete</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// edit user  \\\\\/////\\///\////////\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function editProfileAJAX(
  previewID,
  previewFirstName,
  previewLastName,
  previewDept,
  previewEmail
) {
  $.ajax({
    url: "./php/editProfile.php",
    type: "POST",
    dataType: "json",
    data: {
      employeeId1: previewID,
      firstName1: previewFirstName,
      lastName1: previewLastName,
      email1: previewEmail,
      departmentId1: previewDept,
    },

    success: function () {
      let divOne = "<div class='container-fluid successBox'>";
      let contentSuccessIcon =
        "<p id='successIcon'><i class='far fa-check-circle'></i></p>";
      let contentSuccessText = "<p id='successText'>Successfully Recorded!</p>";
      let divOneExit = "</div>";
      let successScreen = $(
        divOne + contentSuccessIcon + contentSuccessText + divOneExit
      ).fadeOut(2500);

      if ($(document).width() > 990) {
        $("#previewData").append(successScreen);
        allResults();
      } else {
        $("#previewData").append(successScreen);
        setTimeout(allResults, 1800);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to record</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/****************************************************************/
//*********************** END OF USER FUNCTIONS ****************/
///************************************************************/

/************************************************************/
//******************* Start OF DEPT FUNCTIONS **************/
///********************************************************/

/////////////////////////////////////////////////////\\\\\\\\\
//////// fetch dept data & render screen \\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function allDeptTable() {
  $.ajax({
    url: "./php/getAllDepartments.php",
    dataType: "json",
    success: function (result) {
      let heading =
        '<div class="DeptAdminHeader"><button class="btn addButton float-start" id="newDepartmentButton"><i class="fas fa-plus-circle"></i></button>Department Admin<button class="btn exitButton float-end" onClick="cancelButton()"><i class="fas fa-share-square"></i></button></div>';
      let tableStart =
        '<table id="deptAdminTable" class="table table-striped table-hover">';

      let tBody = "<tbody id='previewTable'></tbody>";

      let tableEnd = "</table>";

      $("#previewData").html(heading + tableStart + tBody + tableEnd);

      for (var i = 0; i < result.length; i++) {
        let deptID = result[i]["id"];
        let locID = result[i]["locationID"];
        let name = result[i]["name"];

        let col1 =
          "<tr><td class='deptNameEdit clickRowDept'>" + name + "</td>";
        let col2 = "<td class='d-none deptAdminID'>" + deptID + "</td>";
        let col3 = "<td class='d-none deptLocationAdminID '>" + locID + "</td>";
        let delBtn =
          '<td><button class="deleteDepartment deleteButtonTwo"><i class="far fa-trash-alt"></i></button></td></tr>';

        //Location Table
        $("#previewTable").append(col1 + col2 + col3 + delBtn);
      }

      $("#newDepartmentButton").click(function () {
        let headingNewDept =
          '<div class="createContactHeader">Create Department<button class="btn exitButton float-end" onClick="cancelButton()"><i class="fas fa-share-square"></i></button></div>';
        let newDepartmentFormStart =
          '<form id="createDept" name="createDept" method="post">';

        let newDepartmentInput =
          '<div class="mb-3 form-group"><label for="newDept" class="labels">Enter Department</label><input type="text" class="form-control" id="newDept" name="newDept" placeholder="New Dept" required><div class="col-sm-5 messages"></div></div>';

        let newDepartmentLocationInput =
          '<div class="mb-3 form-group"><label for="editLocationNewDept" class="labels">Location of Department</label><select class="form-select" aria-label="editLocationNewDept" name="editLocationNewDept" id="editLocationNewDept" required></select><div class="col-sm-5 messages"></div></div>';

        let newDepartmentSave =
          '<button type="submit" class="btn saveButton">Create</button>';
        let newDepartmentCancel =
          '<button type="button" class="btn cancelButton" onClick="cancelButton()">Cancel</button>';

        let newDepartmentFormEnd = "</form>";

        populateLocationforDeptOptions();

        $("#previewData").html(
          headingNewDept +
            newDepartmentFormStart +
            newDepartmentInput +
            newDepartmentLocationInput +
            newDepartmentSave +
            newDepartmentCancel +
            newDepartmentFormEnd
        );

        $("#createDept").on("submit", function (e) {
          e.preventDefault();

          var createNewDept = $("#newDept").val();
          var selectLocationforNewDept = $("#editLocationNewDept").val();
          newDeptAJAX(createNewDept, selectLocationforNewDept);
        });
      });

      $(".clickRowDept").click(function () {
        let row = $(this).closest("tr");
        let departmentIdF = row.find("td:eq(1)").text();
        getDeptByID(departmentIdF);
      });

      $(".deleteDepartment").click(function (e) {
        e.preventDefault();
        let row = $(this).closest("tr");
        let deleteDeptID = row.find(".deptAdminID").text();
        let deleteDeptName = row.find(".deptNameEdit").text();
        checkDeleteDepartment(deleteDeptID, deleteDeptName);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        ":" +
          textStatus +
          " : " +
          errorThrown +
          " || Please press F12 to access Network Log for further info"
      );
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// create dept in a location \\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function newDeptAJAX(createNewDept, selectLocationforNewDept) {
  $.ajax({
    url: "./php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      deptNewName: createNewDept,
      locationOfNewDept: selectLocationforNewDept,
    },

    success: function () {
      let divOne = "<div class='container-fluid successBox'>";
      let contentSuccessIcon =
        "<p id='successIcon'><i class='far fa-check-circle'></i></p>";
      let contentSuccessText = "<p id='successText'>Successfully Recorded!</p>";
      let divOneExit = "</div>";
      let successScreen = $(
        divOne + contentSuccessIcon + contentSuccessText + divOneExit
      ).fadeOut(2500);
      $("#previewData").append(successScreen);
      setTimeout(allDeptTable, 1800);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to record</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// edit dept \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function editDepartmentAJAX(departmentId, deptName, locationId) {
  $.ajax({
    url: "./php/editDept.php",
    type: "POST",
    dataType: "json",
    data: {
      departmentId: departmentId,
      deptName: deptName,
      locationId: locationId,
    },

    success: function () {
      let divOne = "<div class='container-fluid successBox'>";
      let contentSuccessIcon =
        "<p id='successIcon'><i class='far fa-check-circle'></i></p>";
      let contentSuccessText = "<p id='successText'>Successfully Recorded!</p>";
      let divOneExit = "</div>";
      let successScreen = $(
        divOne + contentSuccessIcon + contentSuccessText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(successScreen);
      setTimeout(allDeptTable, 1200);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to record</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// dept delete validation \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function checkDeleteDepartment(deleteDeptID, deleteDeptName) {
  $.ajax({
    url: "./php/checkDeleteDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      deleteDeptID: deleteDeptID,
    },

    success: function (result) {
      var denied = result.status.description;

      if (denied == "denied") {
        let modalDiv =
          '<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content">';
        let modalHead =
          '<div class="modal-header modalHead"><h5 class="modal-title" id="staticBackdropLabel">Cannot Delete</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';
        let modalBody =
          '<div class="modal-body modalBody">' +
          deleteDeptName +
          " has active users</div>";
        let modalFoot =
          '<div class="modal-footer modalFoot"><button type="button" class="btn cancelButton" data-bs-dismiss="modal">Cancel</button>';
        let closeDivs = "</div></div></div></div>";

        $("#confirmModal").html(
          modalDiv + modalHead + modalBody + modalFoot + closeDivs
        );

        $("#staticBackdrop").modal("show");
      } else {
        let modalDiv =
          '<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content">';
        let modalHead =
          '<div class="modal-header modalHead"><h5 class="modal-title" id="staticBackdropLabel">Confirm Delete</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';
        let modalBody =
          '<div class="modal-body modalBody">' +
          deleteDeptName +
          '<span class="d-none" id="deleteDeptID">' +
          deleteDeptID +
          "</span></div>";
        let modalFoot =
          '<div class="modal-footer modalFoot"><button type="button" class="btn cancelButton" data-bs-dismiss="modal">Cancel</button>';
        let acceptBtn =
          '<button type="button" id="acceptDelete" class="btn saveButton">Understood</button>';
        let closeDivs = "</div></div></div></div>";

        $("#confirmModal").html(
          modalDiv + modalHead + modalBody + modalFoot + acceptBtn + closeDivs
        );

        $("#staticBackdrop").modal("show");

        $("#acceptDelete").click(function (e) {
          e.preventDefault();
          let deleteDeptID = $("#deleteDeptID").text();
          deleteDeptAJAX(deleteDeptID);
          $("#staticBackdrop").modal("hide");
        });
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to delete</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// delete dept  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function deleteDeptAJAX(deleteDeptID) {
  $.ajax({
    url: "./php/deleteDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      deleteDeptID: deleteDeptID,
    },

    success: function (result) {
      var denied = result.status.description;

      if (denied == "delete denied") {
        alert("Department cannot be deleted: Contains active employees");
      } else {
        let divOne = "<div class='container-fluid deleteSuccessBox'>";
        let contentSuccessIcon =
          "<p id='deleteSuccessIcon'><i class='far fa-check-circle'></i></p>";
        let contentSuccessText =
          "<p id='deleteSuccessText'>Delete Successful</p>";
        let divOneExit = "</div>";
        let successScreen = $(
          divOne + contentSuccessIcon + contentSuccessText + divOneExit
        ).fadeOut(2500);
        $("#previewData").append(successScreen);
        setTimeout(function () {
          let clearDiv = $("#previewData").html("");
          allResults();
          allDeptTable();
          clearDiv;
        }, 1500);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to delete</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// fetch a DEPT by ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function getDeptByID(departmentIdF) {
  $.ajax({
    url: "./php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: departmentIdF,
    },

    success: function (result) {
      var deptDataID = result.data["0"].id;
      var deptLocationID = result.data["0"].locationID;
      var deptName = result.data["0"].name;

      let headingDeptEdt =
        '<div class="createContactHeader">Edit Department<button class="btn exitButton float-end" onClick="cancelButton()"><i class="fas fa-share-square"></i></button></div>';
      let editFormStart = '<form id="editDepartment" method="post">';
      let editDeptID =
        '<p class="d-none" id="editDeptID">' + deptDataID + "</p>";
      let editDeptName =
        '<div class="mb-3 form-group"><label for="editDeptName" class="labels">Edit Name</label><input class="form-control" name="editDeptName" id="editDeptName" value="' +
        deptName +
        '" required></input><div class="col-sm-5 messages"></div></div>';

      let EditDepartmentLocation =
        '<div class="mb-3 form-group"><label for="editDepartmentLocation" class="labels">Change Location</label><select class="form-select" name="editDepartmentLocation" id="editDepartmentLocation" value="" required></select><div class="col-sm-5 messages"></div></div>';

      let saveBtn =
        '<div><button type="submit" class="btn saveButton">Save</button>';
      let cancelBtn =
        '<button type="button" class="btn cancelButton" onClick="cancelButton()" data-bs-dismiss="modal">Cancel</button></div>';
      let editFormEnd = "</form>";

      $("#previewData").html("");

      $("#previewData").html(
        headingDeptEdt +
          editFormStart +
          editDeptID +
          editDeptName +
          EditDepartmentLocation +
          saveBtn +
          cancelBtn +
          editFormEnd
      );

      populateLocationforDeptOptions(deptLocationID);

      $("#editDepartment").submit(function (e) {
        e.preventDefault();
        let departmentId = $("#editDeptID").text();
        let deptName = $("#editDeptName").val();
        let locationId = $("#editDepartmentLocation").val();
        editDepartmentAJAX(departmentId, deptName, locationId);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to delete</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/****************************************************************/
//*********************** END OF DEPT FUNCTIONS ****************/
///************************************************************/

/************************************************************/
//******************* Start OF LOCATION FUNCTIONS **********/
///********************************************************/

/////////////////////////////////////////////////////\\\\\\\\\
//////// fetch Location data & render screen \\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function allLocationsTable() {
  $.ajax({
    url: "./php/getAllLocations.php",
    dataType: "json",
    success: function (result) {
      var allData = result;

      let heading =
        '<div class="LocationAdminHeader"><button class="btn addButton float-start" id="addNewLocation"><i class="fas fa-plus-circle"></i></button>Location Admin<button class="btn exitButton float-end" onClick="cancelButton()"><i class="fas fa-share-square"></i></button></div>';

      let tableStart =
        '<table id="locationAdminTable" class="table table-striped table-hover">';

      let tBody = "<tbody id='previewTable'></tbody>";

      let tableEnd = "</table>";

      $("#previewData").html(heading + tableStart + tBody + tableEnd);

      for (var i = 0; i < allData.length; i++) {
        //Table variables

        let name = allData[i]["name"];
        let lID = allData[i]["id"];
        let col1 = "<tr><td class='clickRowLoc'>" + name + "</td>";
        let col2 = "<td class='locationAdminID d-none'>" + lID + "</td>";
        let delBtn =
          '<td><button class="deleteLocation deleteButtonTwo" ><i class="far fa-trash-alt"></i></button></td></tr>';

        $("#previewTable").append(col1 + col2 + delBtn);
      }

      $(".clickRowLoc").click(function () {
        let row = $(this).closest("tr");
        let locationIdF = row.find("td:eq(1)").text();

        getLocationByID(locationIdF);
      });

      $("#addNewLocation").click(function () {
        let headingLocNew =
          '<div class="createContactHeader">Create Location<button class="btn exitButton float-end" onClick="cancelButton()"><i class="fas fa-share-square"></i></button></div>';

        let newLocationFormStart =
          '<form autocomplete="off" id="createLocation" name="createLocation" method="post">';
        let newLocationInput =
          '<div class="mb-3 form-group"><label for="newLocation" class="labels">Enter Location</label><input type="text" class="form-control" id="newLocationForm" name="newLocation" placeholder="New Location" required><div class="col-sm-5 messages"></div></div>';
        let newLocationSave =
          '<button type="submit" class="btn saveButton">Save</button>';
        let newLocationCancel =
          '<button type="button" class="btn cancelButton" onClick="cancelButton()">Cancel</button>';
        let newLocationFormEnd = "</form>";

        $("#previewData").html(
          headingLocNew +
            newLocationFormStart +
            newLocationInput +
            newLocationSave +
            newLocationCancel +
            newLocationFormEnd
        );

        $("#createLocation").on("submit", function (e) {
          e.preventDefault();
          var locationID = $("#newLocationForm").val();
          newLocationAJAX(locationID);
        });
      });

      $(".deleteLocation").click(function (e) {
        e.preventDefault();
        let row = $(this).closest("tr");
        let deleteLocationID = row.find(".locationAdminID").text();
        let deleteLocationName = row.find(".clickRowLoc").text();
        checkDeleteLocation(deleteLocationID, deleteLocationName);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(
        ":" +
          textStatus +
          " : " +
          errorThrown +
          " || All Locations error"
      );
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// create Location \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function newLocationAJAX(locationID) {
  $.ajax({
    url: "./php/insertLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      createNewLocation: locationID,
    },

    success: function () {
      let divOne = "<div class='container-fluid successBox'>";
      let contentSuccessIcon =
        "<p id='successIcon'><i class='far fa-check-circle'></i></p>";
      let contentSuccessText = "<p id='successText'>Successfully Recorded!</p>";
      let divOneExit = "</div>";
      let successScreen = $(
        divOne + contentSuccessIcon + contentSuccessText + divOneExit
      ).fadeOut(2500);

      if ($(document).width() > 990) {
        $("#previewData").append(successScreen);
        setTimeout(allLocationsTable, 1200);
      } else {
        $("#previewData").append(successScreen);
        setTimeout(allLocationsTable, 1200);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to record</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// location delete validation \\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function checkDeleteLocation(deleteLocationID, deleteLocationName) {
  $.ajax({
    url: "./php/checkDeleteLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      deleteLocationID: deleteLocationID,
    },

    success: function (result) {
      var denied = result.status.description;

      if (denied == "denied") {
        let modalDiv =
          '<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content">';
        let modalHead =
          '<div class="modal-header modalHead"><h5 class="modal-title" id="staticBackdropLabel">Cannot Delete</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';
        let modalBody =
          '<div class="modal-body modalBody">' +
          deleteLocationName +
          " has active departments</div>";
        let modalFoot =
          '<div class="modal-footer modalFoot"><button type="button" class="btn cancelButton" data-bs-dismiss="modal">Cancel</button>';
        let closeDivs = "</div></div></div></div>";

        $("#confirmModal").html(
          modalDiv + modalHead + modalBody + modalFoot + closeDivs
        );

        $("#staticBackdrop").modal("show");
      } else {
        let modalDiv =
          '<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content">';
        let modalHead =
          '<div class="modal-header modalHead"><h5 class="modal-title" id="staticBackdropLabel">Confirm Delete</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';
        let modalBody =
          '<div class="modal-body modalBody">' +
          deleteLocationName +
          '<span class="d-none" id="deleteLocationID">' +
          deleteLocationID +
          "</span></div>";
        let modalFoot =
          '<div class="modal-footer modalFoot"><button type="button" class="btn cancelButton" data-bs-dismiss="modal">Cancel</button>';
        let acceptBtn =
          '<button type="button" id="acceptDelete" class="btn saveButton">Understood</button>';
        let closeDivs = "</div></div></div></div>";

        $("#confirmModal").html(
          modalDiv + modalHead + modalBody + modalFoot + acceptBtn + closeDivs
        );

        $("#staticBackdrop").modal("show");

        $("#acceptDelete").click(function (e) {
          e.preventDefault();
          let deleteLocationID = $("#deleteLocationID").text();
          deleteLocationAJAX(deleteLocationID);
          $("#staticBackdrop").modal("hide");
        });
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to delete</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// delete location \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function deleteLocationAJAX(deleteLocationID) {
  $.ajax({
    url: "./php/deleteLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      deleteLocationID: deleteLocationID,
    },

    success: function () {
      let divOne = "<div class='container-fluid deleteSuccessBox'>";
      let contentSuccessIcon =
        "<p id='deleteSuccessIcon'><i class='far fa-check-circle'></i></p>";
      let contentSuccessText =
        "<p id='deleteSuccessText'>Delete Successful</p>";
      let divOneExit = "</div>";
      let successScreen = $(
        divOne + contentSuccessIcon + contentSuccessText + divOneExit
      ).fadeOut(2500);
      $("#previewData").append(successScreen);
      setTimeout(function () {
        let clearDiv = $("#previewData").html("");
        allResults();
        allLocationsTable();

        clearDiv;
      }, 1500);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to delete</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// fetch location by ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function getLocationByID(locationIdF) {
  $.ajax({
    url: "./php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: locationIdF,
    },

    success: function (result) {
      var locationID = result.data["0"].id;
      var locationName = result.data["0"].name;

      let headingLocEdt =
        '<div class="createContactHeader">Edit Location<button class="btn exitButton float-end" onClick="cancelButton()"><i class="fas fa-share-square"></i></button></div>';
      let formStart =
        '<form autocomplete="off" id="editLocation" method="post">';
      let editLocationID =
        '<p class="d-none" id="editLocationID">' + locationID + "</p>";
      let editLocationName =
        '<input class="form-input" name="editLocationName" id="editLocationName" value="' +
        locationName +
        '" required></input><div class="col-sm-5 messages"></div>';
      let saveBtn =
        '<div><button type="submit" class="btn saveButton">Save</button>';
      let cancelBtn =
        '<button type="button" class="btn cancelButton" onClick="cancelButton()" data-bs-dismiss="modal">Cancel</button></div>';
      let formEnd = "</form>";
      $("#previewData").html(
        headingLocEdt +
          formStart +
          editLocationID +
          editLocationName +
          saveBtn +
          cancelBtn +
          formEnd
      );

      $("#editLocation").submit(function (e) {
        e.preventDefault();
        let locationId = $("#editLocationID").text();
        let locationName = $("#editLocationName").val();
        editLocationAJAX(locationId, locationName);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to delete</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// edit location \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function editLocationAJAX(locationId, locationName) {
  $.ajax({
    url: "./php/editLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      locationName: locationName,
      locationId: locationId,
    },

    success: function () {
      let divOne = "<div class='container-fluid successBox'>";
      let contentSuccessIcon =
        "<p id='successIcon'><i class='far fa-check-circle'></i></p>";
      let contentSuccessText = "<p id='successText'>Successfully Recorded!</p>";
      let divOneExit = "</div>";
      let successScreen = $(
        divOne + contentSuccessIcon + contentSuccessText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(successScreen);
      setTimeout(allLocationsTable, 1200);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      let divOne = "<div class='container-fluid failBox'>";
      let contentfailIcon =
        "<p id='failIcon'><i class='far fa-times-circle'></i></p>";
      let contentfailText = "<p id='failText'>Failed to record</p>";
      let divOneExit = "</div>";
      let failScreen = $(
        divOne + contentfailIcon + contentfailText + divOneExit
      ).fadeOut(2500);

      $("#previewData").append(failScreen);

      console.log(":" + textStatus + " : " + errorThrown);
    },
  });
}

/************************************************************/
//******************* End OF LOCATION FUNCTIONS ************/
///********************************************************/

//onClick Cancel button serves as global multiple function

function cancelButton() {
  if ($(document).width() > 990) {
    $("#previewData").html("");
  } else {
    $("#previewData").html("");
    $("#previewData").removeClass("col-10");
  }
}

/************************************************************/
//******************* Start OF SEARCH FUNCTIONS ************/
///********************************************************/

/////////////////////////////////////////////////////\\\\\\\\\
//////// email filter \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function searchEmail() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchEmail");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //filter loop

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[6];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// location filter \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function searchLoc() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchLoc");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //filter loop

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// dept filter \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function searchDept() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchDept");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //filter loop

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// surname filter \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function searchLast() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchLast");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //filter loop

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// first name filter \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function searchFirst() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchFirst");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //filter loop

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/////////////////////////////////////////////////////\\\\\\\\\
//////// MOBILE only filter \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const mobileAllSearch = () => {
  const trs = document.querySelectorAll("#allDataTable tr:not(.header)");
  const filter = document.querySelector("#mobileSearch").value;
  const regex = new RegExp(filter, "i");
  const isFoundInTds = (td) => regex.test(td.innerHTML);
  const isFound = (childrenArr) => childrenArr.some(isFoundInTds);
  const setTrStyleDisplay = ({ style, children }) => {
    style.display = isFound([...children]) ? "" : "none";
  };

  trs.forEach(setTrStyleDisplay);
};

/************************************************************/
//******************* Start OF SORT FUNCTIONS **************/
///********************************************************/

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("allDataTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

/************************************************************/
//******************* END OF ALL FUNCTIONS *****************/
///********************************************************/