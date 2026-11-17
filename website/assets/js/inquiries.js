/* Static form: prepares a draft; it does not claim to deliver requests. */
(() => {
  const form = document.querySelector('#inquiry-form');
  if (!form) return;
  const courses = {
    film: ['Filmmaking', 'Scriptwriting', 'Acting for Film', 'Directing', 'Cinematography', 'Photography', 'Editing'],
    solar: ['Solar Fundamentals', 'System Design', 'Installation', 'Commissioning', 'Maintenance & Troubleshooting'],
    music: ['Piano', 'Harmony', 'Guitar', 'Saxophone', 'Drums', 'Music Theory'],
    it: ['Networking & Security', 'Digital Literacy', 'Web Development', 'Mobile App Development', 'Database & Administration']
  };
  const department = form.elements.department;
  const focus = form.elements.focus;
  const updateCourses = () => {
    const list = document.querySelector('#course-options');
    list.replaceChildren(...(courses[department.value] || []).map(name => {
      const option = document.createElement('option'); option.value = name; return option;
    }));
  };
  const params = new URLSearchParams(location.search);
  if (Object.hasOwn(courses, params.get('department'))) department.value = params.get('department');
  if (['customized', 'private'].includes(params.get('type'))) form.elements.programType.value = params.get('type');
  if ((courses[department.value] || []).includes(params.get('course'))) focus.value = params.get('course');
  updateCourses();
  department.addEventListener('change', () => { focus.value = ''; updateCourses(); });
  const draft = () => {
    const data = new FormData(form);
    return [
      'COURSE CUSTOMIZATION & INQUIRY', '',
      `Department: ${department.selectedOptions[0].textContent}`,
      `Program type: ${form.elements.programType.selectedOptions[0].textContent}`,
      `Course / area of focus: ${data.get('focus')}`,
      `Learning goals: ${data.get('goals') || 'Not specified'}`,
      `Preferred schedule: ${data.get('schedule')}`,
      `Name: ${data.get('fullName')}`,
      `Organization: ${data.get('organization') || 'Individual inquiry'}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`
    ].join('\n');
  };
  const status = document.querySelector('#inquiry-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const subject = `Training inquiry: ${department.selectedOptions[0].textContent}`;
    location.href = `mailto:admissions@jp2tvet.edu.et?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft())}`;
    status.textContent = 'Your email app has been requested. Review and send the draft there to complete your inquiry. Nothing has been submitted by this website. If no app opens, download your inquiry and email it to admissions@jp2tvet.edu.et.';
  });
  document.querySelector('#download-inquiry').addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const url = URL.createObjectURL(new Blob([draft()], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'course-inquiry.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Your inquiry copy is ready. Email it to admissions@jp2tvet.edu.et to send your request; downloading does not submit it.';
  });
})();
