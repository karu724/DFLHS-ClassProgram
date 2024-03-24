let RPArray = [];

function getRandomPresent(max) {
  let min = 1;
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min);

  if (!RPArray.includes(randomNum)) {
    RPArray.push(randomNum);
  } else {
    getRandomPresent(max);
  }
}

function RandomPresent() {
  let studentsData = Object.keys(JSON.parse(localStorage.studentData))
  if (studentsData) {
    let studentsNumbers = studentsData.length;
    RPArray = []; // RPArray 초기화

    for (let i = 0; i < studentsNumbers; i++) {
      getRandomPresent(studentsNumbers);
    }
  }
}


const RP_button = document.getElementById("RP_button");
const RP_list_1 = document.getElementById("RP_list_1");
const RP_list_2 = document.getElementById("RP_list_2");
const RP_list_3 = document.getElementById("RP_list_3");

RP_button.addEventListener("click", function() {
  RandomPresent();
  removeAllChildElements(RP_list_1);
  removeAllChildElements(RP_list_2);
  removeAllChildElements(RP_list_3);
  const RPArrayLength = RPArray.length;

  for (let i = 0; i < RPArrayLength; i++) {
    const spanElement = document.createElement("span");
    spanElement.textContent = `${i+1}` + "번 발표자: " + RPArray[i] +"번";

    if (i < 10) {
      RP_list_1.appendChild(spanElement);
    } else if (i < 20) {
      RP_list_2.appendChild(spanElement);
    } else {
      RP_list_3.appendChild(spanElement);
    }
  }
});


function removeAllChildElements(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}
