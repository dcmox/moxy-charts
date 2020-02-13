"use strict";
exports.__esModule = true;
exports.loadingCircle = function (element, opts) {
    if (!opts.width) {
        opts.width = 300;
    }
    if (!opts.height) {
        opts.height = opts.width;
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    element.style.setProperty('--circle-radius', (opts.width + 290).toString());
    element.style.setProperty('--circle-animation', opts.animation || 'infinite alternate');
    // infinite alternate
    svg.classList.add('progress_circle');
    svg.setAttribute('width', opts.width.toString());
    svg.setAttribute('height', opts.height.toString());
    svg.setAttribute('viewBox', "0 0 " + opts.width + " " + opts.height);
    svg.innerHTML =
        "<circle cx=\"" + (opts.width / 2).toString() + "\" cy=\"" + (opts.height / 2).toString() + "\" r=\"" + (opts.height / 2 -
            6).toString() + "\" fill=\"none\" stroke=\"var(--light-grey)\" stroke-width=\"12\"></circle>" +
            ("<circle class=\"progress_circle__value\" cx=\"" + (opts.width / 2).toString() + "\" cy=\"" + (opts.height / 2).toString() + "\" r=\"" + (opts.height / 2 -
                6).toString() + "\" fill=\"none\" stroke=\"" + (opts.color ||
                'var(--green)') + "\" stroke-width=\"12\"></circle>");
    if (opts.text) {
        svg.innerHTML += "<text class=\"progress_circle__complete\" x=\"" + (opts.width /
            2 +
            8) /
            2 + "\" y=\"-" + (opts.height / 2 -
            6) + "\" font-weight=\"bold\" fill=\"var(--" + (opts.textColor ||
            'green') + ")\" transform=\"rotate(90)\">" + opts.text + "</text>";
    }
    element.append(svg);
    return true;
};
