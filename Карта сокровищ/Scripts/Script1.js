"use strict"
let a1=1, a2=0, a3=0, a4=0, a5=0, a6=0;
let protagonist = {
		name:'',
		health:0,
		damage:0,
		speech:0,
		money:10
};

const WARRIOR = {
		health:100,
		damage:50,
		speech:20
};
const WIZARD = {
		health:20,
		damage:100,
		speech:50
};
const LIAR = {
		health:50,
		damage:20,
		speech:100
};
const PIRATE = {
		health:75,
		damage:20,
		speech:45,
		money:10,
		desc:'Вы встречаете разбойника. Его лицо покрыто шрамами, а на поясе висит огромадный тесак с зазубринами.',
		dialogue:'Оттдавай деньги! - кричит он.',
		speechScs:'Вам удалось уговорить разбойника.',
		speechFal:'Вам не удалось уговорить разбойника.',
		death:'Ааааааааааааа - кричит разбойник в агонии.'
};
const GANG = {
		health:1000,
		damage:1000,
		speech:95,
		money:100,
		desc:'Вас окружила целая банда. Человек 20 амбалов с огромными мечами.',
		dialogue:'Они хотят только одного - ваш курдюк. С золотом.',
		speechScs:'Вам удалось договориться с бандой.',
		speechFal:'Вам не удалось договориться с бандой.',
		death:'Вряд-ли это возможно.'
};


function meetSomeone (someone){
	let check=0;
	alert(someone.desc);
	alert(someone.dialogue);
	while (check==0){
		let choice=+prompt('1 - драться, 2 - договориться, 3 - бежать');
		switch(choice){
			case 1:
				check=1;
				fight(protagonist,someone);
				break;
			case 2:
				check=1;
				negotiation(protagonist,someone);
				break;
			case 3:
				check=1;
				run();
				break;
			default:
				showWronginput();
		}
	}
}


function showRestricted(){
	alert('Недоступно!');
}
function showCompleted(){
	alert('Пройдено!');
}
function showWronginput(){
	alert('Недопустимый ввод!');
}
function showHowlazyIam(){
	alert('Тут должен быть сценарий, но у сценариста закончились идеи(');
}
function showThanks(){
	alert('Спасибо за игру!');
}


function Oasis(){
	let choice=prompt('После долгого скитания по пустыне вы видите перед собой прекрасный оазис. Хотите попить из него?','Да');
	if (choice=='Да'){
		let rnd=Math.random();
		if (rnd>=0.5){
			getHealthpoints(-20);
			alert('Свежая вода из источника восстанавливает вам немного здоровья');
		}
		else {
			getHealthpoints(-20);
			alert('Источник оказался отравленным. Вы чувствуете, как яд разъедает ваши потроха.')
			if (protagonist.health<0){
				Death();
			}
		}
	}
	else {
		alert('Вы проходите мимо источника, с тоской глядя на водную гладь.')
	}
}


function Death(){
	alert('Вы погибли! Вот так - бесславно и глупо закончилось ваше приключение. Ваши останки разорвут дикие животные, ваше имя так и останется никому не известным.');
	a1=0;
	a2=0;
	a3=0;
	a4=0;
	a5=0;
}	


function getHealthpoints(points){
	protagonist.health-=points;
}


function getMoney(money){
	protagonist.money+=money;
	alert(`Вы нашли сокровище!Теперь у вас ${protagonist.money} золота!`)
}


function attack(attacker, attacked){
	attacked.health-=attacker.damage;
}


function run(){
	alert('Вы решили сбежать. В спину вам прилетает кинжал и наносит 15 урона.');
	getHealthpoints(15);
	if (protagonist.health<0){
		Death();
	}
	else {
		alert('Вы остались живы (лишняя дырка в спине не в счет) и сбежали.')
	}

}


function fight(fighter1, fighter2){
	while(fighter1.health>0&&fighter2.health>0){
		attack(fighter1,fighter2);
		if (fighter2.health>0){
			attack(fighter2,fighter1);
		}
	}
	(fighter1.health<=0)?Death():alert(`${fighter2.death} - Вы победили в бою`);
}


function negotiation(talker1,talker2){
	if (talker1.speech>talker2.speech){
		alert(talker2.speechScs);
	}
	else {
		alert(talker2.speechFal);
		alert('Придется драться!')
		fight(talker1,talker2);
	}
}


function startGame(){
	alert('Поехали!');
	let check=0;
	let name=String(prompt('Введите имя персонажа','Лузер'));
	protagonist.name=name;
	while (check==0){
		let cLass=+prompt('Выберите из класс персонажа : 1 - воин, 2 - маг, 3 - жулик');
		switch (cLass){
			case 1:
				check=1;
				protagonist.health=WARRIOR.health;
				protagonist.damage=WARRIOR.damage;
				protagonist.speech=WARRIOR.speech;
				break;
			case 2:
				check=1;
				protagonist.health=WIZARD.health;
				protagonist.damage=WIZARD.damage;
				protagonist.speech=WIZARD.speech;
				break;
			case 3:
				check=1;
				protagonist.health=LIAR.health;
				protagonist.damage=LIAR.damage;
				protagonist.speech=LIAR.speech;
				break;
			default:
				showWronginput();
		}
	}
	
}


function locationOne(){
	if (a1==0){
		showRestricted();
	}
	else if (a1==1){
		startGame();
		a2=1;
		a1=2;
	}
	else {
		showCompleted();
	}
}


function locationTwo(){
	if (a2==0){
		showRestricted();
	}
	else if (a2==1) {
		a3=1;
		a2=2;
		meetSomeone(PIRATE);
	}
	else {
		showCompleted();
	}
}


function locationThree(){
	if (a3==0){
		showRestricted();
	}
	else if (a3==1) {
		a4=1;
		a3=2;
		meetSomeone(GANG);
	}
	else {
		showCompleted();
	}
}


function locationFour(){
	if (a4==0){
		showRestricted();
	}
	else if (a4==1) {
		a5=1;
		a4=2;
		Oasis();

	}
	else {
		showCompleted();
	}
}


function locationFive(){
	if (a5==0){
		showRestricted();
	}
	else if (a5==1) {
		a6=1;
		a5=2;
		showHowlazyIam();
	}
	else {
		showCompleted();
	}
}


function locationSix(){
	if (a6==0){
		showRestricted();
	}
	else if (a6==1) {
		a6=2;
		getMoney(5000);
		showThanks();
	}
	else {
		showCompleted();
	}
}
