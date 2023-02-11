import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const gallery = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</div>`
  )
  .join('');

gallery.innerHTML = markup;

const onImageClick = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox
    .create(`<img src = ${event.target.dataset.source}>`, {
      onShow: instance =>
        window.addEventListener('keydown', event => {
          if (event.code === 'Escape') {
            instance.close();
          }
        }),
      onClose: instance =>
        window.removeEventListener('keydown', event => {
          if (event.code === 'Escape') {
            instance.close();
          }
        }),
    })
    .show();
};

gallery.addEventListener('click', onImageClick);
