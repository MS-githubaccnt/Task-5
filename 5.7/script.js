const tabs=document.querySelectorAll(".tab");
const bar=document.getElementById("bar")
const tablist=document.getElementsByClassName("tab");
tabs.forEach((tab)=> {
    tab.addEventListener("click",()=>{
        bar.style.visibility='visible'
        for(let i=0;i<tablist.length;i++){
            if(tablist[i]!=tab){
            tablist[i].style.color="white"};
        }  
        tab.style.color="#D0DEE2"
        gsap.to(bar,{
            width:`${tab.offsetWidth*0.6}`,
            duration:1,
            ease:"power2.out" ,
            onUpdate:()=>{
                let bpos=bar.offsetLeft+bar.offsetWidth/2;
                let tpos=tab.offsetLeft+tab.offsetWidth/2;
                const send=tpos-bpos;
                gsap.to(bar,{
                    x:`${send}`,
                    duration:1,
                    ease:"power2.out"
                })
            }
        })
    });
});
