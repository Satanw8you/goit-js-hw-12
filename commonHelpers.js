import{i as d,S as m}from"./assets/vendor-46aac873.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const c=document.querySelector(".form"),a=document.querySelector(".image-list"),n=document.querySelector(".loader");n.style.display="none";c.addEventListener("submit",f);function f(r){r.preventDefault(),a.innerHTML="",n.style.display="block";const i=r.target.elements.input.value;p(i).then(s=>{n.style.display="none",s.hits.length||d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),a.innerHTML=h(s.hits),new m(".image-list a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),c.reset()}).catch(s=>{n.style.display="none",console.log(s)})}function p(r){const i="https://pixabay.com/api/",s="41847717-e04c221e42f4fa0d8db3b7e62",o=r,e=new URLSearchParams({key:s,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${i}?${e}`).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})}function h(r){return r.map(({webformatURL:i,largeImageURL:s,tags:o,likes:e,views:t,comments:l,downloads:u})=>`<li class="image-list-item">
          <a href="${s}" class="list-image-link">
            <img class="list-image" src="${i}" alt="${o}" />
          </a>
          <div class="image-wrapper">
            <ul class="desc-list">
              <li class="desk-item">
                <h2 class="desk-title">Likes</h2>
                <p class="desk-text">${e}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Views</h2>
                <p class="desk-text">${t}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Comments</h2>
                <p class="desk-text">${l}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Downloads</h2>
                <p class="desk-text">${u}</p>
              </li>
            </ul>
          </div>
        </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
