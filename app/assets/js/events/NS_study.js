let NS_select_available = true; // NS_select_available 변수 설정
let studentDataString = localStorage.getItem('studentData');
let NOfStudents = studentDataString ? JSON.parse(studentDataString).length : 0;

let tds = [...document.querySelectorAll('#NS_Studey_table table tbody tr td')].sort((a, b) => a.id.slice(1) - b.id.slice(1));
function addClickEvent() {
  let studentDataString = localStorage.getItem('studentData');
  let NOfStudents = studentDataString ? JSON.parse(studentDataString).length : 0;
  let tds = [...document.querySelectorAll('#NS_Studey_table table tbody tr td')].sort((a, b) => a.id.slice(1) - b.id.slice(1));
  for (let i = 0; i < NOfStudents; i++) {
    if (!tds[i].hasAttribute("data-click-event-added")) {
      tds[i].addEventListener("click", function() {
        if (!NS_select_available) {
          return; // NS_select_available이 false인 경우 함수 종료
        }

        if (this.classList.contains("ns-pressed")) {
          // 이미 클릭된 상태인 경우
          this.classList.remove("ns-pressed");

          // 이전에 있던 클래스들을 추가
          const previousClasses = this.getAttribute("data-previous-classes");
          if (previousClasses) {
            const classesToAdd = previousClasses.split(" ");
            classesToAdd.forEach(className => {
              this.classList.add(className);
            });
          }

          this.removeAttribute("data-previous-classes");
        } else {
          // 클릭되지 않은 상태인 경우
          const previousClasses = Array.from(this.classList).filter(className => className !== "ns-pressed");
          this.setAttribute("data-previous-classes", previousClasses.join(" "));

          // 이전에 있던 클래스들을 삭제
          this.className = "";

          // "ns-pressed" 클래스 추가
          this.classList.add("ns-pressed");
        }
      });
      tds[i].setAttribute("data-click-event-added", "true");
    }
  }
}


// localStorage의 positionData와 studentData의 length가 다를 경우 알림을 보냄
function checkDataCounts() {
  try {
    let positionDataCount = Object.keys(JSON.parse(localStorage.getItem('positionData'))).length;
    let studentDataCount = Object.keys(JSON.parse(localStorage.getItem('studentData'))).length;
    if (positionDataCount !== studentDataCount) {
      showNotification("자리와 학생 정보가 다릅니다.");
      setTimeout(function() {
        showNotification("자리를 초기화해주세요.");
      }, 6000);
    }
  } catch(e) {
    total_num.innerText = 0
    InClass_num.innerText = 0
    Inhome_num.innerText = 0
    etc_num.innerText = 0
    Question_num.innerText = 0
  }
}

checkDataCounts();

function refreshtotalStudents() {
  let length = 0;

// studentData가 존재하는지 확인
  if (studentDataString) {
  // studentData를 JavaScript 객체로 변환
    const studentData = JSON.parse(studentDataString);
  
  // studentData 배열의 길이 출력
    console.log('studentData의 길이:', studentData.length);
    length = studentData.length
  } else {
    console.log('studentData가 존재하지 않습니다.');
  }
  let total_num = document.getElementById("total_num")
  total_num.innerText = length
}
refreshtotalStudents()

function addInClassPersonClass() {
  let studentDataString = localStorage.getItem('studentData');
  let NOfStudents = studentDataString ? JSON.parse(studentDataString).length : 0;
  let tds = [...document.querySelectorAll('#NS_Studey_table table tbody tr td')].sort((a, b) => a.id.slice(1) - b.id.slice(1));
  // .table > table > tbody > tr > td 요소들을 선택합니다.
  const tdElements = document.querySelectorAll('.table > table > tbody > tr > td');
  
  // tdElements 배열을 순회하면서 InClassPerson 클래스를 가진 요소를 찾고 클래스를 추가합니다.
  tdElements.forEach(td => {
    if (!td.classList.contains('InClassPerson')) {
      for(let i = 0; i < NOfStudents; i++) {
        tds[i].classList.add('InClassPerson');
      }
    }
  });
}

function countInClassPerson() {
  // .table > table > tbody > tr > td 요소들을 선택합니다.
  const tdElements = document.querySelectorAll('.table > table > tbody > tr > td');

  // InClassPerson 클래스를 가진 요소의 개수를 세기 위한 변수를 초기화합니다.
  let inClassPersonCount = 0;

  // tdElements 배열을 순회하면서 InClassPerson 클래스를 가진 요소를 찾고 개수를 증가시킵니다.
  tdElements.forEach(td => {
    if (td.classList.contains('InClassPerson')) {
      inClassPersonCount++;
    }
  });

  // InClassPerson 클래스를 가진 요소의 개수를 반환합니다.
  console.log('InClassPerson 클래스 개수:', inClassPersonCount);

  const inClassNumElement = document.getElementById("InClass_num");
  inClassNumElement.innerText = inClassPersonCount.toString();
}

// InClassPerson 클래스를 추가합니다.
addInClassPersonClass();


function countInHomePerson() {
  // .table > table > tbody > tr > td 요소들을 선택합니다.
  const tdElements = document.querySelectorAll('.table > table > tbody > tr > td');

  // InHomePerson 클래스를 가진 요소의 개수를 세기 위한 변수를 초기화합니다.
  let inHomePersonCount = 0;

  // tdElements 배열을 순회하면서 InHomePerson 클래스를 가진 요소를 찾고 개수를 증가시킵니다.
  tdElements.forEach(td => {
    if (td.classList.contains('InHomePerson')) {
      inHomePersonCount++;
    }
  });

  // InHomePerson 클래스를 가진 요소의 개수를 반환합니다.
  console.log('InHomePerson 클래스 개수:', inHomePersonCount);

  const inHomeNumElement = document.getElementById("Inhome_num");
  inHomeNumElement.innerText = inHomePersonCount.toString();
}

// InHomePerson 클래스 개수를 출력하고 HTML 요소에 업데이트합니다.


function countQuestionPerson() {
  // .table > table > tbody > tr > td 요소들을 선택합니다.
  const tdElements = document.querySelectorAll('.table > table > tbody > tr > td');

  // InHomePerson 클래스를 가진 요소의 개수를 세기 위한 변수를 초기화합니다.
  let QuestionPersonCount = 0;

  // tdElements 배열을 순회하면서 InHomePerson 클래스를 가진 요소를 찾고 개수를 증가시킵니다.
  tdElements.forEach(td => {
    if (td.classList.contains('QuestionPerson')) {
      QuestionPersonCount++;
    }
  });

  // InHomePerson 클래스를 가진 요소의 개수를 반환합니다.
  console.log('QuestionPerson 클래스 개수:', QuestionPersonCount);

  const QuestionNumElement = document.getElementById("Question_num");
  QuestionNumElement.innerText = QuestionPersonCount.toString();
}


function countEtcPerson() {
  // .table > table > tbody > tr > td 요소들을 선택합니다.
  const tdElements = document.querySelectorAll('.table > table > tbody > tr > td');

  // InHomePerson 클래스를 가진 요소의 개수를 세기 위한 변수를 초기화합니다.
  let EtcPersonCount = 0;

  // tdElements 배열을 순회하면서 InHomePerson 클래스를 가진 요소를 찾고 개수를 증가시킵니다.
  tdElements.forEach(td => {
    if (td.classList.contains('EtcPerson')) {
      EtcPersonCount++;
    }
  });

  // InHomePerson 클래스를 가진 요소의 개수를 반환합니다.
  console.log('EtcPerson 클래스 개수:', EtcPersonCount);
  const EtcNumElement = document.getElementById("etc_num");
  EtcNumElement.innerText = EtcPersonCount.toString();
}

const InHomeButton = document.getElementById("InHomeButton");
InHomeButton.addEventListener("click", function() {
  const tdElements = document.querySelectorAll("#NS_Studey_table table tbody tr td.ns-pressed");

  if (tdElements.length === 0) {
    showNotification("자리/학생을 선택해주세요")
  } else {
    tdElements.forEach(td => {
      td.classList.remove("ns-pressed");
      td.removeAttribute("data-previous-classes");
      td.classList.add("InHomePerson");
      countInClassPerson()
      countInHomePerson()
      countQuestionPerson()
      countEtcPerson()
    });
  }
});




const InClassButton = document.getElementById("InClassButton");
InClassButton.addEventListener("click", function() {
  const tdElements = document.querySelectorAll("#NS_Studey_table table tbody tr td.ns-pressed");

  if (tdElements.length === 0) {
    showNotification("자리/학생을 선택해주세요")
  } else {
    tdElements.forEach(td => {
      td.classList.remove("ns-pressed");
      td.removeAttribute("data-previous-classes");
      td.classList.add("InClassPerson");
      countInClassPerson()
      countInHomePerson()
      countQuestionPerson()
      countEtcPerson()
    });
  }
});

const InEtcButton = document.getElementById("InEtcButton");
InEtcButton.addEventListener("click", function() {
  const tdElements = document.querySelectorAll("#NS_Studey_table table tbody tr td.ns-pressed");

  if (tdElements.length === 0) {
    showNotification("자리/학생을 선택해주세요")
  } else {
    tdElements.forEach(td => {
      td.classList.remove("ns-pressed");
      td.removeAttribute("data-previous-classes");
      td.classList.add("EtcPerson");
      countInHomePerson()
      countQuestionPerson()
      countEtcPerson()
      countInClassPerson()
    });
  }
});

const InQuestionButton = document.getElementById("InQuestionButton");
InQuestionButton.addEventListener("click", function() {
  const tdElements = document.querySelectorAll("#NS_Studey_table table tbody tr td.ns-pressed");

  if (tdElements.length === 0) {
    showNotification("자리/학생을 선택해주세요")
  } else {
    tdElements.forEach(td => {
      td.classList.remove("ns-pressed");
      td.removeAttribute("data-previous-classes");
      td.classList.add("QuestionPerson");
      countInClassPerson()
      countInHomePerson()
      countQuestionPerson()
      countEtcPerson()
    });
  }
});

const PreventInteraction = document.getElementById("PreventInteraction");
let PR = false
PreventInteraction.addEventListener("click", function() {
  const NS_Table = document.getElementById("NS_Studey_table");
  if(PR === false) {
    showNotification("입력방지 활성화")
      NS_Table.style.pointerEvents = "none";
      PreventInteraction.style.backgroundColor = "rgba(255,0,0,0.6)"
      PR = true
  } else {
    showNotification("입력방지 비활성화")
    NS_Table.style.pointerEvents = "auto";
    PreventInteraction.style.backgroundColor = "rgba(255,0,0,0)"
    PR = false
  }
})

addClickEvent()
countInClassPerson()
countInHomePerson()
countQuestionPerson()
countEtcPerson()
