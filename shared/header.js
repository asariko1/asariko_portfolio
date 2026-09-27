/*
  asariko shared header + footer: edit THIS ONE FILE to change the header and footer on every asariko site.

  How a page uses it:
    <div data-asariko-header style="height:96px"></div>      top of <body>; the height stops the page jumping
    ... the page ...
    <div data-asariko-footer>optional extra lines</div>      end of <body>; anything inside shows under the footer
    <script src="https://asariko.net/shared/header.js" defer></script>

  Options:
    data-asariko-header="static"   header scrolls away with the page (for full-screen app pages like PDF Crop)
    No placeholders? The header goes to the top of <body> and the footer to the end.

  !! Never rename or move this file: every site loads it from this exact address. !!
*/
(function () {
  if (window.__asarikoChrome) return;
  window.__asarikoChrome = true;

  // Site root = wherever this file is served from (asariko.net live, or a local test server)
  var script = document.currentScript || document.querySelector('script[src*="shared/header.js"]');
  var BASE = new URL('../', script.src).href;
  var LINKS = [['Home', ''], ['Projects', 'projects/'], ['About', '#about'], ['Contact', '#contact']];

  // Current page: Projects on asariko.net/projects/… and on every tool/app subdomain, Home on the home page
  var onMain = location.href.indexOf(BASE) === 0;
  var path = onMain ? location.href.slice(BASE.length).split('#')[0] : '';
  var current = !onMain || path.indexOf('projects') === 0 ? 'Projects' : (path === '' || path === 'index.html') ? 'Home' : '';

  var css = [
    '.ak-header,.ak-header *,.ak-footer,.ak-footer *{box-sizing:border-box}',
    '.ak-header{position:sticky;top:0;z-index:1000;height:88px;background:rgba(255,255,255,.88);-webkit-backdrop-filter:saturate(180%) blur(10px);backdrop-filter:saturate(180%) blur(10px);border-bottom:1px solid transparent;transition:border-color .2s,box-shadow .2s;font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;margin:0;padding:0}',
    '.ak-header.ak-scrolled{border-bottom-color:#f1f5f9;box-shadow:0 1px 2px rgba(15,23,42,.04)}',
    '.ak-header.ak-static{position:relative;flex:none}',
    '.ak-in{max-width:80rem;height:100%;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between}',
    '@media (min-width:640px){.ak-in{padding:0 32px}}@media (min-width:1024px){.ak-in{padding:0 48px}}',
    '.ak-logo{display:block;line-height:0}.ak-logo img{height:40px;width:auto;display:block;border:0}',
    '@media (min-width:768px){.ak-logo img{height:48px}.ak-header{height:96px}}',
    '.ak-nav{display:flex;align-items:center;gap:32px}',
    '.ak-nav a{font-size:14px;font-weight:500;line-height:20px;color:#64748b;text-decoration:none;transition:color .15s;background:none;padding:0;margin:0;border:0}',
    '.ak-nav a:hover{color:#0f172a}',
    '.ak-nav a[aria-current="page"]{color:#2c3e50;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:8px}',
    '.ak-burger{display:none;position:relative;width:40px;height:40px;margin:0;padding:0;border:0;border-radius:8px;background:none;color:#0f172a;cursor:pointer}',
    '.ak-burger i{position:absolute;left:11px;width:18px;height:2px;border-radius:2px;background:currentColor;transition:transform .2s cubic-bezier(.23,1,.32,1),opacity .12s}',
    '.ak-burger i:nth-child(1){top:13px}.ak-burger i:nth-child(2){top:19px}.ak-burger i:nth-child(3){top:25px}',
    '.ak-burger[aria-expanded="true"] i:nth-child(1){transform:translateY(6px) rotate(45deg)}',
    '.ak-burger[aria-expanded="true"] i:nth-child(2){opacity:0}',
    '.ak-burger[aria-expanded="true"] i:nth-child(3){transform:translateY(-6px) rotate(-45deg)}',
    '.ak-menu{position:fixed;inset:0;z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;background:rgba(255,255,255,.95);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;transition:opacity .15s cubic-bezier(.23,1,.32,1)}',
    '.ak-menu.ak-open{opacity:1;transition-duration:.2s}',
    '.ak-menu[hidden]{display:none}',
    '.ak-menu a{font-family:"Inter",system-ui,sans-serif;font-size:24px;font-weight:500;color:#0f172a;text-decoration:none}',
    '.ak-menu a[aria-current="page"]{color:#2c3e50;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:8px}',
    '@media (max-width:767px){.ak-nav{display:none}.ak-burger{display:block}}',
    '.ak-header a:focus-visible,.ak-header button:focus-visible,.ak-menu a:focus-visible,.ak-footer a:focus-visible{outline:2px solid #2c3e50;outline-offset:3px;border-radius:4px}',
    '.ak-footer{display:block;margin:48px 0 0;padding:32px 0;border-top:1px solid #f1f5f9;background:#fff;color:#94a3b8;font:400 14px/20px "Inter",system-ui,-apple-system,"Segoe UI",sans-serif;text-align:left;flex:none}',
    '.ak-footer .ak-in{height:auto;flex-direction:column;gap:12px;text-align:center}',
    // full-screen app pages (static header): tighter footer so the work area keeps its space
    'body:has(.ak-header.ak-static) .ak-footer{margin-top:0;padding:14px 0}',
    '@media (min-width:640px){.ak-footer .ak-row{flex-direction:row;text-align:left}}',
    '.ak-row{display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:16px;width:100%}',
    '.ak-right{display:flex;flex-direction:column;align-items:center;gap:8px}',
    '@media (min-width:640px){.ak-right{flex-direction:row;gap:16px}}',
    '.ak-links{display:flex;align-items:center;gap:8px}',
    '.ak-footer a{color:#94a3b8;text-decoration:none;transition:color .15s}',
    '.ak-footer a:hover{color:#0f172a}',
    '.ak-sep{color:#cbd5e1}',
    '.ak-extra{width:100%;font-size:12px;line-height:1.6;color:#94a3b8;text-align:center}',
    '.ak-extra p{margin:4px 0}.ak-extra a{text-decoration:underline;text-underline-offset:2px}',
    '@media (prefers-reduced-motion:reduce){.ak-header,.ak-burger i,.ak-menu{transition:none}}'
  ].join('\n');

  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function links(cls) {
    return LINKS.map(function (l) {
      return '<a href="' + BASE + l[1] + '"' + (l[0] === current ? ' aria-current="page"' : '') + '>' + l[0] + '</a>';
    }).join('');
  }

  function build() {
    if (document.querySelector('.ak-header')) return;
    var style = document.createElement('style');
    style.id = 'ak-style'; style.textContent = css;
    document.head.appendChild(style);

    // Inter font and the logo tab icon, only if the page doesn't already have them
    if (!document.querySelector('link[href*="family=Inter"]')) {
      document.head.appendChild(el('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">'));
    }
    if (!document.querySelector('link[rel~="icon"]')) {
      document.head.appendChild(el('<link rel="icon" type="image/png" href="' + BASE + 'favicon.png">'));
    }

    // Header
    var slotH = document.querySelector('[data-asariko-header]');
    var header = el(
      '<header class="ak-header">' +
        '<div class="ak-in">' +
          '<a class="ak-logo" href="' + BASE + '" aria-label="asariko home"><img src="' + BASE + 'assets/logo.png" alt="asariko"></a>' +
          '<nav class="ak-nav" aria-label="Main">' + links() + '</nav>' +
          '<button class="ak-burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="ak-menu"><i></i><i></i><i></i></button>' +
        '</div>' +
      '</header>');
    if (slotH && slotH.getAttribute('data-asariko-header') === 'static') header.classList.add('ak-static');
    if (slotH) slotH.replaceWith(header); else document.body.insertBefore(header, document.body.firstChild);

    // Mobile menu (fades in 200ms, out 150ms; Esc or a link closes it)
    var menu = el('<div class="ak-menu" id="ak-menu" hidden>' + links() + '</div>');
    document.body.appendChild(menu);
    var burger = header.querySelector('.ak-burger'), closeT = 0;
    function setMenu(open) {
      clearTimeout(closeT);
      burger.setAttribute('aria-expanded', String(open));
      document.documentElement.style.overflow = open ? 'hidden' : '';
      if (open) { menu.hidden = false; void menu.offsetWidth; menu.classList.add('ak-open'); menu.querySelector('a').focus({ preventScroll: true }); }
      else { menu.classList.remove('ak-open'); closeT = setTimeout(function () { menu.hidden = true; }, 150); }
    }
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
    });

    // Hairline under the header once the page scrolls
    function onScroll() { header.classList.toggle('ak-scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // Footer (keeps any site-specific lines that were inside the placeholder)
    var slotF = document.querySelector('[data-asariko-footer]');
    var extra = slotF ? slotF.innerHTML.trim() : '';
    var footer = el(
      '<footer class="ak-footer">' +
        '<div class="ak-in">' +
          '<div class="ak-row">' +
            '<span>&copy; ' + new Date().getFullYear() + ' asariko</span>' +
            '<span class="ak-right"><span>Built with simplicity</span>' +
              '<span class="ak-links"><a href="' + BASE + 'terms/">Terms</a><span class="ak-sep">·</span><a href="' + BASE + 'privacy/">Privacy</a></span></span>' +
          '</div>' +
          (extra ? '<div class="ak-extra">' + extra + '</div>' : '') +
        '</div>' +
      '</footer>');
    if (slotF) slotF.replaceWith(footer); else document.body.appendChild(footer);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
