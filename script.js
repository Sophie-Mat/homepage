document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    const hiddenElements = document.querySelectorAll(".fade-in");
    hiddenElements.forEach((el) => observer.observe(el));

    /* --- Scavenger Hunt Step 3: Experience Clicks --- */
    const expHeader = document.getElementById("experience-hint");
    const terminal = document.getElementById("hacker-terminal");
    const terminalOutput = document.getElementById("terminal-output");
    let expClicks = 0;
    let terminalTriggered = false;

    if (expHeader) {
        expHeader.style.userSelect = "none";
        expHeader.addEventListener("click", () => {
            if (terminalTriggered) return;
            expClicks++;
            
            if (expClicks === 3) {
                terminalTriggered = true;
                triggerTerminalEasterEgg();
            }
        });
    }

    function triggerTerminalEasterEgg() {
        terminal.classList.remove("hidden");
        const lines = [
            "> Running dependency check...",
            "> Error: Programmer's chocolate levels critically low. ☕",
            "> I would have said coffee, but I hate caffeine... sorry not sorry.",
            "> ",
            "> Real talk: I wrote 50+ lines of JavaScript just to build a fake terminal.",
            "> I'm hoping this counts towards the \"Aweso-oomeness\" criteria! 🌈",
            "> Thanks for taking the time to click around! 👾",
            "> ",
            "> Press any key (or click) to restore system..."
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        let currentSpan = null;

        terminalOutput.innerHTML = "";

        // Wait for user input before closing
        function closeTerminal() {
            terminal.classList.add("hidden");
            expClicks = 0;
            terminalTriggered = false;
            const jobTitle = document.getElementById("job-title");
            if (jobTitle) jobTitle.innerText = "Full-Stack Developer";
            
            document.removeEventListener("keydown", closeTerminal);
            document.removeEventListener("click", closeTerminal);
        }

        function typeNextChar() {
            if (lineIndex >= lines.length) {
                // Done typing. Listen for interaction to close.
                document.addEventListener("keydown", closeTerminal);
                document.addEventListener("click", closeTerminal);
                return;
            }

            // Create a new span for the current line if we are at the start of it
            if (charIndex === 0) {
                currentSpan = document.createElement("span");
                terminalOutput.appendChild(currentSpan);
            }

            if (charIndex < lines[lineIndex].length) {
                currentSpan.textContent += lines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, Math.random() * 25 + 15); // typing speed
            } else {
                terminalOutput.appendChild(document.createElement("br"));
                lineIndex++;
                charIndex = 0;
                setTimeout(typeNextChar, 350); // line pause
            }
        }

        setTimeout(typeNextChar, 300);
    }
});