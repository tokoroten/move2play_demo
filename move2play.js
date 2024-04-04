let energy = 0;
const maxEnergy = 100;

function getAccel(event) {
    console.log("getAccel");

    // 重力加速度を取得する
    let gravity = event.accelerationIncludingGravity;

    // 重力加速度を取り除く
    let acc = {
        x: gravity.x - event.acceleration.x,
        y: gravity.y - event.acceleration.y,
        z: gravity.z - event.acceleration.z
    };

    // 加速度の大きさを計算する
    let accSize = Math.sqrt(acc.x*acc.x + acc.y*acc.y + acc.z*acc.z);

    // エネルギーを加算する
    energy += accSize / 1000000.0;
    updateEnergy();
}

function updateEnergy() {
    console.log("updateEnergy", energy)
    if (energy >= maxEnergy) {
        energy = maxEnergy;
    }
    document.getElementById("energy").textContent = energy.toFixed(2) + "%";
}

function countDown()
{
    console.log("countDown");
    const videotag = document.getElementById("video");

    energy -= 0.1;
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