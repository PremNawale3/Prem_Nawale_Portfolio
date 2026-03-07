/**
 * PREM NAWALE — PORTFOLIO JAVASCRIPT
 * File: js/main.js
 *
 * SECTIONS IN THIS FILE
 * A. Enable JS animations  — adds .js-ready to <html>
 * B. Particle canvas       — animated background dots
 * C. Custom cursor         — dot + ring that follows mouse
 * D. 3D card tilt          — hero card rotates on hover
 * E. Typewriter            — ← EDIT YOUR ROLE WORDS HERE
 * F. Scroll reveal         — [data-r] elements animate in
 * G. Count-up numbers      — stats strip animation
 * H. Language bars         — GitHub language bar fill
 * I. GitHub contrib graph  — generates the green squares grid
 * J. Navbar + back-to-top  — active link + scroll button
 * K. Project filter        — filter buttons hide/show cards
 * L. Mobile nav            — hamburger menu
 * M. Contact form          — success message on submit
 */

(function () {
  'use strict';

  /* ============================================================
     A. ENABLE JS ANIMATIONS
     This is the critical fix — sections are invisible by default
     via .js-ready CSS rule, only enabled when JS works.
  ============================================================ */
  document.documentElement.classList.add('js-ready');


  /* ============================================================
     B. PARTICLE CANVAS BACKGROUND
  ============================================================ */
  var canvas = document.getElementById('bg-canvas');
  var ctx    = canvas.getContext('2d');
  var W = canvas.width  = window.innerWidth;
  var H = canvas.height = window.innerHeight;

  window.addEventListener('resize', function () {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  var dots = [];
  for (var i = 0; i < 70; i++) {
    dots.push({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.5 + 0.5
    });
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59,130,246,0.4)';
      ctx.fill();
      // Draw lines between nearby dots
      for (var j = i + 1; j < dots.length; j++) {
        var dx   = d.x - dots[j].x;
        var dy   = d.y - dots[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = 'rgba(59,130,246,' + (0.1 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawCanvas);
  }
  drawCanvas();


  /* ============================================================
     C. CUSTOM CURSOR
  ============================================================ */
  var curDot  = document.getElementById('cur');
  var curRing = document.getElementById('cur-ring');
  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    curDot.style.left = mx + 'px';
    curDot.style.top  = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    curRing.style.left = rx + 'px';
    curRing.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();


  /* ============================================================
     D. 3D CARD MOUSE TILT (Hero Section)
  ============================================================ */
  var card3d = document.getElementById('card3d');
  if (card3d) {
    var cardWrap = card3d.parentElement;
    cardWrap.addEventListener('mousemove', function (e) {
      var rect = cardWrap.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width  - 0.5;
      var y = (e.clientY - rect.top)  / rect.height - 0.5;
      card3d.style.transform = 'rotateX(' + (-y * 20) + 'deg) rotateY(' + (x * 20) + 'deg)';
      card3d.style.animation  = 'none';
    });
    cardWrap.addEventListener('mouseleave', function () {
      card3d.style.transform = '';
      card3d.style.animation  = '';
    });
  }


  /* ============================================================
     E. TYPEWRITER
     ▶ EDIT: Change the words array to update the role text
  ============================================================ */
  var words = [
    'data insights.',
    'ML pipelines.',
    'BI dashboards.',
    'web applications.',
    'smart solutions.'
  ];
  var wi = 0, ci = 0, isDeleting = false;
  var twEl = document.getElementById('tw');

  function typeWriter() {
    var w = words[wi];
    if (!isDeleting) {
      ci++;
      twEl.textContent = w.substring(0, ci);
      if (ci === w.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000); // Pause before deleting
        return;
      }
    } else {
      ci--;
      twEl.textContent = w.substring(0, ci);
      if (ci === 0) {
        isDeleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(typeWriter, isDeleting ? 50 : 110);
  }
  typeWriter();


  /* ============================================================
     F. SCROLL REVEAL
     Adds .vis class to [data-r] elements when they enter view.
     Failsafe: all elements shown after 500ms regardless.
  ============================================================ */
  var revealEls = document.querySelectorAll('[data-r]');

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('vis'); });
  }

  // Failsafe: show everything regardless after 500ms
  setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add('vis'); });
  }, 500);

  window.addEventListener('scroll', function () {
    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight - 30) {
        el.classList.add('vis');
      }
    });
  }, { passive: true });


  /* ============================================================
     G. COUNT-UP NUMBERS (Stats Strip & GitHub stats)
     ▶ EDIT: data-count attribute on HTML elements
  ============================================================ */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var n = 0, step = target / 60;
    var timer = setInterval(function () {
      n = Math.min(n + step, target);
      var v = Math.round(n);
      el.textContent = (v >= 1000 ? v.toLocaleString() : v) + '+';
      if (n >= target) clearInterval(timer);
    }, 25);
  }

  if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          countUp(e.target);
          countObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      countObs.observe(el);
    });
  }


  /* ============================================================
     H. LANGUAGE BAR ANIMATIONS (GitHub Section)
     ▶ EDIT: data-w attribute = percentage width on .lang-fill
  ============================================================ */
  document.querySelectorAll('.lang-fill').forEach(function (bar) {
    if ('IntersectionObserver' in window) {
      var o = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          bar.style.width = bar.dataset.w + '%';
          o.disconnect();
        }
      }, { threshold: 0.3 });
      o.observe(bar);
    } else {
      bar.style.width = bar.dataset.w + '%';
    }
  });


  /* ============================================================
     I. GITHUB CONTRIBUTION GRAPH
     Randomly generated squares for visual effect.
     Replace with real GitHub API data if desired.
  ============================================================ */
  var graph = document.getElementById('contrib-graph');
  if (graph) {
    var levels  = [0, 1, 2, 3, 4];
    var weights = [0.45, 0.25, 0.15, 0.1, 0.05]; // higher = more empty days
    for (var g = 0; g < 52 * 7; g++) {
      var cell = document.createElement('div');
      cell.className = 'cg-cell';
      var rand = Math.random(), cum = 0, lv = 0;
      for (var w = 0; w < weights.length; w++) {
        cum += weights[w];
        if (rand < cum) { lv = levels[w]; break; }
      }
      cell.classList.add('cg-' + lv);
      graph.appendChild(cell);
    }
  }


  /* ============================================================
     J. NAVBAR ACTIVE LINK + BACK TO TOP BUTTON
  ============================================================ */
  window.addEventListener('scroll', function () {
    // Back to top button
    var btt = document.getElementById('btt');
    if (btt) btt.classList.toggle('vis', window.scrollY > 400);

    // Active nav link based on scroll position
    var activeId = '';
    document.querySelectorAll('section[id]').forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 130) activeId = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
    });
  }, { passive: true });


  /* ============================================================
     K. PROJECT FILTER BUTTONS
  ============================================================ */
  document.querySelectorAll('.pf-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.pf-btn').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
      var filter = btn.dataset.f;
      document.querySelectorAll('.proj-card').forEach(function (card) {
        var show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? 'flex' : 'none';
        if (show) card.style.flexDirection = 'column';
      });
    });
  });


  /* ============================================================
     L. MOBILE NAVIGATION
  ============================================================ */
  var hbg    = document.getElementById('hbg');
  var mobNav = document.getElementById('mobNav');
  if (hbg) {
    hbg.addEventListener('click', function () {
      mobNav.classList.toggle('open');
    });
  }


  /* ============================================================
     M. CONTACT FORM
     Currently shows a success message only.
     ▶ TO MAKE IT SEND REAL EMAILS:
       1. Sign up free at https://formspree.io
       2. Create a new form → copy your form ID
       3. Change the button to a real <form> with:
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
  ============================================================ */
  var sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var name    = document.getElementById('cn').value.trim();
      var email   = document.getElementById('ce').value.trim();
      var message = document.getElementById('cm').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in your name, email and message.');
        return;
      }

      // Show success message
      var fs = document.getElementById('fs');
      if (fs) {
        fs.style.display = 'block';
        setTimeout(function () { fs.style.display = 'none'; }, 5000);
      }

      // Clear form
      ['cn', 'ce', 'cs', 'cm'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
      });
    });
  }

})(); // End IIFE


/* ============================================================
   closeMob must be global (called via onclick="" in HTML)
============================================================ */
function closeMob() {
  document.getElementById('mobNav').classList.remove('open');
}
