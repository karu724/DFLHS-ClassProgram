// // import { ipcRenderer } from "electron";
// const ipcRenderer = require('electron')

let studentCounter = 1;
let studentList = [];
let isLoaded = false;

function saveStudent() {
  const input1 = document.getElementById('S_numbers');
  const input2 = document.getElementById('S_names');
  const input1Value = input1.value;
  const input2Value = input2.value;

  if (input1Value.trim() === '' || input2Value.trim() === '') {
    showNotification('학번과 이름을 입력해주세요');
    return;
  }
  if (studentList.length >= 30) {
    showNotification('최대 30명까지 가능합니다.');
    return;
  }
  const student = {
    S_number: input1Value,
    S_name: input2Value,
  };

  const success = addStudentToList(student);
  if (success) {
    studentList.push(student);
    const studentsList = document.getElementById('students_list');
    const span1 = document.createElement('span');
    span1.innerHTML = 'S' + studentCounter + ':';
    studentsList.appendChild(span1);
    const span2 = document.createElement('span');
    span2.innerHTML = student.S_number;
    studentsList.appendChild(span2);
    const span3 = document.createElement('span');
    span3.innerHTML = student.S_name;
    studentsList.appendChild(span3);
    studentsList.appendChild(document.createElement('br'));
    studentCounter++;

    input1.value = '';
    input2.value = '';

    saveStudentData();
    showNotification("학생을 추가했습니다.")
  }
}

function addStudentToList(student) {
  for (let i = 0; i < studentList.length; i++) {
    const existingStudent = studentList[i];

    if (student.S_number === existingStudent.S_number || student.S_name === existingStudent.S_name) {
      showNotification('중복된 학생입니다.');
      return false;
    }
  }

  return true;
}

function deleteStudent() {
  const input3 = document.getElementById('S_count');
  const input3Value = input3.value;

  if (input3Value.trim() === '') {
    showNotification('등번을 입력해주세요');
    return;
  }

  const indexToDelete = parseInt(input3Value.slice(1)) - 1;

  if (isNaN(indexToDelete) || indexToDelete < 0 || indexToDelete >= studentList.length) {
    showNotification('유효하지 않은 등번입니다.');
    return;
  }

  studentList.splice(indexToDelete, 1);
  input3.value = '';
  showNotification("학생을 삭제하였습니다.")
  saveStudentData();
  refreshStudentList();
  delete_student = true;
}

function refreshStudentList() {
  const studentsList = document.getElementById('students_list');
  studentsList.innerHTML = '';

  for (let i = 0; i < studentList.length; i++) {
    const student = studentList[i];
    const span1 = document.createElement('span');
    span1.innerHTML = 'S' + (i + 1) + ':';
    studentsList.appendChild(span1);
    const span2 = document.createElement('span');
    span2.innerHTML = student.S_number;
    studentsList.appendChild(span2);
    const span3 = document.createElement('span');
    span3.innerHTML = student.S_name;
    studentsList.appendChild(span3);
    studentsList.appendChild(document.createElement('br'));
  }

  if (!isLoaded) {
    studentCounter = studentList.length + 1;
    isLoaded = true;
  }
}

function loadStudentList() {
  const storedData = localStorage.getItem('studentData');

  if (storedData) {
    studentList = JSON.parse(storedData);
  } else {
    studentList = [];
  }

  refreshStudentList();
  isLoaded = true;
}

function saveStudentData() {
  localStorage.setItem('studentData', JSON.stringify(studentList));
}

function resetStudents() {
  if (confirm('초기화 하시겠습니까? 자리도 동시에 초기화됩니다.')) {
    studentCounter = 1;
    studentList = [];
    refreshStudentList();
    localStorage.removeItem('studentData');
    localStorage.removeItem('positionData');
    isLoaded = false;
    alert("원활한 작동을 위해 프로그램이 다시 시작됩니다")
    ipcRenderer.send("restartApps")
  }
}
let delete_student = false
document.getElementById('add-students').addEventListener('click', function() {
  saveStudent()
  refreshtotalStudents()
  countInClassPerson()
});
document.getElementById('remove-students').addEventListener('click', function() {
   deleteStudent()
   refreshtotalStudents()
});
document.getElementById('reset-students').addEventListener('click', function() {
   resetStudents()
   refreshtotalStudents()
});
document.getElementById('student-settings').addEventListener('click', loadStudentList)
loadStudentList();
