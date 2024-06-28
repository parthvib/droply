const btn=document.getElementById("button");
const colorGrid=document.querySelector(".grid");
const hex=document.querySelector(".hexValue");


btn.addEventListener("click",async ()=>{
     let[tab]=await chrome.tabs.query({active: true,currentWindow:true}) // this is used to store information about the current tab
     chrome.scripting.executeScript({
          target:{tabId:tab.id}, // this is used to access current tab and apply script
          function:pickColor,
     },async(injectionResults)=> {
         const [data]=injectionResults;
         console.log(data);
         const color=data.result.sRGBHex
          colorGrid.style.backgroundColor=color;
          colorGrid.style.display="inline-block";
           hex.innerHTML=color
          navigator.clipboard.writeText(color);
         
          

     });

});
// the above function is executed in the popup
// the above code is running in different context and the function is running in the different context
// so we will not be able to access the variable that is loaded before.

async function pickColor(){
     try{
          const eyeDropper=new EyeDropper();
          return await eyeDropper.open();
           // this will activate our eye dropper
          // also the eyedropper returns the function that is selected
          // console.log(color.sRGBHex)
          // let color1=color.sRGBHex;
          // console.log(color1);
          // span.innerHTML=color1;
          
     }
     catch(err){

     }
}
// and this console.log and all is opened is the web page which runs int the code.
// we get the api's for eyedropper.
// we need to save the picked color into 
// to save in this in the above function we have to return it.
// to receive int the above function we have to use another aync function sent as parameter in the chrome scripting.
// to receive the value we use injectionresults.
// injectionResults is used to receive the value returned by the colorPicker function.
