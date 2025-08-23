// Password visibility toggle functions
const showHiddenPass = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye);

  if (iconEye && input) {
    iconEye.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        iconEye.classList.add("ri-eye-line");
        iconEye.classList.remove("ri-eye-off-line");
      } else {
        input.type = "password";
        iconEye.classList.remove("ri-eye-line");
        iconEye.classList.add("ri-eye-off-line");
      }
    });
  }
};

const showHiddenPas = (registerPass, registerEye) => {
  const input = document.getElementById(registerPass),
    iconEye = document.getElementById(registerEye);

  if (iconEye && input) {
    iconEye.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        iconEye.classList.add("ri-eye-line");
        iconEye.classList.remove("ri-eye-off-line");
      } else {
        input.type = "password";
        iconEye.classList.remove("ri-eye-line");
        iconEye.classList.add("ri-eye-off-line");
      }
    });
  }
};

// Initialize password visibility toggles
document.addEventListener('DOMContentLoaded', () => {
  showHiddenPass("login-pass", "login-eye");
  showHiddenPas("register-pass", "register-eye");
});

// Validation patterns
var vemail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
var vname = /^[a-zA-Z\s]{1,20}$/;
var vpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$#!_]).{6,20}$/;

// Login form submission
document.addEventListener('DOMContentLoaded', () => {
  // Get the login form inside the new structure
  const loginFormContainer = document.getElementById("loginForm");
  if (loginFormContainer) {
    const loginForm = loginFormContainer.querySelector('.modern-auth-form');
    
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-pass").value;
        const isAdminCheckbox = document.getElementById('login-check');
        const submitBtn = loginForm.querySelector('.auth-submit-btn');

        const role = isAdminCheckbox && isAdminCheckbox.checked ? 'admin' : 'user';
        console.log('Logging in as:', role);

        // Validation
        if (!vemail.test(email)) {
          showNotification('Please enter a valid email address (example@mail.com)', 'error');
          return;
        }

        if (!vpass.test(password)) {
          showNotification('Password must contain: uppercase, lowercase, number, special character (@,$,#,!,_), and be 6-20 characters long', 'error');
          return;
        }

        // Show loading state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('loading');
          submitBtn.innerHTML = '<span>Signing In...</span>';
        }

        try {
          const response = await fetch('http://127.0.0.1:3000/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role }),
          });

          const responseData = await response.json();

          if (response.ok) {
            console.log('Login successful:', responseData);
            
            const { token, username } = responseData;
            localStorage.setItem('auth-token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('userRole', role);

            showNotification('Login successful! Redirecting...', 'success');

            setTimeout(() => {
              if (role === 'admin') {
                window.location.href = "./admin.html";
              } else {
                window.location.href = "./user.html";
              }
            }, 1500);
          } else {
            // Handle error responses
            const errorMessage = responseData.message || 'Login failed';
            
            if (errorMessage.includes('Invalid role')) {
              showNotification('Invalid role. Please check if you are logging in with the correct role.', 'error');
            } else if (errorMessage.includes('Email not found')) {
              showNotification('Email not found. Please register first.', 'error');
            } else if (errorMessage.includes('Invalid Password')) {
              showNotification('Incorrect password. Please try again.', 'error');
            } else {
              showNotification(errorMessage, 'error');
            }
          }
        } catch (error) {
          console.error('Login error:', error);
          showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
          // Reset button state
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<span>Sign In</span><i class="ri-arrow-right-line"></i>';
          }
        }
      });
    }
  }
});

// Register form submission
document.addEventListener('DOMContentLoaded', () => {
  // Get the register form inside the new structure
  const registerFormContainer = document.getElementById('registerForm');
  if (registerFormContainer) {
    const registerForm = registerFormContainer.querySelector('.modern-auth-form');
    
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-pass').value;
        const isAdminCheckbox = document.getElementById('register-is-admin');
        const acceptTerms = document.getElementById('accept-terms');
        const submitBtn = registerForm.querySelector('.auth-submit-btn');

        const role = isAdminCheckbox && isAdminCheckbox.checked ? 'admin' : 'user';

        // Check terms acceptance
        if (!acceptTerms || !acceptTerms.checked) {
          showNotification('Please accept the Terms & Conditions to continue', 'error');
          return;
        }

        // Validation
        if (!vname.test(name)) {
          showNotification('Name must contain only letters and spaces (max 20 characters)', 'error');
          return;
        }

        if (!vemail.test(email)) {
          showNotification('Please enter a valid email address', 'error');
          return;
        }

        if (!vpass.test(password)) {
          showNotification('Password must contain: uppercase, lowercase, number, special character (@,$,#,!,_), and be 6-20 characters long', 'error');
          return;
        }

        // Show loading state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('loading');
          submitBtn.innerHTML = '<span>Creating Account...</span>';
        }

        try {
          const response = await fetch('http://127.0.0.1:3000/api/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role }),
          });

          if (response.ok) {
            const data = await response.json();
            showNotification(`Registration successful! You have been registered as a ${role === 'admin' ? 'Administrator' : 'Regular User'}. Please login to continue.`, 'success');
            
            // Switch to login tab after 2 seconds
            setTimeout(() => {
              switchToLogin();
              // Pre-fill email in login form
              const loginEmail = document.getElementById('login-email');
              if (loginEmail) {
                loginEmail.value = email;
              }
              // Pre-check admin checkbox if registered as admin
              if (role === 'admin') {
                const loginCheckbox = document.getElementById('login-check');
                if (loginCheckbox) {
                  loginCheckbox.checked = true;
                  toggleLoginRole();
                }
              }
            }, 2000);
          } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Registration failed';
            showNotification(errorMessage, 'error');
          }
        } catch (error) {
          console.error('Registration error:', error);
          showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
          // Reset button state
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<span>Create Account</span><i class="ri-arrow-right-line"></i>';
          }
        }
      });
    }
  }
});

// Notification function
function showNotification(message, type = 'info') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.auth-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `auth-notification auth-notification-${type}`;
  
  // Choose icon based on type
  const icon = type === 'success' ? 'ri-checkbox-circle-fill' : 
                type === 'error' ? 'ri-error-warning-fill' : 
                'ri-information-fill';
  
  notification.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="notification-close">
      <i class="ri-close-line"></i>
    </button>
  `;
  
  // Add styles for notification
  const style = document.createElement('style');
  if (!document.querySelector('#notification-styles')) {
    style.id = 'notification-styles';
    style.textContent = `
      .auth-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 300px;
        max-width: 500px;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .auth-notification i:first-child {
        font-size: 1.5rem;
      }
      
      .auth-notification-success {
        border-left: 4px solid #10b981;
      }
      
      .auth-notification-success i:first-child {
        color: #10b981;
      }
      
      .auth-notification-error {
        border-left: 4px solid #ef4444;
      }
      
      .auth-notification-error i:first-child {
        color: #ef4444;
      }
      
      .auth-notification-info {
        border-left: 4px solid #3b82f6;
      }
      
      .auth-notification-info i:first-child {
        color: #3b82f6;
      }
      
      .auth-notification span {
        flex: 1;
        font-size: 0.95rem;
        color: #1f2937;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        padding: 0;
        font-size: 1.25rem;
        transition: color 0.3s ease;
      }
      
      .notification-close:hover {
        color: #1f2937;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add to body
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add slideOutRight animation
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(additionalStyles);