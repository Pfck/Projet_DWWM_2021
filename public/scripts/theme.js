/**
 * Save the current theme inside the local storage
 */
function theme_save() {	
	var checkbox = document.getElementById("theme_saver");
    // If the checkbox is checked
    if (checkbox.checked) {
        // Save the current theme as dark in the local storage
        localStorage.setItem("theme", "dark");
        // Shift the theme to dark
        themeShifter("dark");

    // If the checkbox is NOT checked
    } else {

        // Save the current theme as bright in the local storage
        localStorage.setItem("theme", "bright");
        // Shift the theme to bright
        themeShifter("bright");
    } // EO If/Else
    	
} // EO theme_save

/**
 * Shifting the current theme
 * @param {String} theme - the Value of the theme
 */
function themeShifter(theme) {
    // If the current theme is "dark"
    if (theme == "dark") {
        document.getElementById("g_container").style.backgroundColor = "#111215";
        document.getElementById("g_container").style.color = "#f3f3f3";

    // If the current theme is NOT "dark"
    } else {
        document.getElementById("g_container").style.backgroundColor = "#f3f3f3";
        document.getElementById("g_container").style.color = "#111215";
    } // EO If/Else

} // EO themeShifter

//for loading purpose
// get the current theme value from the localStorage
var theme = localStorage.getItem("theme");
console.log(theme)
// If the value is "dark"
if (theme == "dark") {

    // Checking the theme checkbox
    document.getElementById("theme_saver").checked = true;

    // Shift the theme to dark
    themeShifter(theme);
} // EO If/Else