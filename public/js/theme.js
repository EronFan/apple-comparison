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
    // 切换按钮放入顶部导航栏（各页头容器通用兜底）
    if (!document.getElementById('themeToggle')) {
      var b = document.createElement('button');
      b.id = 'themeToggle';
      b.type = 'button';
      b.setAttribute('aria-label', '切换夜间模式');
      b.textContent = current() === 'dark' ? '☀️' : '🌙';
      b.addEventListener('click', function() {
        apply(current() === 'dark' ? 'light' : 'dark');
      });
      var placed = false;
      // 语言切换器在导航右侧，插到它前面最自然
      var sw = document.querySelector('.language-switcher');
      if (sw && sw.parentNode) {
        sw.parentNode.insertBefore(b, sw);
        placed = true;
      } else {
        var host = document.querySelector('.nav-links') || document.querySelector('.nav') || document.querySelector('header');
        if (host) {
          host.appendChild(b);
          placed = true;
        }
      }
      if (!placed) {
        // 极端兜底：悬浮右上角
        b.style.position = 'fixed';
        b.style.top = '14px';
        b.style.right = '20px';
        b.style.zIndex = '999';
        document.body.appendChild(b);
      }
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
