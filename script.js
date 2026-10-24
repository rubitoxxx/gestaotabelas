(()=>{const T=DER.tabelas,N=Object.keys(T).sort(),$=i=>document.getElementById(i),NS='http://www.w3.org/2000/svg';
const P={},C={};N.forEach(n=>{P[n]=new Set();C[n]=new Set()});
N.forEach(n=>T[n].f.forEach(f=>{if(T[f[1]]&&f[1]!==n){P[n].add(f[1]);C[f[1]].add(n)}}));
const fkRows=[];N.forEach(n=>T[n].f.forEach(f=>fkRows.push([n,f[0],f[2].join('+'),f[1],f[3].join('+')])));
let cur=null,view={x:0,y:0,k:1},lastEdges=[],lastNodes=[];
const pre=[...new Set(N.map(n=>n.split('_')[0]))].sort();pre.forEach(p=>{const o=document.createElement('option');o.value=p;o.textContent=p;$('mod').appendChild(o)});
function list(){const q=$('q').value.trim().toUpperCase(),m=$('mod').value,c=$('cls').value;
 const r=N.filter(n=>(!m||n.split('_')[0]===m)&&(!c||T[n].k===c)&&(!q||n.includes(q)||T[n].c.some(x=>x[0].includes(q))));
 $('cnt').textContent=r.length+' de '+N.length+' tabelas';
 $('list').innerHTML=r.slice(0,400).map(n=>`<li data-n="${n}" class="${n===cur?'on':''}"><span>${n}</span><b class="${T[n].k}">${T[n].k}</b></li>`).join('')+(r.length>400?'<li>… refine a busca</li>':'')}
$('list').onclick=e=>{const l=e.target.closest('li[data-n]');if(l)show(l.dataset.n)};
['q','mod','cls'].forEach(i=>$(i).oninput=list);
const W=210,RH=14,HH=22,MAXC=14;
function box(n){const cols=T[n].c,sh=cols.slice(0,MAXC);return{n,w:W,h:HH+sh.length*RH+(cols.length>MAXC?RH:0)+4,sh,more:cols.length-sh.length}}
function show(n){cur=n;list();const mx=+$('max').value,dep=+$('dep').value;
 const lv=[[n]],seen=new Set([n]);let hidden=0;
 const up=[],dn=[];let fr=[n];
 for(let d=0;d<dep;d++){const nu=[];fr.forEach(x=>P[x].forEach(p=>{if(!seen.has(p)){seen.add(p);nu.push(p)}}));up.push(nu);fr=nu}
 fr=[n];const dnl=[];for(let d=0;d<dep;d++){const nd=[];fr.forEach(x=>[...C[x]].sort().forEach(c=>{if(!seen.has(c)){seen.add(c);nd.push(c)}}));dnl.push(nd);fr=nd}
 const cap=a=>{if(a.length>mx){hidden+=a.length-mx;return a.slice(0,mx)}return a};
 const rows=[...up.map(cap).reverse(),[n],...dnl.map(cap)];
 const g=$('vp');g.innerHTML='';lastNodes=[];const pos={};let y=20;
 rows.forEach(r=>{const per=Math.max(1,Math.ceil(Math.sqrt(r.length*2.2)));let rh=0,i=0;
  const bs=r.map(box);bs.forEach((b,k)=>{b.x=(k%per)*(W+40);b.y=y+Math.floor(k/per)*0;});
  // grid wrap
  const lines=Math.ceil(r.length/per);let yy=y;for(let l=0;l<lines;l++){let mh=0;bs.slice(l*per,l*per+per).forEach((b,k)=>{b.y=yy;b.x=k*(W+40);mh=Math.max(mh,b.h)});yy+=mh+36}
  const tw=Math.min(per,r.length)*(W+40);bs.forEach(b=>{b.x+=0-tw/2;pos[b.n]=b;lastNodes.push(b)});y=yy+30});
 lastEdges=[];lastNodes.forEach(b=>T[b.n].f.forEach(f=>{if(pos[f[1]]&&f[1]!==b.n)lastEdges.push({a:b.n,b:f[1],l:f[2].join(',')+'→'+f[3].join(',')})}));
 const selfs=T[n].f.filter(f=>f[1]===n);
 lastEdges.forEach(e=>{const A=pos[e.a],B=pos[e.b],p=document.createElementNS(NS,'path');
  const x1=A.x+W/2,y1=A.y+(B.y<A.y?0:A.h),x2=B.x+W/2,y2=B.y+(B.y<A.y?B.h:0),my=(y1+y2)/2;
  p.setAttribute('d',B.y===A.y?`M${A.x+W/2} ${A.y}C${A.x+W/2} ${A.y-40} ${B.x+W/2} ${B.y-40} ${B.x+W/2} ${B.y}`:`M${x1} ${y1}C${x1} ${my} ${x2} ${my} ${x2} ${y2}`);
  p.setAttribute('class','ed');p.setAttribute('marker-end','url(#ar)');const t=document.createElementNS(NS,'title');t.textContent=e.a+' → '+e.b+'  ('+e.l+')';p.appendChild(t);g.appendChild(p)});
 lastNodes.forEach(b=>{const gg=document.createElementNS(NS,'g');gg.setAttribute('class','node');gg.setAttribute('transform',`translate(${b.x},${b.y})`);
  const col={A:'#2e7d5b',B:'#c0392b',C:'#d98a00'}[T[b.n].k];
  let h=`<rect class="box" width="${b.w}" height="${b.h}" rx="5"/><rect class="hd" width="${b.w}" height="${HH}" rx="5" fill="${col}"/><text x="8" y="15" style="fill:#fff;font-weight:700">${b.n.length>27?b.n.slice(0,26)+'…':b.n}</text>`;
  b.sh.forEach((c,i)=>{h+=`<text class="${c[2]?'pk':''}" x="8" y="${HH+11+i*RH}">${c[2]?'🔑 ':''}${c[0].slice(0,18)}</text><text class="ty" x="${b.w-6}" y="${HH+11+i*RH}" text-anchor="end">${c[1].replace('VARCHAR','VC').slice(0,12)}</text>`});
  if(b.more>0)h+=`<text class="ty" x="8" y="${HH+11+MAXC*RH}">+${b.more} colunas…</text>`;
  gg.innerHTML=h;gg.onclick=()=>show(b.n);g.appendChild(gg)});
 info(n,hidden,selfs.length);fit()}
function info(n,hid,self){const t=T[n],i=$('info');i.style.display='block';
 i.innerHTML=`<h3>${n} <small>(classe ${t.k})</small></h3><p>${t.c.length} colunas · ${t.f.length} FKs (confirmadas nos metadados) · ${P[n].size} pais · ${C[n].size} filhas${self?' · auto-relacionamento':''}</p>`+(hid?`<p>${hid} vizinhas ocultas pelo limite — aumente "Máx. vizinhas".</p>`:'')+
 `<p>PK: ${t.c.filter(c=>c[2]).map(c=>c[0]).join(', ')||'— (sem PK)'}</p>`}
function fit(){const s=$('svg').getBoundingClientRect();let a=1e9,b=1e9,c=-1e9,d=-1e9;lastNodes.forEach(n=>{a=Math.min(a,n.x);b=Math.min(b,n.y);c=Math.max(c,n.x+n.w);d=Math.max(d,n.y+n.h)});
 const k=Math.min(1,(s.width-40)/(c-a),(s.height-120)/(d-b));view={k,x:(s.width-(c-a)*k)/2-a*k,y:60-b*k};ap()}
const ap=()=>$('vp').setAttribute('transform',`translate(${view.x},${view.y}) scale(${view.k})`);
let dr=null;$('svg').onmousedown=e=>{dr={x:e.clientX-view.x,y:e.clientY-view.y}};onmouseup=()=>dr=null;
onmousemove=e=>{if(dr){view.x=e.clientX-dr.x;view.y=e.clientY-dr.y;ap()}};
$('svg').onwheel=e=>{e.preventDefault();const r=$('svg').getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,f=e.deltaY<0?1.15:0.87;
 view.x=mx-(mx-view.x)*f;view.y=my-(my-view.y)*f;view.k*=f;ap()};
$('fit').onclick=fit;$('dep').onchange=$('max').onchange=()=>cur&&show(cur);
const dl=(nm,tx,ty)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([tx],{type:ty}));a.download=nm;a.click()};
const svgTxt=()=>{const s=$('svg').cloneNode(true);s.setAttribute('xmlns',NS);const r=$('svg').getBoundingClientRect();s.setAttribute('width',r.width);s.setAttribute('height',r.height);
 s.insertAdjacentHTML('afterbegin','<style>text{font:11px monospace;fill:#1d2330}.box{fill:#fff;stroke:#ccd}.ed{stroke:#667;fill:none}.ty,.lb{fill:#6b7385}</style><rect width="100%" height="100%" fill="#fff"/>');return new XMLSerializer().serializeToString(s)};
$('eSVG').onclick=()=>cur&&dl('der_'+cur+'.svg',svgTxt(),'image/svg+xml');
$('ePNG').onclick=()=>{if(!cur)return;const r=$('svg').getBoundingClientRect(),im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=r.width*2;c.height=r.height*2;const x=c.getContext('2d');x.scale(2,2);x.drawImage(im,0,0);c.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='der_'+cur+'.png';a.click()})};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgTxt())};
$('eJSON').onclick=()=>cur&&dl('der_'+cur+'.json',JSON.stringify({tabela:cur,classe:T[cur].k,colunas:T[cur].c,fks:T[cur].f,pais:[...P[cur]],filhas:[...C[cur]]},null,1),'application/json');
$('eCSV').onclick=()=>dl('fks_gestao.csv','tabela_filha;constraint;colunas;tabela_pai;colunas_pai\n'+fkRows.map(r=>r.join(';')).join('\n'),'text/csv');
list();show(N.includes('VENDAS')?'VENDAS':N[0]);
})();
