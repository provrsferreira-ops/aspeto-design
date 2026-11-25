/* Aspeto Design — formulário de briefing */
(function () {
  // ===== CONFIGURAÇÃO =====
  // Coloque aqui o email que recebe os pedidos (via FormSubmit.co). Vazio = só mostra a confirmação.
  var EMAIL = '';
  var CALL_URL = ''; // link do Calendly / Cal.com (vazio = sem botão de chamada)
  // ========================

  function copy(locale) {
    const pt = {
      steps: [
        { key: 'sector', type: 'single', title: 'Que tipo de negócio tem?', hint: 'Escolha a opção mais próxima.', options: ['Hotel ou boutique hotel', 'Alojamento local', 'Turismo rural ou quinta', 'Tours e experiências', 'Espaço de eventos ou casamentos', 'Restaurante ou bar', 'Outro'] },
        { key: 'size', type: 'single', title: 'Qual é a dimensão?', hint: 'Quartos, unidades ou capacidade aproximada.', options: ['1 a 5 unidades', '6 a 20', '21 a 60', 'Mais de 60', 'Não se aplica'] },
        { key: 'phase', type: 'single', title: 'Em que fase está?', hint: 'Ajuda-nos a perceber o calendário.', options: ['Vou abrir em breve', 'Estou a remodelar ou a renovar a imagem', 'Já funciona e quero mais reservas diretas'] },
        { key: 'needs', type: 'multi', title: 'Do que precisa?', hint: 'Pode escolher várias opções.', options: ['Nome e logótipo', 'Identidade visual completa', 'Site com reservas diretas', 'Menus, brochuras e sinalética', 'Conteúdo para redes sociais', 'Materiais de abertura ou evento', 'Ainda não sei'] },
        { key: 'about', type: 'about', title: 'Fale-nos do seu espaço', hint: 'Onde fica, que hóspedes recebe e o que o torna especial.' },
        { key: 'refs', type: 'refs', title: 'Site atual e referências', hint: 'Opcional. O seu site ou Instagram e espaços de que gosta.' },
        { key: 'deadline', type: 'single', title: 'Para quando precisa?', hint: 'Um prazo aproximado chega.', options: ['Abro em menos de 3 meses', 'Nos próximos 3 a 6 meses', 'Sem data definida'] },
        { key: 'budget', type: 'single', title: 'Qual é o orçamento aproximado?', hint: 'Serve só para lhe propormos a solução certa.', options: ['Até 1 500 €', '1 500 – 5 000 €', '5 000 – 15 000 €', 'Mais de 15 000 €', 'Ainda não sei'] },
        { key: 'contact', type: 'contact', title: 'Como podemos falar consigo?', hint: 'Respondemos em 24 horas.' }
      ],
      of: 'de', step: 'Passo',
      aboutLabel: 'Sobre o espaço', aboutPh: 'Ex.: casa de 8 quartos no Douro, para casais que procuram vinho e sossego…',
      refsLabel: 'Links (opcional)',
      nameLabel: 'Nome', phoneLabel: 'WhatsApp (opcional)', prefLabel: 'Prefere ser contactado por:',
      prefs: ['Email', 'WhatsApp', 'Videochamada'],
      back: 'Voltar', next: 'Continuar', send: 'Enviar pedido', timeNote: 'Cerca de 2 minutos',
      errPick: 'Escolha uma opção para continuar.', errText: 'Escreva algumas palavras sobre o espaço para continuar.', errContact: 'Indique o seu nome e um email válido.',
      doneTitle: 'Recebemos o seu pedido.', doneBody: 'Vamos ler o seu briefing e responder em 24 horas. Se preferir adiantar, marque já uma chamada de 20 minutos connosco.', call: 'Marcar chamada'
    };
    const en = {
      steps: [
        { key: 'sector', type: 'single', title: 'What kind of business is it?', hint: 'Pick the closest option.', options: ['Hotel or boutique hotel', 'Holiday rental', 'Rural stay or estate', 'Tours and experiences', 'Event or wedding venue', 'Restaurant or bar', 'Other'] },
        { key: 'size', type: 'single', title: 'How big is it?', hint: 'Rooms, units or approximate capacity.', options: ['1 to 5 units', '6 to 20', '21 to 60', 'More than 60', 'Doesn’t apply'] },
        { key: 'phase', type: 'single', title: 'Where are you at?', hint: 'It helps us understand your timeline.', options: ['Opening soon', 'Renovating or refreshing the brand', 'Already open, want more direct bookings'] },
        { key: 'needs', type: 'multi', title: 'What do you need?', hint: 'You can pick more than one.', options: ['Name and logo', 'Full visual identity', 'Website with direct bookings', 'Menus, brochures and signage', 'Social media content', 'Opening or event materials', 'Not sure yet'] },
        { key: 'about', type: 'about', title: 'Tell us about your place', hint: 'Where it is, who your guests are and what makes it special.' },
        { key: 'refs', type: 'refs', title: 'Current site and references', hint: 'Optional. Your website or Instagram and places you like.' },
        { key: 'deadline', type: 'single', title: 'When do you need it?', hint: 'A rough timeline is fine.', options: ['Opening in under 3 months', 'In the next 3 to 6 months', 'No fixed date'] },
        { key: 'budget', type: 'single', title: 'What’s your approximate budget?', hint: 'It only helps us suggest the right option.', options: ['Up to €1,500', '€1,500 – €5,000', '€5,000 – €15,000', 'Over €15,000', 'Not sure yet'] },
        { key: 'contact', type: 'contact', title: 'How can we reach you?', hint: 'We reply within 24 hours.' }
      ],
      of: 'of', step: 'Step',
      aboutLabel: 'About your place', aboutPh: 'E.g. an 8-room house in the Douro Valley for couples looking for wine and quiet…',
      refsLabel: 'Links (optional)',
      nameLabel: 'Name', phoneLabel: 'WhatsApp (optional)', prefLabel: 'Preferred contact:',
      prefs: ['Email', 'WhatsApp', 'Video call'],
      back: 'Back', next: 'Continue', send: 'Send request', timeNote: 'About 2 minutes',
      errPick: 'Pick an option to continue.', errText: 'Write a few words about your place to continue.', errContact: 'Please enter your name and a valid email.',
      doneTitle: 'We’ve got your request.', doneBody: 'We’ll read your brief and reply within 24 hours. Want to move faster? Book a 20-minute call with us now.', call: 'Book a call'
    };
    return locale === 'en' ? en : pt;
  }

  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function mount(root) {
    var locale = root.getAttribute('data-locale') || 'pt';
    var c = copy(locale);
    var total = c.steps.length;
    var st = { step: 0, needs: [], phase: null, sector: null, size: null, about: '', refs: '', deadline: null, budget: null, name: '', email: '', phone: '', pref: null, error: false, sent: false, sending: false };

    function optBtn(label, on, cls, attrs) {
      return '<button type="button" class="' + cls + (on ? ' is-on' : '') + '" aria-pressed="' + on + '" ' + attrs + '>' + esc(label) + '</button>';
    }

    function render() {
      var s = c.steps[st.step];
      var h = '<div class="bf-card">';
      if (st.sent) {
        h += '<div class="bf-done"><div class="bf-check"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' +
          '<h3 class="bf-title">' + esc(c.doneTitle) + '</h3><p class="bf-hint" style="max-width:520px">' + esc(CALL_URL ? c.doneBody : c.doneBody.split('. ')[0] + '.') + '</p>' +
          (CALL_URL ? '<a class="bf-primary" href="' + esc(CALL_URL) + '" target="_blank" rel="noopener">' + esc(c.call) + '</a>' : '') + '</div></div>';
        root.innerHTML = h; return;
      }
      h += '<div class="bf-progress">';
      for (var i = 0; i < total; i++) h += '<span class="' + (i <= st.step ? 'on' : '') + '"></span>';
      h += '</div><span class="bf-step">' + esc(c.step + ' ' + (st.step + 1) + ' ' + c.of + ' ' + total) + '</span>';
      h += '<div class="bf-head"><h3 class="bf-title">' + esc(s.title) + '</h3><p class="bf-hint">' + esc(s.hint) + '</p></div>';

      if (s.type === 'multi' || s.type === 'single') {
        h += '<div class="bf-grid">';
        s.options.forEach(function (label, i) {
          var on = s.type === 'multi' ? st.needs.indexOf(label) !== -1 : st[s.key] === label;
          h += optBtn(label, on, 'bf-opt', 'data-opt="' + i + '"');
        });
        h += '</div>';
      } else if (s.type === 'about') {
        h += '<label class="bf-label">' + esc(c.aboutLabel) + '<textarea rows="5" data-field="about" placeholder="' + esc(c.aboutPh) + '">' + esc(st.about) + '</textarea></label>';
      } else if (s.type === 'refs') {
        h += '<label class="bf-label">' + esc(c.refsLabel) + '<input type="text" data-field="refs" placeholder="instagram.com/… · www.…" value="' + esc(st.refs) + '"></label>';
      } else if (s.type === 'contact') {
        h += '<div class="bf-fields">' +
          '<label class="bf-label">' + esc(c.nameLabel) + '<input type="text" autocomplete="name" data-field="name" value="' + esc(st.name) + '"></label>' +
          '<label class="bf-label">Email<input type="email" autocomplete="email" data-field="email" value="' + esc(st.email) + '"></label>' +
          '<label class="bf-label">' + esc(c.phoneLabel) + '<input type="tel" autocomplete="tel" data-field="phone" value="' + esc(st.phone) + '"></label></div>' +
          '<div class="bf-pref"><span class="bf-label" style="gap:0">' + esc(c.prefLabel) + '</span><div class="bf-pills">';
        c.prefs.forEach(function (label, i) { h += optBtn(label, st.pref === label, 'bf-pill', 'data-pref="' + i + '"'); });
        h += '</div></div>';
      }

      if (st.error) {
        var et = s.type === 'about' ? c.errText : s.type === 'contact' ? c.errContact : c.errPick;
        h += '<p class="bf-error" role="alert">' + esc(et) + '</p>';
      }

      h += '<div class="bf-actions">';
      h += st.step > 0 ? '<button type="button" class="bf-secondary" data-act="back">' + esc(c.back) + '</button>' : '<span class="bf-note">' + esc(c.timeNote) + '</span>';
      h += st.step < total - 1
        ? '<button type="button" class="bf-primary" data-act="next">' + esc(c.next) + '</button>'
        : '<button type="button" class="bf-primary" data-act="submit"' + (st.sending ? ' disabled' : '') + '>' + esc(c.send) + '</button>';
      h += '</div></div>';
      root.innerHTML = h;
    }

    root.addEventListener('input', function (e) {
      var f = e.target.getAttribute && e.target.getAttribute('data-field');
      if (f) { st[f] = e.target.value; }
    });

    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      var s = c.steps[st.step];
      if (t.hasAttribute('data-opt')) {
        var label = s.options[+t.getAttribute('data-opt')];
        if (s.type === 'multi') {
          var i = st.needs.indexOf(label);
          if (i === -1) st.needs.push(label); else st.needs.splice(i, 1);
        } else { st[s.key] = label; }
        st.error = false; render(); return;
      }
      if (t.hasAttribute('data-pref')) { st.pref = c.prefs[+t.getAttribute('data-pref')]; st.error = false; render(); return; }
      var act = t.getAttribute('data-act');
      if (act === 'back') { st.step = Math.max(0, st.step - 1); st.error = false; render(); }
      if (act === 'next') {
        var ok = true;
        if (s.type === 'multi') ok = st.needs.length > 0;
        else if (s.type === 'single') ok = !!st[s.key];
        else if (s.type === 'about') ok = st.about.trim().length > 0;
        if (ok) { st.step = Math.min(total - 1, st.step + 1); st.error = false; } else st.error = true;
        render();
      }
      if (act === 'submit') {
        var okc = st.name.trim().length > 0 && /.+@.+\..+/.test(st.email.trim());
        if (!okc) { st.error = true; render(); return; }
        if (!EMAIL) { st.sent = true; render(); return; }
        st.sending = true; render();
        var payload = {
          _subject: 'Novo briefing — ' + st.name,
          _template: 'table',
          Nome: st.name, Email: st.email, WhatsApp: st.phone, Contacto_preferido: st.pref || '',
          Tipo_de_negocio: st.sector || '', Dimensao: st.size || '', Fase: st.phase || '',
          Precisa_de: st.needs.join(', '), Sobre: st.about, Referencias: st.refs,
          Prazo: st.deadline || '', Orcamento: st.budget || '', Idioma: locale
        };
        fetch('https://formsubmit.co/ajax/' + encodeURIComponent(EMAIL), {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload)
        }).then(function () { st.sent = true; }).catch(function () { st.sent = true; }).then(function () { st.sending = false; render(); });
      }
    });

    render();
  }

  var el = document.getElementById('briefing-app');
  if (el) mount(el);
})();
