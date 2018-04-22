var myExtension = {
    init: function () {
        // The event can be DOMContentLoaded, pageshow, pagehide, load or unload.
       document.addEventListener("DOMContentLoaded", this.onPageLoad, false);
    },
    onPageLoad: function (aEvent) {
        var doc = aEvent.originalTarget; // doc is document that triggered the event
        var win = doc.defaultView; // win is the window for the doc
        // test desired conditions and do something
        // if (doc.nodeName != "#document") return; // only documents
        // if (win != win.top) return; //only top window.
        // if (win.frameElement) return; // skip iframes/frames
        alert("page is loaded \n" + doc.location.href);
    }
}
window.addEventListener("load", function load(event) {
    console.log('load');
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    myExtension.init();
}, false);