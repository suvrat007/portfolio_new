/** Identity, routing and outbound links. No component hardcodes these. */

export const SITE = {
    name: "Suvrat Mittal",
    shortName: "Suvrat",
    initials: "SM",
    role: "Financial Systems Engineer",
    location: "Noida, India",
    timezone: "Asia/Kolkata",
    email: "suvratmittal007@gmail.com",
    phone: "+91 8826026670",
    resumeUrl:
        "https://drive.google.com/file/d/1zeXs5eW8-muq7ZH38CNW0DgwxzYs0b7r/view?usp=sharing",
    portraitUrl:
        "https://i.ibb.co/w5969Jt/Whats-App-Image-2025-03-29-at-22-55-08-82521ab9.jpg",
    githubUsername: "suvrat007",
    description:
        "Suvrat Mittal builds financial systems: portfolio risk engines, statement analysis terminals and valuation models, shipped to production.",
    url: "https://suvratmittal.vercel.app",
    foundedYear: 2023,
};

export const ROUTES = {
    home: "/",
    work: "/work",
    admin: "/admin",
};

export const NAV_LINKS = [
    { label: "Index", to: ROUTES.home, index: "01" },
    { label: "Work", to: ROUTES.work, index: "02" },
];

/**
 * In-page anchors for the home route. `index` doubles as the printed section
 * number in the UI, so the two can never drift apart.
 */
export const SECTIONS = {
    profile: { id: "profile", label: "Profile", index: "01" },
    practice: { id: "practice", label: "Practice", index: "02" },
    work: { id: "work", label: "Selected Work", index: "03" },
    building: { id: "building", label: "In Development", index: "04" },
    toolkit: { id: "toolkit", label: "Toolkit", index: "05" },
    activity: { id: "activity", label: "Activity", index: "06" },
    contact: { id: "contact", label: "Contact", index: "07" },
};

export const SOCIAL_LINKS = [
    {
        id: "github",
        label: "GitHub",
        handle: "@suvrat007",
        href: "https://github.com/suvrat007",
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        handle: "suvrat-mittal",
        href: "https://www.linkedin.com/in/suvrat-mittal-05b642294/",
    },
    {
        id: "email",
        label: "Email",
        handle: SITE.email,
        href: `mailto:${SITE.email}`,
    },
    {
        id: "leetcode",
        label: "LeetCode",
        handle: "@suvrat007",
        href: "https://leetcode.com/u/suvrat007/",
    },
];
