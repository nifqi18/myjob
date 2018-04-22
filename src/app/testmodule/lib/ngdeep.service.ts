import { Injectable, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class NgDeepLazyLoad implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private Doc: Document) { }

  ngOnInit() {
    console.log('init')
  }

  ngOnDestroy() {
    console.log('testa');
  }

  private support() {
    let s;

    try {
      const _s: any = this.Doc.createElement('link');
      s = _s.relList.supports('preload');

    } catch (e) {
      s = false;
    }

    return s ? true : false;
  }
  private bindMediaToggle(link) {
    // remember existing media attr for ultimate state, or default to 'all'
    const finalMedia = link.media || "all";

    function enableStylesheet() {
      link.media = finalMedia;
    }

    // bind load handlers to enable media
    if (link.addEventListener) {
      link.addEventListener("load", enableStylesheet);
    } else if (link.attachEvent) {
      link.attachEvent("onload", enableStylesheet);
    }

    // Set rel and non-applicable media type to start an async request
    // note: timeout allows this to happen async to let rendering continue in IE
    setTimeout(function () {
      link.rel = "stylesheet";
      link.media = "only x";
    });
    // also enable media after 3 seconds,
    // which will catch very old browsers (android 2.x, old firefox) that don't support onload on link
    setTimeout(enableStylesheet, 3000);
  };

  private poly() {
    // double check this to prevent external calls from running
    if (this.support()) {
      console.log('support kah');
      return;
    }

    var links = this.Doc.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      // qualify links to those with rel=preload and as=style attrs
      if (link.rel === "preload" && link.getAttribute("as") === "style" && !link.getAttribute("data-loadcss")) {
        // prevent rerunning on link
        link.setAttribute("data-loadcss", "true");
        // bind listeners to toggle media back
        this.bindMediaToggle(link);
        //console.log(link);
      }
    }
  };

  AttactCssOrScript() {
    if (!this.support()) {
      this.poly();

      const run = setInterval(this.poly(), 500);
      const doc: any = document;

      if (doc.addEventListener) {

        doc.addEventListener("load", () => {
          this.poly();
          doc.clearInterval(run)
        })
      } else if (doc.attachEvent) {
        doc.attachEvent("onload", function () {
          console.log('on load')
          this.poly();
          doc.clearInterval(run);
        });
      }


    }



  }

  LoadCss(href, before?, media?) {
    const doc = this.Doc;
    const ss = doc.createElement("link");

    var ref;

    if (before) {
      ref = before;
    }
    else {
      const refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
      ref = refs[refs.length - 1];
    }


    const sheets = doc.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
    ss.media = "only x";

    // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
    function ready(cb) {
      if (doc.body) {
        return cb();
      }
      setTimeout(function () {
        ready(cb);
      });
    }

    ready(function () {
      ref.parentNode.insertBefore(ss, (before ? ref : ref.nextSibling));
    });
    // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
    var onloadcssdefined = function (cb) {
      var resolvedHref = ss.href;
      var i = sheets.length;
      while (i--) {
        if (sheets[i].href === resolvedHref) {
          return cb();
        }
      }
      setTimeout(function () {
        onloadcssdefined(cb);
      });
    };

    function loadCB() {
      if (ss.addEventListener) {
        ss.removeEventListener("load", loadCB);
      }
      ss.media = media || "all";
    }

    // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
    if (ss.addEventListener) {
      ss.addEventListener("load", loadCB);
    }
    //ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined(loadCB);
  }

}
