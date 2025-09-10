

const timer=document.getElementById("time");
const btnStart=document.getElementById("start")
const btnTitle=document.querySelector('.title')
const btnPause=document.getElementById("pause")
const btnResume=document.getElementById("resume")
const btnReset=document.getElementById("reset")

const root = document.documentElement;
const workTimeMinutes = document.getElementById('workMinutesInput');
const shortbreakminutes = document.getElementById('shortbreakminutes');
const longbreakminutes = document.getElementById('longbreakinput');
const close=document.querySelector(".btnCloseSetting")
const workcycledisplay=document.querySelector(".work_cycle_display")
const alarmSound = document.getElementById('piano');
 const btnwork=document.querySelector(".worktime");
 const btnshort=document.querySelector(".shortbreak");
 const btnlong=document.querySelector(".longbreak")
const audioToggle = document.getElementById('audioToggle');
const motivateQuote=document.querySelector('.motivateQuote')
 const workcycleinput=document.getElementById("workCycle")
const autoworksession=document.getElementById("workSession")



//variables
let Work_Time=workTimeMinutes.value*60;
let Break_Time=shortbreakminutes.value*60;
let Long_Break=longbreakminutes.value*60;
let timerID=null;
let oneRoundedCompleted=false;
let totalCount=0;
let play=true;
let paused=false;
let pausedbar=false;
let workCount=0;
let interval;
let workSession=workcycleinput.value;
console.log("worksession",workSession)
let progress;
let autoinputsession=autoworksession.value;
console.log("auto work session",autoinputsession)

// Audio play pause function
function alarmoPlayPause(){
 if (audioToggle.checked) {
            alarmSound.play();
            alarmSound.volume=0.3;
        } else {
            alarmSound.pause();
                    }     
}
//Add Event Listener to Update the value of Work time
workTimeMinutes.addEventListener('input',function(){
    Work_Time=this.value*60
})
// Add event listener to update the  value of short break
    shortbreakminutes.addEventListener('input', function() {
          Break_Time= this.value*60;        
            });
//Add Event Listener to Update the value of Long Breake
longbreakminutes.addEventListener('input',function(){
    Long_Break=this.value*60
})
// Add Event listener to Update WorkCycle 
workcycleinput.addEventListener('input',function(){
    workSession=this.value;
    console.log("worksession",workSession)
})
// Add Event listener to Update WorkSession 
autoworksession.addEventListener('input',function(){
    autoinputsession=this.value;
    console.log("auto work session",autoinputsession)
})
         
//Add event listener to WorkTime button 
btnwork.addEventListener('click',()=>{
        const mins=Math.floor(Work_Time/60).toString().padStart(2,'0');
        const secs=Math.floor(Work_Time%60).toString().padStart(2,'0');
        timer.textContent=`${mins}:${secs}`;
    })           
//Add event listener to Short_break button 
btnshort.addEventListener('click',()=>{
        const mins=Math.floor(Break_Time/60).toString().padStart(2,'0');
        const secs=Math.floor(Break_Time%60).toString().padStart(2,'0');
        timer.textContent=`${mins}:${secs}`;
    })           
//Add event listener to Short_break button 
btnlong.addEventListener('click',()=>{
        const mins=Math.floor(Long_Break/60).toString().padStart(2,'0');
        const secs=Math.floor(Long_Break%60).toString().padStart(2,'0');
        timer.textContent=`${mins}:${secs}`;
    })           

// function to update title
const updateTitle=(msg,motivate)=>{
    btnTitle.textContent=msg;
    motivateQuote.textContent=motivate;
}


// function to countdown time
const countDown=(time)=>{
    return ()=>{
        const mins=Math.floor(time/60).toString().padStart(2,'0');
        const secs=Math.floor(time%60).toString().padStart(2,'0');
    
    timer.textContent=`${mins}:${secs}`;
    time--;   
    if(workCount==autoinputsession){
        stopTimer();
        updateTitle("Time Period","Finished");
        return;
        
    } 
    if(time<0){
        stopTimer();    
        if(totalCount/workSession==1){
        timerID=startTimer(Long_Break);
        alarmoPlayPause();        
        updateTitle("Long Break Time","'If you get tired, learn to rest, not to quit'");

        root.style.setProperty('--orange','#154D71');
        root.style.setProperty('--yellow','#1C6EA4');
        root.style.setProperty('--darkorange','#33A1E0');
        root.style.setProperty('--lemon','#78c3efff');        
        console.log("Long Break")
       
         oneRoundedCompleted=true;
         totalCount=0;
         console.log(totalCount)
       }else     
        if(oneRoundedCompleted===false){
        timerID=startTimer(Break_Time);
// color theme for short break time
        root.style.setProperty('--orange','#556B2F');
        root.style.setProperty('--yellow','#8FA31E');
        root.style.setProperty('--darkorange','#C6D870');
        root.style.setProperty('--lemon','#eff5d2');
        alarmoPlayPause()
        
        oneRoundedCompleted=true;
        updateTitle("Short Break Time","'Breathe. Reset. Conquer.'");
         totalCount++;
         console.log("total count",totalCount)
        
        }    
        else {
             timerID=startTimer(Work_Time);
                        
            updateTitle("Work time start","'Welcome Back,Keep Growing'");
            // totalCount++;
             workCount++;
             console.log("work Count",workCount)
            // color theme for work time
             root.style.setProperty('--orange','#ffbc4c');
        root.style.setProperty('--yellow','#ffde63');
        root.style.setProperty('--darkorange','#ffbc0c');
        root.style.setProperty('--lemon','#feffc4');             oneRoundedCompleted=false;
                    }                  
}
    }
}

// start timer function
const startTimer=(startTime)=>{
        if(timerID !==null){
        stopTimer();
    }
    return setInterval(countDown(startTime),1000);

}
// stop timer function
const stopTimer=()=>{
    clearInterval(timerID)
    timerID=null;
}
   //local storage function
const saveLocalCounts=()=>{
    let counts=JSON.parse(localStorage.getItem("workCycle"));
if(workCount=2){
    counts !==null?counts++:counts=1;
}
    // counts++
    localStorage.setItem("workCycle",JSON.stringify(counts));
}

// get time in seconds
const getTimerInseconds=(timerString)=>{
    const[minutes,seconds]=timerString.split(":");
    return parseInt( minutes*60)+(seconds);
}
// function  to darkmode
const darkmode=document.getElementById("darkmode")
darkmode.addEventListener('click',()=>{
    
    let element=document.body
    element.classList.toggle("dark-mode")
        
})

//start event lister to start button
btnStart.addEventListener('click',()=>{     
         timerID=startTimer(Work_Time) 
         updateTitle("Work Time Start","'Greatness takes time'")
                    
     } )
//start event lister to pause button
btnPause.addEventListener('click',()=>{
     stopTimer();
     paused=true;
     updateTitle("Timer Paused")
         } )

//start event lister to Resume button
btnResume.addEventListener('click',()=>{
    if(paused){
      let currentTime=getTimerInseconds(timer.textContent);
      timerID=startTimer(currentTime);          
       paused=false;         
      (!oneRoundedCompleted)?updateTitle("It is work time"):updateTitle("it  is break timer")      
    }      
     } );
    //  event listner to reset button
    btnReset.addEventListener('click',()=>{
        stopTimer();
        timer.textContent="25:00";
    })
    // function for keyboard shortcuts
    function reset(){
     stopTimer();
        timer.textContent="25:00";  
        
    }
    function start(){
        timerID=startTimer(Work_Time)
        updateTitle("Work Time","Time to focuss")
    }
    function resume(){
if(paused){
      let currentTime=getTimerInseconds(timer.textContent);
      timerID=startTimer(currentTime);          
       paused=false;
           
      (!oneRoundedCompleted)?updateTitle("It is work time"):updateTitle("it  is break timer")
    }}

    function stoptimer(){
        stopTimer();
     paused=true;
     updateTitle("Timer Paused")
    }
    

//  function to completed show work cycle from local storage
const showWorkCycle=()=>{
    const counts= JSON.parse(localStorage.getItem("workCycle"));  
    if(counts>0){
workcycledisplay.style.display="flex";
    }  
    workcycledisplay.firstElementChild.textContent=counts;
}

// event listener  for keyboard shorcut
document.addEventListener("keydown",function(event){
    if(event.key==="s"){
        event.preventDefault();
        start ()
    }
    if(event.key==="p"){
        event.preventDefault();
            stoptimer() 
    }
    if(event.key==="e"){
        event.preventDefault();
               reset();
               stoptimer() 
    }
    if(event.key==="r"){
        event.preventDefault();
                resume();
    }

})

// show hide functionality of setting
 function hidediv(){
  const mydiv=document.getElementById("settingcontainer");
  mydiv.style.display="none";
}
// event listener for setting
const setting=document.getElementById("setting");
setting.addEventListener('click',()=>{
const mydiv=document.getElementById("settingcontainer");
  mydiv.style.display="block";  

})
// event listener for about
const about=document.getElementById("aboutTimetracker")
// add event listener to about 
about.addEventListener('click',()=>{
    const aboutContainer=document.querySelector(".aboutus");

    aboutContainer.style.display="block";

})
// Add event listener to close button of About container
const closeAbout=document.querySelector(".closeAbout");
closeAbout.addEventListener('click',()=>{
    const aboutContainer=document.querySelector(".aboutus");
    aboutContainer.style.display="none";
})

//Task event listener
const addtaskcontainerButton=document.querySelector(".btnaddtask")
const addtaskcontainer=document.querySelector(".inputtaskContainer")
addtaskcontainerButton.addEventListener('click',()=>{
    addtaskcontainer.style.display='block';
})
const taskinput=document.querySelector(".taskInput")
const tasklist=document.querySelector(".task_list")
const addButton=document.querySelector(".addTaskButton")
const hidetaskContainer=document.querySelector(".taskOkbutton");

hidetaskContainer.addEventListener('click',()=>{
    addtaskcontainer.style.display='none';
})

addButton.addEventListener('click',()=>{
      
    let  newTask=taskinput.value;
    let listitem=document.createElement('li');
    if(newTask===' '){
        alert('pleae enter a task');
        return;
    }        
        listitem.textContent=newTask;
           tasklist.appendChild(listitem);
           tasklist.style.backgroundColor='white';
                taskinput.value=' ';
        taskinput.focus();
    
    })
