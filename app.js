//캠퍼스에 올라가면 마우스가 감지한다.

//jsCanvas가 id인 값을 가져온다.
const canvas = document.getElementById("jsCanvas");

//context : canvas안에서 픽셀을 다루는 것
const ctx = canvas.getContext("2d");
//픽셀을 다루는 사이즈가 얼마인지 canvas에게 알려준다. 픽셀 modifier

const colors = document.getElementsByClassName("jsColor");

const range = document.getElementById("jsRange");

const mode = document.getElementById("jsMode");

const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//html상 init의 백그라운드가 white가 아님으로 init 해줌
ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//그릴 선의 색
ctx.strokeStyle = "INITIAL_COLOR";
//공간에 박스 차지
ctx.fillStyle = "INITIAL_COLOR";
//선의 너비
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMonuseMove(event) {
  // console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  // console.log(x,y);
  if (!painting) {
    //클릭하지 않고 캔버스에서 마우스가 이동할 때는 beginPath가 발동
    //Path는 선이다.
    ctx.beginPath();
    //마우스의 x,y좌표를 path에 알려준다.
    ctx.moveTo(x, y);
  } else {
    //클릭시 startPainting()이 발동되어 painting가 true가 되고
    //여전히 마우스가 움직이면 lineTo() 메소드를 호출,
    //마우스를 움직일때마다 아래 두 함수가 실행된다. 점을 계속 실행하여 선으로 만든다.

    //lineTo() : 현재의 path에서 마지막 지점을 (x,y) 좌료로 연결한다. -> 선으로
    ctx.lineTo(x, y);
    //stroke() : 현재의 path를 현재의 stroke style로 획을 그음
    ctx.stroke();
  }
}
// function onMonuseDown(event){
//     // console.log(event);
//     painting=true;
// }

//색 바꾸는 function
function handleColorClick(event) {
  // console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//브러시의 사이즈 조정
/*
1. const range =document.getElementById("jsRange"); 를 통해 html에서 가져올 class 전송
2. addEventListener를 통해 함수와 연결
3. 함수에서 console을 통해 쓸 값을 확인하고 1번에서 가져온 변수에 담는다.
*/

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  //fill버튼 클릭시 fill모드가 되면서 버튼의 내용은 paint로
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function hangleCM(event){
    event.preventDefault();
}

//save 버튼 누르면 바로 저장되도록 
function handleSaveClick(event){
    //파일형식
    const image = canvas.toDataURL("image/jpeg");
    //a태그
    const link = document.createElement("a");
    link.href=image;
    //파일 명
    link.download = "PaintJS[EXPORT]"
    link.click();
}

if (canvas) {
  //캔버스에 값이 있으면 뒤에있는 함수를 따른다.
  canvas.addEventListener("mousemove", onMonuseMove);
  //캔버스를 클릭하면 페인팅 시작한다.
  canvas.addEventListener("mousedown", startPainting);
  //클릭떼면 그리기 중지
  canvas.addEventListener("mouseup", stopPainting);
  //캔버스에서 벗어나면 그리기 중지
  canvas.addEventListener("mouseleave", stopPainting);
  //click 하면 나오는 console에서 요소 확인 가능 
  canvas.addEventListener("click", handleCanvasClick);
  //마우스 우클릭 할수 나오는 메뉴 
  canvas.addEventListener("contextmenu", hangleCM);
}

//색들을 배열로 가져온다. forEach를 통해 배열에 있는 값들이 addEventListener에 모두 적용되도록
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click",handleSaveClick);
}