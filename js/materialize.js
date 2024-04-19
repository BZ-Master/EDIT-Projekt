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