const img = document.getElementById("img");
const fsBtn = document.getElementById("fsBtn");
const playBtn = document.getElementById("playBtn");

const modeBtn = document.getElementById("modeBtn"); //khai báo thêm ảnh
const photo = document.getElementById("photo");
let isVideo = true; // đang ở chế độ video

let scale = 1;
let posX = 0, posY = 0;
let isDrag = false;
let startX = 0, startY = 0;
let uiTimer = null;

/* Fullscreen */
fsBtn.onclick = () => {
    scale = 1;
    posX = 0;
    posY = 0;
    update();

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        fsBtn.textContent = "⤢";
        fsBtn.title = "Thoát toàn màn hình";
        showUI();
    } else {
        fsBtn.textContent = "⛶";
        fsBtn.title = "Toàn màn hình";
        playBtn.classList.remove("hideUI");
        fsBtn.classList.remove("hideUI");
        playBtn.classList.add("showUI");
        fsBtn.classList.add("showUI");
    }
});

/* Zoom */
window.addEventListener("wheel", e=>{
    e.preventDefault();
    let delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale += delta;
    scale = Math.min(Math.max(scale,1),3);
    update();
},{passive:false});

// /* Kéo */
// img.addEventListener("mousedown", e=>{
//     isDrag = true;
//     img.style.cursor = "grabbing";
//     startX = e.clientX - posX;
//     startY = e.clientY - posY;
// });

function getTarget(){
    return isVideo ? img : photo;
}
getTarget().addEventListener("mousedown", e=>{
    isDrag = true;
    getTarget().style.cursor = "grabbing";
    startX = e.clientX - posX;
    startY = e.clientY - posY;
});

window.addEventListener("mouseup", ()=>{
    isDrag = false;
    img.style.cursor = "grab";
});
window.addEventListener("mousemove", e=>{
    if(!isDrag) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    update();
});

// function update(){
//     img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
// }
function update(){ //Sửa lại update() để áp cho cả ảnh và video
    const target = isVideo ? img : photo;
    target.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

/* Play / Pause */
playBtn.onclick = () => {
    if(img.paused){
        img.play();
        playBtn.textContent = "=";
        playBtn.title = "Tạm dừng";
    }else{
        img.pause();
        playBtn.textContent = "▶";
        playBtn.title = "Tiếp tục";
    }
};

/* Hiện 3s rồi ẩn khi fullscreen */
function showUI(){
    playBtn.classList.remove("hideUI");
    fsBtn.classList.remove("hideUI");   //toàn màn hình
    modeBtn.classList.remove("hideUI"); //chuyển đổi ảnh video
    playBtn.classList.add("showUI");
    fsBtn.classList.add("showUI");
    modeBtn.classList.add("showUI");

   

    clearTimeout(uiTimer);
    uiTimer = setTimeout(()=>{
        if(document.fullscreenElement){
            playBtn.classList.remove("showUI");
            fsBtn.classList.remove("showUI");
            modeBtn.classList.remove("showUI");
            playBtn.classList.add("hideUI");
            fsBtn.classList.add("hideUI");
            modeBtn.classList.add("hideUI");
        }
    },3000);
}

/* Click hoặc di chuột: hiện lại 3s */
// document.addEventListener("mousemove", ()=>{
//     if(document.fullscreenElement) showUI();
// });
document.addEventListener("click", ()=>{
    if(document.fullscreenElement) showUI();
});

//anhnen
modeBtn.onclick = ()=>{
    // reset zoom & vị trí
    scale = 1; posX = 0; posY = 0; update();

    if(isVideo){
        // sang ảnh
        img.pause();
        img.style.display = "none";
        photo.style.display = "block";
        // colorText.style.display = "block";   // HIỆN CHỮ
        modeBtn.textContent = "🎬";
        modeBtn.title = "Quay lại video";
    }else{
        // về video
        img.style.display = "block";
        // colorText.style.display = "none";    // ẨN CHỮ
        photo.style.display = "none";
        img.play();
        modeBtn.textContent = "📷"; //🌄 📷
        modeBtn.title = "Xem ảnh";
    }
    isVideo = !isVideo;
};


/* ===== CHỮ ĐỔI MÀU ===== */

var farbbibliothek = [];
// farbbibliothek[3] = [               màu tết
//     "#8B0000","#B00000","#D10000","#FF0000","#FF3333","#FF6666",
//     "#FF9999","#FFCC99","#FFA500","#FFB000","#FFD700","#FFFF00",
//     "#FFD700","#FFB000","#FFA500","#FFCC99","#FF9999","#FF6666",
//     "#FF3333","#FF0000","#D10000","#B00000","#8B0000","#660000"
// ];

farbbibliothek[3] = [
    "#FFFFFF", // trắng
    "#FFF5CC",
    "#FFE699",
    "#FFD966",
    "#FFCC33",
    "#FFB000", // vàng cam
    "#FFD700", // vàng kim
    "#FFF000",
    "#FFFF66",
    "#FFF9B0",
    "#FFFFFF",

    "#FFE6F0", // hồng nhạt
    "#FFB6C1",
    "#FFA0B4",
    "#FF85A1",
    "#FF6F91",

    "#FFD700",
    "#FFCC33",
    "#FFE699",
    "#FFF5CC",
    "#FFFFFF"
];

var farben = farbbibliothek[3];
var Buchstabe = [];
var text = "CHÚC MỪNG NĂM MỚI\nTHÁNG 1 - 2026";

function string2array(b) {
    Buchstabe = [];
    while (farben.length < b.length) {
        farben = farben.concat(farben);
    }
    for (var k = 0; k < b.length; k++) {
        Buchstabe[k] = b.charAt(k);
    }
}

function divserzeugen() {
    var out = "";
    for (var b = 0; b < Buchstabe.length; b++) {
        if (Buchstabe[b] === "\n") {
            out += "<br>";
        } else {
            out += "<span id='a" + b + "'>" + Buchstabe[b] + "</span>";
        }
    }
    document.getElementById("colorText").innerHTML = out; // KHÔNG dùng document.write
    farbschrift();
}

function farbschrift() {
    for (var b = 0; b < Buchstabe.length; b++) {
        var el = document.getElementById("a" + b);
        if (el) el.style.color = farben[b];
    }
    farbverlauf();
}

function farbverlauf() {
    farben.unshift(farben.pop());
    setTimeout(farbschrift, 100);
}

/* Khởi động */
string2array(text);
divserzeugen();

const colorText = document.getElementById("colorText");
colorText.style.display = "none"; // ẩn chữ khi đang xem video và chỉ hiện khi isVideo = false (đang xem ảnh)