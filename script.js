/* AQUA365 — Landing Page · script.js · v2.0 */

(function () {
  'use strict';

  /* ── Helpers ───────────────────────────────────────────────────── */
  const PENDING = v => !v || v.startsWith('[POR DEFINIR') || v.startsWith('[POR DEFIN');

  function setText(id, val) {
    if (PENDING(val)) return;
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function setLink(selector, href) {
    if (PENDING(href)) return;
    document.querySelectorAll(selector).forEach(el => el.setAttribute('href', href));
  }

  function setImgSrc(id, src) {
    if (!src || PENDING(src)) return;
    const el = document.getElementById(id);
    if (el) el.setAttribute('src', src);
  }

  /* ── Content injection ─────────────────────────────────────────── */
  async function cargarContenido() {
    try {
      const res = await fetch('contenido_aqua365.txt');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = JSON.parse(await res.text());
      inyectar(data);
    } catch (err) {
      console.warn('[AQUA365] No se pudo cargar contenido_aqua365.txt: ' + err.message);
      console.info('[AQUA365] Revisa README.txt — el sitio necesita un servidor local (no abrir index.html con doble clic).');
    }
  }

  function inyectar(d) {
    const p  = d.programa   || {};
    const c  = d.cifras     || {};
    const m  = d.multimedia || {};
    const fechas = d.fechas_clave || [];

    /* Año */
    document.querySelectorAll('[data-anio]').forEach(el => {
      if (p.anio) el.textContent = p.anio;
    });

    /* Cifras */
    setText('stat-estudiantes', c.estudiantes_acumulados);
    setText('stat-versiones',   c.versiones);
    setText('stat-comunidades', c.comunidades);
    setText('stat-periodo',     c.periodo_comunidades);
    setText('stat-aliadas',     c.organizaciones_aliadas);

    /* Hero background photo */
    if (m.foto_hero) {
      const hero = document.getElementById('hero-section');
      if (hero) {
        const img = new Image();
        img.onload = () => {
          hero.style.backgroundImage = 'url("' + m.foto_hero + '")';
          hero.classList.add('has-photo');
        };
        img.src = m.foto_hero;
      }
    }

    /* Logos */
    setImgSrc('logo-aqua365-header', m.logo_aqua365);
    setImgSrc('logo-aqua365-footer', m.logo_aqua365);
    setImgSrc('logo-isf-organizer',  m.logo_isf);
    setImgSrc('logo-uchile',         m.logo_uchile);
    setImgSrc('foto-terreno',        m.foto_terreno);
    setImgSrc('foto-estudiantes',     m.foto_estudiantes);

    /* Links (all instances) */
    setLink('[data-link="postulacion"]', p.link_postulacion);
    setLink('[data-link="bases"]',       p.link_bases);
    setLink('[data-link="instagram"]',   p.instagram);

    /* Correo */
    if (!PENDING(p.correo)) {
      document.querySelectorAll('[data-correo]').forEach(el => {
        el.textContent = p.correo;
        el.setAttribute('href', 'mailto:' + p.correo);
      });
    }

    /* Fecha cierre en announce bar y CTA */
    const fechaCierre = fechas.find(f => f.id === 'cierre');
    if (fechaCierre && !PENDING(fechaCierre.fecha)) {
      document.querySelectorAll('[data-fecha-cierre]').forEach(el => {
        el.textContent = fechaCierre.fecha;
      });
    }

    /* Tabla de fechas */
    let fechasVisibles = 0;
    fechas.forEach(f => {
      const row = document.getElementById('fila-' + f.id);
      if (!row) return;
      if (!PENDING(f.fecha)) {
        const valEl = row.querySelector('[data-fecha-valor]');
        if (valEl) valEl.textContent = f.fecha;
        row.removeAttribute('hidden');
        fechasVisibles += 1;
      } else {
        row.setAttribute('hidden', '');
      }
    });
    const placeholderFechas = document.getElementById('fila-placeholder');
    if (placeholderFechas) {
      placeholderFechas.toggleAttribute('hidden', fechasVisibles > 0);
    }

    /* Requisitos */
    setText('req-modalidad',  p.modalidad);
    setText('req-dedicacion', p.dedicacion_semanal);
    setText('req-costo',      p.costo);

    /* Desafíos */
    (d.desafios || []).forEach(des => {
      const card = document.getElementById(des.id);
      if (!card) return;

      const nomEl  = card.querySelector('[data-nombre]');
      const regEl  = card.querySelector('[data-region]');
      const detWrap = card.querySelector('[data-detalle-wrap]');
      const detEl  = card.querySelector('[data-detalle]');
      const imgEl  = card.querySelector('.comm-img img');

      if (nomEl  && !PENDING(des.nombre)) nomEl.textContent = des.nombre;
      if (regEl  && !PENDING(des.region)) regEl.textContent = des.region;

      if (detEl) {
        if (!PENDING(des.detalle)) {
          detEl.textContent = des.detalle;
          if (detWrap) detWrap.removeAttribute('hidden');
        } else {
          if (detWrap) detWrap.setAttribute('hidden', '');
        }
      }

      if (imgEl && des.imagen) {
        const imgWrap = imgEl.closest('.comm-img');
        if (imgWrap) imgWrap.classList.remove('no-photo');
        imgEl.style.display = 'block';
        imgEl.setAttribute('src', des.imagen);
        if (!PENDING(des.alt)) imgEl.setAttribute('alt', des.alt);
        imgEl.onerror = function () {
          this.closest('.comm-img').classList.add('no-photo');
          this.style.display = 'none';
        };
      }
    });

    /* Patrocinadores (generados dinámicamente) */
    const cont = document.getElementById('sponsors-list');
    if (cont && d.patrocinadores && d.patrocinadores.length) {
      cont.innerHTML = '';
      d.patrocinadores.forEach(pat => {
        const item = document.createElement('div');
        item.className = 'logo-item';

        const img = document.createElement('img');
        img.setAttribute('src', pat.logo);
        img.setAttribute('alt', pat.alt || ('Logo de ' + pat.nombre));
        img.onerror = function () {
          item.innerHTML = '<span class="logo-txt-fb">' + pat.nombre + '</span>';
        };

        item.appendChild(img);
        cont.appendChild(item);
      });
    }
  }

  /* ── Mobile menu ───────────────────────────────────────────────── */
  function initMobileMenu() {
    const btn = document.getElementById('mbtn');
    const nav = document.getElementById('mnav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      this.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── FAQ accordion ─────────────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const wrap  = this.nextElementSibling;
        const chev  = this.querySelector('.fchev');
        const isOpen = this.getAttribute('aria-expanded') === 'true';

        /* Close all */
        document.querySelectorAll('.faq-btn').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.classList.remove('open');
          const c = b.querySelector('.fchev');
          if (c) c.classList.remove('open');
        });

        /* Open clicked if it was closed */
        if (!isOpen) {
          this.setAttribute('aria-expanded', 'true');
          wrap.classList.add('open');
          if (chev) chev.classList.add('open');
        }
      });
    });
  }

  /* ── Smooth scroll ─────────────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#' || id === '') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Fade in on scroll ─────────────────────────────────────────── */
  function initFadeIn() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const style = document.createElement('style');
    style.textContent =
      '.fi{opacity:0;transform:translateY(14px);transition:opacity 450ms ease,transform 450ms ease}' +
      '.fi.v{opacity:1;transform:none}';
    document.head.appendChild(style);

    document.querySelectorAll('.pillar, .stage, .bene, .comm-card, .req-item').forEach(el => {
      el.classList.add('fi');
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('v');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fi').forEach(el => io.observe(el));
  }

  /* ── Init ──────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    cargarContenido();
    initMobileMenu();
    initFAQ();
    initSmoothScroll();
    initFadeIn();
  });

}());
