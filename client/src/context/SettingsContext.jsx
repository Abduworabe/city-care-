import { createContext, useContext, useState, useEffect } from "react";

// ─── Translation dictionary ─────────────────────────────────────────────────
export const TRANSLATIONS = {
  en: {
    // ── General
    app_name: "Worabe Municipality",
    app_tagline: "Smart Municipal Development Management System",
    loading: "Loading...",
    save: "Save Changes",
    saving: "Saving...",
    cancel: "Cancel",
    reset: "Reset to Default",
    submit: "Submit",
    submitting: "Submitting...",
    edit: "Update",
    delete: "Delete",
    back_home: "Back to Home",
    go_home: "Go Home",

    // ── Nav links
    nav_all_complaints: "All Complaints",
    nav_add_complaint: "Add Complaint",
    nav_profile: "Profile",
    nav_stats: "Statistics",
    nav_admin: "Admin",
    nav_settings: "Settings",

    // ── Navbar
    my_profile: "My Profile",
    account_settings: "Account Settings",
    logout: "Logout",
    toggle_theme: "Toggle Theme",

    // ── Landing
    login: "Login",
    register: "Register",
    welcome: "Welcome to",
    hero_subtitle: "Smart Municipal Development Management System",
    hero_text:
      "Experience the future of urban management. Monitor infrastructure, track development, and engage with your community — all in one platform.",
    get_started: "🚀 Get Started",
    view_dashboard: "📊 View Dashboard",
    features_title: "Municipality Management Features",
    features_subtitle:
      "A comprehensive suite of tools for modern municipal management in Worabe",
    stats_section_title: "Worabe City Statistics",
    cta_title: "Ready to Serve Worabe Better?",
    cta_text:
      "Join the Worabe Municipality platform to report issues, track progress, and build a smarter, more responsive city for everyone.",
    cta_feature1: "Real-time Monitoring",
    cta_feature2: "Smart Analytics & Reports",
    cta_feature3: "Citizen Engagement",
    create_account: "Create an Account",
    sign_in: "Sign In",
    quick_links: "Quick Links",
    departments: "Departments",
    contact_support: "Contact & Support",
    footer_copy: "Worabe Municipality. All rights reserved.",
    feat_construction: "Construction & Infrastructure",
    feat_construction_desc:
      "Monitor and report construction projects and public infrastructure improvements in real-time.",
    feat_construction_stat: "50+ Active Projects",
    feat_water: "Water & Sanitation",
    feat_water_desc:
      "Track water supply systems and sanitation facility development with real-time monitoring.",
    feat_water_stat: "15 Systems Monitored",
    feat_waste: "Waste Management",
    feat_waste_desc:
      "Coordinate waste collection and environmental cleanup programs with optimized schedules.",
    feat_waste_stat: "95% Coverage",

    // ── Auth
    sign_in_title: "Sign In",
    sign_in_subtitle: "Welcome back to Worabe Municipality",
    email: "Email Address",
    password: "Password",
    email_placeholder: "Enter your email",
    password_placeholder: "Enter your password",
    no_account: "Don't have an account?",
    create_account_title: "Create Account",
    create_account_subtitle: "Register with Worabe Municipality",
    first_name: "First Name",
    last_name: "Last Name",
    location: "Location",
    location_placeholder: "e.g. Worabe, Silti Zone",
    first_name_placeholder: "Enter your first name",
    last_name_placeholder: "Enter your last name",
    password_placeholder_reg: "Minimum 8 characters",
    already_member: "Already have an account?",
    data_protected: "Your data is securely protected",

    // ── Dashboard
    dashboard: "Dashboard",
    welcome_back: "Welcome back",

    // ── Stats
    stats_title: "Complaint Management Dashboard",
    stats_subtitle:
      "Real-time overview of municipal complaint status and performance",
    reported_complaints: "Reported Complaints",
    reported_desc: "New complaints awaiting action",
    in_progress: "In Progress",
    in_progress_desc: "Complaints being addressed",
    resolved_issues: "Resolved Issues",
    resolved_desc: "Successfully resolved cases",
    closed_complaints: "Closed Complaints",
    closed_desc: "Completed and closed cases",
    total_complaints: "Total Complaints Tracked",
    all_time: "All Time",
    avg_resolution: "Avg. Resolution Time",
    avg_unit: "days",
    this_month: "↓ 12% this month",
    monthly_trends: "Monthly Complaint Trends",
    chart_subtitle: "Track complaint patterns and resolution rates over time",
    switch_area: "Switch to Area Chart",
    switch_bar: "Switch to Bar Chart",
    total_label: "Total Complaints",
    months_tracked: "Months Tracked",
    avg_per_month: "Avg. per Month",
    monthly_label: "Monthly Complaints",
    trend_line: "Trend Line",
    data_updated: "Data updated daily",
    no_chart_data: "No complaint data available",
    no_chart_desc:
      "Complaint statistics will appear here as data is collected",

    // ── All Jobs / Complaints
    all_jobs_title: "All Complaints",
    no_complaints: "No complaints found",
    search_complaints: "🔍 Search Complaints",
    search_label: "🔎 Search",
    search_placeholder: "Title, location, department...",
    status_label: "📊 Status",
    type_label: "🏗️ Type",
    sort_label: "📈 Sort",
    clear_filters: "🗑️ Clear",
    apply_filters: "✅ Apply",
    all: "all",

    // ── Job card
    update: "Update",
    delete_btn: "Delete",

    // ── Add Job
    add_job_title: "Report New Issue",
    issue_title: "Issue Title",
    issue_title_placeholder: "e.g., Pothole on Main Street",
    concerned_dept: "Concerned Department",
    dept_placeholder: "e.g., Roads Department",
    issue_location: "Issue Location",
    location_field_placeholder: "Enter exact location",
    current_status: "Current Status",
    issue_type: "Issue Type",
    submit_complaint: "Submit Complaint",

    // ── Edit Job
    edit_job_title: "Edit Issue",
    job_location: "Job Location",
    job_status: "Job Status",
    job_type: "Job Type",

    // ── Profile
    profile_title: "My Profile",
    profile_photo: "Profile Photo (max 5MB)",
    save_changes: "Save Changes",

    // ── Admin
    current_users: "Current Users",
    total_jobs: "Total Complaints",

    // ── Settings
    settings_title: "Settings",
    settings_subtitle: "Customize your Worabe Municipality experience",
    nav_appearance: "Appearance",
    nav_language: "Language",
    nav_notifications: "Notifications",
    nav_privacy: "Privacy & Security",
    nav_data: "Data & Storage",
    appearance_title: "Appearance",
    appearance_desc: "Customize how the application looks",
    theme_label: "Theme",
    theme_desc: "Switch between light and dark mode",
    theme_light: "Light",
    theme_dark: "Dark",
    font_label: "Font Size",
    font_desc: "Adjust text size for better readability",
    font_small: "Small",
    font_medium: "Medium",
    font_large: "Large",
    font_xlarge: "X-Large",
    language_title: "Language",
    language_desc: "Set your preferred display language",
    notif_title: "Notifications",
    notif_desc: "Configure how you receive alerts",
    email_notif: "Email Notifications",
    email_notif_desc: "Receive updates via email",
    sms_notif: "SMS Notifications",
    sms_notif_desc: "Receive important alerts via SMS",
    push_notif: "Push Notifications",
    push_notif_desc: "In-browser push notifications",
    privacy_title: "Privacy & Security",
    privacy_desc: "Manage your account security settings",
    two_factor: "Two-Factor Authentication",
    two_factor_desc: "Add extra security to your account",
    privacy_mode: "Privacy Mode",
    privacy_mode_desc: "Hide sensitive information on screen",
    data_title: "Data & Storage",
    data_desc: "Control your data usage",
    auto_save: "Auto-Save Drafts",
    auto_save_desc: "Automatically save complaint drafts",
    data_saving: "Data Saving Mode",
    data_saving_desc: "Load lower-quality images to save data",
    reset_confirm_title: "Reset All Settings?",
    reset_confirm_msg:
      "This will reset all settings to their defaults. This cannot be undone.",
    reset_confirm_btn: "Yes, Reset",
    saved_msg: "Settings saved successfully!",

    // ── Error
    not_found_title: "Page Not Found",
    not_found_msg: "We can't seem to find the page you're looking for.",
    something_wrong: "Something went wrong",
  },

  am: {
    // ── General
    app_name: "የወራቤ ሙኒሲፓሊቲ",
    app_tagline: "ዘመናዊ የከተማ አስተዳደር ሥርዓት",
    loading: "እየጫነ ነው...",
    save: "ለውጦቹን አስቀምጥ",
    saving: "እያስቀምጥ ነው...",
    cancel: "ሰርዝ",
    reset: "ወደ ነባሪ ሁኔታ መልስ",
    submit: "አስገባ",
    submitting: "እያስገባ ነው...",
    edit: "አዘምን",
    delete: "ሰርዝ",
    back_home: "ወደ መነሻ ተመለስ",
    go_home: "ወደ ቤት ሂድ",

    // ── Nav links
    nav_all_complaints: "ሁሉም ቅሬታዎች",
    nav_add_complaint: "ቅሬታ አክል",
    nav_profile: "መገለጫ",
    nav_stats: "ስታቲስቲክስ",
    nav_admin: "አስተዳዳሪ",
    nav_settings: "ቅንብሮች",

    // ── Navbar
    my_profile: "መገለጫዬ",
    account_settings: "የመለያ ቅንብሮች",
    logout: "ውጣ",
    toggle_theme: "ገጽታ ቀይር",

    // ── Landing
    login: "ግባ",
    register: "ተመዝገብ",
    welcome: "እንኳን ወደ",
    hero_subtitle: "ዘመናዊ የሙኒሲፓሊቲ ልማት አስተዳደር ሥርዓት",
    hero_text:
      "የወደፊቱን የከተማ አስተዳደር ያجربu። መሠረተ ልማቶችን ይከታተሉ፣ ልማቱን ይቆጣጠሩ እና ማህበረሰብዎን ያሳትፉ — ሁሉም በአንድ መድረክ።",
    get_started: "🚀 ጀምር",
    view_dashboard: "📊 ዳሽቦርድ ይመልከቱ",
    features_title: "የሙኒሲፓሊቲ አስተዳደር ባህሪያት",
    features_subtitle: "ለወራቤ ዘመናዊ ሙኒሲፓሊቲ አስተዳደር የተሟሉ መሣሪያዎች",
    stats_section_title: "የወራቤ ከተማ ስታቲስቲክስ",
    cta_title: "ወራቤን ለማሻሻል ዝግጁ ነዎት?",
    cta_text:
      "የወራቤ ሙኒሲፓሊቲ መድረክን ይቀላቀሉ — ቅሬታ ያቅርቡ፣ ሂደቱን ይከታተሉ እና ለሁሉም ዜጎች ተሻሽሎ ምላሽ ሰጪ ከተማ ለመገንባት ይሳተፉ።",
    cta_feature1: "በቅጽበት ክትትል",
    cta_feature2: "ዘመናዊ ትንታኔ እና ሪፖርቶች",
    cta_feature3: "የዜጎች ተሳትፎ",
    create_account: "መለያ ፍጠር",
    sign_in: "ግባ",
    quick_links: "ፈጣን አገናኞች",
    departments: "መምሪያዎች",
    contact_support: "ድጋፍ እና ግንኙነት",
    footer_copy: "የወራቤ ሙኒሲፓሊቲ። መብቱ በሕግ የተጠበቀ ነው።",
    feat_construction: "ግንባታ እና መሠረተ ልማት",
    feat_construction_desc:
      "የግንባታ ፕሮጀክቶችን እና የህዝብ መሠረተ ልማት ሥራዎችን ይከታተሉ።",
    feat_construction_stat: "50+ ንቁ ፕሮጀክቶች",
    feat_water: "ውሃ እና ንፅህና",
    feat_water_desc: "የውሃ አቅርቦት ሥርዓቶችን እና የንፅህና አገልግሎቶችን ይቆጣጠሩ።",
    feat_water_stat: "15 ሥርዓቶች ክትትል",
    feat_waste: "የቆሻሻ አስተዳደር",
    feat_waste_desc: "የቆሻሻ ሰብሳቢ ፕሮግራሞችን ያስተባብሩ።",
    feat_waste_stat: "95% ሽፋን",

    // ── Auth
    sign_in_title: "ግባ",
    sign_in_subtitle: "ወደ ወራቤ ሙኒሲፓሊቲ እንኳን ደህና መጡ",
    email: "የኢሜይል አድራሻ",
    password: "የይለፍ ቃል",
    email_placeholder: "ኢሜይልዎን ያስገቡ",
    password_placeholder: "የይለፍ ቃልዎን ያስገቡ",
    no_account: "መለያ የለዎትም?",
    create_account_title: "መለያ ፍጠር",
    create_account_subtitle: "ወደ ወራቤ ሙኒሲፓሊቲ ይቀላቀሉ",
    first_name: "የመጀመሪያ ስም",
    last_name: "የአባት ስም",
    location: "አካባቢ",
    location_placeholder: "ለምሳሌ ወራቤ፣ ስልጤ ዞን",
    first_name_placeholder: "የመጀመሪያ ስምዎን ያስገቡ",
    last_name_placeholder: "የአባት ስምዎን ያስገቡ",
    password_placeholder_reg: "ቢያንስ 8 ፊደላት",
    already_member: "ቀደም ሲል መለያ አለዎት?",
    data_protected: "መረጃዎ በደህንነት ተጠብቋል",

    // ── Dashboard
    dashboard: "ዳሽቦርድ",
    welcome_back: "እንኳን ደህና መጡ",

    // ── Stats
    stats_title: "የቅሬታ አስተዳደር ዳሽቦርድ",
    stats_subtitle: "የቅሬታ ሁኔታ እና አፈፃፀም ቀጥተኛ ዕይታ",
    reported_complaints: "የቀረቡ ቅሬታዎች",
    reported_desc: "አዲስ ቅሬታዎች ምላሽ በሚጠብቅ ሁኔታ",
    in_progress: "በሂደት ላይ",
    in_progress_desc: "ምላሽ እየተሰጠባቸው ያሉ ቅሬታዎች",
    resolved_issues: "የተፈቱ ጉዳዮች",
    resolved_desc: "በተሳካ ሁኔታ የተፈቱ ጉዳዮች",
    closed_complaints: "የተዘጉ ቅሬታዎች",
    closed_desc: "ተጠናቅቀው የተዘጉ ጉዳዮች",
    total_complaints: "ጠቅላላ የተመዘገቡ ቅሬታዎች",
    all_time: "ሁሉም ጊዜ",
    avg_resolution: "አማካይ የፍቺ ጊዜ",
    avg_unit: "ቀናት",
    this_month: "↓ 12% ይህ ወር",
    monthly_trends: "ወርሃዊ የቅሬታ አዝማሚያዎች",
    chart_subtitle: "የቅሬታ ዘዴዎችን እና የፍቺ ፍጥነቶችን ይከታተሉ",
    switch_area: "ወደ ቦታ ገበታ ቀይር",
    switch_bar: "ወደ አሞሌ ገበታ ቀይር",
    total_label: "ጠቅላላ ቅሬታዎች",
    months_tracked: "የተከታተሉ ወሮች",
    avg_per_month: "አማካይ በወር",
    monthly_label: "ወርሃዊ ቅሬታዎች",
    trend_line: "የአዝማሚያ መስመር",
    data_updated: "ዳታ በየቀኑ ይዘምናል",
    no_chart_data: "ምንም ዳታ የለም",
    no_chart_desc: "ቅሬታዎች ሲሰበሰቡ ስታቲስቲክስ እዚህ ይታያሉ",

    // ── All Jobs
    all_jobs_title: "ሁሉም ቅሬታዎች",
    no_complaints: "ቅሬታዎች አልተገኙም",
    search_complaints: "🔍 ቅሬታዎችን ፈልግ",
    search_label: "🔎 ፈልግ",
    search_placeholder: "ርዕስ፣ አካባቢ፣ መምሪያ...",
    status_label: "📊 ሁኔታ",
    type_label: "🏗️ አይነት",
    sort_label: "📈 ደርድር",
    clear_filters: "🗑️ አጽዳ",
    apply_filters: "✅ ተጻፋ",
    all: "ሁሉም",

    // ── Job card
    update: "አዘምን",
    delete_btn: "ሰርዝ",

    // ── Add Job
    add_job_title: "አዲስ ጉዳይ ሪፖርት አድርግ",
    issue_title: "የጉዳዩ ርዕስ",
    issue_title_placeholder: "ለምሳሌ፣ ጉድጓድ በዋናው መንገድ",
    concerned_dept: "ተያያዥ መምሪያ",
    dept_placeholder: "ለምሳሌ፣ የመንገዶች ክፍል",
    issue_location: "የጉዳዩ አካባቢ",
    location_field_placeholder: "ትክክለኛ አካባቢ ያስገቡ",
    current_status: "አሁናዊ ሁኔታ",
    issue_type: "የጉዳዩ አይነት",
    submit_complaint: "ቅሬታ አስገባ",

    // ── Edit Job
    edit_job_title: "ጉዳይ አርትዕ",
    job_location: "የጉዳዩ አካባቢ",
    job_status: "የጉዳዩ ሁኔታ",
    job_type: "የጉዳዩ አይነት",

    // ── Profile
    profile_title: "መገለጫዬ",
    profile_photo: "የመገለጫ ፎቶ (ከ5MB ያልበለጠ)",
    save_changes: "ለውጦቹን አስቀምጥ",

    // ── Admin
    current_users: "አሁናዊ ተጠቃሚዎች",
    total_jobs: "ጠቅላላ ቅሬታዎች",

    // ── Settings
    settings_title: "ቅንብሮች",
    settings_subtitle: "የወራቤ ሙኒሲፓሊቲ ልምድዎን ያበጁ",
    nav_appearance: "መልክ",
    nav_language: "ቋንቋ",
    nav_notifications: "ማሳወቂያዎች",
    nav_privacy: "ግላዊነት እና ደህንነት",
    nav_data: "ዳታ እና ማከማቻ",
    appearance_title: "መልክ",
    appearance_desc: "መተግበሪያው እንዴት እንደሚታይ ያበጁ",
    theme_label: "ገጽታ",
    theme_desc: "ብርሃን እና ጨለማ ሁነቶችን ይቀይሩ",
    theme_light: "ብርሃን",
    theme_dark: "ጨለማ",
    font_label: "የፊደል መጠን",
    font_desc: "ለተሻለ ተነባቢነት የጽሑፍ መጠን ያስተካክሉ",
    font_small: "ትንሽ",
    font_medium: "መካከለኛ",
    font_large: "ትልቅ",
    font_xlarge: "በጣም ትልቅ",
    language_title: "ቋንቋ",
    language_desc: "የሚፈልጉትን ቋንቋ ይምረጡ",
    notif_title: "ማሳወቂያዎች",
    notif_desc: "ማሳወቂያዎችን እንዴት እንደሚቀበሉ ያዋቅሩ",
    email_notif: "የኢሜይል ማሳወቂያዎች",
    email_notif_desc: "ዝማኔዎችን በኢሜይል ይቀበሉ",
    sms_notif: "የኤስኤምኤስ ማሳወቂያዎች",
    sms_notif_desc: "አስፈላጊ ማሳወቂያዎችን በኤስኤምኤስ ይቀበሉ",
    push_notif: "የተጫነ ማሳወቂያ",
    push_notif_desc: "በአሳሽ ውስጥ ማሳወቂያዎች",
    privacy_title: "ግላዊነት እና ደህንነት",
    privacy_desc: "የደህንነት ቅንብሮችዎን ያስተዳድሩ",
    two_factor: "ሁለት ደረጃ ማረጋገጫ",
    two_factor_desc: "ለመለያዎ ተጨማሪ ደህንነት ያክሉ",
    privacy_mode: "የግላዊነት ሁነት",
    privacy_mode_desc: "ሚስጥራዊ መረጃዎችን ደብቅ",
    data_title: "ዳታ እና ማከማቻ",
    data_desc: "የዳታ አጠቃቀምዎን ይቆጣጠሩ",
    auto_save: "ረቂቆችን በራስ-ሰር አስቀምጥ",
    auto_save_desc: "የቅሬታ ረቂቆችን በራስ-ሰር አስቀምጥ",
    data_saving: "የዳታ ቆጣቢ ሁነት",
    data_saving_desc: "ዳታ ለማዳን ዝቅ ያለ ጥራት ያለው ምስሎችን ይጫን",
    reset_confirm_title: "ሁሉንም ቅንብሮች ዳግም አስጀምር?",
    reset_confirm_msg:
      "ይህ ሁሉንም ቅንብሮች ወደ ነባሪ ሁኔታ ይመልሳቸዋል። ሊቀለበስ አይችልም።",
    reset_confirm_btn: "አዎ፣ ዳግም አስጀምር",
    saved_msg: "ቅንብሮች በተሳካ ሁኔታ ተቀምጠዋል!",

    // ── Error
    not_found_title: "ገጹ አልተገኘም",
    not_found_msg: "የሚፈልጉትን ገጽ ማግኘት አልቻልን።",
    something_wrong: "ችግር ተፈጠረ",
  },
};

const FONT_SIZES = {
  small: "13px",
  medium: "16px",
  large: "18px",
  xlarge: "20px",
};

const STORAGE_KEY = "worabe_settings";

const DEFAULTS = {
  language: "en",
  theme: "light",
  fontSize: "medium",
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  twoFactorAuth: false,
  privacyMode: false,
  autoSave: true,
  dataSaving: false,
};

const loadSettings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
};

// ─── Context ────────────────────────────────────────────────────────────────
const SettingsContext = createContext();

export const SettingsProvider = ({ children, onThemeChange, currentDark }) => {
  const [settings, setSettings] = useState(loadSettings);

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  // Apply font size globally
  useEffect(() => {
    document.documentElement.style.fontSize =
      FONT_SIZES[settings.fontSize] || "16px";
  }, [settings.fontSize]);

  // Sync dark theme with App-level state
  useEffect(() => {
    const shouldBeDark = settings.theme === "dark";
    if (shouldBeDark !== currentDark) {
      onThemeChange?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.theme]);

  const updateSetting = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const saveSettings = (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  };

  const resetSettings = () => {
    setSettings({ ...DEFAULTS });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
    document.documentElement.style.fontSize = "16px";
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSetting, saveSettings, resetSettings, t, TRANSLATIONS }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
};

export default SettingsContext;
