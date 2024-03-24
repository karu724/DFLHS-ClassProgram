const buttons = document.querySelectorAll(".menu-list");
const fullscreen_button = document.getElementById("fullscreen-button");
const NS_study = document.getElementById("NS-Study")
const R_Position = document.getElementById("R-Position")
const R_Presentation = document.getElementById("R-Presentation")
const settings = document.getElementById("settings")
const landing = document.getElementById("landing")
const side_menu = document.getElementById("menu")
const manage_students = document.getElementById("manage-students")
const NS_study_table = document.getElementById("NS_Studey_table")
const NS_study_div = document.getElementById("NS_study_status")
const NS_study_manage_button = document.getElementById("NS_study_manage_button")
const Classtitle = document.getElementById("Class_title")
const RP_screen = document.getElementById("Random-Presentation-Screen")

let fullscreen_status = false

document.addEventListener('DOMContentLoaded', function() {
  const fullscreen = document.getElementById('fullscreen_button');
  fullscreen.addEventListener('click', function() {
    if(fullscreen_status == false) {
      fullscreen_status = true
      console.log('fullscreen enabled');
      landing.style.top = "16.2%";
      side_menu.style.left = "105%";
      scaleCalculator()
      landing.style.left = "16.7%"
    } else {
      fullscreen_status = false
      console.log('fullscreen disabled');
      landing.style.top = "0%";
      landing.style.left = "0%";
      side_menu.style.left = "105%";
      landing.style.transform = "scale(1.0)"
    }
  });
});

let NS_study_status = true
let R_Position_status = false
let R_Presentation_status = false
let settings_status = false

const tableElement = document.querySelector('.table > table');

document.addEventListener('DOMContentLoaded', function() {
  NS_study.addEventListener('click', function() {
    if(NS_study_status == false) {
      R_Position.classList.remove('pressed');
      R_Presentation.classList.remove('pressed');
      settings.classList.remove('pressed');
      NS_study.classList.add('pressed');
      NS_study_status = true
      R_Position_status = false
      R_Presentation_status = false
      settings_status = false
      landing.style.background = "rgba(0,0,0,0.4)"
      Settings_screen.style.display = "none"
      menu_bt.style.display = ""
      // landing
      RPS.style.display = "none"
      NS_select_available = true
      NS_study_table.style.right = "18%"
      NS_study_div.style.display = ""
      NS_study_manage_button.style.display = ""
      NS_study_table.style.display = ""
      for (let i = 0; i < NOfStudents; i++) {
        tds[i].classList.remove('none-background')
      }
      Classtitle.style.display = ""
      RP_screen.style.display = "none"
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  R_Position.addEventListener('click', function() {
    if(R_Position_status == false) {
      R_Position.classList.add('pressed');
      R_Presentation.classList.remove('pressed');
      settings.classList.remove('pressed');
      NS_study.classList.remove('pressed');
      NS_study_status = false
      R_Position_status = true
      R_Presentation_status = false
      settings_status = false
      landing.style.background = "rgba(0,0,0,0.4)"
      Settings_screen.style.display = "none"
      menu_bt.style.display = ""
      RPS.style.display = ""
      NS_select_available = false
      NS_study_table.style.right = "21%"
      NS_study_div.style.display = "none"
      NS_study_manage_button.style.display = "none"
      NS_study_table.style.display = ""
      let tdElements = document.querySelectorAll('#NS_Studey_table table tbody tr td');
      studentDataString = localStorage.getItem('studentData');
      NOfStudents = studentDataString ? JSON.parse(studentDataString).length : 0;
      tds = [...document.querySelectorAll('#NS_Studey_table table tbody tr td')].sort((a, b) => a.id.slice(1) - b.id.slice(1));
      for (let i = 0; i < NOfStudents; i++) {
        tds[i].classList.add('none-background')
      }
      Classtitle.style.display = "none"
      RP_screen.style.display = "none"
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  R_Presentation.addEventListener('click', function() {
    if(R_Presentation_status == false) {
      R_Position.classList.remove('pressed');
      R_Presentation.classList.add('pressed');
      settings.classList.remove('pressed');
      NS_study.classList.remove('pressed');
      NS_study_status = false
      R_Position_status = false
      R_Presentation_status = true
      settings_status = false
      landing.style.background = "rgba(0,0,0,0.4)"
      Settings_screen.style.display = "none"
      menu_bt.style.display = ""
      //landing
      RPS.style.display = "none"
      NS_select_available = false
      NS_study_div.style.display = "none"
      NS_study_manage_button.style.display = "none"
      NS_study_table.style.display = "none"
      Classtitle.style.display = "none"
      RP_screen.style.display = ""
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  settings.addEventListener('click', function() {
    if(settings_status == false) {
      R_Position.classList.remove('pressed');
      R_Presentation.classList.remove('pressed');
      settings.classList.add('pressed');
      NS_study.classList.remove('pressed');
      NS_study_status = false
      R_Position_status = false
      R_Presentation_status = false
      settings_status = true
      if(SelValue !== undefined) {
            landing.style.background = "rgba(0,0,0,0.6)"
      } else {
            landing.style.backgroundImage = SelValue
      }
      Settings_screen.style.display = "flex"
      menu_bt.style.display = "none"
      student_menu_title.style.display = "none";
      students_des.style.display = "none";
      manage_students.style.display = "none";
      class_menu_title.style.display = "";
      class_select_des.style.display = "";
      class_selector.style.display = "";
      ccst.style.display = "none";
      //landing
      RPS.style.display = "none"
      NS_select_available = false
      NS_study_div.style.display = "none"
      NS_study_manage_button.style.display = "none"
      NS_study_table.style.display = "none"
      showMenu.style.display = "none"
      Classtitle.style.display = "none"
      RP_screen.style.display = "none"
    }
  });
});
let isMenuShown = false

document.addEventListener('DOMContentLoaded', function() {
      const menuButton = document.getElementById('showMenu');
      const menuList = document.getElementById('menu');
      menuButton.addEventListener('click', function() {
            if(isMenuShown === false) {
                  menuList.style.left = '84%';
                  isMenuShown = true
            } else {
                  menuList.style.left = '105%';
                  isMenuShown = false
            }
      })
});