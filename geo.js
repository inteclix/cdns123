// ==UserScript==
// @name         geoflotte
// @namespace    http://seddikbenz.github.com
// @version      0.1
// @description  script without calculator
// @author       You
// @match        https://i2b.geoflotte.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
let scriptMomentJS = document.createElement('script');
scriptMomentJS.src = "https://momentjs.com/downloads/moment-with-locales.min.js";
    document.body.append(scriptMomentJS)
window.sum = 0
let divs = document.getElementsByClassName('x-grid3-cell-inner x-grid3-col-distance')
let input = document.createElement('input')
window.a = null
window.b = null
document.body.appendChild(input)

window.zero = () => {
  divs = document.getElementsByClassName('x-grid3-cell-inner x-grid3-col-distance')
  let dates_d = document.getElementsByClassName('x-grid3-col-dateDepart')
  let dates_a = document.getElementsByClassName('x-grid3-col-dateArrivee')
  for (let i = 0; i < divs.length; i++) {
    divs[i].removeEventListener('click', clickListener2)
    divs[i].addEventListener('click', clickListener2)
  }
  for (let i = 0; i < dates_d.length; i++) {
    dates_d[i].removeEventListener('click', copyListener)
    dates_d[i].addEventListener('click', copyListener)
  }
  for (let i = 0; i < dates_a.length; i++) {
    dates_a[i].removeEventListener('click', copyListener)
    dates_a[i].addEventListener('click', copyListener)
  }
  for (let i = 0; i < divs.length; i++) {
    divs[i].style.backgroundColor = 'white'
    divs[i].style.color = 'black'
    divs[i].style.borderRight = ""
    window.sum = 0
    document.getElementById('result-km-benz').innerHTML = '0'
  }
  document.getElementById('result-km-benz').removeEventListener('click', copyKMListener2)
  document.getElementById('result-km-benz').addEventListener('click', copyKMListener2)

    let addressD = document.getElementsByClassName("x-grid3-cell-inner x-grid3-col-depart")
for(let i=0; i<addressD.length; i++){
	if(!(addressD[i].innerText.includes("PARC LOGISTICS") || addressD[i].innerText.includes("ATELIER") || addressD[i].innerText.includes("COMPLEX CLIMATISEUR"))){
		addressD[i].style.backgroundColor = "#e4ece9" // gray
        //addressD[i].parentElement.parentElement.style.backgroundColor = "#e4ece9"
	} else {
        let next = addressD[i].parentElement.nextSibling.nextSibling
        if(!(next.innerText.includes("PARC LOGISTICS") || next.innerText.includes("ATELIER") || next.innerText.includes("COMPLEX CLIMATISEUR"))){
            addressD[i].style.backgroundColor = "#cbeaa6" // green
        }
    }
}

let addressA = document.getElementsByClassName("x-grid3-cell-inner x-grid3-col-arrivee")
for(let i=0; i<addressA.length; i++){
	if(!(addressA[i].innerText.includes("PARC LOGISTICS") || addressA[i].innerText.includes("ATELIER") || addressA[i].innerText.includes("COMPLEX CLIMATISEUR"))){
		addressA[i].style.backgroundColor = "#e4ece9" // gray
        //addressA[i].parentElement.parentElement.style.backgroundColor = "#e4ece9"
	}else {
        let next = addressA[i].parentElement.previousSibling.previousSibling
        if(!(next.innerText.includes("PARC LOGISTICS") || next.innerText.includes("ATELIER") || next.innerText.includes("COMPLEX CLIMATISEUR"))){
            addressA[i].style.backgroundColor = "#ffc7c3" // red
        }
    }
}
}
if (document.getElementById('div-result-km-benz') === null) {
  let dd = document.createElement('div');
  dd.innerHTML +=
  `<div id='div-result-km-benz' style="
    position: absolute;
    opacity: 0.8;
    height: 82px;
    border-radius: 8px;
    border: 3px solid #495768;
    width: 100px;
    z-index: 10000;
    background: #dde5e9;
    right: 40px;
    bottom: 5px;
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
">
	  <a style="
border-radius: 3px;
    background-color: #505f72;
    color: white;
    text-decoration: none;
    cursor: pointer;
    width: 80px;
    padding: 5px 5px;
    position: absolute;
    user-select: none;
    top: 5px;
    text-align: center;
"
onclick='window.zero()'> START </a>
	  <h1 style="color: #000;
    font-size: 24px;
    position: absolute;
cursor: pointer;
    bottom: 10px;" id='result-km-benz'>0</h1>
  </div>`;
  document.body.appendChild(dd);
}
const clickListener = (e) => {
  let a = e.target.innerText.replace(',', '.')
  a = Number.parseFloat(a)
  let bgC = e.target.style.backgroundColor
  switch (bgC) {
    case 'green':
      window.sum -= a
     // console.log("sum = " + window.sum)
      window.sum = Math.round(window.sum * 100) / 100
      document.getElementById('result-km-benz').innerHTML = window.sum
      e.target.style.backgroundColor = 'white'
      e.target.style.color = 'black'
      break;
    default:
      window.sum += a
      window.sum = Math.round(window.sum * 100) / 100
      //console.log("sum = " + window.sum)
      document.getElementById('result-km-benz').innerHTML = window.sum
      e.target.style.backgroundColor = 'green'
      e.target.style.color = 'white'
      break;
  }
}

const clickListener2 = (e) => {
// a.parentElement.parentElement.getElementsByClassName("x-grid3-col-dateDepart")[0].innerText.replace(/[-_]/g,'/')
    //moment(a.parentElement.parentElement.getElementsByClassName("x-grid3-col-dateDepart")[0].innerText.replace(/[-_]/g,'/'),'DD/MM/YYYY hh:mm:ss')
  if(window.a !== null && window.b !== null){
    window.a = null
    window.b = null
    window.zero()
    clickListener2(e)
  } else
  if(window.a === null && window.b === null){
    window.a = e.target
    //window.a.style.backgroundColor = '#cbeaa6'
      window.a.style.borderRight = "3px solid green"
      //console.log("a")
  } else
  if(window.a !== null && window.b === null){
    window.b = e.target
    //window.b.style.backgroundColor = '#ffc7c3'
     window.b.style.borderRight = "3px solid red"
     // console.log("b")
      let ma = moment(window.a.parentElement.parentElement.getElementsByClassName("x-grid3-col-dateDepart")[0].innerText.replace(/[-_]/g,'/'),'DD/MM/YYYY hh:mm:ss')
      let mb = moment(window.b.parentElement.parentElement.getElementsByClassName("x-grid3-col-dateDepart")[0].innerText.replace(/[-_]/g,'/'),'DD/MM/YYYY hh:mm:ss')
      if(mb < ma) {
          let z = window.a
          window.a = window.b
          window.b = z
          //window.a.style.backgroundColor = '#cbeaa6'
          //window.b.style.backgroundColor = '#ffc7c3'
          window.a.style.borderRight = "3px solid green"
          window.b.style.borderRight = "3px solid red"
      }

      let aParent = window.a.parentElement.parentElement.parentElement.parentElement.parentElement
      let bParent = window.b.parentElement.parentElement.parentElement.parentElement.parentElement

      if(window.location.href.includes("historiquedestrajets")){
      let i = 0
      let next = bParent
      window.next = next
      let km = 0
      let totalKm = Number.parseFloat(next.children[0].children[0].children[0].getElementsByClassName('x-grid3-cell-inner x-grid3-col-distance')[0].innerText.replace(',', '.'))
      while(next != aParent && next.nextElementSibling != null){
          next = next.nextElementSibling
          //console.log(next)
          km = Number.parseFloat(next.children[0].children[0].children[0].getElementsByClassName('x-grid3-cell-inner x-grid3-col-distance')[0].innerText.replace(',', '.'))
          totalKm = totalKm + km
          //console.log(totalKm)
          i = i + 1
          //if(i == 50) {break;}
      }
      totalKm = Math.round(totalKm * 100) / 100
      document.getElementById('result-km-benz').innerHTML = totalKm
          copyKMListener3()
      } else {
      let i = 0
      let next = aParent
      window.next = next
      let km = 0
      let totalKm = Number.parseFloat(next.children[0].children[0].children[0].getElementsByClassName('x-grid3-cell-inner x-grid3-col-distance')[0].innerText.replace(',', '.'))
      while(next != bParent && next.nextElementSibling != null){
          next = next.nextElementSibling
          //console.log(next)
          km = Number.parseFloat(next.children[0].children[0].children[0].getElementsByClassName('x-grid3-cell-inner x-grid3-col-distance')[0].innerText.replace(',', '.'))
          totalKm = totalKm + km
          //console.log(totalKm)
          i = i + 1
          //if(i == 50) {break;}
      }
      totalKm = Math.round(totalKm * 100) / 100
      document.getElementById('result-km-benz').innerHTML = totalKm
          copyKMListener3()
      }


  }
}

const copyListener = (e) => {
  input.value = e.target.innerText.replace(/[-_]/g,'/')
  input.select()
  document.execCommand('copy')
  e.target.style.backgroundColor = 'yellow'
  setTimeout(()=>{e.target.style.backgroundColor = 'white'}, 3000)
}

const copyKMListener = (e) => {
  input.value = Math.round(e.target.innerText)
  input.select()
  document.execCommand('copy')
  e.target.style.backgroundColor = 'yellow'
  setTimeout(()=>{e.target.style.backgroundColor = '#dde5e9'}, 3000)
}

const copyKMListener2 = (e) => {
  let km = Math.round(e.target.innerText)
  let dateDepart = window.a.parentElement.parentElement.getElementsByClassName("x-grid3-col-dateDepart")[0].innerText.replace(/[-_]/g,'/')
  let dateArrivee = window.b.parentElement.parentElement.getElementsByClassName("x-grid3-col-dateArrivee")[0].innerText.replace(/[-_]/g,'/')
  let TAB = "\t";
  input.value = km + TAB + dateDepart + TAB + dateArrivee
  input.select()
  document.execCommand('copy')
  e.target.style.backgroundColor = 'yellow'
  setTimeout(()=>{e.target.style.backgroundColor = '#dde5e9'}, 3000)
}

const copyKMListener3 = () => {
  let km = Math.round(document.querySelector("#result-km-benz").innerText)
  let dateDepart = window.a.parentElement.parentElement.getElementsByClassName("x-grid3-col-dateDepart")[0].innerText.replace(/[-_]/g,'/')
  let dateArrivee = window.b.parentElement.parentElement.getElementsByClassName("x-grid3-col-dateArrivee")[0].innerText.replace(/[-_]/g,'/')
  let TAB = "\t";
  input.value = km + TAB + dateDepart + TAB + dateArrivee
  input.select()
  document.execCommand('copy')
}

window.zero()
var node = document.createElement("style");
node.innerHTML = `
#x-auto-109 dede {
    display: flex;
    /* flex-direction: column; */
    background-color: #ffc7c3;
    width: 103% !important;
    justify-content: space-around;
    position: absolute;
    left: 0px;
    top: 47px;
}
#fjfjf{
    position: absolute;
    right: 0px;
    width: 141px;
    background-color: #ffc7c3;
}
#fjfjf{
    position: absolute;
    left: 0px;
    width: 141px;
    background-color: #ffc7c3;
}

`;
document.body.appendChild(node);
	
dragElement(document.getElementById("div-result-km-benz"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
})();
