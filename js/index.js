const images = ["bau", "cua", "tom", "ca", "huou", "ga"];

const mainGame = document.querySelector('.main-game');
const btnquay = document.querySelector('.quay');
const btndatlai = document.querySelector('.datlai');
const resultImgs =[
    document.getElementById('result1'),
    document.getElementById('result2'),
    document.getElementById('result3')
];


let isSpinning = false;

let betScores = {
    bau: 0,
    cua: 0,
    tom: 0,
    ca: 0,
    huou: 0,
    ga: 0
 };

 //dat cuoc
mainGame.addEventListener('click',function(e){
    if (isSpinning) return;
    const betItem= e.target.closest('.bet-item');
    if(!betItem) return;
    const name= betItem.getAttribute('data-name');

    let total= Object.values(betScores).reduce((sum,val) => sum+val,0);
    if (total >= 3){
        return;
    }

    betScores[name]++;
    betItem.querySelector('.bet-score').textContent = betScores[name];
});

//dat cuoc lai
btndatlai.onclick = function() {
    if (isSpinning) return;

for (let k in betScores){
    betScores[k] = 0;
}

document.querySelectorAll('.bet-score').forEach((span) =>{
    span.textContent ='0';
});

};



//quay
btnquay.onclick= function(){
    if (isSpinning) return;
    
    isSpinning = true;

    btnquay.classList.add('cannotuse');
    btndatlai.classList.add('cannotuse');
    mainGame.classList.add('cannotuse');

    let finalResults =[];
    let doneCount= 0;

    for (let i =0; i < 3; i++) {

        let spinCount = 0;

        let interval = setInterval(()=>{
            spinCount++;

            let randomImg = images[Math.floor(Math.random()*6)];

            resultImgs[i].src=`picture/${randomImg}.png`;

            if (spinCount >=100){
                clearInterval(interval);
                finalResults[i] = randomImg;
                doneCount++;

                if (doneCount === 3){
                    dungquay(finalResults);
                }
            }
        },50);
    };
}

function dungquay(finalResults) {
    isSpinning = true;
    btnquay.classList.remove('cannotuse');
    btndatlai.classList.remove('cannotuse');
    mainGame.classList.remove('cannotuse');

    let quayresult = {
        bau:0,
        cua:0,
        tom:0,
        ca: 0,
        ga: 0,
        huou: 0,
    };

    
    finalResults.forEach(res => {
        quayresult[res]++;
    });

    var isCorrect = true;
    for (let k in betScores){
        if (betScores[k] != quayresult[k]){
            isCorrect = false;
            break;
        }
    }

    // bien luu ket qua quay
    let resultString = '';
    for (let i = 0; i < finalResults.length; i++){
        if (i > 0) {
        resultString += ",";
        resultString += finalResults[i];                         
    }
}
    

    //bien luu ket qua cuoc
    userBets= [];
    for (let k in betScores){
        if (betScores[k]>0){
            userBets.push(`${k}: ${betScores[k]}`)
        }
    }
    userBetsString = '';
    for(let i = 0; i < finalResults.length; i++){
        if (i > 0){
            userBetsString += ","; 
        }

            userBetsString += userBets[i];
        }
    

    if (isCorrect){
        console.log(`Bạn đã đoán đúng với kết quả:`+resultString);

    }
    else {
        console.log(`Bạn đã đoán sai với kết quả:`+ userBetsString);
    }
    setTimeout(resetAll,3000);

};
    

btndatlai.addEventListener('click',resetAll);

function resetAll(){
    for (let key in betScores){
        betScores[key] = 0;

    }
    document.querySelectorAll('.bet-score').forEach(span=>{
        span.textContent ='0';
    })
    isSpinning = false;
    btnquay.classList.remove('cannotuse');
    btndatlai.classList.remove('cannotuse');
    mainGame.classList.remove('cannotuse');
    
};




