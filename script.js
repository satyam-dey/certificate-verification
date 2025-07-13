// Enhanced verification function with better UX
function verifyStudent() {
  const idInput = document.getElementById('identifier');
  const id = idInput.value.trim();
  const resultBox = document.getElementById('result');

  // Input validation
  if (!id) {
    showToast('⚠️ Please enter a valid Email or ID', 'warning');
    idInput.focus();
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(id);
  
  if (!isEmail && id.length < 3) {
    showToast('⚠️ Please enter a valid email address or student ID', 'warning');
    return;
  }

  showSpinner(true);
  resultBox.innerHTML = '';

  // Simulate network delay with realistic timing
  setTimeout(() => {
    // Generate more realistic dummy data
    const students = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        mobile: "+1 (555) 123-4567",
        domain: "Full Stack Web Development",
        college: "MIT - Massachusetts Institute of Technology",
        start: "15 March 2024",
        duration: "3 Months",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        assignments: [true, true, false, true],
        status: "In Progress",
        completion: 75,
        certificate: "#cert-12345"
      },
      {
        name: "Jane Smith",
        email: "jane.smith@university.edu",
        mobile: "+1 (555) 987-6543",
        domain: "Data Science & Machine Learning",
        college: "Stanford University",
        start: "01 February 2024",
        duration: "4 Months",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        assignments: [true, true, true, true],
        status: "Completed",
        completion: 100,
        certificate: "#cert-67890"
      }
    ];

    // Select student based on input (simple logic for demo)
    const student = isEmail ? 
      students.find(s => s.email.toLowerCase().includes(id.toLowerCase().split('@')[0])) || students[0] :
      students[Math.floor(Math.random() * students.length)];

    // Generate assignment status HTML
    const assignmentHTML = student.assignments.map((completed, index) => {
      const status = completed ? '✅ Completed' : '⏳ Pending';
      const statusClass = completed ? 'completed' : 'pending';
      return `<span class="assignment-${statusClass}">Assignment ${index + 1}: ${status}</span>`;
    }).join('');

    // Generate progress bar
    const progressBar = `
      <div class="progress-container">
        <div class="progress-label">Course Progress: ${student.completion}%</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${student.completion}%"></div>
        </div>
      </div>
    `;

    // Generate certificate status
    const certificateStatus = student.status === 'Completed' ? 
      `<a href="${student.certificate}" target="_blank" class="certificate-link">
        <i class="fas fa-certificate"></i> View Certificate
      </a>` :
      `<div class="certificate-pending">
        <i class="fas fa-clock"></i> Certificate will be available upon course completion
      </div>`;

    const html = `
      <div class="card">
        <div class="student-header">
          <img src="${student.photo}" alt="${student.name}'s Photo" />
          <div class="student-info">
            <h3>${student.name}</h3>
            <div class="status-badge status-${student.status.toLowerCase().replace(' ', '-')}">
              ${student.status}
            </div>
          </div>
        </div>
        
        <div class="student-details">
          <div class="detail-grid">
            <div class="detail-item">
              <i class="fas fa-envelope"></i>
              <span>Email: ${student.email}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-phone"></i>
              <span>Mobile: ${student.mobile}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-code"></i>
              <span>Domain: ${student.domain}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-university"></i>
              <span>College: ${student.college}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-calendar-start"></i>
              <span>Start Date: ${student.start}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-clock"></i>
              <span>Duration: ${student.duration}</span>
            </div>
          </div>
        </div>

        ${progressBar}

        <h4><i class="fas fa-tasks"></i> Assignment Status</h4>
        <div class="assignment-status">
          ${assignmentHTML}
        </div>

        <div class="certificate-section">
          ${certificateStatus}
        </div>
      </div>
    `;

    resultBox.innerHTML = html;
    showSpinner(false);
    
    // Scroll to results
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    const successMessage = student.status === 'Completed' ? 
      '🎉 Certificate verified successfully!' : 
      '📚 Student profile loaded successfully!';
    
    showToast(successMessage, 'success');
    
    // Add some interactive animations
    setTimeout(() => {
      const card = resultBox.querySelector('.card');
      if (card) {
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
          card.style.transform = 'scale(1)';
        }, 200);
      }
    }, 100);

  }, 1500); // Slightly longer delay for better UX
}

// Enhanced toast notification system
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  
  // Remove existing classes
  toast.className = 'toast-notification';
  
  // Add type-specific styling
  switch(type) {
    case 'success':
      toast.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      break;
    case 'warning':
      toast.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      break;
    case 'error':
      toast.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      break;
    default:
      toast.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
  
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span>${message}</span>
    </div>
  `;
  
  toast.classList.add('show');
  
  // Auto hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Enhanced spinner control
function showSpinner(show) {
  const spinner = document.querySelector('.spinner-container');
  const resultBox = document.getElementById('result');
  
  if (show) {
    spinner.classList.remove('hidden');
    resultBox.innerHTML = '';
    // Add loading animation to search box
    const searchBox = document.querySelector('.search-box');
    searchBox.style.transform = 'scale(0.98)';
    searchBox.style.opacity = '0.7';
  } else {
    spinner.classList.add('hidden');
    // Reset search box
    const searchBox = document.querySelector('.search-box');
    searchBox.style.transform = 'scale(1)';
    searchBox.style.opacity = '1';
  }
}

// Add keyboard support
document.getElementById('identifier').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    verifyStudent();
  }
});

// Add input validation feedback
document.getElementById('identifier').addEventListener('input', function(e) {
  const input = e.target;
  const value = input.value.trim();
  
  // Remove any existing validation classes
  input.classList.remove('valid', 'invalid');
  
  if (value.length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value) || value.length >= 3) {
      input.classList.add('valid');
    } else {
      input.classList.add('invalid');
    }
  }
});

// Add smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Add your navigation logic here
  });
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe feature cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Add additional CSS for enhanced features
const additionalStyles = `
  <style>
    .student-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #f1f3f4;
    }
    
    .student-info {
      flex: 1;
    }
    
    .status-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-top: 0.5rem;
    }
    
    .status-completed {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }
    
    .status-in-progress {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    
    .detail-item:hover {
      background: #e9ecef;
      transform: translateX(5px);
    }
    
    .detail-item i {
      color: #667eea;
      width: 20px;
      text-align: center;
    }
    
    .progress-container {
      margin: 2rem 0;
    }
    
    .progress-label {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }
    
    .progress-bar {
      width: 100%;
      height: 12px;
      background: #e9ecef;
      border-radius: 6px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 6px;
      transition: width 1s ease;
    }
    
    .assignment-completed {
      background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
      border: 2px solid #28a745;
      color: #155724;
    }
    
    .assignment-pending {
      background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
      border: 2px solid #ffc107;
      color: #856404;
    }
    
    .certificate-section {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #f1f3f4;
      text-align: center;
    }
    
    .certificate-pending {
      padding: 1rem 2rem;
      background: #f8f9fa;
      border-radius: 12px;
      color: #6c757d;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    input.valid {
      border-color: #28a745;
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }
    
    input.invalid {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    @media (max-width: 768px) {
      .student-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
      
      .detail-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);