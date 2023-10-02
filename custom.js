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
  async function getGalleryImages(postId) {
    return new Promise((resolve, reject) => {
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
            const imagesData = response.data.images;
            if (
              imagesData &&
              Array.isArray(imagesData) &&
              imagesData.length > 0 &&
              imagesData[0].url
            ) {
              resolve(imagesData);
            } else {
              reject("Greška: Neispravni podaci slika iz ACF polja.");
            }
          } else {
            reject("Greška prilikom dohvatanja galerije slika.");
          }
        } else {
          reject(`Greška prilikom slanja zahteva: ${xhr.status}`);
        }
      };
      xhr.onerror = function () {
        reject("Network greška prilikom slanja zahteva.");
      };
      xhr.send();
    });
  }

  // Event listener za otvaranje modala
  document
    .querySelector(".modal-button")
    .addEventListener("click", async function () {
      try {
        const postId = this.getAttribute("data-post-id");
        const images = await getGalleryImages(postId);
        openModal(images);
      } catch (error) {
        console.error(error);
        // Ovde možeš postaviti logiku za prikazivanje korisniku da se nešto nije dobro desilo
      }
    });
});
