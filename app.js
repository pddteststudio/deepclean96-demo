/* DeepClean96 standalone landing page. No frameworks, backend, cookies, analytics or form submissions. */
(() => {
  'use strict';
  const cfg = window.DEEPCLEAN_CONFIG;
  if (!cfg || !Array.isArray(cfg.services)) {
    console.error('Missing config.js');
    return;
  }
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const nf = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });
  const money = n => `${nf.format(n)} ₽`;
  const escapeHtml = input => String(input).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
  const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const servicesById = new Map(cfg.services.map(item => [item.id, item]));
  let order = [];

  function renderServices() {
    const grid = $('#servicesGrid');
    const list = $('#priceList');
    if (!grid || !list) return;
    grid.innerHTML = cfg.services.map(s => {
      const price = s.price === null ? 'По запросу' : `${s.from ? 'от ' : ''}${money(s.price)}`;
      const caption = s.price === null ? 'Стоимость' : s.unit === 'м²' ? 'за 1 м²' : 'за предмет';
      return `<article class="service-card reveal">
        <div class="service-visual theme-${escapeHtml(s.theme)}"><img src="${escapeHtml(s.image)}" loading="eager" alt="Декоративная иллюстрация: ${escapeHtml(s.short.toLowerCase())}" width="620" height="420"></div>
        <div class="service-card-body"><span class="service-tag">${escapeHtml(s.tag)}</span>
          <h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.desc)}</p>
          <div class="service-card-bottom"><div class="service-price"><small>${caption}</small>${price}</div>
            <button class="card-arrow" type="button" data-pick="${escapeHtml(s.id)}" aria-label="Выбрать: ${escapeHtml(s.short)}">${icon('arrow-up-right')}</button>
          </div></div>
      </article>`;
    }).join('');
    list.innerHTML = cfg.services.map((s, i) => {
      const price = s.price === null ? 'По запросу' : `${s.from ? 'от ' : ''}${money(s.price)}`;
      const unit = s.price === null ? 'Уточняется у специалиста' : s.unit === 'м²' ? 'За 1 м²' : 'За предмет';
      const pic = ['couch','home','heart','waves','leaf','sparkle'][i] || 'sparkle';
      return `<div class="price-row"><div class="price-row-left"><span class="price-icon">${icon(pic)}</span><div><div class="price-row-name">${escapeHtml(s.short)}</div><div class="price-row-unit">${unit}</div></div></div><span class="price-row-value ${s.price===null?'quote-only':''}">${price}</span></div>`;
    }).join('') + `<p class="price-source-note">По открытым справочникам. Тарифы не подтверждены исполнителем на текущую дату. Сложность и объём работ могут менять стоимость.</p>`;
    $$('#servicesGrid [data-pick]').forEach(button => {
      button.addEventListener('click', () => {
        $('#serviceSelect').value = button.dataset.pick;
        updateUnit();
        $('#calculator').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
      });
    });
  }

  function applyConfiguration() {
    $$('[data-phone]').forEach(el => el.textContent = cfg.phoneDisplay);
    $$('[data-location]').forEach(el => el.textContent = cfg.locationDisplay);
    $('#reviewsSource').href = cfg.sourceUrl;
    $('#sourceLink').href = cfg.sourceUrl;
    $('#currentYear').textContent = String(new Date().getFullYear());
    if (!cfg.previewMode) {
      const phone = $('#contactNumber [data-phone]');
      if (phone && /^\+\d{8,16}$/.test(cfg.phoneE164)) {
        const link = document.createElement('a');
        link.href = `tel:${cfg.phoneE164}`;
        link.textContent = cfg.phoneDisplay;
        phone.replaceWith(link);
      }
      // Remove nonofficial warnings only after owner approval and verification of all page content.
      // The config flag alone does not make this a real/official website.
    }
  }

  function updateUnit() {
    const service = servicesById.get($('#serviceSelect').value);
    if (!service) return;
    const isArea = service.unit === 'м²';
    $('#quantityLabel').textContent = isArea ? 'Площадь, м²' : 'Количество, шт.';
    $('#unitHelp').textContent = isArea ? 'Укажите площадь ковра' : 'Укажите количество предметов';
    const input = $('#quantityInput');
    input.min = isArea ? '0.5' : '1';
    input.max = isArea ? '500' : '100';
    input.step = isArea ? '0.5' : '1';
    input.value = '1';
  }

  function setupCalculator() {
    const select = $('#serviceSelect');
    select.innerHTML = cfg.services.map(s => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.short)}</option>`).join('');
    select.addEventListener('change', updateUnit);
    updateUnit();

    const qty = $('#quantityInput');
    function adjustQuantity(direction) {
      const step = Number(qty.step) || 1;
      const min = Number(qty.min) || 1;
      const max = Number(qty.max) || 100;
      const current = Number(qty.value) || min;
      qty.value = String(Math.min(max, Math.max(min, Math.round((current + direction * step) / step) * step)));
    }
    $('#qtyMinus').addEventListener('click', () => adjustQuantity(-1));
    $('#qtyPlus').addEventListener('click', () => adjustQuantity(1));
    $('#calculatorForm').addEventListener('submit', event => {
      event.preventDefault();
      const service = servicesById.get(select.value);
      const amount = Number(qty.value);
      const min = Number(qty.min);
      const max = Number(qty.max);
      const step = Number(qty.step);
      if (!service || !Number.isFinite(amount) || amount < min || amount > max || Math.abs((amount - min) / step - Math.round((amount - min) / step)) > 0.00001) {
        qty.setCustomValidity(`Укажите значение от ${min} до ${max} с шагом ${step}`);
        qty.reportValidity();
        return;
      }
      qty.setCustomValidity('');
      const existing = order.find(o => o.id === service.id);
      if (existing) existing.amount += amount;
      else order.push({ id: service.id, amount });
      renderOrder();
      $('#copyFeedback').textContent = '';
    });
    qty.addEventListener('input', () => qty.setCustomValidity(''));
    $('#clearCalc').addEventListener('click', () => { order = []; renderOrder(); $('#copyFeedback').textContent = ''; });
    $('#copyCalc').addEventListener('click', copyRequest);
    renderOrder();
  }

  function renderOrder() {
    const itemsEl = $('#calcItems');
    const totalEl = $('#calcTotal');
    const totalNote = $('#calcTotalNote');
    if (!order.length) {
      itemsEl.innerHTML = `<p class="empty-calc">${icon('sparkle')} Добавьте первую услугу — здесь появится расчёт.</p>`;
      totalEl.textContent = '—';
      totalNote.textContent = 'Итог рассчитывается по минимальным опубликованным тарифам.';
      $('#copyCalc').disabled = true;
      $('#clearCalc').hidden = true;
      return;
    }
    const known = order.filter(o => servicesById.get(o.id)?.price !== null);
    const hasQuote = order.some(o => servicesById.get(o.id)?.price === null);
    const total = known.reduce((sum, o) => sum + servicesById.get(o.id).price * o.amount, 0);
    itemsEl.innerHTML = order.map(o => {
      const s = servicesById.get(o.id);
      const price = s.price === null ? 'По запросу' : `${s.from ? 'от ' : ''}${money(s.price * o.amount)}`;
      return `<div class="calc-item"><div class="calc-item-name">${escapeHtml(s.short)}<small>${nf.format(o.amount)} ${escapeHtml(s.unit)}</small></div><span class="calc-item-price">${price}</span><button type="button" class="remove-btn" data-remove="${escapeHtml(o.id)}" aria-label="Удалить ${escapeHtml(s.short)}">${icon('close')}</button></div>`;
    }).join('');
    totalEl.textContent = known.length ? `от ${money(total)}` : 'Уточняется';
    totalNote.textContent = hasQuote
      ? 'Есть услуги без опубликованного тарифа. Итоговая сумма требует согласования.'
      : 'Минимальный ориентир по опубликованным ценам. Не является офертой.';
    $('#copyCalc').disabled = false;
    $('#clearCalc').hidden = false;
    $$('[data-remove]', itemsEl).forEach(btn => btn.addEventListener('click', () => {
      order = order.filter(item => item.id !== btn.dataset.remove);
      renderOrder();
    }));
  }

  function requestText() {
    const lines = order.map(o => {
      const s = servicesById.get(o.id);
      return `• ${s.title}: ${nf.format(o.amount)} ${s.unit}${s.price === null ? ' — стоимость уточняется' : ` — ${s.from ? 'от ' : ''}${money(s.price * o.amount)}`}`;
    });
    const priced = order.filter(o => servicesById.get(o.id).price !== null);
    const total = priced.reduce((sum, o) => sum + servicesById.get(o.id).price * o.amount, 0);
    return ['Здравствуйте! Хотел(а) бы уточнить возможность химчистки и актуальную стоимость:', '', ...lines,
      '', priced.length ? `Сумма по опубликованным минимальным тарифам: от ${money(total)}.` : 'Стоимость услуг — по запросу.',
      'Расчёт ориентировочный, окончательная стоимость и выезд уточняются у исполнителя.',
      '', 'Текст сформирован в независимой демонстрации сайта DeepClean96. Заявка не отправлена.'].join('\n');
  }

  async function copyRequest() {
    if (!order.length) return;
    const text = requestText();
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); copied = true; } catch (_) { /* fallback */ }
    }
    if (!copied) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { copied = document.execCommand('copy'); } catch (_) { /* unsupported */ }
      textarea.remove();
    }
    $('#copyFeedback').textContent = copied
      ? 'Запрос скопирован. Вы можете самостоятельно отправить его исполнителю.'
      : 'Не удалось скопировать автоматически. Проверьте доступ браузера к буферу обмена.';
  }

  function setupNavigation() {
    const toggle = $('#menuToggle');
    const nav = $('#mobileNav');
    const header = $('.site-header');
    function setOpen(open) {
      nav.classList.toggle('open', open);
      nav.inert = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      toggle.innerHTML = icon(open ? 'close' : 'menu', 'icon-24');
      document.body.classList.toggle('nav-open', open);
    }
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    $$('a', nav).forEach(el => el.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', e => { if (nav.classList.contains('open') && !e.composedPath().includes(header)) setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 920 && nav.classList.contains('open')) setOpen(false); });
    const scrolled = () => header.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', scrolled, { passive: true });
    scrolled();
  }

  function setupReveals() {
    const nodes = $$('.reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reducedMotion) {
      nodes.forEach(n => n.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .09, rootMargin: '0px 0px -18px 0px' });
    nodes.forEach(n => observer.observe(n));
  }

  document.documentElement.classList.add('js');
  applyConfiguration();
  renderServices();
  setupCalculator();
  setupNavigation();
  setupReveals();
})();
