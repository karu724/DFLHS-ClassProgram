const schedule = require('node-schedule');
const { exec } = require('child_process');

// 매일 오후 9시 50분에 실행되는 규칙을 만듭니다.
const rule = new schedule.RecurrenceRule();
rule.hour = 21;
rule.minute = 50;

// 스케줄을 등록합니다.
const job = schedule.scheduleJob(rule, () => {
  let selectElement = document.getElementById("autooff");
  let selectedValue = selectElement.value;
  let lsvalue = localStorage.getItem('autooff');
  if(lsvalue === "on") {
    showNotification("잠시 후 컴퓨터가 종료됩니다")
  // 명령어를 실행합니다.
    exec('shutdown /s /t 0', (error, stdout, stderr) => {
      if (error) {
        console.error(`오류 발생: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }
});

document.getElementById("autooff").addEventListener("change", function() {
  let selectedValue = this.value;
  showNotification("값 변경: " + selectedValue);
  localStorage.setItem('autooff', selectedValue);
});

document.addEventListener("DOMContentLoaded", function() {
let selectElement = document.getElementById("autooff");
let savedValue = localStorage.getItem("autooff");
selectElement.value = savedValue;
});