abstract class Color {
    static readonly main = getComputedStyle(document.documentElement).getPropertyValue("--main-color");
    static readonly primary = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
    static readonly error = getComputedStyle(document.documentElement).getPropertyValue("--error-color");
    static readonly errorExtra = getComputedStyle(document.documentElement).getPropertyValue("--error-extra-color");
    static readonly errorColorful = getComputedStyle(document.documentElement).getPropertyValue("--colorful-error-color");
    static readonly errorExtraColorful = getComputedStyle(document.documentElement).getPropertyValue("--colorful-error-extra-color");
    static readonly bg = getComputedStyle(document.documentElement).getPropertyValue("--bg-color");
    static readonly sub = getComputedStyle(document.documentElement).getPropertyValue("--sub-color");
    static readonly subAlt = getComputedStyle(document.documentElement).getPropertyValue("--sub-alt-color");
    static readonly text = getComputedStyle(document.documentElement).getPropertyValue("--text-color");
}

export default Color;