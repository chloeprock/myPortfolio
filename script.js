// document.addEventListener('DOMContentLoaded', function() {
//     const boxes = document.querySelectorAll('.project-box');
//     const pages = document.querySelectorAll('.pages');
//     const currentPage = document.querySelector('.current-page');
    
//     boxes.forEach((box) => {
//         box.addEventListener('click', () => {
//             const targetPageClass = box.getAttribute('data-target-page');
//             const targetPage = document.querySelector(`.${targetPageClass}`);
            
//             // Hide the current page
//             currentPage.style.left = '-100%';

//             // Show the target page
//             targetPage.style.left = '0';

//             // Update the current page reference
//             currentPage.classList.remove('current-page');
//             targetPage.classList.add('current-page');
//         });
//     });
// });

