const drawer= document.getElementById("drawer");
const button= document.getElementById("clickMe");
const bars=document.getElementsByClassName("bar")
let wrapper=document.getElementById("wrapper");
let isOpen=false;
const timeline=gsap.timeline({paused:true});
let boxshadow=["0 0 18px 7px #4c8bf5","0 0 18px 7px #ff8a5c","0 0 18px 7px #ffff80","0 0 18px 7px #66e066"]
let gradients=['linear-gradient(90deg,blue,red)','linear-gradient(90deg,red,yellow)','linear-gradient(90deg,yellow,green)','linear-gradient(90deg,green)',]
let colors=['blue','red','yellow','green']
button.addEventListener('click',()=>{
  timeline.clear();
  if (isOpen) {
    timeline.to(drawer,{height:0,duration:0.125,ease:"sine.inout"});
    for(let i=0;i<bars.length;i++){
    bars[i].style.visibility='hidden';
    bars[i].style.width='18%';
    bars[i].style.background = colors[i];
    bars[i].style.boxShadow = "none";}
  } else {
    for(let i=0;i<bars.length;i++){
    bars[i].style.visibility='visible'}
    timeline.to(drawer,{ height:"28%",duration:0.2,ease:"sine.inout"});
    const tl2=gsap.timeline({repeat:2,repeatDelay:0.05});

    for(let i=0;i<bars.length;i++){
      tl2.to(bars[i],{width:"80%",duration:0.4,ease:"sine.inout",onComplete:()=>{
        for (let j=0;j<bars.length;j++) {
          bars[j].style.background = colors[j]; 
          bars[j].style.boxShadow ='none';
        }
      }
    ,onStart:()=>{
      for (let j=0;j<bars.length;j++){
        if (j!==i){
          bars[j].style.background = gradients[j];
        }else{
          bars[j].style.boxShadow=boxshadow[j];
        }
      }
    }});
      for (let j=0;j<bars.length;j++){
        if(j!=i){
          bars[j].style.background=gradients[j];
      tl2.to(bars[j],{width:"4%",duration:0.4,ease:"sine.inout"},"-=0.4");}
        }
    }
    tl2.to(bars[bars.length-1],{width:"4%",duration:0.4,ease:"sine.inout"});
    timeline.add(tl2);
    const tl3=gsap.timeline({repeat:1,repeatDelay:0.05});
    //dono expand till reach 80% then contract
    for(let i=0;i<bars.length-1;i++){
      tl3.call(()=>{
        wrapper.style.padding='0 1.5%';
        wrapper.style.justifyContent='start';
        for (let j=0; j<bars.length;j++) {
          if (j!==i&&j!==i+1) {
            bars[j].style.visibility = 'hidden';
            bars[j].style.width='0%';
          }else{
            bars[j].style.width='4%';
           bars[j].style.visibility="visible";
           bars[j].style.boxShadow=boxshadow[j];
          }
        }
      })
        tl3.to(bars[i],{width:"45%",duration:0.4,ease:"sine.inout"});
        tl3.to(bars[i+1],{width:"45%",duration:0.4,ease:"sine.inout"},"-=0.4")
        if(i%2==0){
        tl3.to(bars[i],{width:"75%",duration:0.2,ease:"sine.inout"},">")
        tl3.to(bars[i+1],{width:"15%",duration:0.2,ease:"sine.inout"},"-=0.2")}
        else{
          tl3.to(bars[i+1],{width:"75%",duration:0.2,ease:"sine.inout"},">")
        tl3.to(bars[i],{width:"15%",duration:0.2,ease:"sine.inout"},"-=0.2")
        } 
        tl3.to({},{duration:0.1});  
}
tl3.call(()=>{
  for(let i=0;i<bars.length;i++){
    bars[i].style.visibility='visible';
  }
})

timeline.add(tl3,'>');
}
timeline.call(()=>{
  for(let i=0;i<bars.length;i++){
    bars[i].style.visibility='hidden';
    wrapper.style.justifyContent='center';
    wrapper.style.padding='0 0';
    bars[i].style.boxShadow='none';
  }
})
  isOpen = !isOpen;
  timeline.play(); 
})