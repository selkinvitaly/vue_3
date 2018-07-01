import { Sidenav } from 'materialize-css';


document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.sidenav');
    Sidenav.init(elems, {});
});
