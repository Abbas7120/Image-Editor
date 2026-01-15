const canvas=document.querySelector("#image-canvas")
const imageInput=document.querySelector("#image-input")
const canvasCtx=canvas.getContext("2d")
let file=null
let img=null
const filters={
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
Contrast:{
        value:100,
        min:0,
        max:200,
         unit:"%",
    },
   
    Saturation:{
        value:100,
        min:0,
        max:200,
         unit:"%",
    },
    hueRotation:{
        value:0,
        min:0,
        max:300,
         unit:"deg",
    },
    Blur:{
        value:0,
        min:0,
        max:20,
         unit:"px",
    },
    Grayscale:{
        value:0,
        min:0,
        max:100,
         unit:"%",
    },
    Sepia:{
        value:0,
        min:0,
        max:100,
         unit:"%",
    },
    Opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%",
    },
    Invert:{
        value:0,
        min:0,
        max:100,
          unit:"%",
    },
}
/* <div class="filters">
                <div class="filter">
                    <p>Brightness</p>
                    <input type="range" min="0" max="200" name="brightness" value="100">
  <p>Brightness</p> */
const filterContainer=document.querySelector(".filters")
function createFilterElement(name,unit="%",value,min,max){
const div=document.createElement("div")
div.classList.add('filter')
const input=document.createElement("input")
input.type="range"
input.min=min,
input.max=max,
input.value=value,
input.id=name
const p=document.createElement("p")
p.innerText=name

div.appendChild(p)
div.appendChild(input)
input.addEventListener("input",(event)=>{
    //console.log(input.value)
    // console.log(console.log(filters))
//console.log(filters(name))
filters[name].value=input.value;
//console.log(name,filters[name])
applyFilters()
})
return div
}

Object.keys(filters).forEach(filter=>{
    
    //console.log(filter,filters[filter])
const filterElement=createFilterElement(filter,filters[filter].unit,filters[filter].value,filters[filter].min,filters[filter].max)    
console.log(filterElement)
filterContainer.appendChild(filterElement)
})

imageInput.addEventListener("change",(e)=>{
//console.log("Change event fired")
const imagePlaceholder=document.querySelector(".placeholder")
const file=e.target.files[0]
//console.log(file)
const image=new Image()
image.src=URL.createObjectURL(file)
image.onload=()=>{
    img=image
    canvas.width=image.width
    canvas.height=image.height
    canvasCtx.drawImage(image,0,0)
}
imagePlaceholder.style.display="none"
})

function applyFilters(){
    canvasCtx.filter=`
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
  sepia(${filters.Sepia.value}${filters.Sepia.unit})
  opacity(${filters.Opacity.value}${filters.Opacity.unit})
contrast(${filters.Contrast.value}${filters.Contrast.unit})
   sepia(${filters.Sepia.value}${filters.Sepia.unit})`
    
    canvasCtx.drawImage(img,0,0)
}


