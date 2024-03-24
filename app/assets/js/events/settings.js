const settings_menu_class = document.getElementById("class-settings")
const settings_menu_student = document.getElementById("student-settings")
const settings_menu_dev = document.getElementById("dev-settings")
const settings_menu_done = document.getElementById("done-settings")
const Settings_screen = document.getElementById("Settings-Screen")
const menu_bt = document.getElementById("menu")
const student_menu_title = document.getElementById("Adding-Students-Announce-Title");
const class_menu_title = document.getElementById("settings-announce-title");
const class_selector = document.getElementById("classes");
const class_select_des = document.getElementById("settings-announce-describtion")
const students_des = document.getElementById("Adding-Student-Announce-Describtion")
const ccst = document.getElementById('cc-st')
const showMenu = document.getElementById("showMenu")
const common_settings_screen = document.getElementById("class-selection");
const background_url = document.getElementById("background-url")

let settings_menu_class_status = true
let settings_menu_student_status = false
let settings_menu_info_status = false

document.addEventListener('DOMContentLoaded', function () {
  settings_menu_class.addEventListener('click', function () {
    if (settings_menu_class_status == false) {
      settings_menu_class.classList.add("settings-pressed")
      settings_menu_student.classList.remove("settings-pressed")
      settings_menu_class_status = true
      settings_menu_student_status = false
      settings_menu_info_status = false
      const class_menu_title = document.getElementById("settings-announce-title");
      class_menu_title.style.display = "";
      student_menu_title.style.display = "none";
      students_des.style.display = "none";
      class_select_des.style.display = "";
      class_selector.style.display = "";
      manage_students.style.display = "none";
      settings_menu_dev.classList.remove("settings-pressed")
      ccst.style.display = "none";
      common_settings_screen.style.display = ""
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  settings_menu_student.addEventListener('click', function () {
    if (settings_menu_student_status == false) {
      settings_menu_class.classList.remove("settings-pressed")
      settings_menu_student.classList.add("settings-pressed")
      settings_menu_class_status = false
      settings_menu_student_status = true
      settings_menu_info_status = false
      class_menu_title.style.display = "none";
      student_menu_title.style.display = "";
      students_des.style.display = "";
      class_select_des.style.display = "none";
      class_selector.style.display = "none";
      manage_students.style.display = "";
      settings_menu_dev.classList.remove("settings-pressed")
      ccst.style.display = "none";
      common_settings_screen.style.display = "none"
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  settings_menu_dev.addEventListener('click', function () {
    if (settings_menu_info_status == false) {
      settings_menu_dev.classList.add("settings-pressed")
      settings_menu_class.classList.remove("settings-pressed")
      settings_menu_student.classList.remove("settings-pressed")
      settings_menu_class_status = false
      settings_menu_student_status = false
      settings_menu_info_status = true
      class_menu_title.style.display = "none";
      student_menu_title.style.display = "none";
      students_des.style.display = "none";
      class_select_des.style.display = "none";
      class_selector.style.display = "none";
      student_menu_title.style.display = "none";
      students_des.style.display = "none";
      manage_students.style.display = "none";
      ccst.style.display = "";
      common_settings_screen.style.display = "none"
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  settings_menu_done.addEventListener('click', function () {
    settings_menu_class_status = true
    settings_menu_student_status = false
    settings_menu_class.classList.add("settings-pressed")
    settings_menu_student.classList.remove("settings-pressed")
    Settings_screen.style.display = "none"
    menu_bt.style.display = ""
    landing.style.background = "rgba(0,0,0,0.4)"
    R_Position.classList.remove('pressed');
    R_Presentation.classList.remove('pressed');
    settings.classList.remove('pressed');
    settings_menu_dev.classList.remove('settings-pressed')
    R_Position_status = false
    R_Presentation_status = false
    settings_status = false
    settings_menu_info_status = false
    ccst.style.display = "none";
    NS_study.classList.add('pressed')
    NS_study_div.style.display = ""
    NS_study_manage_button.style.display = ""
    NS_study_table.style.display = ""
    showMenu.style.display = ""
    Classtitle.style.display = ""
    common_settings_screen.style.display = ""
    refreshtotalStudents()
    countInClassPerson()
    refreshtotalStudents()
    countInClassPerson()
    refreshtotalStudents()
    countInClassPerson()
    if(delete_student == true) {
        alert("학생을 삭제하였습니다. 정상적인 이용을 위해 프로그램을 재시작 해야합니다.")
    }
    addClickEvent()
    refreshtotalStudents()
  });
});


class_selector.addEventListener("change", function () {
  const selectedValue = class_selector.value;
  NTF(`변경된 값: ` + selectedValue)
  readClassValueFromFile();
});

// 경로 설정
function readClassValueFromFile() {
  const filePath = process.env.APPDATA + '/.classprogram/settings.json';
  const fsss = require('fs');

  // 파일 읽기
  fsss.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일을 읽는 중 오류가 발생했습니다:', err);
      return;
    }

    try {
      // JSON 파싱
      const jsonData = JSON.parse(data);

      // class 값을 읽어옴
      const classValue = jsonData.class;
      const ClassTitleText = document.getElementById("Class_title");
      ClassTitleText.innerText = `${classValue} 야간자기주도학습 인원`;

      console.log('class 값:', classValue);
    } catch (err) {
      console.error('JSON 파싱 중 오류가 발생했습니다:', err);
    }
  });
}

readClassValueFromFile();
let SelValue = ""
background_url.addEventListener("change", function() {
    SelValue = background_url.value
    landing.style.backgroundImage = `url(${SelValue})`
})
