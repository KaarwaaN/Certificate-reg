let ADDRESS, BG, COLLEGE, CONTACT, DOB, EMAIL, FATHER, GENDER, NAME, POSITION, SESSION, VERIFIEDBY, WORKINKWA, CERTIFICATEID
function amr() {
  ADDRESS = document.getElementById("address").value;
  var e = document.getElementById("bg");
  BG = e.options[e.selectedIndex].text;
  COLLEGE = document.getElementById("College").value;
  CONTACT = document.getElementById("mob").value;
  DOB = document.getElementById("DOB").value;
  EMAIL = document.getElementById("email").value;
  FATHER = document.getElementById("father").value;
  var g = document.getElementById("gender");
  GENDER = g.options[g.selectedIndex].text;
  NAME = document.getElementById("name").value;
  var p = document.getElementById("pos");
  POSITION = p.options[p.selectedIndex].text;
  SESSION = document.getElementById("Session").value;
  VERIFIEDBY = "PRINCIPAL JEC,SENIOR HEAD OF KAARWAAN,HEAD OF KAARWAAN,PRESIDENT OF KAARWAAN";
  WORKINKWA = "4 Years";
  CERTIFICATEID = `KWA${CONTACT.slice(0, 4)}${DOB.slice(0, 5).replace('/', '')}${NAME.slice(0, 1)}`
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// console.log(validateEmail('anystring@anystring.anystring'));

document.getElementById("insert").onclick = function () {
  amr();
  if (ADDRESS.length > 0 && BG.length > 0 && COLLEGE.length > 0 && CONTACT.length > 0 && DOB.length > 0 && EMAIL.length > 0 && FATHER.length > 0 && GENDER.length>0
    && NAME.length > 0 && POSITION.length>0 && SESSION.length > 0 && VERIFIEDBY.length > 0 && WORKINKWA.length > 0 && CERTIFICATEID.length > 0) {
    if (GENDER == "M" || GENDER == "F" || GENDER == "O") {
      if (BG == "A+" || BG == "A-" || BG == "B+" || BG == "B-" || BG == "O+" || BG == "O-" || BG == "AB+" || BG == "AB-") {
        if (CONTACT.length == 10) {
          if (validateEmail(EMAIL) == true) {
            if (POSITION.length > 0) {
              if (COLLEGE.length > 0) {
                // dob format DD/MM/YYYY
                if (DOB.length == 10 && DOB[2]=='/' && DOB[5]=='/') {
                  var day = DOB.slice(0, 2);
                  var dint = parseInt(day);
                  var month = DOB.slice(3, 5);
                  var mint = parseInt(month);
                  var year = DOB.slice(6, 10);
                  var yint = parseInt(year);
                  if (dint <= 31 && mint <= 12 && yint > 0) {
                    if (ADDRESS.length > 0) {
                      if (SESSION.length == 9 && SESSION[4]=='-') {
                        firebase
                          .database()
                          .ref("ValunteerDetails/" + CERTIFICATEID)
                          .set({
                            ADDRESS: ADDRESS,
                            BG: BG,
                            CERTIFICATEID: CERTIFICATEID,
                            COLLEGE: COLLEGE,
                            CONTACT: CONTACT,
                            DOB: DOB,
                            EMAIL: EMAIL,
                            FATHER: FATHER,
                            GENDER: GENDER,
                            NAME: NAME,
                            POSITION: POSITION,
                            SESSION: SESSION,
                            VERIFIEDBY: VERIFIEDBY,
                            WORKINKWA: WORKINKWA
                          });
                        window.alert("Entry Inserted");
                      }
                      else {
                        window.alert("Session should be in this format YYYY-YYYY");
                      }
                    }
                    else {
                      window.alert("Enter address");
                    }
                  }
                  else {
                    window.alert("Enter valid DOB");
                  }
                }
                else {
                  window.alert("Enter your date of birth in this format DD/MM/YYYY");
                }
              }
              else {
                window.alert("Enter the name of college");
              }
            }
            else {
              window.alert("Enter position");
            }
          }
          else {
            window.alert("Enter valid email");
          }
        }
        else {
          window.alert("Invalid contact detail");
        }
      }
      else {
        window.alert("Invalid blood group");
      }
    }
    else {
      window.alert('Invalid gender selection');
    }
  }
  else {
    window.alert("All entries are required");
  }
};
