document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const generatedResume = document.getElementById('generated-resume') as HTMLDivElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateResume();
    });

    function generateResume() {
        const formData = new FormData(form);
        let resumeHTML = '<h2>Generated Resume</h2>';

        resumeHTML += '<div class="resume-section" contenteditable="true">';
        resumeHTML += '<h3>Personal Information</h3>';
        resumeHTML += `<p><strong>Name:</strong> ${formData.get('name')}</p>`;
        resumeHTML += `<p><strong>Email:</strong> ${formData.get('email')}</p>`;
        resumeHTML += `<p><strong>Phone:</strong> ${formData.get('phone')}</p>`;
        resumeHTML += '</div>';

        resumeHTML += '<div class="resume-section" contenteditable="true">';
        resumeHTML += '<h3>Education</h3>';
        form.querySelectorAll('#education .entry').forEach((entry, index) => {
            resumeHTML += `<p><strong>Qualification:</strong> ${formData.getAll('degree')[index]}</p>`;
            resumeHTML += `<p><strong>Institution:</strong> ${formData.getAll('institution')[index]}</p>`;
            resumeHTML += `<p><strong>Year:</strong> ${formData.getAll('year')[index]}</p>`;
        });
        resumeHTML += '</div>';

        resumeHTML += '<div class="resume-section" contenteditable="true">';
        resumeHTML += '<h3>Work Experience</h3>';
        form.querySelectorAll('#work-experience .entry').forEach((entry, index) => {
            resumeHTML += `<p><strong>Job Title:</strong> ${formData.getAll('job-title')[index]}</p>`;
            resumeHTML += `<p><strong>Company:</strong> ${formData.getAll('company')[index]}</p>`;
            resumeHTML += `<p><strong>Duration:</strong> ${formData.getAll('duration')[index]}</p>`;
        });
        resumeHTML += '</div>';

        resumeHTML += '<div class="resume-section" contenteditable="true">';
        resumeHTML += '<h3>Skills</h3>';
        form.querySelectorAll('#skills .entry').forEach((entry, index) => {
            resumeHTML += `<p>${formData.getAll('skills')[index]}</p>`;
        });
        resumeHTML += '</div>';

        generatedResume.innerHTML = resumeHTML;
    }

    const addEducationButton = document.getElementById('add-education') as HTMLButtonElement;
    const addWorkExperienceButton = document.getElementById('add-work-experience') as HTMLButtonElement;
    const addSkillsButton = document.getElementById('add-skills') as HTMLButtonElement;

    addEducationButton.addEventListener('click', () => addEntry('education'));
    addWorkExperienceButton.addEventListener('click', () => addEntry('work-experience'));
    addSkillsButton.addEventListener('click', () => addEntry('skills'));

    function addEntry(sectionId: string) {
        const section = document.getElementById(sectionId) as HTMLElement;
        const entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = section.querySelector('.entry')!.innerHTML;
        section.insertBefore(entry, section.querySelector('button'));
    }
});
