const topNavList = document.querySelector('#topNavList');
const menu_btn = document.querySelector('.menu-btn');
const close_btn = document.querySelector('.close-btn');
const cart_btn = document.querySelector('.cart-btn');
const sidebar_nav = document.querySelector('.sidebar-nav');
const card = document.querySelector('.card');
const cardBody = document.querySelector('.card-body');
const previous_btn = document.querySelectorAll('.previous-btn');
const next_btn = document.querySelectorAll('.next-btn');
const minus_btn = document.querySelector('.product-quantity-selector_minus-btn');
const plus_btn = document.querySelector('.product-quantity-selector_plus-btn');
const product_qty = document.querySelector('.product-qty');
const addToCartBtn = document.querySelector('#addToCartBtn');
const lightBoxCloseBtn = document.querySelector('#lightBoxCloseBtn');
const light_box = document.querySelector('.lightbox');

checkViewPort();
window.addEventListener('resize', checkViewPort);

// CHECK WHETHER THE VIEW PORT HITS A CERTAIN SIZE THEN TOGGLE aria-hidden
function checkViewPort () {
    if (window.innerWidth > 1024) {
        // REMOVE aria-hidden ON TOPBAR NAVIGATION
        topNavList.removeAttribute('aria-hidden');
        if(light_box.classList.contains('d-flex')) {
            light_box.classList.add('d-none');
            light_box.classList.remove('d-flex');
            // ARIA
            light_box.setAttribute("aria-hidden", true);
        }
        // HIDE SIDEBAR ON 1024px
        sidebar_nav.classList.remove('d-block');
        sidebar_nav.classList.add('d-none');
        // ARIA    
        menu_btn.setAttribute("aria-expanded", false);
    } else {
        topNavList.setAttribute('aria-hidden', true);
    }
}

// OUTSIDE CLICK, CLOSE IT
document.addEventListener('click', (event) => {
    // SIDEBAR
    if(event.target == sidebar_nav && !menu_btn.contains(event.target)) {
        sidebar_nav.classList.remove('d-block');
        sidebar_nav.classList.add('d-none');
        // ARIA    
        menu_btn.setAttribute("aria-expanded", false);
    }
    // CART CARD DROPDOWN
    if(!card.contains(event.target) && !cart_btn.contains(event.target)) {
        const rootStyles = getComputedStyle(document.documentElement);
        const colorGray = rootStyles.getPropertyValue('--clr-neutral-300');
        const cartIcon = cart_btn.querySelector('svg');
        card.classList.remove('d-block');
        card.classList.add('d-none');
        // ARIA
        cart_btn.setAttribute("aria-expanded", false);
        // CHANGE SVG ICON COLOR
        cartIcon.style.fill = colorGray;
    }
    // LIGHTBOX
    if (event.target === light_box) {
        if(light_box.classList.contains('d-flex')) {
            light_box.classList.add('d-none');
            light_box.classList.remove('d-flex');
            // ARIA
            light_box.setAttribute("aria-hidden", true);
        }
    }
});

// MENU BUTTON
menu_btn.addEventListener('click', (event) => {
    sidebar_nav.classList.remove('d-none');
    sidebar_nav.classList.add('d-block');
    // ARIA
    menu_btn.setAttribute("aria-expanded", true);
});

// CLOSE BUTTON
close_btn.addEventListener('click', (event) => {
    sidebar_nav.classList.remove('d-block');
    sidebar_nav.classList.add('d-none');
    // ARIA    
    menu_btn.setAttribute("aria-expanded", false);
});

// CART BUTTON
cart_btn.addEventListener('click', (event) => {
    const rootStyles = getComputedStyle(document.documentElement);
    const colorGray = rootStyles.getPropertyValue('--clr-neutral-300');
    const colorBlack = rootStyles.getPropertyValue('--clr-black');
    const cartIcon = cart_btn.querySelector('svg');

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
        card.classList.add('d-block');
        cart_btn.setAttribute("aria-expanded", true);
        // CHANGE SVG ICON COLOR
        cartIcon.style.fill = colorBlack;
    } else {
        card.classList.remove('d-block');
        card.classList.add('d-none');
        cart_btn.setAttribute("aria-expanded", false);
        // CHANGE SVG ICON COLOR
        cartIcon.style.fill = colorGray;
    }
});

// DECREASE BUTTON
minus_btn.addEventListener('click', (event) => {
    let value = parseInt(product_qty.value);
    // LIMIT DECREASE UNTIL ZERO
    if (value > 0) {
        value = value - 1;
        product_qty.value = value;
    }
});

// INCREASE BUTTON
plus_btn.addEventListener('click', (event) => {
    let value = parseInt(product_qty.value);
    value = value + 1;
    product_qty.value = value;
});

// CART

const cartCounter = document.querySelector('.cart-item-counter');

if (cardBody.childElementCount === 0) {
    const emptyCart = document.createElement('p');
    emptyCart.className = 'cart-text text-secondary fw-700';
    emptyCart.textContent = 'Your cart is empty.';
    cardBody.appendChild(emptyCart);
}

addToCartBtn.addEventListener('click', () => {
    const productQty = parseInt(product_qty.value);
    const checkOutButton = cardBody.querySelector('#checkOutBtn');

    // CART ITEM
    if(productQty > 1) {
        const addCartItem = document.createElement('div');
        addCartItem.className = 'cart-item | d-flex align-center justify-between mb-2';
        addCartItem.innerHTML = `<div class="cart-product-img">
                                    <img src="images/image-product-1-thumbnail.jpg" alt="product image">
                                </div>
                                <div class="cart-product-details">
                                    <p class="text-secondary">Fall Limited Edition Sneakers</p>
                                    <p class="text-secondary">$125.00 x ${productQty} <span class="text-dark fw-700">$${productQty * 125}</span></p>
                                </div>
                                <button type="button" class="cart-item__delete-btn">
                                    <svg width="14" height="16" class="icon-delete">
                                    <use href="images/icon-delete.svg#icon-delete" alt="delete icon"></use>
                                    </svg>
                                </button>`;
        // ADD CART ITEM BEFORE CHECK OUT BUTTON
        cardBody.insertBefore(addCartItem, checkOutButton);
    }

    // UPDATE CART COUNTER
    updateCartCounter();
    deleteCartitem();
    // CHECK OUT BUTTON
    if (!checkOutButton) {
        const addCartBtn = document.createElement('button');
        addCartBtn.type = "button";
        addCartBtn.className = 'btn | btn-primary btn-block';
        addCartBtn.id = 'checkOutBtn';
        addCartBtn.textContent = 'Checkout';
        cardBody.appendChild(addCartBtn);
    }
    // REMOVE THE EMPTY CART TEXT
    if (cardBody.childElementCount > 1) {
        const emptyCart = document.querySelector('.cart-text');
        if (emptyCart) {
            emptyCart.remove();
        }
    }
    
    // CLEAR THE QUANTITY INPUT
    product_qty.value = 0;
    // CART COUNTER
});

//UPDATE CART COUNTER
function updateCartCounter() {
    const cartItem = document.querySelectorAll('.cart-item');
    const cartItemCount = cartItem.length;
    cartCounter.textContent = cartItemCount;
}

// DELETE CART ITEM
function deleteCartitem () {
    const cartDelItem = document.querySelectorAll('.cart-item__delete-btn');
    cartDelItem.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (event) => {
            const cartItem = deleteBtn.parentNode;
            cartItem.remove();
            updateCartCounter();
            if (cardBody.childElementCount === 1) {
                const checkOutButton = document.querySelector('#checkOutBtn');
                if (checkOutButton) {
                  checkOutButton.remove();
                  const emptyCart = document.createElement('p');
                  emptyCart.className = 'cart-text text-secondary fw-700';
                  emptyCart.textContent = 'Your cart is empty.';
                  cardBody.appendChild(emptyCart);
                }
            }
        });
    });
}


// LIGHT BOX
// PRIMARY IMAGE THUMBNAILS
const primaryImageThumbnail = document.querySelectorAll('.product-img-thumbnails');
// IMAGE CONTAINERS
const primaryImage = document.querySelector('.primary-image');
const lightboxImage = document.querySelector('.secondary-image');
// IMAGES ARRAY
let images = ['image-product-1.jpg', 'image-product-2.jpg', 'image-product-3.jpg', 'image-product-4.jpg'];
// IMAGE INDEX
let i = 0;

images.forEach(image => {
    const newImage = document.createElement('div');
    newImage.className = `thumbnail primary-thumbnail`;
    newImage.innerHTML = `<img src="images/${image}" class="product-img" alt="product image thumbnail">`;
    primaryImageThumbnail[0].appendChild(newImage);
});

images.forEach(image => {
    const newImage = document.createElement('div');
    newImage.className = `thumbnail lightbox-thumbnail`;
    newImage.innerHTML = `<img src="images/${image}" class="product-img" alt="product image thumbnail">`;
    primaryImageThumbnail[1].appendChild(newImage);
});

const primary_thumbnail = document.querySelectorAll('.primary-thumbnail');
const lightbox_thumbnail = document.querySelectorAll('.lightbox-thumbnail');

// SET IMAGE ON WEBSITE LOAD
primaryImage.setAttribute('src', "images/"+images[i]);
primary_thumbnail[i].classList.add('active');
primaryImage.setAttribute('data-id', i);

// MOBILE PREVIOUS BUTTON
previous_btn[0].addEventListener('click', (event) => {
    if (i <= 0) {
        i = images.length;
    }
    i--;
    // TOGGLE ACTIVE STATE
    lightbox_thumbnail.forEach((image, value) => {
        if(image.classList.contains('active')) {
            image.classList.remove('active');
        }
    });
    primary_thumbnail.forEach((image, value) => {
        if(image.classList.contains('active')) {
            image.classList.remove('active');
        }
    });
    // SET ACTIVE STATE TO THE THUMBNAIL CORRESPONDINGLY TO THE CURRENTLY DISPLAYED IMAGE
    primary_thumbnail[i].classList.add('active');
    // SET THE IMAGE
    primaryImage.setAttribute('src', "images/"+images[i]);
    primaryImage.setAttribute('data-id', i);
});

// MOBILE NEXT BUTTON
next_btn[0].addEventListener('click', (event) => {
    if(i >= images.length-1) {
        i = -1;
    }
    i++;
    // TOGGLE ACTIVE STATE
    lightbox_thumbnail.forEach((image, value) => {
        if(image.classList.contains('active')) {
            image.classList.remove('active');
        }
    });
    primary_thumbnail.forEach((image, value) => {
        if(image.classList.contains('active')) {
            image.classList.remove('active');
        }
    });
    // SET ACTIVE STATE TO THE THUMBNAIL CORRESPONDINGLY TO THE CURRENTLY DISPLAYED IMAGE
    primary_thumbnail[i].classList.add('active');
    // SET THE IMAGE
    primaryImage.setAttribute('src', "images/"+images[i]);
    primaryImage.setAttribute('data-id', i);
});

// PRIMARY/LARGE IMAGE CLICK
primaryImage.addEventListener('click', () => {
    const currentImage = primaryImage.getAttribute('data-id');
    // CHECKS IF VIEW PORT IS ABOVE 767px WE CAN DISPLAY LIGHTBOX
    if(window.innerWidth > 767) {
        // OPEN LIGHT BOX
        light_box.classList.remove('d-none');
        light_box.classList.add('d-flex');
        // SET THE IMAGES
        lightboxImage.setAttribute('src', "images/"+images[currentImage]);
        // SET ACTIVE STATE
        lightbox_thumbnail[currentImage].classList.add('active');
        // ARIA
        light_box.setAttribute("aria-hidden", false);
    }
});


// LIGHTBOX PREVIOUS BUTTON
previous_btn[1].addEventListener('click', (event) => {
    if (i <= 0) {
        i = images.length;
    }
    i--;
    // TOGGLE ACTIVE STATE
    lightbox_thumbnail.forEach((image, value) => {
        if(image.classList.contains('active')) {
            image.classList.remove('active');
        }
    });
    primary_thumbnail.forEach((image, value) => {
        if(image.classList.contains('active')) {
            image.classList.remove('active');
        }
    });
    // SET ACTIVE STATE TO THE THUMBNAIL CORRESPONDINGLY TO THE CURRENTLY DISPLAYED IMAGE
    lightbox_thumbnail[i].classList.add('active');
    primary_thumbnail[i].classList.add('active');
    // SET THE IMAGE
    lightboxImage.setAttribute('src', "images/"+images[i]);
    primaryImage.setAttribute('src', "images/"+images[i]);
    primaryImage.setAttribute('data-id', i);
});

// LIGHTBOX NEXT BUTTON
next_btn[1].addEventListener('click', (event) => {
    if(i >= images.length-1) {
        i = -1;
    }
    i++;
    // TOGGLE ACTIVE STATE
    lightbox_thumbnail.forEach((image, value) => {
        if(image.classList.contains('active')) {
            image.classList.remove('active');
        }
    });
    primary_thumbnail.forEach((image, value) => {
        if(image.classList.contains('active')) {
            image.classList.remove('active');
        }
    });
    // SET ACTIVE STATE TO THE THUMBNAIL CORRESPONDINGLY TO THE CURRENTLY DISPLAYED IMAGE
    lightbox_thumbnail[i].classList.add('active');
    primary_thumbnail[i].classList.add('active');
    // SET THE IMAGE
    lightboxImage.setAttribute('src', "images/"+images[i]);
    primaryImage.setAttribute('src', "images/"+images[i]);
    primaryImage.setAttribute('data-id', i);
});

// PRIMARY THUMBNAIL IMAGE CLICK, OPEN LIGHT BOX
primary_thumbnail.forEach((image, value) => {
    image.addEventListener('click', () => {
        // SET ACTIVE STATE
        primaryImage.setAttribute('src', "images/"+images[value]);
        primaryImage.setAttribute('data-id', value);
        image.classList.add('active');
        // CONTROL ACTIVE STATE
        primary_thumbnail.forEach((isActive, isActiveValue) => {
            if(isActiveValue !== value && isActive.classList.contains('active')) {
                isActive.classList.remove('active');
            }
        });
        lightbox_thumbnail.forEach((isActive, isActiveValue) => {
            if(isActiveValue === value) {
                isActive.classList.add('active');
            }
        });
        lightbox_thumbnail.forEach((isActive, isActiveValue) => {
            if(isActiveValue !== value && isActive.classList.contains('active')) {
                isActive.classList.remove('active');
            }
        });
    });
});

// LIGHTBOX THUMBNAIL IMAGE CLICK
lightbox_thumbnail.forEach((image, value) => {
    image.addEventListener('click', () => {
        // SET THE IMAGES
        primaryImage.setAttribute('src', "images/"+images[value]);
        lightboxImage.setAttribute('src', "images/"+images[value]);
        primaryImage.setAttribute('data-id', value);

        // SET ACTIVE STATE
        image.classList.add('active');

        // CONTROL ACTIVE STATE
        // SET THUMBNAIL ACTIVE STATE AND DEACTIVATE OTHER THUMBNAILS
        lightbox_thumbnail.forEach((isActive, isActiveValue) => {
            if(isActiveValue !== value && isActive.classList.contains('active')) {
                isActive.classList.remove('active');
            }
        });
        // SET ACTIVE STATE FOR THE SAME THUMBNAILS THAT WAS CLICKED ON.
        primary_thumbnail.forEach((isActive, isActiveValue) => {
            if(isActiveValue === value) {
                isActive.classList.add('active');
            }
        });
        primary_thumbnail.forEach((isActive, isActiveValue) => {
            if(isActiveValue !== value && isActive.classList.contains('active')) {
                isActive.classList.remove('active');
            }
        });
    });
});

// LIGHT BOX CLOSE BUTTON
lightBoxCloseBtn.addEventListener('click', (event) => {
    if(light_box.classList.contains('d-flex')) {
        light_box.classList.add('d-none');
        light_box.classList.remove('d-flex');
        // ARIA
        light_box.setAttribute("aria-hidden", true);
    }
});