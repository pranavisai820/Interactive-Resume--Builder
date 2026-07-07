let skills = [];
    const skillInput = document.getElementById('skillInput');
    const skillTags = document.getElementById('skillTags');
    const previewSkills = document.getElementById('previewSkills');

    skillInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && skillInput.value.trim()) {
        e.preventDefault();
        const newSkill = skillInput.value.trim();
        if (!skills.includes(newSkill)) {
          skills.push(newSkill);
          skillInput.value = '';
          renderSkills();
        }
      }
    });

    function renderSkills() {
      skillTags.innerHTML = '';
      skills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = skill;
        skillTags.appendChild(tag);
      });
      previewSkills.innerHTML = '';
      skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        previewSkills.appendChild(li);
      });
    }

    function addEducation() {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexWrap = 'wrap';
      wrapper.style.gap = '5px';
      wrapper.style.marginBottom = '10px';

      const labels = ['Course', 'Institute', 'Board(Ex:Autonomous)', 'Batch(Ex:2023-2027)', 'CGPA/Marks'];
      labels.forEach(label => {
        const input = document.createElement('input');
        input.placeholder = label;
        input.className = 'eduInput';
        input.style.flex = '1 1 30%';
        wrapper.appendChild(input);
      });

      document.getElementById('educationSection').appendChild(wrapper);
    }

    function addExperience() {
      const input = document.createElement('input');
      input.placeholder = 'Enter experience detail';
      input.className = 'expInput';
      document.getElementById('experienceSection').appendChild(input);
    }

    function updateEducationTable() {
      const inputs = document.querySelectorAll('.eduInput');
      const tbody = document.querySelector('#previewEducation tbody');
      tbody.innerHTML = '';
      for (let i = 0; i < inputs.length; i += 5) {
        const row = document.createElement('tr');
        for (let j = 0; j < 5; j++) {
          const cell = document.createElement('td');
          cell.textContent = inputs[i + j]?.value || '';
          row.appendChild(cell);
        }
        tbody.appendChild(row);
      }
    }

    function showPreview() {
      document.getElementById('previewName').textContent = document.getElementById('name').value || 'Your Name';
      document.getElementById('previewEmail').textContent = document.getElementById('email').value;
      document.getElementById('previewPhone').textContent = document.getElementById('phone').value;
      document.getElementById('previewSummary').textContent = document.getElementById('summary').value;
      updateEducationTable();
      renderSkills();

      const expList = document.getElementById('previewExperience');
      expList.innerHTML = '';
      document.querySelectorAll('.expInput').forEach(input => {
        const li = document.createElement('li');
        li.textContent = input.value;
        expList.appendChild(li);
      });

      document.getElementById('resumePreview').style.display = 'block';
    }

    function downloadPDF() {
      const element = document.getElementById('resumePreview');
      html2pdf().from(element).save('My_Resume.pdf');
    }

    function clearForm() {
      skills = [];
      renderSkills();
      document.getElementById('resumePreview').style.display = 'none';
      document.querySelector('#previewEducation tbody').innerHTML = '';
      document.getElementById('previewExperience').innerHTML = '';
      document.getElementById('previewSummary').textContent = '';
    }