let currentScreen = "welcome";
let historyStack = [];
let isGoingBack = false;
let isLoading = false;
let currentLogo = "assets/logo-symbol-white.svg";
let demoLogo = "assets/Logo-Text-White.svg";

const phone = null; // No longer globally fixed, handled in render()
const tablet = null;

window.setTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("zerotonin-theme", theme);

  // Map logos to themes
  if (theme === 'light') {
    currentLogo = "assets/logo-symbol.svg";
    demoLogo = "assets/Logo-Text-Blue.svg";
  } else {
    currentLogo = "assets/logo-symbol-white.svg";
    demoLogo = "assets/Logo-Text-White.svg";
  }

  // Update demo header logo
  const demoLogoEl = document.getElementById("demo-logo");
  if (demoLogoEl) demoLogoEl.src = demoLogo;

  const select = document.getElementById("theme-select");
  if (select) select.value = theme;

  if (typeof render === "function") render();
};

// Theme initialization moved to the bottom of file to ensure screens/render are defined

const skeletonTemplate = `
  <div class="screen" style="opacity: 1;">
    <div class="skeleton-title skeleton"></div>
    <div class="skeleton-text skeleton"></div>
    <div class="skeleton-card skeleton"></div>
    <div class="skeleton-card skeleton"></div>
    <div class="skeleton-card skeleton"></div>
  </div>
`;

const bottomNav = (active) => `
  <div class="bottom-nav">
    <div class="nav-item ${active === 'home' ? 'active' : ''}" onclick="navigate('jobs')">
      <span class="nav-icon">🏠</span>
      <span class="nav-label">Home</span>
    </div>
    <div class="nav-item ${active === 'apps' ? 'active' : ''}" onclick="navigate('applications_list')">
      <span class="nav-icon">📄</span>
      <span class="nav-label">Applications</span>
    </div>
    <div class="nav-item ${active === 'notifs' ? 'active' : ''}" onclick="navigate('notifications')">
      <span class="nav-icon">🔔</span>
      <span class="nav-label">Notifs</span>
    </div>
    <div class="nav-item ${active === 'profile' ? 'active' : ''}" onclick="navigate('profile_overview')">
      <span class="nav-icon">👤</span>
      <span class="nav-label">Profile</span>
    </div>
  </div>
`;

const clinicalSidebar = (active) => `
  <div class="clinical-sidebar">
    <div style="padding: 24px; margin-bottom: 20px;">
        <img src="${currentLogo}" style="height: 32px;" />
    </div>
    <div class="sidebar-item ${active === 'home' ? 'active' : ''}" onclick="navigate('jobs')">
      <span>🏠 Home</span>
    </div>
    <div class="sidebar-item ${active === 'apps' ? 'active' : ''}" onclick="navigate('applications_list')">
      <span>📄 Applications</span>
    </div>
    <div class="sidebar-item ${active === 'notifs' ? 'active' : ''}" onclick="navigate('notifications')">
      <span>🔔 Notifications</span>
    </div>
    <div class="sidebar-item ${active === 'profile' ? 'active' : ''}" onclick="navigate('profile_overview')">
      <span>👤 Profile</span>
    </div>
    <div class="mt-auto" style="padding: 20px;">
        <div class="card" style="margin: 0; padding: 12px; font-size: 12px;">
            <strong>System Official</strong>
            <p style="margin: 4px 0 0 0; font-size: 11px;">Ref: 2026-CLIN-PRO</p>
        </div>
    </div>
  </div>
`;

const precisionSidebar = (active) => `
  <div class="precision-sidebar">
    <div style="padding: 24px; margin-bottom: 32px;">
        <img src="${currentLogo}" style="height: 24px;" />
    </div>
    <div class="precision-item ${active === 'home' ? 'active' : ''}" onclick="navigate('jobs')">
      <span class="nav-icon">🏠</span>
      <span class="nav-label">Dashboard</span>
    </div>
    <div class="precision-item ${active === 'apps' ? 'active' : ''}" onclick="navigate('applications_list')">
      <span class="nav-icon">📄</span>
      <span class="nav-label">Applications</span>
    </div>
    <div class="precision-item ${active === 'notifs' ? 'active' : ''}" onclick="navigate('notifications')">
      <span class="nav-icon">🔔</span>
      <span class="nav-label">Notifications</span>
    </div>
    <div class="precision-item ${active === 'profile' ? 'active' : ''}" onclick="navigate('profile_overview')">
      <span class="nav-icon">👤</span>
      <span class="nav-label">Profile</span>
    </div>
    <div class="mt-auto" style="width: 100%; padding: 16px;">
        <div class="precision-item" style="padding: 12px;" onclick="navigate('settings')">
            <span class="nav-icon">⚙️</span>
            <span class="nav-label">Preferences</span>
        </div>
    </div>
  </div>
`;

function navigate(screen) {
  if (currentScreen !== screen) {
    historyStack.push(currentScreen);
    currentScreen = screen;
    isGoingBack = false;

    if (screen === 'jobs' || screen === 'locums') {
      isLoading = true;
      render();
      setTimeout(() => {
        isLoading = false;
        render();
      }, 600);
    } else {
      render();
    }
  }
}

function goBack() {
  if (historyStack.length > 0) {
    currentScreen = historyStack.pop();
    isGoingBack = true;
    render();
  }
}

const screens = {
  /* 🌟 WELCOME */
  welcome: (type) => `
    <div class="screen">
      <div class="text-center" style="margin-top:60px;">
        <img src="${currentLogo}" style="height:80px; margin-bottom:32px;" />
        <h1>Welcome to Zerotonin</h1>
        <p style="margin-bottom:40px;">A public-service–grade platform<br/>built by doctors, for doctors.</p>
        
        <button class="btn btn-primary" onclick="navigate('login')">
          Get Started
        </button>
        
        <p class="text-muted" style="font-size:13px; margin-top:24px;">
          Trusted medical career infrastructure
        </p>
      </div>
    </div>
  `,

  /* 🔐 AUTHENTICATION */
  login: (type) => `
    <div class="screen">
      <div class="header-app">
        <button class="back-btn" onclick="goBack()">←</button>
        <h2 class="header-title">Login</h2>
        <div style="width:36px;"></div>
      </div>
      <div class="step-indicator" style="padding: 0 20px;">
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
      </div>
      <div style="padding: 0 20px;">
        <h1>Mobile Number</h1>
        <p>Enter your phone number to receive a verification code.</p>
        
        <div class="input-group">
          <label class="input-label">Phone Number</label>
          <input type="tel" placeholder="+91 98765 43210" class="input" />
        </div>
      </div>
      
      <button class="btn btn-primary mt-auto" style="margin: 0 20px 20px;" onclick="navigate('otp')">
        Continue
      </button>
    </div>
  `,

  otp: (type) => `
    <div class="screen">
      <div class="header-app">
        <button class="back-btn" onclick="goBack()">←</button>
        <h2 class="header-title">Verification</h2>
        <div style="width:36px;"></div>
      </div>
      <div class="step-indicator" style="padding: 0 20px;">
        <div class="step-dot active"></div>
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
      </div>
      <div style="padding: 0 20px;">
        <h1>Enter Code</h1>
        <p>We've sent a 6-digit verification code to your mobile number.</p>
        
        <div class="input-group">
          <label class="input-label">Verification Code</label>
          <input type="number" placeholder="0 0 0 0 0 0" class="input" />
        </div>
      </div>
      
      <button class="btn btn-primary mt-auto" style="margin: 0 20px 20px;" onclick="navigate('onboarding_name')">
        Verify
      </button>
      <button class="btn btn-ghost" style="margin: 0 20px 20px;">Resend Code</button>
    </div>
  `,

  onboarding_name: (type) => `
    <div class="screen">
      <div class="header-app">
        <button class="back-btn" onclick="goBack()">←</button>
        <h2 class="header-title">Profile Setup</h2>
        <div style="width:36px;"></div>
      </div>
      <div style="padding: 20px;">
        <h1>Let's get started</h1>
        <p>Tell us a bit about yourself</p>
        
        <div class="input-group">
          <label class="input-label">Full Name</label>
          <input type="text" placeholder="Dr. Jane Doe" class="input" />
        </div>
        
        <div class="input-group">
          <label class="input-label">Email Address</label>
          <input type="email" placeholder="jane.doe@example.com" class="input" />
        </div>
      </div>
      
      <button class="btn btn-primary mt-auto" style="margin: 0 20px 20px;" onclick="navigate('intent')">
        Continue
      </button>
    </div>
  `,

  intent: (type) => `
    <div class="screen">
      <h1>Your Intent</h1>
      <p>How would you like to use Zerotonin?</p>
      
      <div class="card" onclick="navigate('specialty')">
        <h3>Actively looking</h3>
        <p style="margin:0; font-size:13px;">I want to find permanent job opportunities</p>
      </div>
      
      <div class="card" onclick="navigate('specialty')">
        <h3>Locums</h3>
        <p style="margin:0; font-size:13px;">I'm looking for temporary/shift-based work</p>
      </div>
      
      <div class="card" onclick="navigate('jobs')">
        <h3>Just browsing</h3>
        <p style="margin:0; font-size:13px;">I want to see what's available first</p>
      </div>
    </div>
  `,

  specialty: (type) => `
    <div class="screen">
      <h1>Specialty</h1>
      <p>Select your primary medical specialty</p>
      
      <div class="input-group">
        <input type="text" placeholder="Search specialty..." class="input" />
      </div>
      
      <div style="overflow-y:auto; flex:1;">
        ${["General Medicine", "Pulmonology", "Cardiology", "Pediatrics", "Dermatology", "Surgery"].map(s => `
          <div class="list-item" onclick="navigate('education')">
            <span>${s}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `,

  education: (type) => `
    <div class="screen">
      <h1>Education</h1>
      <p>Add your primary qualification</p>
      
      <div class="input-group">
        <label class="input-label">Primary Degree</label>
        <select class="input">
          <option>MBBS</option>
          <option>BDS</option>
          <option>Other</option>
        </select>
      </div>
      
      <div class="input-group">
        <label class="input-label">College/University</label>
        <input type="text" placeholder="Search college..." class="input" />
      </div>
      
      <button class="btn btn-primary mt-auto" onclick="navigate('registration')">
        Continue
      </button>
    </div>
  `,

  registration: (type) => `
    <div class="screen">
      <h1>Registration</h1>
      <p>Medical council registration details</p>
      
      <div class="input-group">
        <label class="input-label">Medical Council</label>
        <input type="text" placeholder="State/National Council" class="input" />
      </div>
      
      <div class="input-group">
        <label class="input-label">Registration Number</label>
        <input type="text" placeholder="12345-ABC" class="input" />
      </div>
      
      <button class="btn btn-primary mt-auto" onclick="navigate('upload_doc')">
        Continue
      </button>
    </div>
  `,

  upload_doc: (type) => `
    <div class="screen">
      <h1>Verification</h1>
      <p>Upload your registration certificate or ID</p>
      
      <div class="card text-center" style="border: 2px dashed var(--border); background: rgba(0,0,0,0.1); padding: 40px 20px;">
        <span style="font-size:32px; display:block; margin-bottom:12px;">📄</span>
        <p style="margin:0;">Tap to upload document</p>
        <p class="text-muted" style="font-size:12px; margin-top:4px;">PDF, JPG or PNG (Max 5MB)</p>
      </div>
      
      <button class="btn btn-primary mt-auto" onclick="navigate('verification_pending')">
        Submit for Verification
      </button>
    </div>
  `,

  verification_pending: (type) => `
    <div class="screen">
      <div class="text-center" style="margin-top:60px;">
        <span style="font-size:64px; display:block; margin-bottom:24px;">⏳</span>
        <h1>Verification Pending</h1>
        <p>We're reviewing your documents. This usually takes 24-48 hours.</p>
        
        <div class="card" style="background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2);">
          <p style="color: var(--warning); margin:0; font-size:14px;">Some features may be restricted until verified.</p>
        </div>
        
        <button class="btn btn-primary mt-auto" onclick="navigate('jobs')">
          Go to Job Feed
        </button>
      </div>
    </div>
  `,

  /* 🧑⚕️ HOME & JOBS */
  jobs: (type) => `
    <div class="screen">
      <div class="header-app">
        <div style="font-weight:700; font-size:20px; color:var(--accent);">Zerotonin</div>
        <h2 class="header-title">Job Feed</h2>
        <div class="header-action" onclick="navigate('filters')">�</div>
      </div>
      
      <div style="padding: 20px;">
        <div class="flex-between" style="margin-bottom:16px;">
          <h2 style="margin:0;">Recommended</h2>
          <span style="color: var(--accent); font-size:14px; font-weight:600;">View All</span>
        </div>

        <div class="card card-job" onclick="navigate('job_detail_verified')">
          <div class="job-logo">🏥</div>
          <div class="job-info">
            <div class="flex-between">
              <span class="badge badge-info">Verified</span>
              <span style="color:var(--text-muted); font-size:12px;">2h ago</span>
            </div>
            <h3 style="margin-top:8px; margin-bottom:4px;">Consultant Pulmonologist</h3>
            <p style="font-size:13px; margin-bottom:0;">Multispecialty Hospital</p>
            <div class="job-meta">
              <span>📍 Kochi</span>
              <span style="color:var(--success); font-weight:600;">₹2.5 – 3L / mo</span>
            </div>
          </div>
        </div>

        <div class="card card-job" onclick="navigate('job_detail_unverified')">
          <div class="job-logo">🏢</div>
          <div class="job-info">
            <div class="flex-between">
              <span class="badge" style="background:rgba(255,255,255,0.1);">New</span>
              <span style="color:var(--text-muted); font-size:12px;">5h ago</span>
            </div>
            <h3 style="margin-top:8px; margin-bottom:4px;">Senior Resident – ICU</h3>
            <p style="font-size:13px; margin-bottom:0;">Private Clinic</p>
            <div class="job-meta">
              <span>📍 Bangalore</span>
              <span style="font-weight:600;">₹1.2 – 1.5L / mo</span>
            </div>
          </div>
        </div>
      </div>
      ${bottomNav('home')}
    </div>
  `,

  job_detail_verified: (type) => `
    <div class="screen">
      <div class="flex-between" style="margin-bottom:16px;">
        <button class="back-btn" onclick="goBack()">←</button>
        <span class="badge badge-success">Verified</span>
        <div class="badge badge-info">Save</div>
      </div>
      <h1>Consultant Pulmonologist</h1>
      <p style="margin-bottom:4px; font-weight:600;">Multispecialty Hospital</p>
      <p style="font-size:13px;">Kochi, Kerala • Full-time</p>
      
      <div class="card" style="margin-top:12px;">
        <h3 style="font-size:15px; margin-bottom:8px;">Salary & Benefits</h3>
        <p style="color:var(--success); font-weight:600; margin-bottom:4px;">₹2.5 – 3.0L / month</p>
        <p style="font-size:12px; margin:0;">Includes accommodation, health insurance, and annual bonus.</p>
      </div>

      <h3>Job Description</h3>
      <p style="font-size:14px;">We are looking for an experienced Pulmonologist to join our core team. You will be responsible for OPD, IPD and ICU consultations...</p>
      
      <button class="btn btn-primary mt-auto" onclick="navigate('cv_review')">Apply Now</button>
    </div>
  `,

  job_detail_unverified: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Senior Resident – ICU</h1>
      <p style="margin-bottom:4px;">Private Clinic</p>
      <p style="font-size:13px;">Bangalore • Full-time</p>

      <div class="card" style="margin-top:20px; text-align:center; padding:32px 20px;">
        <span style="font-size:32px; display:block; margin-bottom:12px;">🔒</span>
        <h3>Full Details Restricted</h3>
        <p style="font-size:13px;">Complete your verification to view salary and hospital contact details.</p>
        <button class="btn btn-secondary" onclick="navigate('upload_doc')">Verify Profile</button>
      </div>
      
      <button class="btn btn-primary mt-auto" disabled>Apply Now</button>
    </div>
  `,

  cv_review: (type) => `
    <div class="screen">
      <h1>Review CV</h1>
      <p>This is how the hospital will see your profile</p>
      
      <div class="card">
        <div class="flex-between">
          <h2>Dr. Jane Doe</h2>
          <div class="badge badge-success">Verified</div>
        </div>
        <p style="margin-bottom:8px;">MD Pulmonology • 5 Years Exp</p>
        <div style="font-size:12px; color:var(--text-muted);">
          MBBS - AIIMS Delhi<br/>
          MD - PGIMER Chandigarh
        </div>
      </div>
      
      <p style="font-size:12px; text-align:center;">By applying, you agree to our Terms & Conditions.</p>
      
      <button class="btn btn-primary mt-auto" onclick="navigate('apply_success')">Confirm & Apply</button>
    </div>
  `,

  apply_success: (type) => `
    <div class="screen">
      <div class="text-center" style="margin-top:80px;">
        <span style="font-size:64px; display:block; margin-bottom:24px;">🎉</span>
        <h1>Application Sent!</h1>
        <p>Your profile has been shared with Multispecialty Hospital.</p>
        
        <button class="btn btn-primary mt-auto" onclick="navigate('applications_list')">Track Application</button>
        <button class="btn btn-ghost" onclick="navigate('jobs')">Back to Jobs</button>
      </div>
    </div>
  `,

  applications_list: (type) => `
    <div class="screen">
      <div class="header-app">
        <div style="width:36px;"></div>
        <h2 class="header-title">Applications</h2>
        <div style="width:36px;"></div>
      </div>
      
      <div style="padding: 20px;">
        <div class="card card-job" onclick="navigate('app_detail_review')">
          <div class="job-logo">🏥</div>
          <div class="job-info">
            <div class="flex-between">
              <span class="badge badge-warning">Under Review</span>
              <span style="font-size:12px; color:var(--text-muted);">1d ago</span>
            </div>
            <h3 style="margin-top:8px; margin-bottom:4px;">Consultant Pulmonologist</h3>
            <p style="font-size:13px; margin:0;">Multispecialty Hospital</p>
          </div>
        </div>

        <div class="card card-job">
          <div class="job-logo">🏥</div>
          <div class="job-info">
            <div class="flex-between">
              <span class="badge badge-info">Interview</span>
              <span style="font-size:12px; color:var(--text-muted);">5d ago</span>
            </div>
            <h3 style="margin-top:8px; margin-bottom:4px;">Junior Resident</h3>
            <p style="font-size:13px; margin:0;">City General Hospital</p>
          </div>
        </div>
      </div>
      ${bottomNav('apps')}
    </div>
  `,

  app_detail_review: (type) => `
    <div class="screen">
      <div class="header-app">
        <button class="back-btn" onclick="goBack()">←</button>
        <h2 class="header-title">Application Detail</h2>
        <div style="width:36px;"></div>
      </div>
      
      <div style="padding: 20px;">
        <div class="card">
          <h3 style="margin-bottom:4px;">Consultant Pulmonologist</h3>
          <p style="font-size:13px; margin:0; color:var(--text-secondary);">Multispecialty Hospital</p>
        </div>

        <h2 style="font-size:17px; margin-top:24px;">Status Timeline</h2>
        <div style="margin-top:16px; border-left: 2px solid var(--border); padding-left:20px; position:relative; margin-left: 10px;">
          <div style="margin-bottom:24px; position:relative;">
            <div style="position:absolute; left:-27px; top:4px; width:12px; height:12px; background:var(--success); border-radius:50%; box-shadow: 0 0 0 4px var(--bg);"></div>
            <p style="margin:0; font-weight:600; font-size:14px;">Applied</p>
            <p style="margin:0; font-size:12px; color:var(--text-muted);">Oct 12, 10:30 AM</p>
          </div>
          <div style="margin-bottom:24px; position:relative;">
            <div style="position:absolute; left:-27px; top:4px; width:12px; height:12px; background:var(--accent); border-radius:50%; box-shadow: 0 0 0 4px var(--bg);"></div>
            <p style="margin:0; font-weight:600; font-size:14px;">Under Review</p>
            <p style="margin:0; font-size:12px; color:var(--text-muted);">Oct 13, 02:15 PM</p>
            <p style="margin:4px 0 0 0; font-size:13px; color:var(--text-secondary);">The hospital has viewed your profile.</p>
          </div>
          <div style="position:relative;">
            <div style="position:absolute; left:-27px; top:4px; width:12px; height:12px; background:var(--border); border-radius:50%; box-shadow: 0 0 0 4px var(--bg);"></div>
            <p style="margin:0; font-weight:600; font-size:14px; color:var(--text-muted);">Interview Schedule</p>
            <p style="margin:0; font-size:12px; color:var(--text-muted);">Pending</p>
          </div>
        </div>
      </div>
    </div>
  `,

  locums: (type) => `
    <div class="screen">
      <div class="flex-between" style="margin-bottom:20px;">
        <h1>Locum Feed</h1>
        <div class="badge badge-info" onclick="navigate('notifications')">🔔 1</div>
      </div>
      
      <div class="flex-between" style="margin-bottom:16px;">
        <div class="badge badge-warning">Short-term</div>
        <div style="color: var(--accent); font-size:14px; font-weight:600;">Filters</div>
      </div>

      <div class="card" onclick="navigate('locum_detail')">
        <div class="flex-between">
          <span class="badge badge-info">2 Days</span>
          <span style="color:var(--text-muted); font-size:12px;">New</span>
        </div>
        <h3 style="margin-top:12px;">ER Physician - Night Shift</h3>
        <p style="font-size:13px; margin-bottom:12px;">St. Mary's ER • Bangalore</p>
        <div class="flex-between">
          <span style="font-weight:600; color:var(--success);">₹8,000 / shift</span>
          <span style="color:var(--accent); font-size:13px;">View →</span>
        </div>
      </div>

      <div class="mt-auto" style="display:flex; gap:12px;">
        <button class="btn btn-secondary" style="flex:1;" onclick="navigate('jobs')">Permanent</button>
        <button class="btn btn-secondary" style="flex:1;" onclick="navigate('profile_overview')">Profile</button>
      </div>
    </div>
  `,

  locum_detail: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>ER Night Shift</h1>
      <p style="margin-bottom:4px; font-weight:600;">St. Mary's ER</p>
      <p style="font-size:13px;">Oct 24 - Oct 25 • 8 PM - 8 AM</p>

      <div class="card" style="margin-top:12px;">
        <h3 style="font-size:15px; margin-bottom:8px;">Payout</h3>
        <p style="color:var(--success); font-weight:600; margin-bottom:0;">₹8,000 per shift</p>
      </div>

      <h3>Shift Details</h3>
      <p style="font-size:14px;">Required for ER coverage. Must have valid registration and experience in acute care.</p>
      
      <button class="btn btn-primary mt-auto" onclick="navigate('apply_success')">Apply for Shift</button>
    </div>
  `,

  notifications: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Notifications</h1>
      
      <div class="list-item">
        <div style="width:40px; height:40px; background:rgba(16,185,129,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--success);">✔️</div>
        <div style="flex:1;">
          <p style="margin:0; font-weight:600; font-size:14px;">Application Viewed</p>
          <p style="margin:0; font-size:12px; color:var(--text-muted);">Multispecialty Hospital viewed your profile.</p>
        </div>
      </div>

      <div class="list-item">
        <div style="width:40px; height:40px; background:rgba(28,123,224,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--accent);">💼</div>
        <div style="flex:1;">
          <p style="margin:0; font-weight:600; font-size:14px;">New Job Match</p>
          <p style="margin:0; font-size:12px; color:var(--text-muted);">New Pulmonologist opening in your area.</p>
        </div>
      </div>

      <button class="btn btn-ghost mt-auto" onclick="navigate('notif_settings')">Notification Settings</button>
    </div>
  `,

  notif_settings: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Settings</h1>
      
      <div class="flex-between list-item">
        <span>Job Alerts</span>
        <div style="width:40px; height:20px; background:var(--accent); border-radius:10px;"></div>
      </div>
      <div class="flex-between list-item">
        <span>Application Updates</span>
        <div style="width:40px; height:20px; background:var(--accent); border-radius:10px;"></div>
      </div>
      <div class="flex-between list-item">
        <span>Marketing Emails</span>
        <div style="width:40px; height:20px; background:var(--border); border-radius:10px;"></div>
      </div>
    </div>
  `,

  filters: (type) => `
    <div class="screen">
      <div class="flex-between" style="margin-bottom:24px;">
        <h1>Filters</h1>
        <span style="color:var(--accent); font-size:14px;" onclick="goBack()">Done</span>
      </div>

      <div class="input-group">
        <label class="input-label">Location</label>
        <input type="text" placeholder="e.g. Kochi, Kerala" class="input" />
      </div>

      <label class="input-label">Job Type</label>
      <div style="display:flex; gap:8px; margin-bottom:20px;">
        <div class="badge badge-info">Permanent</div>
        <div class="badge" style="background:var(--border);">Locum</div>
      </div>

      <div class="input-group">
        <label class="input-label">Specialty</label>
        <select class="input">
          <option>All Specialties</option>
          <option>Pulmonology</option>
          <option>General Medicine</option>
        </select>
      </div>

      <button class="btn btn-primary mt-auto" onclick="goBack()">Apply Filters</button>
    </div>
  `,

  profile_overview: (type) => `
    <div class="screen">
      <div class="header-app">
        <div style="width:36px;"></div>
        <h2 class="header-title">Profile</h2>
        <div class="header-action" onclick="navigate('settings')">⚙️</div>
      </div>
      
      <div style="padding: 20px;">
        <div class="card text-center" style="padding: 24px;">
          <div style="width:80px; height:80px; background:var(--accent); border-radius:50%; margin:0 auto 16px; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:600; border: 4px solid var(--border);">JD</div>
          <h2 style="margin-bottom:4px;">Dr. Jane Doe</h2>
          <p style="font-size:14px; color:var(--text-muted); margin-bottom:16px;">MD Pulmonology • 5y Exp</p>
          <div class="badge badge-success">Verified Profile</div>
        </div>

        <div class="card" style="padding: 0;">
          <div class="list-item" style="padding: 16px 20px;" onclick="navigate('personal_info')">
            <div style="flex:1;">
              <p style="margin:0; font-weight:600;">Personal Information</p>
              <p style="margin:0; font-size:12px; color:var(--text-muted);">Name, Email, Mobile</p>
            </div>
            <span>→</span>
          </div>

          <div class="list-item" style="padding: 16px 20px;" onclick="navigate('qualifications_list')">
            <div style="flex:1;">
              <p style="margin:0; font-weight:600;">Qualifications & Education</p>
              <p style="margin:0; font-size:12px; color:var(--text-muted);">MBBS, MD, Specialization</p>
            </div>
            <span>→</span>
          </div>

          <div class="list-item" style="padding: 16px 20px;" onclick="navigate('employment_history')">
            <div style="flex:1;">
              <p style="margin:0; font-weight:600;">Employment History</p>
              <p style="margin:0; font-size:12px; color:var(--text-muted);">Past hospitals and clinics</p>
            </div>
            <span>→</span>
          </div>
        </div>
      </div>
      ${bottomNav('profile')}
    </div>
  `,

  notifications: (type) => `
    <div class="screen">
      <div class="header-app">
        <button class="back-btn" onclick="goBack()">←</button>
        <h2 class="header-title">Notifications</h2>
        <div style="width:36px;"></div>
      </div>
      
      <div style="padding: 0 20px;">
        <div class="list-item">
          <div style="width:40px; height:40px; background:rgba(16,185,129,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--success); border: 1px solid rgba(16,185,129,0.2);">✔️</div>
          <div style="flex:1;">
            <p style="margin:0; font-weight:600; font-size:14px;">Application Viewed</p>
            <p style="margin:0; font-size:12px; color:var(--text-muted);">Multispecialty Hospital viewed your profile.</p>
          </div>
        </div>

        <div class="list-item">
          <div style="width:40px; height:40px; background:rgba(28,123,224,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--accent); border: 1px solid rgba(28,123,224,0.2);">💼</div>
          <div style="flex:1;">
            <p style="margin:0; font-weight:600; font-size:14px;">New Job Match</p>
            <p style="margin:0; font-size:12px; color:var(--text-muted);">New Pulmonologist opening in your area.</p>
          </div>
        </div>
      </div>
      ${bottomNav('notifs')}
    </div>
  `,

  personal_info: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Personal Info</h1>
      
      <div class="input-group">
        <label class="input-label">Full Name</label>
        <input type="text" value="Dr. Jane Doe" class="input" />
      </div>
      
      <div class="input-group">
        <label class="input-label">Email Address</label>
        <input type="email" value="jane.doe@example.com" class="input" />
      </div>

      <div class="input-group">
        <label class="input-label">Mobile Number</label>
        <input type="tel" value="+91 98765 43210" class="input" readonly />
      </div>

      <button class="btn btn-primary mt-auto" onclick="goBack()">Save Changes</button>
    </div>
  `,

  qualifications_list: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <div class="flex-between">
        <h1>Qualifications</h1>
        <div class="badge badge-info">+ Add</div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:4px;">MD Pulmonology</h3>
        <p style="font-size:13px; margin-bottom:8px;">PGIMER Chandigarh</p>
        <p style="font-size:12px; color:var(--text-muted);">2018 - 2021</p>
      </div>

      <div class="card">
        <h3 style="margin-bottom:4px;">MBBS</h3>
        <p style="font-size:13px; margin-bottom:8px;">AIIMS Delhi</p>
        <p style="font-size:12px; color:var(--text-muted);">2012 - 2017</p>
      </div>
    </div>
  `,

  employment_history: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <div class="flex-between">
        <h1>Employment</h1>
        <div class="badge badge-info">+ Add</div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:4px;">Senior Consultant</h3>
        <p style="font-size:13px; margin-bottom:8px;">City Hospital, Kochi</p>
        <p style="font-size:12px; color:var(--text-muted);">Jan 2022 - Present</p>
      </div>

      <div class="card">
        <h3 style="margin-bottom:4px;">Junior Resident</h3>
        <p style="font-size:13px; margin-bottom:8px;">Apollo Hospitals, Chennai</p>
        <p style="font-size:12px; color:var(--text-muted);">Aug 2021 - Dec 2021</p>
      </div>
    </div>
  `,

  profile_completeness: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Completeness</h1>
      
      <div class="card text-center" style="padding:32px 20px;">
        <div style="font-size:48px; font-weight:700; color:var(--accent); margin-bottom:12px;">85%</div>
        <p style="margin:0;">Almost there, Dr. Jane!</p>
      </div>

      <h3>Missing Sections</h3>
      <div class="list-item">
        <div style="width:24px; height:24px; border:2px solid var(--border); border-radius:50%; margin-right:12px;"></div>
        <span style="flex:1;">Research & Publications</span>
        <span style="color:var(--accent);">+10%</span>
      </div>
      <div class="list-item">
        <div style="width:24px; height:24px; border:2px solid var(--border); border-radius:50%; margin-right:12px;"></div>
        <span style="flex:1;">Skills & Achievements</span>
        <span style="color:var(--accent);">+5%</span>
      </div>

      <button class="btn btn-primary mt-auto" onclick="navigate('research_publications')">Add Research</button>
    </div>
  `,

  research_publications: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Research</h1>
      <p>Add your medical research or publications</p>
      
      <div class="input-group">
        <label class="input-label">Title</label>
        <input type="text" placeholder="e.g. Study on COPD in rural area" class="input" />
      </div>
      
      <div class="input-group">
        <label class="input-label">Journal / Publisher</label>
        <input type="text" placeholder="e.g. Lancet Medical Journal" class="input" />
      </div>

      <button class="btn btn-primary mt-auto" onclick="goBack()">Add Publication</button>
    </div>
  `,

  settings: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Settings</h1>
      
      <div class="list-item" onclick="navigate('help_support')">
        <span>Help & Support</span>
      </div>
      <div class="list-item" onclick="navigate('faqs')">
        <span>FAQs</span>
      </div>
      <div class="list-item" onclick="navigate('feedback')">
        <span>Feedback / Suggest Feature</span>
      </div>
      <div class="list-item" onclick="navigate('about')">
        <span>About Zerotonin</span>
      </div>
      
      <div class="list-item" style="margin-top:24px;" onclick="navigate('welcome')">
        <span style="color:var(--danger);">Logout</span>
      </div>
      
      <div class="text-center" style="margin-top:40px;">
        <p style="font-size:12px; color:var(--text-muted);">Zerotonin v1.0.4 (Beta)</p>
        <p style="font-size:12px; color:var(--danger);" onclick="navigate('delete_account')">Delete Account</p>
      </div>
    </div>
  `,

  help_support: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Support</h1>
      <p>How can we help you today?</p>
      
      <div class="card">
        <h3>Chat with us</h3>
        <p style="font-size:13px; margin:0;">Typical response time: < 2h</p>
      </div>
      
      <div class="card">
        <h3>Email Support</h3>
        <p style="font-size:13px; margin:0;">support@zerotonin.com</p>
      </div>

      <button class="btn btn-primary mt-auto">Start New Chat</button>
    </div>
  `,

  faqs: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>FAQs</h1>
      
      <div class="list-item">
        <p style="margin:0; font-weight:600; font-size:14px;">How is verification done?</p>
      </div>
      <div class="list-item">
        <p style="margin:0; font-weight:600; font-size:14px;">Are my documents safe?</p>
      </div>
      <div class="list-item">
        <p style="margin:0; font-weight:600; font-size:14px;">How to apply for locums?</p>
      </div>
    </div>
  `,

  feedback: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <h1>Feedback</h1>
      <p>Help us improve Zerotonin</p>
      
      <textarea class="input" style="height:150px; resize:none;" placeholder="Your suggestions or issues..."></textarea>
      
      <button class="btn btn-primary mt-auto" onclick="goBack()">Submit Feedback</button>
    </div>
  `,

  about: (type) => `
    <div class="screen">
      <button class="back-btn" onclick="goBack()" style="margin-bottom:16px;">←</button>
      <div class="text-center" style="margin-top:40px;">
        <img src="${currentLogo}" style="height:60px; margin-bottom:20px;" />
        <h1>Zerotonin</h1>
        <p>Medical Career Infrastructure</p>
        <p style="font-size:13px; margin-top:20px;">Zerotonin is a public-service–grade platform built to solve the challenges in the medical workforce ecosystem. Our mission is to provide doctors with the tools they need to manage their careers effectively.</p>
      </div>
    </div>
  `,

  delete_account: (type) => `
    <div class="screen">
      <div class="header-app">
        <button class="back-btn" onclick="goBack()">←</button>
        <h2 class="header-title">Delete Account</h2>
        <div style="width:36px;"></div>
      </div>
      <div style="padding: 20px;">
        <p style="color:var(--danger); font-weight:600;">Warning: This action is permanent.</p>
        <p style="font-size:13px; color:var(--text-secondary);">All your applications, documents, and profile data will be permanently removed from our servers.</p>
        
        <div class="input-group" style="margin-top:24px;">
          <label class="input-label">Type "DELETE" to confirm</label>
          <input type="text" placeholder="DELETE" class="input" />
        </div>
      </div>
      
      <button class="btn btn-primary" style="background:var(--danger); margin: 0 20px 20px; font-weight:700;" onclick="navigate('welcome')">Permanently Delete Account</button>
    </div>
  `,
};

function render() {
  const animationClass = isGoingBack ? "animate-slide-out" : "animate-slide-in";

  const getScreenContent = (type) => {
    if (isLoading) return skeletonTemplate;
    const activeMapping = {
      'jobs': 'home',
      'applications_list': 'apps',
      'notifications': 'notifs',
      'profile_overview': 'profile'
    };
    const activeTab = activeMapping[currentScreen] || '';

    const content = screens[currentScreen] ? screens[currentScreen](type) : `<div>Screen not found: ${currentScreen}</div>`;
    const currentTheme = document.body.getAttribute("data-theme");

    if (type === "tablet" || type === "standalone") {
      if (currentTheme === "clinical") {
        return `
            <div class="clinical-layout">
                ${clinicalSidebar(activeTab)}
                <div style="flex: 1; overflow-y: auto; height: 100vh;">
                    ${content}
                </div>
            </div>
        `;
      }
      if (currentTheme === "titanium") {
        return `
            <div class="precision-layout">
                ${precisionSidebar(activeTab)}
                <div style="flex: 1; overflow-y: auto; height: 100vh;">
                    ${content}
                </div>
            </div>
        `;
      }
    }

    return content;
  };

  const updateDevice = (device, type) => {
    if (!device) return;
    device.innerHTML = getScreenContent(type);
    const screenEl = device.querySelector('.screen');
    if (screenEl) {
      requestAnimationFrame(() => {
        screenEl.classList.add(animationClass);
      });
    }
  };

  // Detect and update available containers
  const phone = document.getElementById("phone");
  const tablet = document.getElementById("tablet");
  const appView = document.getElementById("app-view");

  if (phone) updateDevice(phone, "phone");
  if (tablet) updateDevice(tablet, "tablet");
  if (appView) updateDevice(appView, "standalone");

  const backButtons = document.querySelectorAll(".back-btn");
  backButtons.forEach(btn => {
    btn.disabled = historyStack.length === 0;
  });
}

render();

// Initialize theme after all logic and templates are defined
const savedTheme = localStorage.getItem("zerotonin-theme") || "dark";
window.setTheme(savedTheme);
