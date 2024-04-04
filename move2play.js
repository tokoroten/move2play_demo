let energy = 0;
const maxEnergy = 100;

function getAccel(event) {
    console.log("getAccel");

    // 重力加速度を取得する
    let gravity = event.accelerationIncludingGravity;

    // 重力加速度を取り除く
    let acc = {
        x: event.acceleration.x - gravity.x,
        y: event.acceleration.y - gravity.y,
        z: event.acceleration.z - gravity.z
    };

    // 加速度の大きさを計算する
    let accSize = Math.sqrt(acc.x*acc.x + acc.y*acc.y + acc.z*acc.z);

    // エネルギーを加算する
    energy += accSize / 10.0;
    updateEnergy();
}

function updateEnergy() {
    console.log("updateEnergy", energy)
    if (energy >= maxEnergy) {
        energy = maxEnergy;
    }
    document.getElementById("energy").textContent = energy + "%";
}

function countDown()
{
    console.log("countDown");
    const videotag = document.getElementById("video");

    energy -= 1.0;
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
    setInterval(countDown, 1000);
}