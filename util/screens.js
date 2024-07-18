import { type, prompt, input } from "./io.js";
import pause from "./pause.js";

const INACTIVITY_TIME = 120000; // 2 minutes in milliseconds
let inactivityTimeout;
let currentPage = "boot";
let isFirstBoot = true;

function resetInactivityTimeout() {
	clearTimeout(inactivityTimeout);
	if (currentPage !== "boot") {
		inactivityTimeout = setTimeout(() => {
			boot();
		}, INACTIVITY_TIME);
	}
}

/** Boot screen */
export async function boot() {
	clear();
	currentPage = "boot";

	const initialWait = isFirstBoot ? 3000 : 1000;
	const lineWait = isFirstBoot ? 1000 : 333;

	await type("$ cd terminal", {
		initialWait
	});

	await type(["$ ls"], {
		lineWait
	});
	await type(
		[
			"HOME\nABOUT-ME\nPROJECTS\nCONTACT"
		],
		{ lineWait: 250, charWait: 50 }
	);

	await pause();
	isFirstBoot = false;
	return main();
}

/** Home page */
async function home() {
	clear();
	currentPage = "home";
	await type("$ cd home", { initialWait: 1000, charWait: 50 });
	await type(["Welcome to my terminal style homepage project!", "made with love :)"], { lineWait: 500, charWait: 50 });
	resetInactivityTimeout();
	return main();
}

/** About Me page */
async function aboutMe() {
	clear();"I'm fluent in english and currently open to work!"
	currentPage = "about-me";
	await type("$ cd about-me", { initialWait: 1000, charWait: 50 });
	await type(["I'm a 22 year old self taught programmer from Brazil."], { lineWait: 500, charWait: 50 });
	await type(["I'm fluent in english and currently open to work!"], { lineWait: 500, charWait: 50 });
	resetInactivityTimeout();
	return main();
}

/** Projects page */
async function projects() {
	clear();
	currentPage = "projects";
	await type("$ cd projects", { initialWait: 1000, charWait: 50 });
	await type(["For now you can check my other projects on github!", "https://github.com/Wendel-Vieira"], { lineWait: 500, charWait: 50 });
	resetInactivityTimeout();
	return main();
}

/** Contact page */
async function contact() {
	clear();
	currentPage = "contact";
	await type("$ cd contact", { initialWait: 1000, charWait: 50 });
	await type(["https://github.com/Wendel-Vieira", "fvwendel@gmail.com"], { lineWait: 500, charWait: 50 });
	resetInactivityTimeout();
	return main();
}

/** Main input terminal, recursively calls itself */
export async function main() {
	resetInactivityTimeout();
	let command = await input();

	const aboutMePattern = /^(cd\s+)?about(\s+|-)?me?$/i;

	if (command === "cd home" || command === "home") {
		await home();
	} else if (aboutMePattern.test(command)) {
		await aboutMe();
	} else if (command === "cd projects" || command === "projects") {
		await projects();
	} else if (command === "cd contact" || command === "contact") {
		await contact();
	} else if (currentPage === "boot") {
		await type(`Unknown command: ${command}`, { charWait: 50 });
		return main();
	} else {
		await boot();
	}
}

export function clear(screen = document.querySelector(".terminal")) {
	screen.innerHTML = "";
}
