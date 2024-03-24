// 사용자 계정 이름 구하기
const userAccountName = os.userInfo().username;
let jsonFilePath;

jsonFilePath = path.join('C:', 'Users', userAccountName, 'AppData', 'Roaming', '.classprogram', 'students.json');

// JSON 파일 읽기
const readJSONFile = callback => {
  axios.get(jsonFilePath)
    .then(response => {
      const jsonData = response.data;
      callback(jsonData);
    })
    .catch(error => {
      console.log('JSON 파일을 읽는 중 오류가 발생했습니다.', error);
    });
};

// JSON 파일 업데이트 및 저장
let updateJSONFile;

updateJSONFile = (jsonData, callback) => {
  const jsonString = JSON.stringify(jsonData);
  axios.post(jsonFilePath, jsonString, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .then(() => {
      callback();
    })
    .catch(error => {
      console.log('JSON 파일을 업데이트하는 중 오류가 발생했습니다.', error);
    });
};

// HTML에서 입력 받기
function getInputValues() {
  const input1Value = document.getElementById('S_numbers').value;
  const input2Value = document.getElementById('S_names').value;
  return {
    S_num: input1Value,
    S_name: input2Value
  };
}

// 중복 체크
function checkDuplicate(jsonData, inputValues) {
  for (const studentKey in jsonData) {
    if (
      jsonData[studentKey].S_num === inputValues.S_num &&
      jsonData[studentKey].S_name === inputValues.S_name
    ) {
      return true;
    }
  }
  return false;
}

let counts_students = 0;

// JSON 파일 읽기 후 처리
function handleJSONData(jsonData) {
  const inputValues = getInputValues();
  const isDuplicate = checkDuplicate(jsonData, inputValues);

  if (!isDuplicate) {
    let studentCount = Object.keys(jsonData).length;
    let studentKey = 'S' + (studentCount + 1);
    let foundEmptySpot = false;

    // 빈 자리 찾기
    for (let i = 1; i <= studentCount; i++) {
      if (!jsonData.hasOwnProperty('S' + i)) {
        studentKey = 'S' + i;
        foundEmptySpot = true;
        break;
      }
    }

    // 자리 재조정
    if (!foundEmptySpot) {
      studentCount++;
      studentKey = 'S' + studentCount;
    }

    jsonData[studentKey] = inputValues;
    updateJSONFile(jsonData, function () {
      console.log('JSON 파일이 업데이트되었습니다.');
      counts_students = Object.keys(jsonData).length;
      generateStudentList(jsonData);
    });
  } else {
    console.log('중복된 학생입니다.');
  }
}

// 학생 리스트 생성
function generateStudentList(jsonData) {
  // 부모 요소인 div 선택
  const parentDiv = document.getElementById('students-list');
  parentDiv.innerHTML = ''; // 기존의 내용 초기화

  // 학생 정보 표시
  for (let i = 1; i <= counts_students; i++) {
    const studentKey = 'S' + i;
    if (jsonData.hasOwnProperty(studentKey)) {
      const studentData = jsonData[studentKey];

      // 자식 요소인 div 생성 및 추가
      const childDiv = document.createElement('div');
      parentDiv.appendChild(childDiv);

      // 자식 요소인 span 생성 및 추가
      const Pub_num = document.createElement('span');
      const S_num = document.createElement('span');
      const S_name = document.createElement('span');
      Pub_num.textContent = i; // 순번 설정
      S_num.textContent = studentData.S_num;
      S_name.textContent = studentData.S_name;
      childDiv.appendChild(Pub_num);
      childDiv.appendChild(S_num);
      childDiv.appendChild(S_name);
    }
  }
}

// JSON 파일 읽기 호출
readJSONFile(handleJSONData);
