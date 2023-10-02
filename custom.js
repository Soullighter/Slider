document.addEventListener("DOMContentLoaded", function () {
  // Selektuj dugme sa klasom "modal-button"
  const modalButtons = document.querySelectorAll(".modal-button");

  // Dodaj event listener za svako dugme
  modalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Dobavi ID posta iz data atributa
      const postId = this.getAttribute("data-post-id");

      // Otvori modal ili uradi nešto drugo sa ID-om posta
      // Ovde možeš dodati logiku za prikazivanje modala ili izvršavanje drugih akcija
      // Na primer, možeš koristiti AJAX za dohvat dodatnih informacija o postu i prikazivanje u modalu
      // Nakon što završiš sa prikazivanjem informacija, zatvori modal.
    });
  });
});
