// おじさん育成画面のスクリプト
const ojisanImage = document.getElementById('ojisan-image');
const currentLevel = document.getElementById('current-level');
const currentExp = document.getElementById('current-exp');
const requiredExp = document.getElementById('required-exp');
const totalExpPoints = document.getElementById('total-exp-points');
const pointsDisplay = document.getElementById('points-display'); // 所持ポイントを表示する要素を追加
const itemStore = document.getElementById('item-store');
let points = 100;
let exp = 0;
let totalExp = 0;

// アイテムを購入する関数
function buyItem(expPoints, price) {
    if (points >= price) {
        exp += expPoints;
        totalExp += expPoints;
        updateOjisanInfo();
        points -= price; // 購入に必要なポイントを所持ポイントから減算する
        updatePointsDisplay(); // 所持ポイント表示を更新する
    } else {
        alert('ポイントが足りません！');
    }
}

// おじさん情報を更新する関数
function updateOjisanInfo() {
    currentExp.textContent = exp;
    totalExpPoints.textContent = totalExp;
    if (exp >= 30 && exp < 100) {
        currentLevel.textContent = '2';
        ojisanImage.src = 'images/level2.jpg';
        requiredExp.textContent = '100';
    } else if (exp >= 100 && exp < 300) {
        currentLevel.textContent = '3';
        ojisanImage.src = 'images/level3.jpg';
        requiredExp.textContent = '300';
    } else if (exp >= 300 && exp < 600) {
        currentLevel.textContent = '4';
        ojisanImage.src = 'images/level4.jpg';
        requiredExp.textContent = '600';
    } else if (exp >= 600) {
        currentLevel.textContent = '5';
        ojisanImage.src = 'images/level5.jpg';
        requiredExp.textContent = '---';
    }
}

// ポイント表示を更新する関数
function updatePointsDisplay() {
    pointsDisplay.textContent = points;
}

// アイテムストアを生成する関数
function createItemStore() {
    const items = [
        { exp: 1, price: 1 },
        { exp: 3, price: 2 },
        { exp: 5, price: 3 },
        { exp: 7, price: 4 },
        { exp: 9, price: 5 },
        { exp: 11, price: 6 },
        { exp: 13, price: 7 },
        { exp: 15, price: 8 },
        { exp: 17, price: 9 },
        { exp: 20, price: 10 }
    ];

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.textContent = `アイテム${item.exp} (${item.price}ポイント)`;
        itemElement.dataset.exp = item.exp;

        const buyButton = document.createElement('button'); // 購入ボタンを作成
        buyButton.textContent = '購入';
        buyButton.classList.add('buy-btn');
        buyButton.addEventListener('click', () => {
            buyItem(item.exp, item.price); // アイテムを購入する関数を呼び出す
        });

        itemElement.appendChild(buyButton); // アイテム要素に購入ボタンを追加
        itemStore.appendChild(itemElement);
    });
}

// ページロード時の処理
window.addEventListener('load', () => {
    updatePointsDisplay(); // 所持ポイント表示を更新する
    createItemStore();
});
