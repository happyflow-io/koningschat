/**
 * Koningsspelen Chatbot Widget
 * Eenvoudige integratie voor elke website
 */

(function() {
    // Configuratie
    const WIDGET_CONFIG = {
        apiUrl: 'https://koningsspelen-chat.nl', // Productie URL
        position: 'bottom-right', // bottom-right, bottom-left
        theme: 'orange', // orange, blue
        language: 'nl'
    };

    // Widget HTML
    const widgetHTML = `
        <div id="koningsspelen-chat-widget" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: 600px;
            z-index: 9999;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            background: white;
            overflow: hidden;
        ">
            <iframe 
                src="${WIDGET_CONFIG.apiUrl}"
                width="100%" 
                height="100%" 
                frameborder="0"
                title="Koningsspelen Chatbot">
            </iframe>
        </div>
    `;

    // Widget toevoegen aan pagina
    function loadWidget() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', insertWidget);
        } else {
            insertWidget();
        }
    }

    function insertWidget() {
        const container = document.createElement('div');
        container.innerHTML = widgetHTML;
        document.body.appendChild(container.firstElementChild);
        
        console.log('🎉 Koningsspelen Chatbot geladen!');
    }

    // Start widget
    loadWidget();
})();
