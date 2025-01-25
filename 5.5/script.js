function createBubble(number,l1,l2="Pending"){
    const container=document.createElement('div');
    container.style.display='flex'
    container.style.flexDirection='column'
    container.style.alignItems='center'
    container.style.textAlign='center'
    const bigdot=document.createElement('div');
    bigdot.style.width='8.4vh';
    bigdot.style.height='8.4vh';
    bigdot.style.display='flex';
    bigdot.style.borderRadius='50%'
    bigdot.style.alignItems="center";
    bigdot.style.backgroundColor='transparent'
    bigdot.style.justifyContent="center";
    bigdot.style.border="5px solid blue"
    const dot=document.createElement('div');
    dot.className="circle";
    dot.style.backgroundColor='#557c99'
    dot.style.borderRadius='50%';
    dot.style.width='8vh';
    dot.style.color="white"
    dot.style.height='8vh';
    dot.style.justifyContent="center";
    dot.style.alignItems="center";
    dot.style.display="flex";
    dot.innerHTML=number;
    bigdot.appendChild(dot);
    const tl1=document.createElement('div')
    tl1.style.fontSize='24'
    tl1.style.fontWeight='bold'
    tl1.style.alignItems='start'
    const tl2=document.createElement('div')
    tl2.style.color='grey'
    tl1.innerText=l1;
    tl2.innerText=l2;
    container.appendChild(bigdot)
    container.appendChild(tl1)
    container.appendChild(tl2)
    tl1.className="heading";
    tl2.className="status";
    dot.className="smdt";
    bigdot.className="bgdt";
    container.className="cntnr";
    bigdot.style.visibility='hidden';
    dot.style.visibility='visible';
    return container;
}
function createRod(){
    const bar=document.createElement('div');
    const b1=document.createElement('div');
    const b2=document.createElement('div');
    bar.appendChild(b1);
    bar.appendChild(b2);
    b1.className="b1";
    b2.className="b2";
    bar.style.display='flex'
    bar.style.position='relative';
    b1.style.position='absolute';
    b1.style.zIndex='5'
    b1.style.left='0'
    b1.style.width='0'
    b1.style.backgroundColor='blue'
    b2.style.width='100%'
    b1.style.height='100%'
    b2.style.height='100%'
    bar.style.height='1vh';
    bar.style.width='20vh';
    bar.style.backgroundColor='#557c99';
    bar.style.margin='1vh 1vh 6vh 1vh'
    bar.className='bar';
    return bar;

}
//two clicks pe wo complete and next in progress
//error handling for last gola
body=document.getElementsByTagName("body");
body=body[0];
const bulbula=createBubble(1,'Cart','Pending');
const bulbula2=createBubble(2,'Address','Pending');
const bulbula3=createBubble(3,'Payment','Pending');
const bulbula4=createBubble(4,'Checkout','Pending');
const bar1=createRod();
const bar2=createRod();
const bar3=createRod();
body.appendChild(bulbula);
body.appendChild(bar1);
body.appendChild(bulbula2);
body.appendChild(bar2);
body.appendChild(bulbula3);
body.appendChild(bar3);
body.appendChild(bulbula4);
const timeline=gsap.timeline({paused:true});
button=document.getElementById("button");
button.addEventListener('click',()=>{
    if(!timeline.isActive()){
    timeline.clear()
    containers=document.getElementsByClassName('cntnr');
    smalldots=document.getElementsByClassName("smdt");
    bigdots=document.getElementsByClassName("bgdt");
    statuses=document.getElementsByClassName("status");
    bars=document.getElementsByClassName("bar")
    b_ones=document.getElementsByClassName('b1');
    b_twos=document.getElementsByClassName('b2');
    for(let i=0;i<containers.length;i++){
        if(smalldots[i].style.backgroundColor!="blue"){
            smalldots[i].style.backgroundColor='blue';
            bigdots[i].style.visibility="visible";
            statuses[i].innerText="In Progress";
            statuses[i].style.color="blue";
            if(i>0){
                statuses[i-1].innerText="Complete"
                bigdots[i-1].style.visibility="hidden"
                smalldots[i-1].innerText='✔';
                timeline.to(b_ones[i-1],{
                    width:"100%",
                    duration:1
                },">")
            }
            if(i<bars.length&&b_ones[i].style.width<bars[i].style.width){
                timeline.to(b_ones[i],{
                    width:"40%",
                    duration:1
                },">")
            }
            break;
        }else{
            if(i==containers.length-1){
                statuses[i].innerText="Complete";
                bigdots[i].style.visibility="hidden";
                smalldots[i].innerText="✔";
            }
        }
    }
}
})
timeline.play();