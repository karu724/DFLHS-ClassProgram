const path = require('path');

const mixPositionButton = document.getElementById('mixposition');
mixPositionButton.addEventListener('click', () => {
  const storedData = localStorage.getItem('studentData');
  const studentData = storedData ? JSON.parse(storedData) : [];
  refreshtotalStudents()
  countInClassPerson()
  if (!studentData || studentData.length === 0) {
    // studentData가 없거나 빈 배열인 경우
    for (let i = 1; i <= 30; i++) {
      const positionKey = `P${i}`;
      const targetElement = document.getElementById(positionKey);
      if (targetElement) {
        targetElement.innerHTML = i.toString();
      } else {
        console.log(`해당 id를 가진 HTML 태그를 찾을 수 없습니다. (${positionKey})`);
      }
    }
    console.log('No student data found.');
    return;
  }
  addInClassPersonClass()
  const students = [];

  studentData.forEach((student, index) => {
    const studentIndex = index + 1;
    const studentNumber = student.S_number;
    const studentName = student.S_name;

    const studentObj = {
      number: studentNumber,
      name: studentName
    };

    students.push(studentObj);
  });

  const shuffledStudents = shuffleArray(students);

  const positionData = {};
  const usedPositions = new Set();

  shuffledStudents.forEach((student, index) => {
    const studentIndex = index + 1;
    const studentNumber = student.number;
    const studentName = student.name;

    let positionKey = `P${studentIndex}`;

    while (usedPositions.has(positionKey)) {
      studentIndex++;
      positionKey = `P${studentIndex}`;
    }

    usedPositions.add(positionKey);

    const targetElement = document.getElementById(positionKey);
    if (targetElement) {
      targetElement.innerHTML = `${studentNumber} <br> ${studentName}`;
    } else {
      console.log(`해당 id를 가진 HTML 태그를 찾을 수 없습니다. (${positionKey})`);
    }

    // 동일 종류의 HTML 태그의 값을 삭제
    const duplicateElements = document.querySelectorAll(`#Random-Position-Screen [data-position="${positionKey}"]`);
    duplicateElements.forEach((element) => {
      element.innerHTML = '';
    });

    positionData[positionKey] = student;
  });

  localStorage.setItem('positionData', JSON.stringify(positionData));
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayPositionData(positionData) {
  Object.keys(positionData).forEach((positionKey) => {
    const student = positionData[positionKey];
    const studentNumber = student.number;
    const studentName = student.name;

    const targetElement = document.getElementById(positionKey);
    if (targetElement) {
      targetElement.innerHTML = `${studentNumber} <br> ${studentName}`;
    } else {
      console.log(`해당 id를 가진 HTML 태그를 찾을 수 없습니다. (${positionKey})`);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const storedPositionData = localStorage.getItem('positionData');
  const positionData = storedPositionData ? JSON.parse(storedPositionData) : {};

  displayPositionData(positionData);
});
