import { boot } from "./screens.js";
import pause from "./pause.js";

/** Turn on the terminal */
async function on() {
    await power(true);
    boot();
}


async function power(on = true) {
    const monitor = document.getElementById("monitor");
    monitor.classList.toggle("turn-off", !on);
    monitor.classList.toggle("off", !on);
    return;
}

// Event listener to turn on the terminal screen when the script loads
document.addEventListener("DOMContentLoaded", () => {
    on();
});


