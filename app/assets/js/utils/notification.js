const notification = document.getElementById("notification");
const time_bar = document.getElementById("time_bar");
const ntf_des = document.getElementById("notification_des");

let reset_status = true;
const notificationQueue = []; // 알림을 저장하는 큐
let isProcessingNotification = false; // 현재 알림을 처리 중인지 여부

async function afterNotification() {
  notification.style.transform = "translate(-276px, 10px)";
}

async function resetNotification() {
  time_bar.style.transition = "width 0s";
  time_bar.style.width = "267px";
  reset_status = true;
}

async function processNotificationQueue() {
  if (isProcessingNotification || notificationQueue.length === 0) {
    return;
  }
  
  isProcessingNotification = true;
  const { NTF_text } = notificationQueue.shift(); // 큐에서 첫 번째 알림 가져오기
  
  await NTF(NTF_text); // 알림 표시
  
  setTimeout(() => {
    isProcessingNotification = false;
    processNotificationQueue(); // 다음 알림 처리
  }, 1000); // 알림이 사라진 후 1초 후에 다음 알림 처리
}

async function showNotification(NTF_text) {
  const notificationObj = { NTF_text };
  notificationQueue.push(notificationObj); // 알림 큐에 추가
  
  if (!isProcessingNotification) {
    processNotificationQueue(); // 알림 큐 처리 시작
  }
}

async function afterNotification() {
  notification.style.transform = "translate(-276px, 10px)";
}

async function resetNotification() {
  time_bar.style.transition = "width 0s";
  time_bar.style.width = "267px";
  reset_status = true;
}

async function NTF(NTF_text) {
  if (reset_status === true) {
    time_bar.style.transition = "width 5s";
    notification.style.transform = "translate(10px, 10px)";
    time_bar.style.width = "0px";
    ntf_des.innerText = NTF_text;
    setTimeout(afterNotification, 5000);
    setTimeout(resetNotification, 5500);
    reset_status = false;
  }
}
