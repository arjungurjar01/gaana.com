

const music =new Audio('assets/songs/12.mp3');
// music.play();

// create Array

const songsData = [
    {
        id : 1,
        songName: " Arambh Hai Prachand",
        songImage:"assets/images/1.jpg",
    },
    {
        id : 2,
        songName: " Ziddi Hai",
        songImage:"assets/images/2.jpg",
    },
    {
        id : 3,
        songName: "Sultan",
        songImage:"assets/images/3.jpg"
    },
    {
        id : 4,
        songName: " Sanju",
        songImage:"assets/images/4.jpg"
    },
    {
        id : 5,
        songName: "Restart:12th Fail",
        songImage:"assets/images/5.jpg"
    },
    {
        id : 6,
        songName: "Mat Kar Maya Ka Ahankar",
        songImage:"assets/images/6.jpg"
    },
    {
        id : 7,
        songName: "Restart:12th Fail",
        songImage:"assets/images/7.jpg"
    },
    {
        id : 8,
        songName: "Kya Leke Aaya Jagat Me",
        songImage:"assets/images/8.jpg"
    },
    {
        id : 9,
        songName: "Dangal",
        songImage:"assets/images/9.jpg"
    },
    {
        id : 10,
        songName: "Bulleya:Sultan",
        songImage:"assets/images/10.jpg"
    },
    {
        id : 11,
        songName: "Bandeya",
        songImage:"assets/images/11.jpg"
    },
    {
        id : 12,
        songName: "Arambh Hai Prachand",
        songImage:"assets/images/1.jpg"
    }
]

Array.from(document.getElementsByClassName('song-card')).forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songsData[i].songImage;
    element.getElementsByTagName('p')[0].innerHTML=songsData[i].songName;
})


// master-play

let masterPlay = document.getElementById('masterPlay');

masterPlay.addEventListener('click',()=>{
    if(music.paused || music.currentTime <=0){
        
        music.play();
        // masterPlay.remove(src="assets/svg/playbtn.svg");
        // masterPlay.add(src="assets/svg/pause.svg");
         masterPlay.src ="assets/svg/pause.svg";
    }else{
        music.pause();
        // masterPlay.setAttribute(src="assets/svg/pause.svg");
        // masterPlay.remove(src="assets/svg/playbtn.svg");
        masterPlay.src ="assets/svg/playbtn.svg";
    }
})




// overlay-play



const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('overlayPlay')).forEach((element)=>{
    
    //    element.classList.remove('overlay-pause');
       element.classList.add('overlay');
      
    })
}  


//Card Background

const makeAllBackgrounds = ()=>{
    Array.from(document.getElementsByClassName('song-card')).forEach((element)=>{
               element.style.background ="transparent";
               element.style.padding ="0"
               element.style.borderRadius ="0"
    })
}  

const makeOneBackground = ()=>{
    let oneBackground =  Array.from(document.getElementsByClassName('song-card'))[`${index-1}`]
           
            oneBackground.style.background ="#222428 ";
            oneBackground.style.padding ="6px"
            oneBackground.style.borderRadius ="10px"
    
} 




let index = 0;
let masterPlayPoster = document.getElementById('masterPlayPoster');
let masterPlayTitle = document.getElementById('masterPlayTitle');

Array.from(document.getElementsByClassName('overlayPlay')).forEach((element)=>{
          element.addEventListener('click',(e)=>{
        
            index = e.target.id;

           console.log(e.target.id)
          
                makeAllPlays();
                // e.target.classList.add('overlay-pause');
                e.target.classList.remove('overlay');
                
            music.src = `assets/songs/${index}.mp3`;
        
            masterPlayPoster.src = `assets/images/${index}.jpg`; 
            music.play();
            let song_title = songsData.filter((ele)=>{
                return ele.id == index ;
            })

            song_title.forEach(ele =>{
                let {songName} = ele ;
                masterPlayTitle.innerHTML = songName;
            })
            masterPlay.src ="assets/svg/pause.svg";
            music.addEventListener('ended',()=>{
                masterPlay.src ="assets/svg/playbtn.svg";
            })

            makeAllBackgrounds();
            // Array.from(document.getElementsByClassName('song-card'))[`${index-1}`].style.background ="#222428";
            makeOneBackground();
        })   
})



// progress bar

let currentstart = document.getElementById('currentstart');
let endTime = document.getElementById('endTime');
let seek = document.getElementById('seek');

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if(sec<10){
        sec = `0 ${sec}`;
    }

    endTime.innerText = `${min}:${sec}`;


    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec1<10){
        sec1 = `0 ${sec1}`;
    }

    currentstart.innerText = `${min1}:${sec1}`;

    let progressBar = parseInt((music.currentTime/music.duration)*100);

    seek.value = progressBar;
    // let seekbar = seek.value;
})

seek.addEventListener('change',()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended',()=>{
    masterPlay.src ="assets/svg/playbtn.svg";
})


// volume control

let volumeIcon = document.getElementById('volumeIcon');

let volumeBar = document.getElementById('volume');

volume.addEventListener('change',()=>{

    if(volumeBar.value == 0){
       volumeIcon.scr="assets/svg/volumeoff.svg";
    }
    if(volumeBar.value > 0){
        volumeIcon.scr="assets/svg/volumelow.svg";
     }
     if(volumeBar.value > 50){
        volumeIcon.scr="assets/svg/volumeon.svg";
     }

     let volume_a = volumeBar.value;
    //   volumeBar.style.width = `${volume_a}%`

     music.volume = volume_a/100 ;
})



// back and next button functionality 

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click',()=>{
    index -= 1;
    if(index < 1){
        index= Array.from(document.getElementsByClassName('song-card')).length ;
    }
    music.src = `assets/songs/${index}.mp3`;
        
    masterPlayPoster.src = `assets/images/${index}.jpg`; 
    music.play();
    let song_title = songsData.filter((ele)=>{
        return ele.id == index ;
    })

    song_title.forEach(ele =>{
        let {songName} = ele ;
        masterPlayTitle.innerHTML = songName;
    })
    makeAllPlays();
    document.getElementById(`${index}`).src="assets/svg/pause.svg";
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song-card'))[`${index-1}`].style.background ="rgb(105,105,170,.1)";
})



next.addEventListener('click',()=>{
    index -= 0;
    index += 1;
    if(  index > Array.from(document.getElementsByClassName('song-card')).length){
       index = 1;
    }
    music.src = `assets/songs/${index}.mp3`;
        
    masterPlayPoster.src = `assets/images/${index}.jpg`; 
    music.play();
    let song_title = songsData.filter((ele)=>{
        return ele.id == index ;
    })

    song_title.forEach(ele =>{
        let {songName} = ele ;
        masterPlayTitle.innerHTML = songName;
    })
    makeAllPlays();
    document.getElementById(`${index}`).src="assets/svg/pause.svg";
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song-card'))[`${index-1}`].style.background ="rgb(105,105,170,.1)";
})