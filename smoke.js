/* Прибор замера смоука «Положено» (ниша 13 «Получить положенное»).
   Страна/ниша меняются ровно двумя значениями ниже. */
var SMOKE = {
  METRIKA_ID: "111685522",              /* номер счётчика Яндекс.Метрики */
  GA4_ID: "",                  /* поток GA4 — для Google Ads, не используется */
  FORM_ID: "6a82fa5dd04688f2cf6ba530",                 /* id Яндекс.Формы для встраивания */
  FORM_URL: "https://forms.yandex.ru/u/6a82fa5dd04688f2cf6ba530/"                 /* прямая ссылка на форму (запаска) */
};

(function () {
  var on = false;
  if (SMOKE.METRIKA_ID) {
    on = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(SMOKE.METRIKA_ID, "init", {
      clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true
    });
  }
  if (SMOKE.GA4_ID) {
    on = true;
    var s = document.createElement("script");
    s.async = 1; s.src = "https://www.googletagmanager.com/gtag/js?id=" + SMOKE.GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", SMOKE.GA4_ID);
  }
  if (!on) {
    console.warn("[smoke] аналитика не подключена: визиты и цели НЕ собираются");
  }
})();

function track(goal) {
  try { if (SMOKE.METRIKA_ID && window.ym) ym(SMOKE.METRIKA_ID, "reachGoal", goal); } catch (e) {}
  try { if (SMOKE.GA4_ID && window.gtag) gtag("event", goal); } catch (e) {}
  console.log("[smoke] цель: " + goal);
}

/* Приёмник заявок. Пока форма не заведена — на странице стоит громкая
   красная плашка, а не тихая пустота: замер без формы невозможен. */
function mountForm(nodeId) {
  var box = document.getElementById(nodeId);
  if (!box) return;
  if (!SMOKE.FORM_ID) {
    box.innerHTML = '<p class="warn">Форма приёма заявок не подключена: '
      + 'в <code>smoke.js</code> пусто поле <code>FORM_ID</code>. '
      + 'До подстановки идентификатора заявки НЕ принимаются и замер невозможен.</p>';
    console.warn("[smoke] FORM_ID пуст: форма не встроена, заявки НЕ принимаются");
    return;
  }
  var s = document.createElement("script");
  s.src = "https://forms.yandex.ru/_static/embed.js";
  document.body.appendChild(s);
  box.innerHTML = '<iframe src="https://forms.yandex.ru/u/' + SMOKE.FORM_ID + '?iframe=1" '
    + 'name="ya-form-' + SMOKE.FORM_ID + '" frameborder="0" '
    + 'style="border:0;display:block;width:100%;min-height:760px"></iframe>';
}
