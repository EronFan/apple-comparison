/**
 * 夜间模式：主题切换 + 持久化 + 悬浮按钮
 * 无需改动页面结构，引入本文件并配套 dark.css 即可
 */
(function() {
  var KEY = 'site-theme';

  function current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function apply(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
    var btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function ensureCss() {
    if (document.querySelector('link[data-theme-css]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-theme-css', '1');
    // 与引用本脚本相同的目录层级定位 css
    var scripts = document.getElementsByTagName('script');
    var base = '../public/css/dark.css';
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('theme.js') !== -1) {
        base = src.replace('theme.js', '../css/dark.css');
        break;
      }
    }
    link.href = base;
    document.head.appendChild(link);
  }

  function init() {
    ensureCss();
    var saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch (e) {}
    if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      saved = 'dark';
    }
    apply(saved === 'dark' ? 'dark' : 'light');
    // 左下悬浮切换按钮（避开右下返回顶部）
    if (!document.getElementById('themeToggle')) {
      var b = document.createElement('button');
      b.id = 'themeToggle';
      b.setAttribute('aria-label', '切换夜间模式');
      b.style.cssText = 'position:fixed;left:26px;bottom:26px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(128,128,128,.35);background:rgba(245,245,247,.92);font-size:18px;line-height:1;cursor:pointer;z-index:99;box-shadow:0 4px 12px rgba(0,0,0,.15);';
      b.addEventListener('click', function() {
        apply(current() === 'dark' ? 'light' : 'dark');
      });
      document.body.appendChild(b);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.toggleTheme = function() {
    apply(current() === 'dark' ? 'light' : 'dark');
  };
})();
