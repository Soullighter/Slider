document.addEventListener("DOMContentLoaded", function () {
  // Definišemo images van funkcije getGalleryImages kako bi bilo globalno dostupno
  let images = [];

  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modal-content");
  const closeBtn = document.querySelector(".close");
  const mainImage = document.getElementById("mainImage");
  const thumbnailsContainer = document.querySelector(".thumbnails");
  const arrows = document.querySelectorAll(".arrow");
  let currentIndex = 0;

  // Funkcija za otvaranje modala sa slikama
  function openModal(images) {
    modal.style.display = "block";
    showImage(currentIndex, images);
  }

  // Funkcija za prikazivanje određene slike
  function showImage(index, images) {
    mainImage.src = images[index].url;
    thumbnailsContainer.innerHTML = "";
    images.forEach((image, i) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = `thumbnail ${i === index ? "active" : ""}`;
      thumbnail.innerHTML = `<img src="${image.url}" alt="Thumbnail ${i + 1}">`;
      thumbnail.addEventListener("click", () => showImage(i, images));
      thumbnailsContainer.appendChild(thumbnail);
    });
  }

  // Funkcija za zatvaranje modala
  function closeModal() {
    modal.style.display = "none";
  }

  // Dodaj event listenere za strelice
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", function () {
      if (this.classList.contains("left")) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      } else {
        currentIndex = (currentIndex + 1) % images.length;
      }
      showImage(currentIndex, images);
    });
  });

  // Dodaj event listenere za zatvaranje modala
  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // AJAX zahtev za dohvatanje slika iz ACF polja 'extended-gallery'
  function getGalleryImages(postId) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `/wp-admin/admin-ajax.php?action=get_gallery_images&post_id=${postId}`,
      true
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          const images = response.data.images;
          openModal(images);
        } else {
          console.error("Greška prilikom dohvatanja galerije slika.");
        }
      }
    };
    xhr.send();
  }

  // Event listener za otvaranje modala
  document
    .querySelector(".modal-button")
    .addEventListener("click", function () {
      const postId = this.getAttribute("data-post-id");
      // Postavljamo vrednost images unutar callback-a funkcije
      getGalleryImages(postId, function (data) {
        images = data;
        openModal(images);
      });
    });
});
