const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const closeBtn = document.getElementById('close');

let images = [];
let currentIndex = 0;

// ✅ Stable API images 
function loadImages() {
  for (let i = 0; i < 8; i++) {
    const url = `https://picsum.photos/400/${300 + Math.floor(Math.random()*200)}?random=${i}`;

    images.push({
      src: url,
      caption: `Beautiful Image ${i + 1}`
    });

    const img = document.createElement('img');
    img.src = url;

    // ❌ broken image remove
    img.onerror = () => img.remove();

    img.addEventListener('click', () => openLightbox(i));

    gallery.appendChild(img);
  }
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.style.display = "flex";
}

function updateLightbox() {
  lightboxImg.src = images[currentIndex].src;
  caption.innerText = images[currentIndex].caption;
}

// Next / Prev
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
};

// Close
closeBtn.onclick = () => lightbox.style.display = "none";

// Click outside = close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Swipe 
let startX = 0;

lightbox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) nextBtn.click();
  if (endX - startX > 50) prevBtn.click();
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});

// Init
loadImages();