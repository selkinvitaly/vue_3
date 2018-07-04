import { Sidenav } from 'materialize-css';


document.addEventListener('DOMContentLoaded', () => {
    // sidenav
    const navs = document.querySelectorAll('.sidenav');
    Sidenav.init(navs, {});
});
