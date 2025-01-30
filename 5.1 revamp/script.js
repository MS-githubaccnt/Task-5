const drawer= document.getElementById("drawer");
const button= document.getElementById("clickMe");
const bars=document.getElementsByClassName("bar")
const text=document.getElementById("text")
let wrapper=document.getElementById("wrapper");
let isOpen=false;
const timeline=gsap.timeline({paused:true});
function swap(arr,a,b){
  let temp;
  temp=arr[a];
  arr[a]=arr[b];
  arr[b]=temp;
}
function rotate(tr){
  for(let x=0;x<tr.length;x++){
    if(x!=tr.length-1){
      swap(tr,x,x+1);
    }
  }
}
const ranges=[
  {start:0,end:5},
  {start:5,end:80},
  {start:80,end:150},
  {start:90,end:1024},
]
let boxshadow=["0 0 18px 7px #4c8bf5","0 0 18px 7px #ff8a5c","0 0 18px 7px #ffff80","0 0 18px 7px #66e066"]
let gradients=['linear-gradient(90deg,blue,red)','linear-gradient(90deg,red,yellow)','linear-gradient(90deg,yellow,green)','linear-gradient(90deg,green)',]
let colors=['blue','red','yellow','green']
async function animateBars(){
  for(let i=0;i<4;i++){
  for(let i=0;i<bars.length;i++){
  await gsap.to(bars[i],{
    width:"100%",
    duration:0.2,
    ease:"linear"
  },"+=0");
  for(let j=0;j<bars.length;j++){
    if(j!==i){
      gsap.to(bars[j],{ width:"0%",
        duration:0.2,
        ease:"linear"},"+=0");
      }
    }
    await new Promise((resolve)=>setTimeout(resolve,500));
  }
}
  //alert("done")
}

async function doRecord() {
  const stream=await navigator.mediaDevices.getUserMedia({audio:true});
  const audioContext=new AudioContext();
  const source=audioContext.createMediaStreamSource(stream);
  const analyzer=audioContext.createAnalyser();
  source.connect(analyzer);
  let freq=new Uint8Array(analyzer.frequencyBinCount);
  const intrvl=setInterval(()=>{
    analyzer.getByteFrequencyData(freq);
    console.log(freq);
    arrval=[0,0,0,0]
    ranges.forEach((range,i)=>{
      let sum=0;
      for(let j=range.start;j<range.end;j++){sum+=freq[j]};
      let avg=sum/(range.end-range.start);
    let val=avg/255;
      //let val=Math.log10(1+avg)/Math.log10(255);
      //arrval[i]=arrval[i]*0.8+val*0.2;
    arrval[i]=val;
    })
    let ts=0;
    for(let j=0;j<4;j++){
      ts+=arrval[j];
    }
    for(let j=0;j<4;j++){
      let x=(arrval[j]/ts)*100;
      console.log(bars[j].offsetWidth);
      console.log(drawer.offsetWidth);
   if(Math.abs(parseFloat(bars[j].offsetWidth)-parseFloat(drawer.offsetWidth)*x/100)>=drawer.offsetWidth*1/100){
      timeline.to(bars[j],{width:`${(Math.random()*(3.75)+0.25)*x}%`,
        duration:0.2,
        ease:"sine.inout"},"+=0")
      }
    }
    rotate(ranges);
  },200)
  const mediaRecorder=new MediaRecorder(stream);
  let audioChunks=[];

  mediaRecorder.ondataavailable=(event)=>{
    audioChunks.push(event.data);
}
  mediaRecorder.start();

  setTimeout(()=>{
    stream.getTracks().forEach(track=>track.stop());
    clearInterval(intrvl);
    console.log(audioChunks);
    mediaRecorder.stop();
  },5000)
  
}
button.addEventListener('click',()=>{
  timeline.clear();
  text.innerHTML='';
  if (isOpen) {
    timeline.to(drawer,{height:0,duration:0.125,ease:"sine.inout"});
    for(let i=0;i<bars.length;i++){
    bars[i].style.visibility='hidden';
    bars[i].style.width='18%';
    bars[i].style.background = colors[i];
    bars[i].style.boxShadow = "none";}
  } else {
    doRecord();
    for(let i=0;i<bars.length;i++){
    bars[i].style.visibility='visible'
    bars[i].style.boxShadow=boxshadow[i];
}
    timeline.to(drawer,{ height:"28%",duration:0.2,ease:"sine.inout"});
    
    const speechRecognizer=new window.webkitSpeechRecognition();
    speechRecognizer.continuous=true;
    speechRecognizer.interimResults=true;
    speechRecognizer.lang='en-US';
    speechRecognizer.start();
    navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{

    }) 
    speechRecognizer.onresult=(event)=>{
        const something=event.results[0][0].transcript;
        text.innerHTML=something;
        console.log(something);
    }
    for(let i=0;i<bars.length;i++){
        bars[i].style.visibility='visible'
    }
    setTimeout(async ()=>{
     // alert("hi");
        speechRecognizer.stop();
        console.log("stop");
        await animateBars()
        //const timeline2=gsap.timeline({repeat:3,repeatDelay:0.05});
  //       for(let i=0;i<4;i++){
  //       for(let i=0;i<bars.length;i++){
  //         for(let j=0;j<bars.length;j++){
  //       gsap.to(bars[i],{
  //         width:"100%",
  //         duration:0.2,
  //         ease:"linear"
  //       },"+=0.05")
  //       if(j!=i){
  //         gsap.to(bars[j],{
  //           width:"0%",
  //           duration:0.2,
  //           ease:"linear"
  //         },"-=0.2")

  //       }
  //     }
  //   }
  //   //   //timeline2.play();
  //   //   }
  // }  
    }, 5000)

  }
  isOpen = !isOpen;
  timeline.play(); 
})