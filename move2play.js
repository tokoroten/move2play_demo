let energy = 0.0;
let accSize = 0.0;
const maxEnergy = 100;

function getAccel(event) {
    // 加速度の大きさを計算する
    accSize = Math.sqrt(
        event.acceleration.x * event.acceleration.x +
        event.acceleration.y * event.acceleration.y +
        event.acceleration.z * event.acceleration.z
    );
}

function updateEnergy() {
    console.log("updateEnergy", energy)
    if (energy >= maxEnergy) {
        energy = maxEnergy;
    }
    document.getElementById("energy").textContent = energy.toFixed(1) + "%";
    document.getElementById("acc").textContent = accSize.toFixed(3) + "m/s^2";
}



function countDown()
{
    console.log("countDown");
    const videotag = document.getElementById("video");

    // 加速度が1 ms^2 であれば、運動中と判定してエナジーを追加
    if (accSize > 1.0) {
        energy += 0.5;
    } else {
        // エナジー消費
        energy -= 0.1;
    }

    if (energy <= 0) {
        energy = 0;
        videotag.pause();
    }
    else {
        videotag.play();
    }
    updateEnergy();
}

function addEnery(event) {
    console.log("addEnergy");
    energy += 10;
    updateEnergy();
}

window.onload = () => {
    window.addEventListener("devicemotion", getAccel);
    document.getElementById("addButton").addEventListener("click", addEnery);
    setInterval(countDown, 100);
}