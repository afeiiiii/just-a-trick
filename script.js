const prizes = {
    0: 'ðâð¦ºå·¥ä½',
    1: 'ð¶èå¤©',
    2: 'ðµå¬æ­',
    3: 'ðå°è¯´',
    4: 'ðå·å§',
    5: 'ð¥¬åºé',
    6: 'ðªé¶é£',
    7: 'ð®æ¸¸æ',
};
const total_items = 8;
const minimum_jumps = 30; // è¶ééæ¸å­éå§é²å¥æ½ç
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer = 0;
let prize = -1;
let nowtime = new Date(); //è·åå½åæ¶é´
let endtime = new Date("2022/6/30");  //å®ä¹ç»ææ¶é´
let lefttime = endtime.getTime() - nowtime.getTime(); //è·ç¦»ç»ææ¶é´çæ¯«ç§æ°
let leftd = Math.floor(lefttime/(1000*60*60*24));

function runCircle() {
    $(`[data-order="${current_index}"]`).removeClass('is-active');

    current_index += 1;

    if (current_index > total_items - 1) {
        current_index = 0;
    }

    $(`[data-order="${current_index}"]`).addClass('is-active');
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * total_items);
}

function controllSpeed() {
    jumps += 1;
    runCircle();
    // 1. æ½å°çååæ­¢éæ²
    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);

        swal({
            title: `è·ç¦»H1 OKRç»æè¿æ`+leftd+`å¤©`,
            text: 'è¿ä¸æ»å»å¹²æ´»ï¼ï¼ï¼!',
            icon: 'error',
        });

        prize = -1;
        jumps = 0;
    // 2. éæ²æ½ç¹¼çºè·
    } else {
        // éæ²é²å¥ééµæ½çéæ®µåçéåº¦ (åèè½ç¹æ)
        if (jumps < minimum_jumps) {
            speed -= 5; // å å¿«
        // æ±ºå®çåçä½ç½®
        } else if (jumps === minimum_jumps) {
            const random_number = 1;
            prize = random_number;
        } else {
            // ä¸ä¸åå°±æ¯çåææ¾æ¢éä¸ä¸
            if ( (jumps > minimum_jumps + 10) && prize === (current_index + 1) ) {
                speed += 600;
            } else {
                speed += 20; // æ¸é
            }
        }
        if (speed < 40) {
            speed = 40;
        }

        timer = setTimeout(controllSpeed, speed);
    }
}

function init() {
    jumps = 0;
    speed = 100;
    prize = -1;
    controllSpeed();
}

$(document).ready(() => {
    $('#js-start').on('click', init);
});