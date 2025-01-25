settings=document.getElementById("settings");
gear=document.getElementById("gear");
mid=document.getElementById("mid");
head=document.getElementById("head");
hour=document.getElementById("hour");
minute=document.getElementById("minute");
clock=document.getElementById("clock");
const timeline=gsap.timeline({paused:true})
const timeline2=gsap.timeline({paused:true})
const timeline3=gsap.timeline({paused:true})
timeline.to(gear,{
    rotate:'-45deg',
    duration:0.5
});
settings.addEventListener('click',()=>{
    if (timeline.isActive()) return;
    timeline.reversed()?timeline.play():timeline.reverse();
});
timeline.play()
timeline2.to(head,{
    rotate:'30deg',
    duration:0.5
});
timeline3.to(minute,{
    rotate:'360deg',
    duration:1
},'0')
mid.addEventListener('click',()=>{
    timeline2.play();
    timeline2.reverse(0.5);
})
clock.addEventListener('click',()=>{
    timeline3.restart();
});