window.onload=function(){
    let alphabets=document.querySelectorAll('.text');
    let Category=document.querySelector('.Category');
    let CategoryName=document.querySelector('.CategoryName');
    let lives=document.querySelector('.lives');
    let Clue=document.querySelector('.Clue-');
    let HangMan=document.querySelectorAll('.live');
    let Hint=document.querySelector('.Hint');
    let PlayAgain=document.querySelector('.PlayAgain');
    let categorieNames=[
        'Premier League Football Teams',
        'Films',
        'Cities'
    ]
    let categories=[
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];
    let hints=[
        ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];
    let ChoseCategory;
    let resultNumber;
    let reset=function(){
        CategoryName.textContent='';
        alphabets.forEach(function(key){
            key.style.opacity=1;
        })
        ChoseCategory=Math.floor(Math.random()*categories.length);
        Category.textContent=categorieNames[ChoseCategory];
        resultNumber=Math.floor(Math.random()*categories[ChoseCategory].length);
        let result=categories[ChoseCategory][resultNumber];
        for (let i=0; i<result.length;i++){
            if (result[i]=='-') CategoryName.textContent=CategoryName.textContent+'-';
            else CategoryName.textContent=CategoryName.textContent + '_';
        };
        lives.textContent='10';
        lives.previousSibling.textContent='You have ';
        lives.nextSibling.textContent=' lives';
        HangMan.forEach(function(key){
            key.style.display='none';
        })
        Clue.textContent='Clue-';
    }
    let ChoseText=function(event){
        let check=false;
        let text=event.target;
        if (text.style.opacity==='0.4') return;
        text.style.opacity='0.4';
        for(let i=0;i<categories[ChoseCategory][resultNumber].length;i++){
            if (text.textContent===categories[ChoseCategory][resultNumber][i]){
                let Name=CategoryName.textContent.split('');
                Name[i]=text.textContent;
                CategoryName.textContent=Name.join('');
                check=true;
            }
        }
        if ((check===false)&&(lives.textContent!=="0")&&(lives.textContent!=='You Win!')&&(lives.textContent!=='Game Over')) {
            lives.textContent=Number(lives.textContent)-1;
            HangMan[9-Number(lives.textContent)].style.display='block';
            if (Number(lives.textContent)===0) {
                lives.textContent='Game Over';
                lives.previousSibling.textContent='';
                lives.nextSibling.textContent='';
            }
        }
        if ((CategoryName.textContent===categories[ChoseCategory][resultNumber])&&(lives.textContent!=='Game Over')){
            lives.textContent='You Win!';
            lives.previousSibling.textContent='';
            lives.nextSibling.textContent='';
        }
    }
    let getHint=function(){
        Clue.textContent=`Clue: - ${hints[ChoseCategory][resultNumber]}`;
    }
    PlayAgain.addEventListener('click',reset);
    alphabets.forEach(function(key){
        key.addEventListener('click',ChoseText);
    })
    Hint.addEventListener('click',getHint);
    reset();
}