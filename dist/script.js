"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var generatedResume = document.getElementById('generated-resume');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateResume();
    });
    function generateResume() {
        var formData = new FormData(form);
        var resumeHTML = '<h2>Generated Resume</h2>';
        resumeHTML += '<div class="resume-section" contenteditable="true">';
        resumeHTML += '<h3>Personal Information</h3>';
        resumeHTML += "<p><strong>Name:</strong> ".concat(formData.get('name'), "</p>");
        resumeHTML += "<p><strong>Email:</strong> ".concat(formData.get('email'), "</p>");
        resumeHTML += "<p><strong>Phone:</strong> ".concat(formData.get('phone'), "</p>");
        resumeHTML += '</div>';
        resumeHTML += '<div class="resume-section" contenteditable="true">';
        resumeHTML += '<h3>Education</h3>';
        form.querySelectorAll('#education .entry').forEach(function (entry, index) {
            resumeHTML += "<p><strong>Qualification:</strong> ".concat(formData.getAll('degree')[index], "</p>");
            resumeHTML += "<p><strong>Institution:</strong> ".concat(formData.getAll('institution')[index], "</p>");
            resumeHTML += "<p><strong>Year:</strong> ".concat(formData.getAll('year')[index], "</p>");
        });
        resumeHTML += '</div>';
        resumeHTML += '<div class="resume-section" contenteditable="true">';
        resumeHTML += '<h3>Work Experience</h3>';
        form.querySelectorAll('#work-experience .entry').forEach(function (entry, index) {
            resumeHTML += "<p><strong>Job Title:</strong> ".concat(formData.getAll('job-title')[index], "</p>");
            resumeHTML += "<p><strong>Company:</strong> ".concat(formData.getAll('company')[index], "</p>");
            resumeHTML += "<p><strong>Duration:</strong> ".concat(formData.getAll('duration')[index], "</p>");
        });
        resumeHTML += '</div>';
        resumeHTML += '<div class="resume-section" contenteditable="true">';
        resumeHTML += '<h3>Skills</h3>';
        form.querySelectorAll('#skills .entry').forEach(function (entry, index) {
            resumeHTML += "<p>".concat(formData.getAll('skills')[index], "</p>");
        });
        resumeHTML += '</div>';
        generatedResume.innerHTML = resumeHTML;
    }
    var addEducationButton = document.getElementById('add-education');
    var addWorkExperienceButton = document.getElementById('add-work-experience');
    var addSkillsButton = document.getElementById('add-skills');
    addEducationButton.addEventListener('click', function () { return addEntry('education'); });
    addWorkExperienceButton.addEventListener('click', function () { return addEntry('work-experience'); });
    addSkillsButton.addEventListener('click', function () { return addEntry('skills'); });
    function addEntry(sectionId) {
        var section = document.getElementById(sectionId);
        var entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = section.querySelector('.entry').innerHTML;
        section.insertBefore(entry, section.querySelector('button'));
    }
});
