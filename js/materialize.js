M.AutoInit()

//zatvara sidenav kada se klikne link
document.addEventListener('DOMContentLoaded', () => {
    let links = document.querySelectorAll('#slide-out a');
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            let sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
            sidenavInstance.close()
        })
    })
})

//hide/show navbar dok scrolla
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-70px";
    }
    prevScrollpos = currentScrollPos;
}