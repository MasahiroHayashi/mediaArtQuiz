
let forGameData_maxNum = 3212 ; // グローバル変数（11/22現在は5083だったのでそれを初期値に）

//////////////////////////////////////////////////////////////////////////////////////////////
//最初にゲームクイズ用 forGameData_maxNum を取得  ///////////////////
function getMaxNumForGame() {
    //クエリ文字列をセット
    let query =  'PREFIX schema: <https://schema.org/> ';
        query += 'select (count(?s) as ?count)';
        query += ' where { ?s schema:genre "ゲーム作品" ; ';
        query += ' schema:datePublished  ?time ; ';
        query += ' schema:keywords  ?gameGenre . }';
    getMaxNumForGame2(query,'https://mediag.bunka.go.jp/sparql',"POST") ; //スパークルクエリ送信
}
function getMaxNumForGame2(queryStr,endpoint,method) { // XMLHttpRequestでクエリ送信
    const querypart = "query=" + encodeURIComponent(queryStr);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, endpoint, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200 || xmlhttp.status == 201 ) {
                getMaxNumForGame3(xmlhttp.responseText);
            } else {
                document.getElementById("results").innerHTML = "エラー000" ;
				return ;
            }
        }
    }
    xmlhttp.send(querypart);
}
function getMaxNumForGame3(text) { // 結果(JSON文字列)を配列に格納
    const jsonObj = JSON.parse(text);
    let head , rows ;
    if (jsonObj.responseJSON) {
        head = jsonObj.responseJSON.head.vars;
        rows = jsonObj.responseJSON.results.bindings;
    } else {
        if(!(jsonObj.head)){
            return;
            document.getElementById("results").innerHTML = "スパークル構文エラー111" ;
        }
        head = jsonObj.head.vars;
        rows = jsonObj.results.bindings;
    }
    if (rows.length === 0) {
        return;
        document.getElementById("results").innerHTML = "検索条件の該当データなし222" ;
    }
    forGameData_maxNum = Number( rows[0]['count'].value ) ; //URIの数(最大値)をグローバル変数に代入
}
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////   乱数の生成 → ３つのゲームURIとゲーム名を取得   /////////////////

////////// グローバル変数
let forGameData_game3UriAnd3Name ; //問題にするURL(3つ)の取得
let forGameData_GameName ; //ゲーム名称
let forGameData_Time ;  //リリース年
let forGameData_Genre ; //ゲームジャンル
let forGameData_location ; //ゲームの舞台
let forGameData_character ; //主要キャラ
let forGameData_production ; //製造販売
let forGameData_productionUriArr ; //製造販売会社の配列(URI)
let forGameData_productionNameArr ; //製造販売会社の配列(Name)
let forGameData_creator ; //開発元
let forGameData_creatorUriArr ; //開発元の配列(URI)
let forGameData_creatorNameArr ; //開発元の配列(Name)

function getRandomNum_G() {

	forGameData_GameName = "" ; //ゲーム名称
	forGameData_Time = "" ;  //リリース年
	forGameData_Genre = "" ; //ゲームジャンル
	forGameData_location = "不明" ; //ゲームの舞台
	forGameData_character = "不明" ; //主要キャラ
	forGameData_production = "不明" ; //製造販売
	forGameData_productionUriArr = []; //製造販売会社の配列
	forGameData_productionNameArr = []; //製造販売会社の配列
	forGameData_creator = "不明" ; //開発元
	forGameData_creatorUriArr = []; //開発元の配列
	forGameData_creatorNameArr = []; //開発元の配列
	kaitouNum = 0 ; //回答の番号（初期値は0）
	seikaiMessage = "" ; //正解メッセージ
	
	const min = 0 ;
	const maxNumMin3 = forGameData_maxNum - 3 ; //０スタートで３つ取得するためマイナス３する
	const random = Math.floor( Math.random() * (maxNumMin3 + 1 - min) ) + min ; //乱数の生成
	get3games( random );
}
function get3games( random ) {
    //クエリ文字列をセット
    let query =  'PREFIX schema: <https://schema.org/> ';
        query += 'SELECT ?s ?gameName ?gameGenre';
        query += ' WHERE { ?s schema:genre "ゲーム作品" ;';
        query += ' schema:name  ?gameName .';
        query += ' FILTER regex(?gameName, "") ';
        query += '} OFFSET ';
        query += random;
        query += ' LIMIT 3';
    get3games2(query,'https://mediag.bunka.go.jp/sparql','POST') ; //スパークルクエリ送信
}
function get3games2(queryStr,endpoint,method) { // XMLHttpRequestでクエリ送信
    const querypart = "query=" + encodeURIComponent(queryStr);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, endpoint, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200 || xmlhttp.status == 201 ) {
                get3games3(xmlhttp.responseText);
            }
        }
    }
    xmlhttp.send(querypart);
}
function get3games3(text) { // 結果(JSON文字列)を配列に格納
    const jsonObj = JSON.parse(text);	
    let head , rows ;
    if (jsonObj.responseJSON) {
        head = jsonObj.responseJSON.head.vars;
        rows = jsonObj.responseJSON.results.bindings;
    } else {
        if(!(jsonObj.head)){
            document.getElementById("results").innerHTML = "スパークル構文エラー111" ;
            return;
        }
        head = jsonObj.head.vars;
        rows = jsonObj.results.bindings;
    }
    if (rows.length === 0) {
        document.getElementById("results").innerHTML = "検索条件の該当データなし222" ;
        return;
    }
    forGameData_game3UriAnd3Name = [rows[0]['s'].value , rows[1]['s'].value , rows[2]['s'].value , rows[0]['gameName'].value , rows[1]['gameName'].value , rows[2]['gameName'].value ] ;
    getAllData();
}

function getAllData() {

    const endpoint = 'https://mediag.bunka.go.jp/sparql'; //Endpointをセット
    const method = "POST"; //メソッド（POST or GET）
    const uriStr = forGameData_game3UriAnd3Name[0] ;
    //クエリ文字列をセット
    let query =  'PREFIX gameIdURI: <https://mediaarts-db.bunka.go.jp/id/> ';
        query += 'PREFIX schema: <https://schema.org/> ';
        query += 'PREFIX dcterms: <http://purl.org/dc/terms/> ';
        query += 'SELECT ?gameName ?time ?gameGenre ?creator ?location ?character ?productionCompany WHERE { ';
        query += '{ <';
        query += uriStr ;
        query += '> schema:name  ?gameName ;';
        query += ' schema:datePublished  ?time ;';
        query += ' schema:keywords  ?gameGenre . ';
        query += ' FILTER regex(?gameName, "") '; //これで単純リテラルだけに絞る（enを除外）
        query += ' } UNION { <';
        query += uriStr ;
        query += '> dcterms:creator  ?creator . } UNION { <';
        query += uriStr ;
        query += '> schema:contentLocation  ?location . } UNION { <';
        query += uriStr ;
        query += '> schema:character  ?character . } UNION { <';
        query += uriStr ;
        query += '> schema:productionCompany ?productionCompany . }';
        query += '} ORDER BY DESC(?gameName)';
    sparqlQuery(query,endpoint,method) ; //スパークルクエリ送信
}

function sparqlQuery(queryStr,endpoint,method) { // XMLHttpRequestでクエリ送信
    const querypart = "query=" + encodeURIComponent(queryStr);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, endpoint, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200 || xmlhttp.status == 201 ) {
                onSuccessQuery(xmlhttp.responseText);
            } else {
                document.getElementById("results").innerHTML = "エラーAAA" ;
            }
        }
    }
    xmlhttp.send(querypart);
}
function onSuccessQuery(text) { // 結果(JSON文字列)を配列に格納
    const jsonObj = JSON.parse(text);
    let head , rows ;
    if (jsonObj.responseJSON) {
        head = jsonObj.responseJSON.head.vars;
        rows = jsonObj.responseJSON.results.bindings;
    } else {
        if(!(jsonObj.head)){
            document.getElementById("results").innerHTML = "スパークル構文エラーBBB" ;
            return;
        }
        head = jsonObj.head.vars;
        rows = jsonObj.results.bindings;
    }
    if (rows.length === 0) {
		///// (タイムなし 又は キーワードなし) かつ URLもなし のエラー
		getRandomNum_G();
        return;
    }
    makeTable(head, rows);
}

function makeTable(head, rows) { // 配列をテーブルにして出力
	if(rows[0]['gameName']){
		forGameData_GameName = rows[0]['gameName'].value ;//ゲーム名称
		forGameData_Time     = rows[0]['time'].value ;//リリース年
		forGameData_Genre     = rows[0]['gameGenre'].value ;//ゲームジャンル
	}else{
		// (タイムなし 又は キーワードなし) かつ URLあり のエラー
		getRandomNum_G();
		return;
	}
		
	// 制作者のURL取得→配列作成
	if(rows[1]){
		if(Object.keys(rows[1]) == "location"){
			forGameData_location = rows[1][Object.keys(rows[1])].value;
			
		}else if(Object.keys(rows[1]) == "creator"){
			forGameData_creator = rows[1][Object.keys(rows[1])].value;
			
		}else if(Object.keys(rows[1]) == "character"){
			forGameData_character = rows[1][Object.keys(rows[1])].value;
			
		}else if(Object.keys(rows[1]) == "productionCompany"){
			forGameData_production = rows[1][Object.keys(rows[1])].value;
		}
	}
	if(rows[2]){
		if(Object.keys(rows[2]) == "location"){
			forGameData_location = rows[2][Object.keys(rows[2])].value;
			
		}else if(Object.keys(rows[2]) == "creator"){
			forGameData_creator = rows[2][Object.keys(rows[2])].value;
			
		}else if(Object.keys(rows[2]) == "character"){
			forGameData_character = rows[2][Object.keys(rows[2])].value;
			
		}else if(Object.keys(rows[2]) == "productionCompany"){
			forGameData_production = rows[2][Object.keys(rows[2])].value;
		}
	}
	if(rows[3]){
		if(Object.keys(rows[3]) == "location"){
			forGameData_location = rows[3][Object.keys(rows[3])].value;
			
		}else if(Object.keys(rows[3]) == "creator"){
			forGameData_creator = rows[3][Object.keys(rows[3])].value;
			
		}else if(Object.keys(rows[3]) == "character"){
			forGameData_character = rows[3][Object.keys(rows[3])].value;
			
		}else if(Object.keys(rows[3]) == "productionCompany"){
			forGameData_production = rows[3][Object.keys(rows[3])].value;
		}
	}
	if(rows[4]){
		if(Object.keys(rows[4]) == "location"){
			forGameData_location = rows[4][Object.keys(rows[4])].value;
			
		}else if(Object.keys(rows[4]) == "creator"){
			forGameData_creator = rows[4][Object.keys(rows[4])].value;
			
		}else if(Object.keys(rows[4]) == "character"){
			forGameData_character = rows[4][Object.keys(rows[4])].value;
			
		}else if(Object.keys(rows[4]) == "productionCompany"){
			forGameData_production = rows[4][Object.keys(rows[4])].value;
		}
	}
	const creatorUriArr = forGameData_creator.split(',');
	const companyArr = forGameData_production.split(',');

	//作者名・会社名を取得
	getCreatorName( creatorUriArr , companyArr );
}
function getCreatorName( creatorUriArr , companyArr ) { // XMLHttpRequestでクエリ送信

	//配列を合体させる
	let ketsugou = creatorUriArr.concat(companyArr);
	//合体配列から重複を削除
	const ketsugouArr = [...new Set(ketsugou)];
    //クエリ文字列をセット
    let query = 'PREFIX schema: <https://schema.org/> ';
        query += 'SELECT';
		for (let i=0; i<ketsugouArr.length; i++) {
			query += ' ?' + ketsugouArr[i].slice( -6 ); 
			query += ' ';
        }
        query += 'WHERE { ';
		for (let i=0; i<ketsugouArr.length; i++) {
			query += '{ <';
			query += ketsugouArr[i] ;
			query += '> schema:name ?' ;
			query += ketsugouArr[i].slice( -6 ) ;
			query += ' .}' ;
			
			if(i<ketsugouArr.length -1){
				query += ' UNION ' ;
			}
        }
		query += ' } ';
    getCreatorName2(query , ketsugouArr , creatorUriArr , companyArr ) ; //スパークルクエリ送信
}
function getCreatorName2(queryStr , ketsugouArr , creatorUriArr , companyArr ) { // XMLHttpRequestでクエリ送信
    const querypart = "query=" + encodeURIComponent(queryStr);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://mediag.bunka.go.jp/sparql" , true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200 || xmlhttp.status == 201 ) {
                getCreatorName3(xmlhttp.responseText , ketsugouArr , creatorUriArr , companyArr )
            } else {
                document.getElementById("results").innerHTML = "エラーDDD" ;
            }
        }
    }
    xmlhttp.send(querypart);
}
function getCreatorName3(text , ketsugouArr , creatorUriArr , companyArr ) { // 結果(JSON文字列)を配列に格納
    const jsonObj = JSON.parse(text);
    let head , rows ;
    if (jsonObj.responseJSON) {
        head = jsonObj.responseJSON.head.vars;
        rows = jsonObj.responseJSON.results.bindings;
    } else {
        if(!(jsonObj.head)){
            document.getElementById("results").innerHTML = "スパークル構文エラーEEE" ;
            return;
        }
        head = jsonObj.head.vars;
        rows = jsonObj.results.bindings;
    }
    if (rows.length === 0) {
		// 最初の３つはあるがURLが一個もなし のエラー
		getRandomNum_G();
        return;
    }
	//制作者の配列
	for (let i=0; i<creatorUriArr.length; i++) {
		for (let j=0; j<rows.length; j++) {
			if(creatorUriArr[i].slice( -6 ) == Object.keys(rows[j]) ){
				forGameData_creatorUriArr.push( 'https://mediaarts-db.bunka.go.jp/id/' + Object.keys(rows[j]) ) ;
				forGameData_creatorNameArr.push( rows[j][Object.keys(rows[j])].value ) ;
			}
		}
	}
	//製造販売会社の配列
	for (let i=0; i<companyArr.length; i++) {
		for (let j=0; j<rows.length; j++) {
			if(companyArr[i].slice( -6 ) == Object.keys(rows[j]) ){
				forGameData_productionUriArr.push( 'https://mediaarts-db.bunka.go.jp/id/' + Object.keys(rows[j]) ) ;
				forGameData_productionNameArr.push( rows[j][Object.keys(rows[j])].value ) ;
			}
		}
	}

	setTimeout(function () {
		if(questionNum < (mondaiNum + 1)){
			setTimeout(function () {
				//クイズジャンル選択用乱数の生成
				const min = 1 ;
				const max = 18 ; 
				const random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
				
				resultStr += "<span class='shiri'>メデ美</span>：第" + questionNum + "問<br>";
				document.getElementById("results").innerHTML = resultStr; 
				scroll();
				questionNum++
				
				if(random < 10 ){
					setTimeout(function () {
						makeQuestionGameP1();
					}, "1000");
				}else if(random < 16){
					setTimeout(function () {
						makeQuestionGameP2();
					}, "1000");
				}else{
					setTimeout(function () {
						makeQuestionGameP3();
					}, "1000");
				}
			}, "1000");
		}else{
			
			resultStr += "<span class='shiri'>メデ美</span>：はい終了～<br>";
			quizGenre = 0 ;
			document.getElementById("results").innerHTML = resultStr; 
			scroll();
			setTimeout(function () {
				
				if(mondaiNum == seikaiNum){
					resultStr += "<span class='shiri'>メデ美</span>：" + mondaiNum + "問中全問正解！　すごい！　てんさーい！！<br>";
					
				}else if(seikaiNum > (mondaiNum - 3) ){
					resultStr += "<span class='shiri'>メデ美</span>：" + mondaiNum + "問中" + seikaiNum + "問正解でした　なかなかやるじゃん！<br>";
					
				}else if(seikaiNum > (mondaiNum - 5) ){
					resultStr += "<span class='shiri'>メデ美</span>：" + mondaiNum + "問中" + seikaiNum + "問正解でした　乙！<br>";
					
				}else if(seikaiNum == 0 ){
					resultStr += "<span class='shiri'>メデ美</span>：" + mondaiNum + "問中ぜんぶ不正解でした… もいっかいやる？<br>";
	
				}else{
					resultStr += "<span class='shiri'>メデ美</span>：" + mondaiNum + "問中" + seikaiNum + "問正解でした　まあこんなもん？<br>";
				}
				
				document.getElementById("results").innerHTML = resultStr; 
				scroll();
				
				setTimeout(function () {
					resultStr += "<span class='shiri'>メデ美</span>：またクイズしたくなったら <b>クイズ</b> って声かけてね！<br>";
					document.getElementById("results").innerHTML = resultStr; 
					scroll();
					questionNum = 1 ; //カウント１問目にもどる
					seikaiNum = 0; //正答も0にもどる
					startFlag = 2;     // 2:勝負がついた
					stopRepeat = 0; //リピート復活
					repeatMassage(); //定形メッセージ
				}, "1000");
			}, "1000");
		}
	}, "1000");
}

//パターン１（名称を回答）
function makeQuestionGameP1(){
	let message1 = "" ;
	if(forGameData_productionUriArr.length == 1 && forGameData_creatorUriArr.length == 1 && forGameData_productionNameArr[0] == forGameData_creatorNameArr[0] ){
		message1 += "<a href='" + forGameData_creatorUriArr[0] + "' target='_blank'>" + forGameData_productionNameArr[0] + "</a> が開発及び製造販売を行った、"
	}else{
		if(forGameData_productionUriArr[0]){
			for (let i=0; i<forGameData_productionUriArr.length; i++) {
				message1 += "<a href='" + forGameData_productionUriArr[i] + "' target='_blank'>" + forGameData_productionNameArr[i] + "</a>" ;
				if(i < (forGameData_productionUriArr.length - 1)){
					message1 += "、";
				}
			}
			if(forGameData_creatorUriArr[0]){
				message1 += " が開発、";
			}else{
				message1 += " が開発を行った、";
			}
		}
		if(forGameData_creatorUriArr[0]){
			for (let i=0; i<forGameData_creatorUriArr.length; i++) {
				message1 += "<a href='" + forGameData_creatorUriArr[i] + "' target='_blank'>" + forGameData_creatorNameArr[i] + "</a>" ;
				if(i < (forGameData_creatorUriArr.length - 1)){
					message1 += "、";
				}
			}
			message1 += " が製造販売を行った、";
		}
	}
	message1 += forGameData_Time + "年発売の ";
	if(forGameData_location != "不明"){
		message1 += forGameData_location + "を舞台とした、";
	}
	if(forGameData_character != "不明"){
		message1 += forGameData_character + " などが活躍する、";
	}
	message1 += forGameData_Genre + " はどれでしょうか？" ;
	message1 += "<br>" ;
	
	//乱数の生成
	const min = 1 ;
	const max = 3 ; 
	const random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
	if(random == 1){
		message1 += "　　1 --- <a href='" + forGameData_game3UriAnd3Name[0] + "' target='_blank'>" + forGameData_game3UriAnd3Name[3] + "</a><br>" ;
		message1 += "　　2 --- <a href='" + forGameData_game3UriAnd3Name[1] + "' target='_blank'>" + forGameData_game3UriAnd3Name[4] + "</a><br>" ;
		message1 += "　　3 --- <a href='" + forGameData_game3UriAnd3Name[2] + "' target='_blank'>" + forGameData_game3UriAnd3Name[5] + "</a><br>" ;
		kaitouNum = 1 ;
	}else if(random == 2){
		message1 += "　　1 --- <a href='" + forGameData_game3UriAnd3Name[1] + "' target='_blank'>" + forGameData_game3UriAnd3Name[4] + "</a><br>" ;
		message1 += "　　2 --- <a href='" + forGameData_game3UriAnd3Name[0] + "' target='_blank'>" + forGameData_game3UriAnd3Name[3] + "</a><br>" ;
		message1 += "　　3 --- <a href='" + forGameData_game3UriAnd3Name[2] + "' target='_blank'>" + forGameData_game3UriAnd3Name[5] + "</a><br>" ;
		kaitouNum = 2 ;
	}else if(random == 3){
		message1 += "　　1 --- <a href='" + forGameData_game3UriAnd3Name[2] + "' target='_blank'>" + forGameData_game3UriAnd3Name[5] + "</a><br>" ;
		message1 += "　　2 --- <a href='" + forGameData_game3UriAnd3Name[1] + "' target='_blank'>" + forGameData_game3UriAnd3Name[4] + "</a><br>" ;
		message1 += "　　3 --- <a href='" + forGameData_game3UriAnd3Name[0] + "' target='_blank'>" + forGameData_game3UriAnd3Name[3] + "</a><br>" ;
		kaitouNum = 3 ;
	}
	startFlag = 1;  //1:自分が答える番
	resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
	document.getElementById("results").innerHTML = resultStr; 
	scroll();
			
	seikaiMessage = "正解は" + kaitouNum + "番の <b><a href='" + forGameData_game3UriAnd3Name[0] + "' target='_blank'>" + forGameData_game3UriAnd3Name[3] + "</a></b> でした！" ;
}

//パターン２（発売年を回答）
function makeQuestionGameP2(){
	let message1 = "" ;
	if(forGameData_productionUriArr.length == 1 && forGameData_creatorUriArr.length == 1 && forGameData_productionNameArr[0] == forGameData_creatorNameArr[0] ){
		message1 += "<a href='" + forGameData_creatorUriArr[0] + "' target='_blank'>" + forGameData_productionNameArr[0] + "</a> が開発及び製造販売を行った、"
	}else{
		if(forGameData_productionUriArr[0]){
			for (let i=0; i<forGameData_productionUriArr.length; i++) {
				message1 += "<a href='" + forGameData_productionUriArr[i] + "' target='_blank'>" + forGameData_productionNameArr[i] + "</a>" ;
				if(i < (forGameData_productionUriArr.length - 1)){
					message1 += "、";
				}
			}
			if(forGameData_creatorUriArr[0]){
				message1 += " が開発、";
			}else{
				message1 += " が開発を行った、";
			}
		}
		if(forGameData_creatorUriArr[0]){
			for (let i=0; i<forGameData_creatorUriArr.length; i++) {
				message1 += "<a href='" + forGameData_creatorUriArr[i] + "' target='_blank'>" + forGameData_creatorNameArr[i] + "</a>" ;
				if(i < (forGameData_creatorUriArr.length - 1)){
					message1 += "、";
				}
			}
			message1 += " が製造販売を行った、";
		}
	}
	if(forGameData_location != "不明"){
		message1 += forGameData_location + "を舞台とした";
	}
	if(forGameData_character != "不明"){
		message1 += forGameData_character + " などが活躍する ";
	}
	message1 += forGameData_Genre + "『 <b><a href='" + forGameData_game3UriAnd3Name[0] + "' target='_blank'>" + forGameData_game3UriAnd3Name[3] + "</a></b> 』の発売年は何年でしょうか？";
	message1 += "<br>" ;
	
	//乱数の生成
	const min = 1 ;
	const max = 3 ; 
	const random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
	
	let seikai = Number(forGameData_Time) ;
	let machigai1 = 0 ;
	let machigai2 = 0 ;
	
	if(seikai < 2011){
		if(random == 1){
			message1 += "　　1 --- " + seikai + "年<br>" ;
			message1 += "　　2 --- " + (seikai + 5) + "年<br>" ;
			message1 += "　　3 --- " + (seikai + 10) + "年<br>" ;
			kaitouNum = 1 ;
		}else if(random == 2){
			message1 += "　　1 --- " + (seikai - 9) + "年<br>" ;
			message1 += "　　2 --- " + seikai + "年<br>" ;
			message1 += "　　3 --- " + (seikai + 9) + "年<br>" ;
			kaitouNum = 2 ;
		}else if(random == 3){
			message1 += "　　1 --- " + (seikai - 20)  + "年<br>" ;
			message1 += "　　2 --- " + (seikai - 10)  + "年<br>" ;
			message1 += "　　3 --- " + seikai + "年<br>" ;
			kaitouNum = 3 ;
		}
	}else if(seikai < 2015){
		if(random == 1){
			message1 += "　　1 --- " + seikai + "年<br>" ;
			message1 += "　　2 --- " + (seikai + 3) + "年<br>" ;
			message1 += "　　3 --- " + (seikai + 6) + "年<br>" ;
			kaitouNum = 1 ;
		}else if(random == 2){
			message1 += "　　1 --- " + (seikai - 7) + "年<br>" ;
			message1 += "　　2 --- " + seikai + "年<br>" ;
			message1 += "　　3 --- " + (seikai + 7) + "年<br>" ;
			kaitouNum = 2 ;
		}else if(random == 3){
			message1 += "　　1 --- " + (seikai - 24)  + "年<br>" ;
			message1 += "　　2 --- " + (seikai - 12)  + "年<br>" ;
			message1 += "　　3 --- " + seikai + "年<br>" ;
			kaitouNum = 3 ;
		}
	}else if(seikai < 2018){
		if(random == 1){
			message1 += "　　1 --- " + seikai + "年<br>" ;
			message1 += "　　2 --- " + (seikai + 2) + "年<br>" ;
			message1 += "　　3 --- " + (seikai + 4) + "年<br>" ;
			kaitouNum = 1 ;
		}else if(random == 2){
			message1 += "　　1 --- " + (seikai - 4) + "年<br>" ;
			message1 += "　　2 --- " + seikai + "年<br>" ;
			message1 += "　　3 --- " + (seikai + 4) + "年<br>" ;
			kaitouNum = 2 ;
		}else if(random == 3){
			message1 += "　　1 --- " + (seikai - 28)  + "年<br>" ;
			message1 += "　　2 --- " + (seikai - 14)  + "年<br>" ;
			message1 += "　　3 --- " + seikai + "年<br>" ;
			kaitouNum = 3 ;
		}
	}else{
		if(random == 1){
			message1 += "　　1 --- " + (seikai - 18) + "年<br>" ;
			message1 += "　　2 --- " + (seikai - 9) + "年<br>" ;
			message1 += "　　3 --- " + seikai + "年<br>" ;
			kaitouNum = 3 ;
		}else if(random == 2){
			message1 += "　　1 --- " + (seikai - 20) + "年<br>" ;
			message1 += "　　2 --- " + (seikai - 10) + "年<br>" ;
			message1 += "　　3 --- " + seikai + "年<br>" ;
			kaitouNum = 3 ;
		}else if(random == 3){
			message1 += "　　1 --- " + (seikai - 32)  + "年<br>" ;
			message1 += "　　2 --- " + (seikai - 16)  + "年<br>" ;
			message1 += "　　3 --- " + seikai + "年<br>" ;
			kaitouNum = 3 ;
		}
	}
	startFlag = 1;  //1:自分が答える番
	resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
	document.getElementById("results").innerHTML = resultStr; 
	scroll();
	seikaiMessage = "正解は" + kaitouNum + "番の <b>" + seikai + "</b> 年でした！" ;
}

//パターン３（ジャンルを回答）
function makeQuestionGameP3(){
	let message1 = "" ;
	if(forGameData_productionUriArr.length == 1 && forGameData_creatorUriArr.length == 1 && forGameData_productionNameArr[0] == forGameData_creatorNameArr[0] ){
		message1 += "<a href='" + forGameData_creatorUriArr[0] + "' target='_blank'>" + forGameData_productionNameArr[0] + "</a> が開発及び製造販売を行った、"
	}else{
		if(forGameData_productionUriArr[0]){
			for (let i=0; i<forGameData_productionUriArr.length; i++) {
				message1 += "<a href='" + forGameData_productionUriArr[i] + "' target='_blank'>" + forGameData_productionNameArr[i] + "</a>" ;
				if(i < (forGameData_productionUriArr.length - 1)){
					message1 += "、";
				}
			}
			if(forGameData_creatorUriArr[0]){
				message1 += " が開発、";
			}else{
				message1 += " が開発を行った、";
			}
		}
		if(forGameData_creatorUriArr[0]){
			for (let i=0; i<forGameData_creatorUriArr.length; i++) {
				message1 += "<a href='" + forGameData_creatorUriArr[i] + "' target='_blank'>" + forGameData_creatorNameArr[i] + "</a>" ;
				if(i < (forGameData_creatorUriArr.length - 1)){
					message1 += "、";
				}
			}
			message1 += " が製造販売を行った、";
		}
	}
	message1 += forGameData_Time + "年発売の ";
	if(forGameData_location != "不明"){
		message1 += forGameData_location + "を舞台とした";
	}
	if(forGameData_character != "不明"){
		message1 += forGameData_character + " などが活躍する ";
	}
	message1 += "ゲーム『 <b><a href='" + forGameData_game3UriAnd3Name[0] + "' target='_blank'>" + forGameData_game3UriAnd3Name[3] + "</a></b> 』のゲームジャンルは次のどれでしょうか？";
	message1 += "<br>" ;
	
	//回答用乱数の生成
	const min = 1 ;
	const max = 3 ; 
	const random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
	
	//ジャンル選択用の乱数
	const minA = 0 ;
	const maxA = 400 ; 
	const randomA = Math.floor( Math.random() * (maxA + 1 - minA) ) + minA ;
	const randomB = randomA + 247
	let machigai1 = gameGenreArr[randomA];
	let machigai2 = gameGenreArr[randomB];
	
	//似たジャンルだった場合にできるだけ違ったジャンルにする
	if(machigai1.substr(0,4) == forGameData_Genre.substr(0,4) || machigai2.substr(0,4) == forGameData_Genre.substr(0,4) ){
		machigai1 = gameGenreArr[(randomA + 1)];
		machigai2 = gameGenreArr[(randomB + 1)];
			
		if(machigai1.substr(0,4) == forGameData_Genre.substr(0,4) || machigai2.substr(0,4) == forGameData_Genre.substr(0,4) ){
			machigai1 = gameGenreArr[(randomA + 1)];
			machigai2 = gameGenreArr[(randomB + 1)];
					
			if(machigai1.substr(0,4) == forGameData_Genre.substr(0,4) || machigai2.substr(0,4) == forGameData_Genre.substr(0,4) ){
				machigai1 = gameGenreArr[(randomA + 1)];
				machigai2 = gameGenreArr[(randomB + 1)];
			}
		}
	}
	if(random == 1){
		message1 += "　　1 --- " + forGameData_Genre + "<br>" ;
		message1 += "　　2 --- " + machigai1 + "<br>" ;
		message1 += "　　3 --- " + machigai2+ "<br>" ;
		kaitouNum = 1 ;
	}else if(random == 2){
		message1 += "　　1 --- " + machigai1 + "<br>" ;
		message1 += "　　2 --- " + forGameData_Genre + "<br>" ;
		message1 += "　　3 --- " + machigai2 + "<br>" ;
		kaitouNum = 2 ;
	}else if(random == 3){
		message1 += "　　1 --- " + machigai1+ "<br>" ;
		message1 += "　　2 --- " + machigai2 + "<br>" ;
		message1 += "　　3 --- " + forGameData_Genre + "<br>" ;
		kaitouNum = 3 ;
	}
	
	startFlag = 1;  //1:自分が答える番
	resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
	document.getElementById("results").innerHTML = resultStr; 
	scroll();
	seikaiMessage = "正解は" + kaitouNum + "番の <b>" + forGameData_Genre + "</b> でした！" ;
}

