sequenceDiagram
participant browser
participant server

    Note right of browser: El usuario escribe "Mi primer diagrama" en el campor de texto y hace clic en "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: El servidor procesa la nueva nota y la almacena en la base de datos
    server-->>browser: Redirección a /notes
    deactivate server

    Note right of browser: El navegador sigue el flujo de carga de la página /notes de nuevo

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: main.css
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: main.js
    deactivate server

    Note right of the browser: El navegador ejecuta el código JavaScript qu recupera el JSON del servidor

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data [{"content": "Mi primer diagrama", "date": "2024-12-19"}, ... ]
    deactivate server

    Note right of the browser: El navegador ejecuta la función de callback que renderiza las notas
