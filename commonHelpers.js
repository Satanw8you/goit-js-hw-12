import{i as d,S as P,a as b}from"./assets/vendor-982b5302.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const p=document.querySelector(".form"),y=document.querySelector(".image-list"),c=document.querySelector(".loader"),i=document.querySelector(".load-button"),u=document.querySelector(".sec-loader");c.style.display="none";u.style.display="none";i.style.display="none";p.addEventListener("submit",S);i.addEventListener("click",g);const s={currentPage:1,pageSize:40,refreshPage:"",inputValue:""};function S(a){if(a.preventDefault(),y.innerHTML="",c.style.display="block",i.style.display="none",s.inputValue=a.target.elements.input.value.trim(),!s.inputValue){d.warning({title:"Caution",message:"Sorry, you have not entered anything in the search"}),c.style.display="none";return}m(s.inputValue,s.currentPage).then(({data:e})=>{c.style.display="none";const n=Math.ceil(e.totalHits/s.pageSize);s.currentPage===n?i.style.display="none":i.style.display="block",(!e||e.totalHits===0)&&d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),y.insertAdjacentHTML("beforeend",f(e.hits)),s.refreshPage=new P(".image-list a",{captions:!0,captionsData:"alt",captionDelay:250}),s.refreshPage.refresh(),p.reset()}).catch(e=>{c.style.display="none",console.log(e)})}async function m(a,e){const n="https://pixabay.com/api/",o="41847717-e04c221e42f4fa0d8db3b7e62";try{return await b.get(n,{params:{key:o,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:40}})}catch{d.error({title:"Error",message:"Sorry! The site is currently unavailable. Please try later!"}),console.error(error.message)}}async function g(){s.currentPage+=1,u.style.display="block",i.style.display="none";const a=()=>document.querySelector(".image-list-item").getBoundingClientRect();try{const{data:e}=await m(s.inputValue,s.currentPage);if(!e||e.totalHits===0){d.warning({title:"Caution",message:"No matching images found."}),i.style.display="none",u.style.display="none";return}y.insertAdjacentHTML("beforeend",f(e.hits)),window.scrollBy({top:a().height*2,left:0,behavior:"smooth"}),s.refreshPage.refresh();const n=Math.ceil(e.totalHits/s.pageSize);if(s.currentPage===n){d.info({title:"Caution",message:"We're sorry, but you've reached the end of search results."}),i.style.display="none",u.style.display="none",i.removeEventListener("click",g);return}u.style.display="none",i.style.display="block"}catch(e){console.log(e)}}function f(a){return a.map(({webformatURL:e,largeImageURL:n,tags:o,likes:t,views:r,comments:l,downloads:h})=>`<li class="image-list-item">
          <a href="${n}" class="list-image-link">
            <img class="list-image" src="${e}" alt="${o}" />
          </a>
          <div class="image-wrapper">
            <ul class="desc-list">
              <li class="desk-item">
                <h2 class="desk-title">Likes</h2>
                <p class="desk-text">${t}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Views</h2>
                <p class="desk-text">${r}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Comments</h2>
                <p class="desk-text">${l}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Downloads</h2>
                <p class="desk-text">${h}</p>
              </li>
            </ul>
          </div>
        </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
