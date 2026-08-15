/**
 * PREM NAWALE — PORTFOLIO JAVASCRIPT
 * File: js/main.js
 *
 * SECTIONS
 * A. Enable JS animations
 * B. Particle canvas background
 * C. Custom cursor
 * D. 3D card tilt
 * E. Typewriter
 * F. Scroll reveal
 * G. Count-up numbers
 * H. Language bars
 * I. GitHub contrib graph
 * J. Navbar + back-to-top
 * K. Project filter
 * L. Mobile nav
 * M. Contact form → EmailJS (sends real emails to Premnawale3@gmail.com)
 *
 * ─── HOW TO ACTIVATE THE CONTACT FORM ────────────────────────────
 * 1. Go to https://www.emailjs.com and create a FREE account.
 * 2. Add an Email Service → connect your Gmail (Premnawale3@gmail.com)
 *    → copy your SERVICE ID  e.g. "service_abc123"
 * 3. Create an Email Template. Use these variables in the template:
 *       From: {{from_name}} <{{from_email}}>
 *       Subject: {{subject}}
 *       Body:   {{message}}
 *    → copy your TEMPLATE ID  e.g. "template_xyz789"
 * 4. Go to Account → API Keys → copy your PUBLIC KEY  e.g. "AbCdEfGhIjKlMnOp"
 * 5. Replace the three PLACEHOLDER values below with your real ones.
 * ─────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ============================================================
     EMAILJS CONFIG  ← REPLACE THESE THREE VALUES
  ============================================================ */
  var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // from Account → API Keys
  var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';    // from Email Services
  var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // from Email Templates


  /* ============================================================
     A. ENABLE JS ANIMATIONS
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
     D. 3D CARD MOUSE TILT
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
        setTimeout(typeWriter, 2000);
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
     G. COUNT-UP NUMBERS
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
     H. LANGUAGE BAR ANIMATIONS
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
  ============================================================ */
  var graph = document.getElementById('contrib-graph');
  if (graph) {
    var levels  = [0, 1, 2, 3, 4];
    var weights = [0.45, 0.25, 0.15, 0.1, 0.05];
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
     J. NAVBAR ACTIVE LINK + BACK TO TOP
  ============================================================ */
  window.addEventListener('scroll', function () {
    var btt = document.getElementById('btt');
    if (btt) btt.classList.toggle('vis', window.scrollY > 400);

    var activeId = '';
    document.querySelectorAll('section[id]').forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 130) activeId = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
    });
  }, { passive: true });


  /* ============================================================
     K. PROJECT FILTER
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
     M. CONTACT FORM — EmailJS integration
     Sends real email to Premnawale3@gmail.com when configured.
     Falls back gracefully if not yet configured.
  ============================================================ */
  var sendBtn   = document.getElementById('send-btn');
  var btnText   = document.getElementById('btn-text');
  var btnLoad   = document.getElementById('btn-loading');
  var formOk    = document.getElementById('fs');
  var formErr   = document.getElementById('fe');

  // Initialise EmailJS with the public key
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var name    = document.getElementById('cn').value.trim();
      var email   = document.getElementById('ce').value.trim();
      var subject = document.getElementById('cs').value.trim();
      var message = document.getElementById('cm').value.trim();

      // Hide any previous messages
      formOk.style.display = 'none';
      formErr.style.display = 'none';

      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in your name, email and message.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // If EmailJS is not configured, show fallback
      if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        formErr.style.display = 'block';
        formErr.textContent = '⚡ Contact form not yet configured — email me directly at Premnawale3@gmail.com';
        return;
      }

      // Disable button and show loading
      sendBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoad.style.display = 'inline';

      // Send via EmailJS
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  name,
        from_email: email,
        subject:    subject || 'Portfolio Contact',
        message:    message,
        reply_to:   email
      }).then(function () {
        // Success
        formOk.style.display = 'block';
        ['cn', 'ce', 'cs', 'cm'].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.value = '';
        });
        setTimeout(function () { formOk.style.display = 'none'; }, 6000);
      }).catch(function (err) {
        // Error
        console.error('EmailJS error:', err);
        formErr.style.display = 'block';
        setTimeout(function () { formErr.style.display = 'none'; }, 6000);
      }).finally(function () {
        sendBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoad.style.display = 'none';
      });
    });
  }

})();


/* closeMob must be global (called via onclick in HTML) */
function closeMob() {
  document.getElementById('mobNav').classList.remove('open');
}
