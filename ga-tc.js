


class GoogleAssistantTimerCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    set hass(hass) {
        const config = this.config;
        const entityId = config.entity;

        if(entityId){
            const state = hass.states[entityId];
            console.log(state);
            console.log(state.attributes);
            console.log(state.attributes.timers);
            var stateStr = state ? state.state : "Unavailable";
                if (stateStr == "Unavailable") {
                    //no timer set
                } else {
                    var _timer = new Date(stateStr);
                }
        }

        console.log(_timer);
    }
    setConfig(config) {
        const root = this.shadowRoot;
        if (root.lastChild) root.removeChild(root.lastChild);

        this.config = config;

        const card = document.createElement('ha-card');
        const content = document.createElement('div');
        const style = document.createElement('style')

        style.textContent = `
            .container {
                padding: 5px 5px 5px;
                display:flex;
                flex-flow: row wrap;
                justify-content: space-around;
                align-items: flex-start;
            }
            .clock {
                
                padding: 5px 5px 5px 0px;
                margin: auto;
            }
            .other_clocks {
                float: right;
                margin: auto;
            }
            .otime {
                padding: 0px 5px 2px;
                font-size: 14px;
                font-family: var(--paper-font-headline_-_font-family);
                letter-spacing: var(--paper-font-headline_-_letter-spacing);
                text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            }
            .tz_locale {
                padding: 0px 5px 1px;
                color: var(--secondary-text-color);
                font-size: 11px;
                font-family: var(--paper-font-headline_-_font-family);
                letter-spacing: var(--paper-font-headline_-_letter-spacing);
                text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            }     
            .time {
                padding: 
                font-family: var(--paper-font-headline_-_font-family);
                -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
                font-size: 56px;
                font-weight: var(--paper-font-headline_-_font-weight);
                letter-spacing: var(--paper-font-headline_-_letter-spacing);
                line-height: 1em;
                text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            }
            .date {
                font-family: var(--paper-font-headline_-_font-family);
                -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
                font-size: 24px;
                font-weight: var(--paper-font-headline_-_font-weight);
                letter-spacing: var(--paper-font-headline_-_letter-spacing);
                line-height: var(--paper-font-headline_-_line-height);
                text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            }          
        `;
    
        content.id = "container";
        content.className = "container";
        card.header = config.title;
        card.appendChild(style);
        card.appendChild(content);
        
        root.appendChild(card);
    }
    // The height of the card.
    getCardSize() {
        return 3;
    }
}

customElements.define('ga-timer-card', GoogleAssistantTimerCard);
