document
  .getElementById("container-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const userInput = document.getElementById("username");
    const messageInput = document.getElementById("message");

    const user = userInput.value;
    const message = messageInput.value;

    try {
      const response = await fetch("/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, message }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const successMessage = responseData.message;

        console.log("\u001b[1;35m Mensaje Enviado").then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });

        userInput.value = "";
        messageInput.value = "";
      } else {
        console.error("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  });
