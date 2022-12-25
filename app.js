var slider=document.getElementById("range");
var area=document.getElementById("area");
var merge_sort=document.getElementById("merge_sort");
var quick_sort=document.getElementById("quick_sort");
var selection_sort=document.getElementById("selection_sort");
var bubble_sort=document.getElementById("bubble_sort");
var insertion_sort=document.getElementById("insertion_sort");
var speed=document.getElementById('speed')
var speedval=document.getElementById('speedval')
var arraylen=document.getElementById('arraylen')
var speedlen;
speedlen=speed.value;
speed.oninput=function(){
    speedlen=this.value;
    speedval.innerHTML=`×${(1000-speedlen)/10}`
}
var len;
len=slider.value;
console.log(len)
generateArray(len)
slider.oninput=function(){
    len=this.value
    console.log(len)
    arraylen.innerHTML=`${len}`
    generateArray(len)
}

function generateArray(){
    console.log(len)
    let widthofBar=Math.floor(1000/len);
    console.log(widthofBar)
    array=[]
    for(let i=0;i<len;i++){
        array.push(Math.floor(Math.random()*40)+5)
    }
    area.innerHTML='';
    for(let i=0;i<len;i++){
    let element=document.createElement('div')
    element.setAttribute('class','element')
    element.style.background='red'
     element.style.height=(array[i]*10)+'px';
     element.style.width=widthofBar+'px'
     area.appendChild(element)
    }
    //  area.style.width=len*10+13+'px';

}
let run=true;
let stop=false;
let pause=document.getElementById("pause");
let play=document.getElementById("play");
pause.addEventListener('click',()=>{
if(run===true){run=false;}
})
play.addEventListener('click',()=>{
    if(run===false){
        run=true;
    }
})

async function pauseAnimation(){
    while(run===false){
        await sleep(speedlen);
        }    return;
    
}
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

bubble_sort.addEventListener('click',async ()=>{
    slider.disabled=true;
    quick_sort.disabled=true;
    merge_sort.disabled=true;
    insertion_sort.disabled=true;
    selection_sort.disabled=true;
    bubble_sort.disabled=true;
    run=true;
    let child=area.childNodes;
    console.log(child[0])
    for(let i=0;i<len;i++){
        for(let j=0;j<len-i-1;j++){
            child[j].style.background='yellow';
            let h1=child[j].style.height;
            h1=h1.substr(0,h1.length-2);
            h1=parseInt(h1);
            let h2=child[j+1].style.height;
            h2=h2.substr(0,h2.length-2);
            h2=parseInt(h2);
            child[j+1].style.background='blue';
            await sleep(speedlen);
            if(h1>h2){
                child[j+1].parentNode.insertBefore(child[j+1],child[j]);
            }
            if(run===false){
                await pauseAnimation();
            }
                child[j].style.background='green';
                child[j+1].style.background='green';
            
        }
    }
    slider.disabled=false;
    quick_sort.disabled=false;
    merge_sort.disabled=false;
    insertion_sort.disabled=false;
    selection_sort.disabled=false;
    bubble_sort.disabled=false;
})

selection_sort.addEventListener('click',async()=>{
    slider.disabled=true;
    quick_sort.disabled=true;
    merge_sort.disabled=true;
    insertion_sort.disabled=true;
    selection_sort.disabled=true;
    bubble_sort.disabled=true;
    run=true;
    let child=area.childNodes;
    for(let i=0;i<len;i++){
      min_index=i;
      child[min_index].style.background='yellow';
      for(let j=i+1;j<len;j++){
        let h1=child[min_index].style.height;
        h1=h1.substr(0,h1.length-2);
        h1=parseInt(h1);
        let h2=child[j].style.height;
        child[j].style.background='blue';
        h2=h2.substr(0,h2.length-2);
        h2=parseInt(h2);
        await sleep(speedlen);
        if(h2<h1){
            child[min_index].style.background='green';
            min_index=j;
            child[min_index].style.background='yellow';

        }
        else{
            child[j].style.background='green';
        }
        if(run===false){
            await pauseAnimation();
        }
      }
      child[min_index].parentNode.insertBefore(child[min_index],child[i]);
      child[min_index].style.background='green';
      child[i].style.background='green';

    } 
    slider.disabled=false;
    quick_sort.disabled=false;
    merge_sort.disabled=false;
    insertion_sort.disabled=false;
    selection_sort.disabled=false;
    bubble_sort.disabled=false;
})

insertion_sort.addEventListener('click',async()=>{
    let key;
    slider.disabled=true;
    quick_sort.disabled=true;
    merge_sort.disabled=true;
    insertion_sort.disabled=true;
    selection_sort.disabled=true;
    bubble_sort.disabled=true;
    run=true;
    let child=area.childNodes;
    for(let i=1;i<array.length;i++){
        let j=i-1;
         key=array[i];
         child[i].style.background='yellow';
         while(j>=0&&array[j]>key){
            child[j].style.background='blue';
            array[j+1]=array[j];
            child[j+1].style.height=(array[j]*10)+"px";
            if(run===false){
                await pauseAnimation();
            }
            await sleep(speedlen);
            child[j].style.background='green';
            j--;
         } 
         child[i].style.background='green';
         child[j+1].style.height=(key*10)+"px";
         array[j+1]=key;
    }
    slider.disabled=false;
    quick_sort.disabled=false;
    merge_sort.disabled=false;
    insertion_sort.disabled=false;
    selection_sort.disabled=false;
    bubble_sort.disabled=false;
})


merge_sort.addEventListener('click',async()=>{
    slider.disabled=true;
    quick_sort.disabled=true;
    merge_sort.disabled=true;
    insertion_sort.disabled=true;
    selection_sort.disabled=true;
    bubble_sort.disabled=true;
    run=true;
    let child=area.childNodes;
    await merge(0,len-1);
    slider.disabled=false;
    quick_sort.disabled=false;
    merge_sort.disabled=false;
    insertion_sort.disabled=false;
    selection_sort.disabled=false;
    bubble_sort.disabled=false;
})

async function merge(l,r){
  if(l<r){
    let child=area.childNodes;
    let mid=Math.floor(l+(r-l)/2);
    await merge(l,mid);
    await merge(mid+1,r);
    await mergesort(l,mid,r);
    await sleep(speedlen);
    if(run===false){
       await pauseAnimation();
    }

  }
}

async function mergesort(l,mid,r){
temp_arr=[]
let child=area.childNodes;
let i=l;
let j=mid+1;
 while(i<=mid && j<=r){
    child[i].style.background='yellow';
    child[j].style.background='blue';
    if(run===false){
        await pauseAnimation();
    }
     await sleep(speedlen);
     child[i].style.background='green';
     child[j].style.background='green';
     if(array[i]<=array[j]){
        temp_arr.push(array[i]);
        i++;
     }
     else{
        temp_arr.push(array[j]);
        j++;
     }
 }
 while(i<=mid){
    temp_arr.push(array[i]);
    i++;
 }
 while(j<=r){
    temp_arr.push(array[j]);
     j++;
}
let k=0;
for(let i=l;i<=r;i++){
  array[i]=temp_arr[k];
  k++;
}
if(run===false){
    await pauseAnimation();
}
for(let i=l;i<=r;i++){
    child[i].style.height=(array[i]*10)+'px';
}
}


quick_sort.addEventListener('click',async()=>{
    slider.disabled=true;
    quick_sort.disabled=true;
    merge_sort.disabled=true;
    insertion_sort.disabled=true;
    selection_sort.disabled=true;
    bubble_sort.disabled=true;
    run=true;
    let child=area.childNodes;
    await quicksort(0,len-1);
    slider.disabled=false;
    quick_sort.disabled=false;
    merge_sort.disabled=false;
    insertion_sort.disabled=false;
    selection_sort.disabled=false;
    bubble_sort.disabled=false;

})

async function quicksort(l,r){
    if(l<=r){
        let child=area.childNodes;
        let pivot=await qsort(l,r);
        if(run===false){
       await pauseAnimation();
        }
        child[pivot].style.background='green';
        await quicksort(l,pivot-1);
        await quicksort(pivot+1,r);

    }
}

async function qsort(l,r,pivot){
 let key=array[r];
 let index=l;
 let child=area.childNodes;
 for(let i=l;i<r;i++){
    child[index].style.background='blue'
    child[i].style.background='yellow'
    if(run===false){
        await pauseAnimation();
    }
    await sleep(speedlen);
    child[i].style.background='red'
    child[index].style.background='red'
    if(array[i]<key){
        let temp=array[index];
        array[index]=array[i];
        array[i]=temp;
        child[index].style.height=(array[index]*10)+'px';
        child[i].style.height=(array[i]*10)+'px';
        index++;

    }
    child[i].style.background=pivot;
    
 }
 [array[index],array[r]]=[array[r],array[index]];
 child[index].style.height=(array[index]*10)+'px';
 child[r].style.height=(array[r]*10)+'px';
 child[r].style.background=pivot;
 return index;

}
