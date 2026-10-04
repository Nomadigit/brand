// Generated from tokens/brand.json by @nomadigit/brand. Do not edit; edit the tokens and run `npm run build`.
// Telegram decides light vs dark; the brand supplies the colors. Include after telegram-web-app.js.
(function () {
  var THEME = {"light":{"header":"#F7FBFD","background":"#F7FBFD","bottomBar":"#FFFFFF"},"dark":{"header":"#0A1113","background":"#0A1113","bottomBar":"#131B1E"}};
  var tg = window.Telegram && window.Telegram.WebApp;
  function apply() {
    var scheme = tg && tg.colorScheme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", scheme);
    if (!tg) return;
    var t = THEME[scheme];
    try { tg.setHeaderColor(t.header); tg.setBackgroundColor(t.background); if (tg.setBottomBarColor) tg.setBottomBarColor(t.bottomBar); } catch (e) {}
  }
  apply();
  if (tg) { tg.onEvent("themeChanged", apply); tg.ready(); }
})();
