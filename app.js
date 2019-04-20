//캠퍼스에 올라가면 마우스가 감지한다. 

//jsCanvas가 id인 값을 가져온다. 
const canvas=document.getElementById('jsCanvas');

let painting=false;

function stopPainting(){
    painting=false;
}

function onMonuseMove(event){
    // console.log(event);
    const x=event.offsetX;
    const y=event.offsetY;
    // console.log(x,y);
}
function onMonuseDown(event){
    // console.log(event);
    painting=true;
}
function onMonuseUp(event){
    stopPainting()
}


if(canvas){
    //캔버스에 값이 있으면 뒤에있는 함수를 따른다. 
    canvas.addEventListener('mousemove',onMonuseMove);
    //캔버스를 클릭하면 페인팅 시작한다.
    canvas.addEventListener('mousedown',onMonuseDown);
    //클릭떼면 그리기 중지
    canvas.addEventListener('mouseup',onMonuseUp);
    //캔버스에서 벗어나면 그리기 중지
    canvas.addEventListener('mouseleave',stopPainting);
}