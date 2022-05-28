import $ = require('jquery');
import Accent from './accent';
import handleInput from './handleInput';
import scrollTop from './scrollTop';
import handleBtnPress from './handleBtnPress';
import handelMobile from './handleMobile';
import changeThemeStyle from './changeThemeStyle';


export default function init() {
    $("body").append(`
    <header class="unselectable">
        <h2>Наголос<span>И</span></h2>
    </header>
    <div class="history">
        <button>Fuck off</button>
        <div></div>
    </div>

    <div class="container">
        <div class="accent unselectable">
        </div>
        <div class="extraInfo"></div>
        <div class="menu unselectable">
            <button class="newBtn">new</button>
            <button class="correctBtn">correct</button>
            <button class="statisticsBtn">statistics</button>
            <div class="switch-button">
                <input class="switch-button-checkbox" type="checkbox"></input>
                <label class="switch-button-label" for=""><span class="switch-button-label-span">Unique Words</span></label>
            </div>
          

        </div>
    </div>
    <div class="wordList">
        <label class="field field_v1">
            <input class="field__input" placeholder="e.g. Спина">
            <span class="field__label-wrap">
                <span class="field__label">Find word</span>
            </span>
        </label>
        <div id="info">
            <h1>Words</h1>
        </div>
    </div>
    `);

    const accent = new Accent();
    handleInput();
    scrollTop();
    handleBtnPress();
    handelMobile();
    // changeThemeStyle();
}