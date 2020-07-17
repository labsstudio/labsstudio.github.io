$(document).ready(function () {
    $("#ajaxForm").submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://formcarry.com/s/6AELwTSrEXe",
        data: $(this).serialize(),
        success: (response) => {
          //Fecha o loading
          Swal.fire({
            title: 'Entraremos em contato em breve',
            text: '🎮',
            type: 'success',
          }),
            $(this)[0].reset();
        }, error: (err) => {
          // Fecha loading
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Estamos em manutenção, favor encaminhar e-mail para contato@jornadatecnologia.com'
          })
        }
      });
    });
  });