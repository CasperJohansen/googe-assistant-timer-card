/*
This project is very unfinished.

In its current state, it updates on its own schedule, i cannot solve the puzzle of how to make it update every second.
The code is confirmed and working in codepen.

It is use-able in its current state IMO - you are welcome to try and finish it.
https://github.com/CasperJohansen/google-assistant-timer-card
*/


class GoogleAssistantTimerCard extends HTMLElement {
    constructor() {
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
            const inputtimers = state.attributes.timers;
            var i = 1;
            var timercontainer = [];
            for (const timer of inputtimers){
                timercontainer += `
                    <div class="clockdiv">
                        <h1 class="timer_title">Timer ${i}</h1>
                        <div>
                            <span class="hours${i}"></span>
                            <div class="smalltext">Hours</div>
                        </div>
                        <div>
                            <span class="minutes${i}"></span>
                            <div class="smalltext">Minutes</div>
                        </div>
                        <div>
                            <span class="seconds${i++}"></span>
                            <div class="smalltext">Seconds</div>
                        </div>
                    </div>
                    `;
            }
            this.shadowRoot.getElementById('container').innerHTML = timercontainer;
            var i = 1;
            for (const timer of inputtimers){
                var deadline = new Date(timer.local_time_iso);
                initializeClock(this.shadowRoot, i++, deadline);
            }
            function getTimeRemaining(endtime) {
                const total = Date.parse(endtime) - Date.parse(new Date());
                const seconds = Math.floor((total / 1000) % 60);
                const minutes = Math.floor((total / 1000 / 60) % 60);
                const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
                return {
                    total,
                    hours,
                    minutes,
                    seconds
                };
                }
            function initializeClock(shadowRoot, i, endtime) {
                function updateClock(shadowRoot) {
                    var hourSpan = shadowRoot.querySelector('.hours' + i)
                    var minuteSpan = shadowRoot.querySelector('.minutes' + i)
                    var secondSpan = shadowRoot.querySelector('.seconds' + i)
                    const t = getTimeRemaining(endtime);
                    hourSpan.innerHTML = ("0" + t.hours).slice(-2);
                    minuteSpan.innerHTML = ("0" + t.minutes).slice(-2);
                    secondSpan.innerHTML = ("0" + t.seconds).slice(-2);
                    if (t.total <= 0) {
                    clearInterval(timeinterval);
                    }
                }
                updateClock(shadowRoot, i);
                const timeinterval = setInterval(updateClock(shadowRoot, i), 1000);
            }
        }
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
        .timer_title{
            color: #396;
            font-weight: 100;
            font-size: 20px;
            margin: 0px 0px 20px;
        }
        
        .clockdiv{
            font-family: sans-serif;
            color: #fff;
            display: inline-block;
            font-weight: 100;
            text-align: center;
            font-size: 30px;
            margin-bottom: 20px;
        }
        
        .clockdiv > div{
            padding: 10px;
            border-radius: 3px;
            background: #00BF96;
            display: inline-block;
        }
        
        .clockdiv div > span{
            padding: 15px;
            border-radius: 3px;
            background: #00816A;
            display: inline-block;
        }
        
        .smalltext{
            padding-top: 5px;
            font-size: 16px;
        } 
        `;

        content.id = "container";
        content.className = "container";
        card.header = config.title;
        card.appendChild(style);
        card.appendChild(content);
        root.appendChild(card);

        if (!config.entity) {
            throw new Error('You need to define an entity');
          }
    }
    // The height of the card.
    getCardSize() {
        return 3;
    }
}
customElements.define('ga-timer-card', GoogleAssistantTimerCard);