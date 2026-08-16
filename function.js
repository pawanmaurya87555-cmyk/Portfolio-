/* =====================================================
   PAWAN PORTFOLIO JAVASCRIPT
===================================================== */


/* ================= ELEMENTS ================= */

const html = document.documentElement;

const body = document.body;

const header =
    document.getElementById("header");

const themeToggle =
    document.getElementById("themeToggle");

const mobileThemeToggle =
    document.getElementById("mobileThemeToggle");

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");

const languageSelect =
    document.getElementById("languageSelect");

const mobileLanguage =
    document.getElementById("mobileLanguage");

const themeText =
    document.getElementById("themeText");

const typing =
    document.getElementById("typing");



/* ================= THEME ================= */

function getTheme() {

    const saved =
        localStorage.getItem("portfolio-theme");

    if (
        saved === "light" ||
        saved === "dark"
    ) {

        return saved;

    }


    return window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
        ? "dark"
        : "light";

}


function applyTheme(theme) {

    html.dataset.theme = theme;

    localStorage.setItem(
        "portfolio-theme",
        theme
    );


    const icon =
        themeToggle.querySelector("i");


    if (theme === "dark") {

        icon.className =
            "fa-solid fa-sun";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeText.textContent =
            "Dark";

    }

    else {

        icon.className =
            "fa-solid fa-moon";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeText.textContent =
            "Light";

    }

}


function toggleTheme() {

    const current =
        html.dataset.theme;

    applyTheme(
        current === "dark"
            ? "light"
            : "dark"
    );

}


themeToggle.addEventListener(
    "click",
    toggleTheme
);


mobileThemeToggle.addEventListener(
    "click",
    toggleTheme
);


applyTheme(getTheme());



/* ================= MOBILE MENU ================= */

function openMenu() {

    menuToggle.classList.add("open");

    mobileMenu.classList.add("open");

    body.classList.add("menu-open");

}


function closeMenu() {

    menuToggle.classList.remove("open");

    mobileMenu.classList.remove("open");

    body.classList.remove("menu-open");

}


menuToggle.addEventListener(
    "click",
    () => {

        if (
            mobileMenu.classList.contains("open")
        ) {

            closeMenu();

        }

        else {

            openMenu();

        }

    }
);


/* Close menu after clicking */

document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);



/* ================= LANGUAGE ================= */

const translations = {

    en: {

        nav: [
            "Home",
            "About",
            "Projects",
            "Contact"
        ],

        hello: "Hello, I'm",

        status:
            "Building • Learning • Improving",

        description:
            "I create clean, responsive and user-friendly websites using HTML, CSS and JavaScript. I enjoy turning ideas into practical digital experiences.",

        aboutTitle:
            "Learning by building, improving by doing."

    },


    hi: {

        nav: [
            "होम",
            "मेरे बारे में",
            "प्रोजेक्ट्स",
            "संपर्क"
        ],

        hello:
            "नमस्ते, मैं हूँ",

        status:
            "बना रहा हूँ • सीख रहा हूँ • बेहतर कर रहा हूँ",

        description:
            "मैं HTML, CSS और JavaScript की मदद से साफ़, responsive और user-friendly websites बनाता हूँ। मुझे ideas को practical digital experiences में बदलना पसंद है।",

        aboutTitle:
            "बनाकर सीखना, करके बेहतर होना।"

    }

};



function changeLanguage(language) {

    const data =
        translations[language];


    if (!data) return;


    /* Navigation */

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    navLinks.forEach(
        (link, index) => {

            link.textContent =
                data.nav[index];

        }
    );


    /* Mobile navigation */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu > a"
        );


    mobileLinks.forEach(
        (link, index) => {

            link.textContent =
                data.nav[index];

        }
    );


    /* Hero */

    document.querySelector(
        ".hello"
    ).textContent =
        data.hello;


    document.querySelector(
        ".status"
    ).lastChild.textContent =
        " " + data.status;


    document.querySelector(
        ".hero-description"
    ).textContent =
        data.description;


    /* About */

    document.querySelector(
        ".section-heading h2"
    ).textContent =
        data.aboutTitle;


    /* Save */

    localStorage.setItem(
        "portfolio-language",
        language
    );


    languageSelect.value =
        language;

    mobileLanguage.value =
        language;


    startTyping(language);

}


languageSelect.addEventListener(
    "change",
    event => {

        changeLanguage(
            event.target.value
        );

    }
);


mobileLanguage.addEventListener(
    "change",
    event => {

        changeLanguage(
            event.target.value
        );

    }
);


const savedLanguage =
    localStorage.getItem(
        "portfolio-language"
    ) || "en";


changeLanguage(savedLanguage);



/* ================= TYPING EFFECT ================= */

const roles = {

    en: [
        "Frontend Developer",
        "UI / UX Learner",
        "Web Designer"
    ],

    hi: [
        "Frontend Developer",
        "UI / UX Learner",
        "Web Designer"
    ]

};


let typingTimer;


function startTyping(language) {

    clearTimeout(typingTimer);


    const words =
        roles[language] || roles.en;


    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function type() {

        const word =
            words[wordIndex];


        if (!deleting) {

            typing.textContent =
                word.substring(
                    0,
                    characterIndex
                );

            characterIndex++;


            if (
                characterIndex >
                word.length
            ) {

                deleting = true;

                typingTimer =
                    setTimeout(
                        type,
                        1200
                    );

                return;

            }

        }

        else {

            typing.textContent =
                word.substring(
                    0,
                    characterIndex
                );

            characterIndex--;


            if (
                characterIndex < 0
            ) {

                deleting = false;

                characterIndex = 0;

                wordIndex =
                    (wordIndex + 1)
                    % words.length;

            }

        }


        typingTimer =
            setTimeout(
                type,
                deleting
                    ? 45
                    : 85
            );

    }


    type();

}


startTyping(
    savedLanguage
);



/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll(
        "main section"
    );


const navLinks =
    document.querySelectorAll(
        ".desktop-nav .nav-link"
    );


function updateNavigation() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(
        section => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;

            const id =
                section.id;


            if (
                scrollPosition >= top &&
                scrollPosition <
                top + height
            ) {

                navLinks.forEach(
                    link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute(
                                "href"
                            ) === "#" + id
                        );

                    }
                );

            }

        }
    );


    /* Header shadow */

    if (
        window.scrollY > 20
    ) {

        header.classList.add(
            "scrolled"
        );

    }

    else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateNavigation,
    { passive: true }
);


updateNavigation();



/* ================= SCROLL REVEAL ================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });



/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        if (
            !name ||
            !email ||
            !message
        ) {

            formMessage.textContent =
                "Please fill all fields.";

            return;

        }


        const subject =
            encodeURIComponent(
                "Portfolio enquiry from " +
                name
            );


        const body =
            encodeURIComponent(

                "Name: " +
                name +

                "\nEmail: " +
                email +

                "\n\nMessage:\n" +
                message

            );


        window.location.href =
            "mailto:pawanmaurya87555@gmail.com" +
            "?subject=" +
            subject +
            "&body=" +
            body;


        formMessage.textContent =
            "Opening your email app...";

    }
);



/* ================= FOOTER YEAR ================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();