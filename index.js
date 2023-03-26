// ******************* Toggle cart box ******************* //
// access cart elements from DOM
const cartIcon = document.getElementById('cart-icon'),
cartBox = document.getElementById('cart-box')


cartIcon.addEventListener('click', () => {
    cartBox.classList.toggle('hidden')
})




//*****************************************************************************************
// ********************** Add and Remove products from the cart ******************* //

const minusBtn = document.getElementById('minus-btn')
const plusBtn = document.getElementById('plus-btn')
const productNumber = document.getElementById('number')
const addCartBtn = document.getElementById('add-to-cart')
const productPrice = document.getElementById('product-price')
const cartItems = document.getElementById('cart-items')
const cartCounter = document.getElementById('cart-counter')
const deleteBtn = document.querySelector('.delete_icon')


let number = parseInt(productNumber.textContent)
let count = 0

// increment number and show it to the DOM
plusBtn.addEventListener('click', () => {
    number++
    productNumber.textContent = number
})

// decrement number and show it to the DOM
minusBtn.addEventListener('click', () => {
    if(number > 0) {
        number--
        productNumber.textContent = number
    }
})


// add product to the cart when click on the "add to cart" button
addCartBtn.addEventListener('click', () => {
    if(number == 0) {
        cartCounter.classList.add('hidden')
        cartItems.innerHTML = 
        `<div class="cart-empty">
        <p>Your cart is empty.</p>
      </div>`
    } else {
   let priceNum = Number(productPrice.textContent.substring(1))
   
   const totalPrice = priceNum * number
   
// show product price details and the total price to the dom
   cartItems.innerHTML = 
   `<div class="cart-item">
    <img src="images/image-product-1-thumbnail.jpg" alt="product_imgae" class="cart-item_img">
        <div class="cart-item-details">
          <p class="cart-item-title">Fall Limited Edition Sneakers</p>
          <p class="cart-item-price-count">$125.00 x ${number} <span class="total-price">$${totalPrice}</span>
          </p>
        </div>
        <img src="images/icon-delete.svg" alt="delete_icon.svg" class="delete_icon">
   </div>
   <button class="checkout-btn">Checkout</button>
   `

   cartCounter.textContent = number
   cartCounter.classList.remove('hidden')


  // remove the added products from the cart    
  const deleteBtn = document.querySelector('.delete_icon')
   deleteBtn.addEventListener('click', () => {
    number = 0
    productNumber.textContent = 0
    cartItems.innerHTML = 
        `<div class="cart-empty">
        <p>Your cart is empty.</p>
      </div>`
      cartCounter.classList.add('hidden')
   })
    }
})



//*********************************************************************
// ********************** THUMBNAIL IMAGE *********************** //
const thumbnailContainer = document.getElementById('thumbnail-container')
const largeImage = document.getElementById('large-image')
const smallImages = document.querySelectorAll('#small-image')


thumbnailContainer.addEventListener('click', (e) => {
   
    let target = e.target.closest('#small-image')

    if(!target) return    // only small images should work on click or the function stops executing
    
    // get the image source of every thumbnail image
    image_src = target.children[0].src 
    
    // remove the word 'thumbnail' from small images source name so that every image shows on large image container
    largeImage.src = image_src.replace('-thumbnail', '')
    
    // highlight thumbnail images on click
    smallImages.forEach(image => {
        image.classList.remove('selected')
    })
    target.classList.add('selected')
})



//******************************************************************
// ******************* MOBILE MENU TOGGLE ******************* //
const menuBtn = document.getElementById('menu-icon')
const closeBtn = document.querySelector('.close_icon')
const nav = document.getElementById('nav')
const mobile_overlay = document.querySelector('.mobile_overlay')


// open menu
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open')
    mobile_overlay.classList.add('active')
    document.body.style.overflow = "hidden"
})

// close menu
closeBtn.addEventListener('click', () => {
    if(nav.classList.contains('open')) {
        nav.classList.remove('open')
        mobile_overlay.classList.remove('active')
        document.body.style.overflow = ""
    } else {
        nav.classList.add('open')
    }
})




//******************************************************************
// ************* IMAGE CAROUSEL ON MOBILE DEVICE ************** //
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const image = document.getElementById('large-image')

let i = 1
const img1 = 1, img2 = 2, img3 = 3, img4 = 4

nextBtn.addEventListener('click', () => {
    if(i === 1) {
        image.src = `images/image-product-${img2}.jpg`
        i++
    } else if (i === 2) {
        image.src = `images/image-product-${img3}.jpg`
        i++
    } else if (i === 3) {
        image.src = `images/image-product-${img4}.jpg`
        i++
    } else if (i === 4) {
        image.src = `images/image-product-${img1}.jpg`
        i = 1
    }
    
})

prevBtn.addEventListener('click', () => {
    if(i === 1) {
        image.src = `images/image-product-${img4}.jpg`
        i = 4
    } else if (i === 2) {
        image.src = `images/image-product-${img1}.jpg`
        i--
    } else if (i === 3) {
        image.src = `images/image-product-${img2}.jpg`
        i--
    } else if (i === 4) {
        image.src = `images/image-product-${img3}.jpg`
        i--
    }
    
})



//******************************************************************
// ************* LIGHTBOX ************** //
const lightbox = document.querySelector('.lightbox')
const closeIconImg = document.querySelector('.lightbox__close-container')
const lightbox_prevBtn = document.querySelector(".icon_img--left")
const lightbox_nextBtn = lightbox.querySelector(".icon_img--right")
const lightbox_small_images = lightbox.querySelectorAll('#lightbox-small')
const lightbox_large_images = document.querySelectorAll(".lightbox__large-image")
const overlay = document.querySelector('.overlay')
let lightboxSlideIndex = 1

// Open lightbox
largeImage.addEventListener('click', () => {
    if(lightbox.classList.contains('hide')) {
       lightbox.classList.remove('hide')
       overlay.style.display = "block"
       document.body.style.overflow = "hidden"
    } else {
     lightbox.classList.add('hide')
     overlay.style.display = "none"
     document.body.style.overflow = ""
    }
 })
 
 // close lightbox
 closeIconImg.addEventListener('click', () => {
     lightbox.classList.add('hide')
     overlay.style.display = "none"
     document.body.style.overflow = ""
 })


// disable lightbox on smaller devices
const media700 = window.matchMedia('(max-width: 700px)')

function disableLightbox() {
    if(media700.matches) {
        lightbox.classList.add('hide')
        overlay.style.display = "none"
    }
}
disableLightbox(media700)
media700.addEventListener('change', () => {
    disableLightbox()
})



// **** Lightbox carousel
showSlides(lightboxSlideIndex)

// next controls
lightbox_nextBtn.addEventListener('click', () => {
    showSlides(lightboxSlideIndex += 1)
})

// prev controls
lightbox_prevBtn.addEventListener('click', () => {
    showSlides(lightboxSlideIndex += -1)
})

// Thumbnail image controls
function currentSlide(n) {
    showSlides(lightboxSlideIndex = n)
}


function showSlides(n) {
    if(n > lightbox_large_images.length) {lightboxSlideIndex = 1}
    if(n < 1) {lightboxSlideIndex = lightbox_large_images.length}
    lightbox_large_images.forEach((image) => {
        image.style.display = "none"
    })
    lightbox_small_images.forEach((small)  => {
        small.className = small.className.replace(" active", "")
    })
    lightbox_large_images[lightboxSlideIndex-1].style.display = "block";
    lightbox_small_images[lightboxSlideIndex-1].className += " active";
}






