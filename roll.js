//定義
var crit = document.getElementById("crit").value;
var rollNumber = document.getElementById("rollNumber").value;
var table = document.getElementById("result");
var arrayCrit = [];

//初期化関数
var init = () => {
	crit = document.getElementById("crit").value;
	if(crit == 0){
		crit = 10;
	}
	rollNumber = document.getElementById("rollNumber").value;
	if(rollNumber <= 0){
		rollNumber = 1;
	}
	arrayCrit = [];
	
	//結果を削除
	let rm = document.getElementsByClassName("resultList");
	let rmlen = rm.length;
	for(let i = 0;i < rmlen; i++){
		//rm.remove();
		table.removeChild(rm[0]);
	}
}

// 2d6を振り、合計を返す
var roll = () => {
	var rndDice = 0;
	for(let i = 0; i < 2; i++){
		rndDice += Math.floor( Math.random() * 6 + 1);
	}
	return rndDice;
};

// クリティカル込みで計算し、振った回数を返す
// ファンブルは0を返す
var counting = (critical) => {
	let cnt = 0;
	let dice = 0;
	do{
		dice = roll();
		cnt++;
	}while(dice >= critical);
	
	if(cnt == 1 && dice == 2){
		cnt = 0;
	}
	return cnt;
}

var compute = () =>{
	//初期化
	init();
	let i = 0;
	let rollcnt = 0;
	do{
		rollcnt = counting(crit);
		if(arrayCrit[rollcnt] == undefined){
			arrayCrit[rollcnt] = 0;
		}
		arrayCrit[rollcnt] = arrayCrit[rollcnt] + 1;
		i++;
	}while(i < rollNumber);

	arrayCrit.forEach(function(prop,index){
		let tr = document.createElement("tr");
		tr.classList.add("resultList");
		let td = [];
		td[0] = document.createElement("td");
		td[1] = document.createElement("td");
		if(index == 0){
			td[0].textContent = "ファンブル";
		}else{
			td[0].textContent = index - 1;
		}
		td[1].textContent = prop;
		tr.append(td[0],td[1]);
		table.append(tr);
	});
}
