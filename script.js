document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section");
    const textArray = ["Web Developer", "Freelancer", "UI/UX Designer", "Graphic Designer", "Programmer"];
    const textElement = document.getElementById('dynamic-text');
    let index = 0;
    let text = '';

    // Navbar toggle for mobile
    menuIcon.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });

    // Navigation and section handling
    function showSection(id) {
        sections.forEach(section => {
            section.style.display = section.id === id ? "block" : "none";
        });
    }

    function setActiveNavLink(id) {
        const links = document.querySelectorAll(".navbar a");
        links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
    }

    function navigateToSection(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute("href").substring(1);
        showSection(targetId);
        setActiveNavLink(targetId);
        window.location.hash = targetId; // Update the URL hash
    }

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", navigateToSection);
    });

    window.addEventListener("hashchange", function () {
        const targetId = window.location.hash.substring(1);
        showSection(targetId);
        setActiveNavLink(targetId);
    });

    // Show the section based on the URL hash on page load
    const defaultSectionId = window.location.hash.substring(1) || "Home";
    showSection(defaultSectionId);
    setActiveNavLink(defaultSectionId);

    // Text typing effect
    function typeWriter() {
        if (text.length < textArray[index].length) {
            text += textArray[index].charAt(text.length);
            textElement.textContent = text;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(eraseText, 300);
        }
    }

    function eraseText() {
        if (text.length > 0) {
            text = text.substring(0, text.length - 1);
            textElement.textContent = text;
            setTimeout(eraseText, 100);
        } else {
            index = (index + 1) % textArray.length;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
});

