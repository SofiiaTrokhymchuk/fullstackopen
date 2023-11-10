```mermaid
sequenceDiagram
    actor user
    participant browser
    participant server

    user->>browser: write new note and click 'Save' button

    browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server-->>-browser: {"message":"note created"}
```
