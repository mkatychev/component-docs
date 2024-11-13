// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Understanding Component Model</li><li class="chapter-item expanded "><a href="design/why-component-model.html"><strong aria-hidden="true">2.</strong> Why the Component Model?</a></li><li class="chapter-item expanded "><a href="design/components.html"><strong aria-hidden="true">3.</strong> Components</a></li><li class="chapter-item expanded "><a href="design/interfaces.html"><strong aria-hidden="true">4.</strong> Interfaces</a></li><li class="chapter-item expanded "><a href="design/worlds.html"><strong aria-hidden="true">5.</strong> Worlds</a></li><li class="chapter-item expanded "><a href="design/wit.html"><strong aria-hidden="true">6.</strong> WIT</a></li><li class="chapter-item expanded "><a href="design/packages.html"><strong aria-hidden="true">7.</strong> Packages</a></li><li class="chapter-item expanded affix "><li class="part-title">Using Component Model</li><li class="chapter-item expanded "><a href="language-support.html"><strong aria-hidden="true">8.</strong> Language Support for Components</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="language-support/c.html"><strong aria-hidden="true">8.1.</strong> C/C++</a></li><li class="chapter-item expanded "><a href="language-support/csharp.html"><strong aria-hidden="true">8.2.</strong> C#</a></li><li class="chapter-item expanded "><a href="language-support/go.html"><strong aria-hidden="true">8.3.</strong> Go</a></li><li class="chapter-item expanded "><a href="language-support/javascript.html"><strong aria-hidden="true">8.4.</strong> JavaScript</a></li><li class="chapter-item expanded "><a href="language-support/python.html"><strong aria-hidden="true">8.5.</strong> Python</a></li><li class="chapter-item expanded "><a href="language-support/rust.html"><strong aria-hidden="true">8.6.</strong> Rust</a></li></ol></li><li class="chapter-item expanded "><a href="creating-and-consuming.html"><strong aria-hidden="true">9.</strong> Creating and Consuming Components</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="creating-and-consuming/authoring.html"><strong aria-hidden="true">9.1.</strong> Authoring Components</a></li><li class="chapter-item expanded "><a href="creating-and-consuming/composing.html"><strong aria-hidden="true">9.2.</strong> Composing Components</a></li><li class="chapter-item expanded "><a href="creating-and-consuming/running.html"><strong aria-hidden="true">9.3.</strong> Running Components</a></li><li class="chapter-item expanded "><a href="creating-and-consuming/distributing.html"><strong aria-hidden="true">9.4.</strong> Distributing Components</a></li></ol></li><li class="chapter-item expanded "><a href="tutorial.html"><strong aria-hidden="true">10.</strong> Tutorial</a></li><li class="chapter-item expanded affix "><li class="part-title">Runtime Support</li><li class="chapter-item expanded "><a href="runtimes/wasmtime.html"><strong aria-hidden="true">11.</strong> Wasmtime</a></li><li class="chapter-item expanded "><a href="runtimes/jco.html"><strong aria-hidden="true">12.</strong> jco</a></li><li class="chapter-item expanded affix "><li class="part-title">Advanced Topics</li><li class="chapter-item expanded "><a href="advanced/canonical-abi.html"><strong aria-hidden="true">13.</strong> Canonical ABI</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
