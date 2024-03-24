const storedData = localStorage.getItem('studentData');
const RPS = document.getElementById('Random-Position-Screen');
RPS.style.display = "none";

document.addEventListener('DOMContentLoaded', function() {
  R_Position.addEventListener('click', function() {
    RPS.style.display = "";
    const positionData = localStorage.getItem('positionData');

    if (!positionData) {
      console.error('No position data found in localStorage.');
      return;
    }

    const storedData = localStorage.getItem('studentData');
    const studentList = storedData ? JSON.parse(storedData) : [];
    const positionDataObj = positionData ? JSON.parse(positionData) : {};
    const positionDataKeys = Object.keys(positionDataObj);
    const studentListLength = studentList.length;
    displayPositionData(positionData)
    if (positionDataKeys.length !== studentListLength) {
      showNotification('오류: 다시 자리를 뽑아주세요.');
      return;
    }
  });
});
