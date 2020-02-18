"use strict";
exports.__esModule = true;
var query_1 = require("./query");
var svg_1 = require("./svg");
// RGB (255, 0, 0)
// RGB (255, 0, 255)
// RGB (0, 0, 255)
// RGB (0, 255, 255)
// RGB (0, 255, 0)
// RGB( 255, 255, 0)
// RGB ( 255, 0, 0)
// Theme / Color generator
// https://www.w3schools.com/howto/howto_css_fullscreen_video.asp incorporate into moxyscript
// from top right
// (255, 255, 255)
// (255, 0, 0)
// should it be done via canvas?
// <input type="color" id="favcolor" name="favcolor" value="#ff0000">
// <input oninput="changeGreen(this.value)" onchange="changeGreen(this.value)" type="range" id="slideGreen" name="slideGreen" min="0" max="255">
// https://www.w3schools.com/howto/howto_css_modals.asp - MODAL
// https://www.w3schools.com/howto/howto_css_timeline.asp timeline element
// https://www.w3schools.com/howto/howto_js_scroll_indicator.asp - scroll indicator
// skill / percent bar
// tool tips
// html includes?
// todo list
// https://www.w3schools.com/howto/howto_css_loader.asp - EASY LOADDER - DO THIS
// star rating system
// Score card widget https://www.w3schools.com/howto/howto_css_user_rating.asp
// "CARDS" - https://www.w3schools.com/howto/howto_css_cards.asp
// https://www.w3schools.com/howto/howto_css_cutout_text.asp - cutout text
// html {
//    scroll - behavior: smooth;
// }
// TREE VIEW BOX
// DIRECTORY BOX (FILE SYSTEM)
// typing effect animation widget
//
/*https://www.w3schools.com/colors/colors_psychology.asp
 * https://www.w3schools.com/colors/colors_monochromatic.asp
 * RGB Calculator
 * https://www.w3schools.com/colors/colors_triadic.asp
 * https://www.w3schools.com/colors/colors_analogous.asp
 * RGB -> HEX -> HSL -> HWB -> CMYK
 * Store words in hex? #ff0000
 * https://www.w3schools.com/colors/colors_theory.asp
 * https://www.w3schools.com/howto/howto_js_accordion.asp
 * TABS
 * https://www.w3schools.com/howto/howto_css_switch.asp - toggle switch
 *f (event.getModifierState("CapsLock")) {
 * https://www.w3schools.com/howto/howto_js_image_grid.asp - image grid
 */
exports.colorPicker = function () {
    var element = query_1.query('.moxy-color-picker');
    var html = '';
    var elements = [];
    for (var r = 0; r < 255; r++) {
        for (var g = 0; g < 5; g++) {
            for (var b = 0; b < 1; b++) {
                var el = svg_1.elem('span', {
                    style: "background-color: rgb(" + r + ", " + g + ", " + b + ")"
                });
                elements.push(el);
            }
        }
    }
    element.append.apply(element, elements);
};
