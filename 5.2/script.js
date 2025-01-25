const button=document.getElementById('Gemini');
const filler=document.getElementById('filler');
const dot=document.getElementById("dot");
const gradient1="linear-gradient(#00D1DB,#0191DC,#0050DB)";
const gradient2="linear-gradient(#7700DB,#B100DB,#DC00C1)";
const wavy=document.getElementById("epitrochoid-shape")
const epfill=document.getElementById("epitrochoid-path")
const overlay=document.getElementById("overlay");
const epitochroid=document.getElementById("epitochroid");
const pill=document.getElementById("pill");
const hexagon=document.getElementById("hexagon");
const logo=document.getElementById("logo")
const timeline=gsap.timeline({paused:true,repeat:-1});
const tl=gsap.timeline({repeat:1});
button.addEventListener('mouseover',()=>{
    timeline.clear();
    timeline.to(button,{
        rotate:"180deg",
        duration:1.5,
        ease:"none"
    }).call(()=>{
        overlay.style.visibility='visible';
        dot.style.visibility="hidden";
        filler.style.visibility="visible";
});
    filler.style.fill="#FFFFF4";
    dot.style.backgroundColor='blue';
    timeline.to(overlay,{
        rotate:"120deg",
        duration:1,
        ease:"none"
    },">").call(()=>{
        overlay.style.visibility='hidden';
        pill.style.visibility='visible';
    })
    timeline.to(pill,{
        rotate:"120deg",
        duration:1,
        ease:"none"
    },">").call(()=>{
        pill.style.visibility='hidden';
        hexagon.style.visibility="visible";
    });
    timeline.to(hexagon,{
        rotate:"120",
        duration:1,
        ease:"none"
    },">").call(()=>{
        hexagon.style.visibility="hidden"
        dot.style.visibility="visible"
    })
    timeline.play();
    gsap.fromTo(dot,{background:gradient1},
        {background:gradient2,repeat:-1,yoyo:true,duration:3,
        }   
    );
    gsap.fromTo(overlay,{background:gradient1},
        {background:gradient2,repeat:-1,yoyo:true,duration:3,
        }  );
    gsap.fromTo(pill,{background:gradient1},
        {background:gradient2,repeat:-1,yoyo:true,duration:3}
    );
    gsap.fromTo(hexagon,{background:gradient1},
        {background:gradient2,repeat:-1,yoyo:true,duration:3}
    );
})
filler.addEventListener('mouseover',()=>{
    timeline.clear();
    timeline.to(button,{
        rotate:"180deg",
        duration:1.5,
        ease:"none"
    }).call(()=>{
        overlay.style.visibility='visible';
        dot.style.visibility="hidden";
        filler.style.visibility="visible";
});
    filler.style.fill="#FFFFF4";
    dot.style.backgroundColor='blue';
    timeline.to(overlay,{
        rotate:"120deg",
        duration:1,
        ease:"none"
    },">").call(()=>{
        overlay.style.visibility='hidden';
        pill.style.visibility='visible';
    })
    timeline.to(pill,{
        rotate:"120deg",
        duration:1,
        ease:"none"
    },">").call(()=>{
        pill.style.visibility='hidden';
        hexagon.style.visibility="visible";
    });
    timeline.to(hexagon,{
        rotate:"120",
        duration:1,
        ease:"none"
    },">").call(()=>{
        hexagon.style.visibility="hidden"
        dot.style.visibility="visible"
    })
    timeline.play();
    gsap.fromTo(dot,{background:gradient1},
        {background:gradient2,repeat:-1,yoyo:true,duration:3,
        }   
    );
    gsap.fromTo(overlay,{background:gradient1},
        {background:gradient2,repeat:-1,yoyo:true,duration:3,
        }  );
    gsap.fromTo(pill,{background:gradient1},
        {background:gradient2,repeat:-1,yoyo:true,duration:3}
    );
    gsap.fromTo(hexagon,{background:gradient1},
        {background:gradient2,repeat:-1,yoyo:true,duration:3}
    );
})
button.addEventListener('mouseout',()=>{
    timeline.pause();
    timeline.seek(0);
    overlay.style.visibility= "hidden";
    pill.style.visibility="hidden";
    hexagon.style.visibility="hidden";
    filler.style.visibility="visible";
    dot.style.visibility="visible";
    button.style.visibility="visible"

})