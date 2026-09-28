const state = { products: PRODUCTS.slice(), filtered: PRODUCTS.slice() };
const WA_NUMBER = "5500000000000"; // TROQUE pelo número da Beauty Shop, com DDI + DDD, sem símbolos.

function money(v){ return Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }
function calcDiscount(p){
  if (p.discount != null) return p.discount;
  if (p.oldPrice && p.price && p.oldPrice > p.price) return Math.round((1-p.price/p.oldPrice)*100);
  return 0;
}
function safeText(s){ return String(s ?? "").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }

function render(){
  const q = document.querySelector("#search").value.toLowerCase().trim();
  const platform = document.querySelector("#platformFilter").value;
  state.filtered = state.products.filter(p =>
    (!q || [p.name,p.platform,p.category,p.description].join(" ").toLowerCase().includes(q)) &&
    (!platform || p.platform === platform)
  );
  const grid = document.querySelector("#products");
  grid.innerHTML = state.filtered.map((p,i)=>`
    <article class="product-card" onclick="openProduct('${p.id}')">
      <div class="product-img">
        ${p.image ? `<img src="${safeText(p.image)}" alt="${safeText(p.name)}" loading="lazy">` : `<span class="placeholder">${safeText((p.category||"BEAUTY").slice(0,8).toUpperCase())}</span>`}
      </div>
      <div class="product-body">
        <div class="platform">${safeText(p.platform)} · ${safeText(p.category)}</div>
        <div class="product-name">${safeText(p.name)}</div>
        <div class="price-row">
          ${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}
          <span class="price">${money(p.price)}</span>
          ${calcDiscount(p)>0 ? `<span class="discount">${calcDiscount(p)}% OFF</span>` : ""}
        </div>
        <span class="card-cta">Ver detalhes →</span>
      </div>
    </article>
  `).join("");
  document.querySelector("#empty").hidden = state.filtered.length > 0;
  document.querySelector("#heroCount").textContent = state.products.length;
}

function setupFilters(){
  const select = document.querySelector("#platformFilter");
  [...new Set(state.products.map(p=>p.platform))].sort().forEach(x=>{
    const o=document.createElement("option"); o.value=x; o.textContent=x; select.appendChild(o);
  });
  document.querySelector("#search").addEventListener("input",render);
  select.addEventListener("change",render);
}
function openProduct(id){
  const p=state.products.find(x=>x.id===id); if(!p)return;
  document.querySelector("#modalPlatform").textContent=`${p.platform} · ${p.category}`;
  document.querySelector("#modalName").textContent=p.name;
  document.querySelector("#modalDescription").textContent=p.description||"";
  document.querySelector("#modalOldPrice").textContent=p.oldPrice?money(p.oldPrice):"";
  document.querySelector("#modalPrice").textContent=money(p.price);
  const d=calcDiscount(p); document.querySelector("#modalDiscount").textContent=d?`${d}% OFF`:"";
  document.querySelector("#modalNote").textContent=p.note||"";
  const img=document.querySelector("#modalImage");
  img.innerHTML=p.image?`<img src="${safeText(p.image)}" alt="${safeText(p.name)}">`:`<span class="placeholder">${safeText((p.category||"BEAUTY").toUpperCase())}</span>`;
  document.querySelector("#modalBuy").href=p.affiliateUrl||"#";
  const wa=document.querySelector("#modalWhatsApp");
  if(p.whatsapp){
    wa.style.display="inline-flex";
    const msg=encodeURIComponent(`Olá! Vi o produto "${p.name}" na Beauty Shop e gostaria de saber como comprar.`);
    wa.href=`https://wa.me/${WA_NUMBER}?text=${msg}`;
  }else wa.style.display="none";
  document.querySelector("#productModal").classList.add("open");
  document.querySelector("#productModal").setAttribute("aria-hidden","false");
}
function closeProduct(){
  document.querySelector("#productModal").classList.remove("open");
  document.querySelector("#productModal").setAttribute("aria-hidden","true");
}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProduct()});

document.addEventListener("DOMContentLoaded",()=>{
  setupFilters(); render();
  document.querySelector("#whatsappFooter").href=`https://wa.me/${WA_NUMBER}`;
  const form=document.querySelector("#leadForm");
  form.addEventListener("submit",()=>{
    document.querySelector("#leadMessage").textContent="Cadastro enviado. Obrigada por entrar no Beauty VIP.";
    setTimeout(()=>document.querySelector("#leadMessage").textContent="",5000);
  });
});
