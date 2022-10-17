


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
            const stateStr = state ? state.state : "Unavailable";
            if (stateStr == "Unavailable") {
                //no timer set
            } else {
                var _timer_end = new Date(stateStr);
            }
        }

        if (_timer_end == "Invalid Date") {
            throw new Error("Invalid date. Ensure its a ISO Date")
        }

        console.log(state);
        console.log(stateStr);
    }
}