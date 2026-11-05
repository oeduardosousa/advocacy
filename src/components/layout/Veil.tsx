import { SITE } from "@/lib/site";

/**
 * First-visit loader (DESIGN.md "Loading animation"): CSS only, zero JS dependency.
 * An inline script decides, before paint, whether this session already saw it
 * (sessionStorage) or the user prefers reduced motion; in both cases nothing shows.
 * The page, including the LCP headline, is already in the DOM beneath the veil.
 * The veil is aria-hidden and pointer-events: none, and it never waits for images or JS:
 * only for fonts, with an 800ms timeout. When it lifts it removes `data-veil` and fires
 * `adv:veil-done`, which the hero intro waits for.
 */
const SCRIPT = `(function(){try{
var d=document.documentElement;
if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('adv-veil'))return;
sessionStorage.setItem('adv-veil','1');
d.setAttribute('data-veil','on');
var over=false;
function end(){if(over)return;over=true;d.removeAttribute('data-veil');d.removeAttribute('data-veil-go');window.dispatchEvent(new Event('adv:veil-done'))}
var started=false;
function go(){if(started)return;started=true;d.setAttribute('data-veil-go','')}
var t=setTimeout(go,800);
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){clearTimeout(t);go()})}
document.addEventListener('animationend',function(e){if(e.animationName==='veil-lift')end()});
setTimeout(end,3000);
}catch(e){}})();`;

export function Veil() {
  return (
    <>
      <div className="veil" aria-hidden="true">
        <span className="veil-word font-serif text-[1.75rem] tracking-[-0.01em] text-ink">
          {SITE.name}
        </span>
        <span className="veil-line" />
      </div>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}
