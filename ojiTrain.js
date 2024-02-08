document.addEventListener('DOMContentLoaded', function () {
    const ojisanImage = document.getElementById('ojisan-image');
    const currentLevel = document.getElementById('current-level');
    const currentExp = document.getElementById('current-exp');
    const totalExpPoints = document.getElementById('total-exp-points');
    const pointsDisplay = document.getElementById('points-display');
    const itemStore = document.getElementById('item-store');
    let points = parseInt(localStorage.getItem('points')) || 100; // localStorageからポイントを取得
    let exp = parseInt(localStorage.getItem('exp')) || 0; // localStorageから経験値を取得
    let totalExp = parseInt(localStorage.getItem('totalExp')) || 0; // localStorageから累計経験値を取得

    // URLパラメータからポイントの値を取得して更新
    const urlParams = new URLSearchParams(window.location.search);
    points = parseInt(urlParams.get('point') || points, 10);
    updatePointsDisplay();
    updateOjisanInfo(); // ページロード時におじさんの情報を更新

    // ホームに戻るボタン
    document.getElementById('back-to-home').addEventListener('click', function() {
        window.location.href = 'home.html?point=' + points;
    });

    function buyItem(expPoints, price, itemName) {
        if (points >= price) {
            exp += expPoints;
            totalExp += expPoints;
            points -= price;
            updateOjisanInfo();
            updatePointsDisplay();
            alert(itemName + 'を購入しました！');
        } else {
            alert('ポイントが足りません！');
        }
    }

    function updateOjisanInfo() {
        currentExp.textContent = exp;
        totalExpPoints.textContent = totalExp;
        determineLevel(exp); // レベルを決定する関数を呼び出す
        localStorage.setItem('exp', exp); // 経験値をlocalStorageに保存
        localStorage.setItem('totalExp', totalExp); // 累計経験値をlocalStorageに保存
    }

    function determineLevel(exp) {
        // レベルアップの条件
        const levels = [
            { minExp: 0, level: 1, img: 'images/おじ.png' },
            { minExp: 30, level: 2, img: 'images/おじ2.png' },
            { minExp: 100, level: 3, img: 'images/おじ3.png' },
            { minExp: 300, level: 4, img: 'images/おじ.png' },
            { minExp: 600, level: 5, img: 'images/おじ2.png' },
        ];

        const currentLevelInfo = levels.find(level => exp >= level.minExp);
        currentLevel.textContent = currentLevelInfo.level;
        ojisanImage.src = currentLevelInfo.img;
        localStorage.setItem('level', currentLevelInfo.level); // レベルをlocalStorageに保存
    }

    function updatePointsDisplay() {
        pointsDisplay.textContent = points;
        localStorage.setItem('points', points); // ポイントをlocalStorageに保存
    }

    function createItemStore() {
        const items = [
            { name: 'ビール', exp: 1, price: 1 },
            { name: 'ウイスキー', exp: 3, price: 2 },
            { name: 'ネクタイ', exp: 5, price: 3 },
            { name: 'メイド喫茶', exp: 7, price: 4 },
            { name: '革靴', exp: 9, price: 5 },
            { name: '香水', exp: 11, price: 6 },
            { name: 'スーツ', exp: 13, price: 7 },
            { name: 'キャバクラ', exp: 15, price: 8 },
            { name: 'バイク', exp: 17, price: 9 },
            { name: '車', exp: 20, price: 10 }
        ];

        items.forEach(({ name, exp, price }) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.textContent = `${name} (EXP +${exp}, ${price}ポイント)`;

            const buyButton = document.createElement('button');
            buyButton.textContent = '購入';
            buyButton.classList.add('buy-btn');
            buyButton.addEventListener('click', () => buyItem(exp, price, name));

            itemElement.appendChild(buyButton);
            itemStore.appendChild(itemElement);
        });
    }

    window.addEventListener('load', () => {
        updatePointsDisplay(); // 所持ポイント表示を更新する
        createItemStore(); // アイテムストアを生成する
    });
});
