
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const offsetElement = document.getElementById('offset');



function updateDateTime() {
  const dt = new Date();
  const hour = dt.getHours();
  const minute = dt.getMinutes();
  const second = dt.getSeconds();
  timeElement.textContent = ("0" + hour).substr(-2) + ":" + ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);

  const year = dt.getFullYear();
  const month = dt.getMonth();
  const day = dt.getDate();


  dateElement.textContent = year + "-" + ("0" + month).substr(-2) + "-" + ("0" + day).substr(-2);


}

setInterval(updateDateTime, 200);

const offsetMinutes = new Date().getTimezoneOffset() * -1;

const hours = Math.floor(offsetMinutes / 60);          
const minutes = offsetMinutes % 60;

let sign = " ";

if (offsetMinutes > 0) {
  sign = "+"
} else {
  sign = "-"
}


offsetElement.textContent = "UTC " + sign + ("0" + hours).substr(-2) + ":" + ("0" + minutes).substr(-2);

const bodyEl = document.getElementById("bodyid");

function openFullscreen() {
  if (bodyEl.requestFullscreen) {
    bodyEl.requestFullscreen();
  } else if (bodyEl.webkitRequestFullscreen) { /* Safari */
    bodyEl.webkitRequestFullscreen();
  } 
}

bodyEl.addEventListener("click", async () => {
  openFullscreen();
  await setWakeLockAsync();

}, false);





async function setWakeLockAsync() { 

  if (!("wakeLock" in navigator)) {
    console.error("Wake lock not supported");
    return;
  }

  try {
    const lock = await navigator.wakeLock.request("screen");

    lock.addEventListener("release", async () => {
      console.log("wakeLock released " + new Date());
      await setWakeLockAsync();
    });



    console.log("Locked");
  } catch (ex) {
    console.log(ex);
  }
}
const wakeLock = navigator.wakeLock;