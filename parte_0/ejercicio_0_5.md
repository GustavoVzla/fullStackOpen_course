sequenceDiagram
participant browser
participant server

    Note right of browser: El usuario escribe "Mi diagram SPA" en el campo de texto y hace clic en "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: El servidor procesa la nueva nota y la guarda en la base de datos
    server-->>browser: { "message": "note created" }
    deactivate server

    Note right of server: La SPA actualiza la lista de notas sin recargar la página

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Mi diagrama SPA", "date": "2024-12-25" }, ... ]
    deactivate server

    Note right of browser: El navegador ejecuta la función de callback que renderiza las nuevas notas
