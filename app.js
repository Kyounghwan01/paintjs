//캠퍼스에 올라가면 마우스가 감지한다. 

//jsCanvas가 id인 값을 가져온다. 
const canvas=document.getElementById('jsCanvas');

//context : canvas안에서 픽셀을 다루는 것 
const ctx=canvas.getContext('2d');
//픽셀을 다루는 사이즈가 얼마인지 canvas에게 알려준다. 픽셀 modifier

const colors=document.getElementsByClassName("jsColor");
canvas.width =700;
canvas.height =700;
//그릴 선의 색 
ctx.strokeStyle="#2c2c2c";
//선의 너비
ctx.lineWidth=2.5;

let painting=false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMonuseMove(event){
    // console.log(event);
    const x=event.offsetX;
    const y=event.offsetY;
    // console.log(x,y);  
    if(!painting){
        //클릭하지 않고 캔버스에서 마우스가 이동할 때는 beginPath가 발동
        //Path는 선이다. 
        ctx.beginPath();
        //마우스의 x,y좌표를 path에 알려준다. 
        ctx.moveTo(x,y);
    }else{
        //클릭시 startPainting()이 발동되어 painting가 true가 되고
        //여전히 마우스가 움직이면 lineTo() 메소드를 호출,  
        //마우스를 움직일때마다 아래 두 함수가 실행된다. 점을 계속 실행하여 선으로 만든다. 

        //lineTo() : 현재의 path에서 마지막 지점을 (x,y) 좌료로 연결한다. -> 선으로 
        ctx.lineTo(x,y);
        //stroke() : 현재의 path를 현재의 stroke style로 획을 그음
        ctx.stroke();
    }
}
// function onMonuseDown(event){
//     // console.log(event);
//     painting=true;
// }


//색 바꾸는 function 
function handleColorClick(event){
    // console.log(event.target.style);
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
}

if(canvas){
    //캔버스에 값이 있으면 뒤에있는 함수를 따른다. 
    canvas.addEventListener('mousemove',onMonuseMove);
    //캔버스를 클릭하면 페인팅 시작한다.
    canvas.addEventListener('mousedown',startPainting);
    //클릭떼면 그리기 중지
    canvas.addEventListener('mouseup',stopPainting);
    //캔버스에서 벗어나면 그리기 중지
    canvas.addEventListener('mouseleave',stopPainting);
}

//색들을 배열로 가져온다. addEventListener
Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick))