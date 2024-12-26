sequenceDiagram
participant browser
participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML of the spa
    deactivate server

    Note right of browser: El navegador carga el documento HTML de la SPA

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: main.css
    deactivate server

    browser->>server: GET GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: spa.js
    deactivate server

    Note right of browser: El navegador ejecuta el código JavaScript de la SPA

    browser->>server: GET GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "SPA note", "date": "2024-12-23" }, ... ]
    deactivate server

    Note right of browser: El navegador ejecuta el función de callback que renderiza las notas de la SPA
