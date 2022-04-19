const prizes = {
    0: '🐕‍🦺工作',
    1: '😶聊天',
    2: '🎵听歌',
    3: '📚小说',
    4: '👀刷剧',
    5: '🥬基金',
    6: '🍪零食',
    7: '🎮游戏',
};
const total_items = 8;
const minimum_jumps = 30; // 超過這數字開始進入抽獎
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer = 0;
let prize = -1;
let nowtime = new Date(); //获取当前时间
let endtime = new Date("2022/6/30");  //定义结束时间
let lefttime = endtime.getTime() - nowtime.getTime(); //距离结束时间的毫秒数
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
    // 1. 抽到獎品停止遊戲
    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);

        swal({
            title: `距离H1 OKR结束还有`+leftd+`天`,
            text: '还不滚去干活！！！!',
            icon: 'error',
        });

        prize = -1;
        jumps = 0;
    // 2. 還沒抽繼續跑
    } else {
        // 還沒進入關鍵抽獎階段前的速度 (前菜轉特效)
        if (jumps < minimum_jumps) {
            speed -= 5; // 加快
        // 決定獎品的位置
        } else if (jumps === minimum_jumps) {
            const random_number = 1;
            prize = random_number;
        } else {
            // 下一個就是獎品時放慢鈍一下
            if ( (jumps > minimum_jumps + 10) && prize === (current_index + 1) ) {
                speed += 600;
            } else {
                speed += 20; // 減速
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