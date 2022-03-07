
let forAnimeData_maxNum = 3100 ; // グローバル変数（11/22現在は3100だったのでそれを初期値に）

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//最初にゲームクイズ用 forAnimeData_maxNum を取得  ///////////////////
function getMaxNumForAnime() {
    //クエリ文字列をセット
    let query =  'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> ';
        query += 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ';
        query += 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ';
        query += 'PREFIX schema: <https://schema.org/> ';
        query += 'PREFIX ma: <https://mediaarts-db.bunka.go.jp/data/property/> ';
        query += 'SELECT (count(?s) as ?count) ';
        query += 'WHERE { ';
        query += '?s schema:genre "アニメテレビレギュラーシリーズ" ; ';
        query += 'rdfs:label ?name ; ';
        query += 'schema:productionCompany ?productionCompany  ; ';
        query += 'schema:actor ?actor  ; ';
        query += 'schema:contributor ?contributor  ; ';
        query += 'schema:startDate ?startDate  ; ';
        query += 'schema:endDate ?endDate . ';
        query += '}';
    getMaxNumForAnime2(query,'https://mediag.bunka.go.jp/sparql',"POST") ; //スパークルクエリ送信
}
function getMaxNumForAnime2(queryStr,endpoint,method) { // XMLHttpRequestでクエリ送信
    const querypart = "query=" + encodeURIComponent(queryStr);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, endpoint, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200 || xmlhttp.status == 201 ) {
                getMaxNumForAnime3(xmlhttp.responseText);
            } else {
                document.getElementById("results").innerHTML = "エラー000" ;
				return;
            }
        }
    }
    xmlhttp.send(querypart);
}
function getMaxNumForAnime3(text) { // 結果(JSON文字列)を配列に格納
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
    forAnimeData_maxNum = Number( rows[0]['count'].value ) ; //URIの数(最大値)をグローバル変数に代入
}
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////   乱数の生成 → 20つのゲームURIとゲーム名を取得   /////////////////
function getRandomNum_A() {
	kaitouNum = 0 ; //回答の番号（初期値は0）
	seikaiMessage = "" ; //正解メッセージ
	const min = 0 ;
	const maxNumMin20 = forAnimeData_maxNum - 20 ; //０スタートで20つ取得するためマイナス20する
	const random = Math.floor( Math.random() * (maxNumMin20 + 1 - min) ) + min ; //乱数の生成
	get20anime( random );
}
function get20anime( random ) {
    //クエリ文字列をセット
    let query =  'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> ';
        query += 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ';
        query += 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ';
        query += 'PREFIX schema: <https://schema.org/> ';
        query += 'PREFIX ma: <https://mediaarts-db.bunka.go.jp/data/property/> ';
        query += 'SELECT * ';
        query += 'WHERE { ';
        query += '?s schema:genre "アニメテレビレギュラーシリーズ" ; ';
        query += 'rdfs:label ?name ; ';
        query += 'schema:productionCompany ?productionCompany  ; ';
        query += 'schema:actor ?actor  ; ';
        query += 'schema:contributor ?contributor  ; ';
        query += 'schema:startDate ?startDate  ; ';
        query += 'schema:endDate ?endDate . ';
        query += 'OPTIONAL{?s schema:publisher ?publisher.} ';
        query += 'OPTIONAL{?s ma:programDuration ?programDuration .} ';
        query += 'OPTIONAL{?s ma:originalWorkCreator ?originalWorkCreator .} ';
        query += 'OPTIONAL{?s ma:numberOfPrograms ?numberOfPrograms  .} ';
        query += 'OPTIONAL{?s ma:periodDisplayed ?periodDisplayed  .} ';
        query += 'OPTIONAL{?s schema:track ?track  .} ';			
        query += '} ORDER BY ?startDate ';
        query += 'OFFSET ';
        query += random;
        query += ' LIMIT 20';
    get20anime2(query,'https://mediag.bunka.go.jp/sparql','POST') ; //スパークルクエリ送信
}
function get20anime2(queryStr,endpoint,method) { // XMLHttpRequestでクエリ送信
    const querypart = "query=" + encodeURIComponent(queryStr);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, endpoint, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200 || xmlhttp.status == 201 ) {
                get20anime3(xmlhttp.responseText);
            }
        }
    }
    xmlhttp.send(querypart);
}
function get20anime3(text) { // 結果(JSON文字列)を配列に格納
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

	let urlArr = [] ; //アニメタイトル
	let nameArr = [] ; //アニメタイトル
	let productionCompanyArr = [] ; //制作団体
	let actorArr = [] ; //声優
	let contributorArr = [] ; //制作者
	let startDateArr = [] ; //初回放映日
	let endDateArr = [] ; //最終放映日
	
	let programDurationArr = [] ;//１話あたりの放映時間数（分）
	let publisherArr = [] ;  //放送事業者
	let originalWorkCreatorArr = [] ; //原作者
	let numberOfProgramsArr = [] ;  //放映話数
	let periodDisplayedArr = [] ;  //放映期間・放映曜日時刻・他の情報
	let trackArr = [] ;  //主題歌
	
	//主題歌関係の使い捨て変数
	let t1_mae , t1_ato ;
	let uta1 = "" ;
	let uta2 = "" ;
	let uta3 = "" ;
	
	for (let i=0; i<rows.length; i++) {

		urlArr[i] = rows[i]['s'].value ;
		
		//名前を配列に格納（無加工）
		nameArr[i] = rows[i]['name'].value ;

		//①　制作団体の「 ／ 」部分を「、」に置換
		productionCompanyArr[i] = rows[i]['productionCompany'].value.replace(/ ／ /g, '、') ;
		productionCompanyArr[i] = productionCompanyArr[i].replace(/　／　/g, '、') ;
		productionCompanyArr[i] = productionCompanyArr[i].replace(/ ／　/g, '、') ;
		productionCompanyArr[i] = productionCompanyArr[i].replace(/　／ /g, '、') ;
		
		//②　メインキャラと声優の「 ／ 」部分を「,」に置換
		actorArr[i] = rows[i]['actor'].value.replace(/ ／ /g, ',') ;
		actorArr[i] = actorArr[i].replace(/　／　/g, ',') ;
		actorArr[i] = actorArr[i].replace(/ ／　/g, ',') ;
		actorArr[i] = actorArr[i].replace(/　／ /g, ',') ;
		//配列に格納
		actorArr[i] = actorArr[i].split(',');
		//メインキャラと声優を分離してさらに配列に格納（いっぱいあるのでクイズに使うのは最初の３つくらい）
		for (let j=0; j<actorArr[i].length; j++) {
			actorArr[i][j] = actorArr[i][j].replace(/【/g, '') ;
			actorArr[i][j] = actorArr[i][j].replace(/】/g, ',') ;
			actorArr[i][j] = actorArr[i][j].split(',');
		}
		
		//③　制作者（contributor）の「 ／ 」部分を「,」に置換
		contributorArr[i] = rows[i]['contributor'].value.replace(/ ／ /g, ',') ;
		contributorArr[i] = contributorArr[i].replace(/　／　/g, ',') ;
		contributorArr[i] = contributorArr[i].replace(/ ／　/g, ',') ;
		contributorArr[i] = contributorArr[i].replace(/　／ /g, ',') ;
		//配列に格納（いっぱいあるのでクイズに使うのは最初の３つくらい）
		contributorArr[i] = contributorArr[i].split(',');
		
		//④　初回放映日の処理
		startDateArr[i] = Number(rows[i]['startDate'].value.substr( 0, 4 )) + "年" ;
		startDateArr[i] += Number(rows[i]['startDate'].value.substr( 5, 2 )) + "月" ;
		startDateArr[i] += Number(rows[i]['startDate'].value.substr( 8, 2 )) + "日" ;

		//⑤　最終放映日の処理
		endDateArr[i] = Number(rows[i]['endDate'].value.substr( 0, 4 )) + "年" ;
		endDateArr[i] += Number(rows[i]['endDate'].value.substr( 5, 2 )) + "月" ;
		endDateArr[i] += Number(rows[i]['endDate'].value.substr( 8, 2 )) + "日" ;

		//⑥　（★★　存在するときのみ　★★）「 ／ 」部分を「分 又は」に置換し最後に「分」をつける
		if(rows[i]['programDuration']){
			programDurationArr[i] = rows[i]['programDuration'].value.replace(/ ／ /g, '分 又は ') ;
			if(programDurationArr[i].indexOf("分") == -1){
				programDurationArr[i] = programDurationArr[i] + "分";
			}
		}

		//⑦　（★★　存在するときのみ　★★）放送事業者の「 ／ 」部分
		if(rows[i]['publisher']){
			publisherArr[i] = rows[i]['publisher'].value.replace(/ ／ /g, '、') ;
			publisherArr[i] = publisherArr[i].replace(/　／　/g, '、') ;
			publisherArr[i] = publisherArr[i].replace(/ ／　/g, '、') ;
			publisherArr[i] = publisherArr[i].replace(/　／ /g, '、') ;
		}

		//⑧　（★★　存在するときのみ　★★）原作者の「 ／ 」部分を「、」に置換など
		if(rows[i]['originalWorkCreator']){
			originalWorkCreatorArr[i] = rows[i]['originalWorkCreator'].value.replace(/ ／ /g, '、') ;
			originalWorkCreatorArr[i] = originalWorkCreatorArr[i].replace(/　／　/g, '、') ;
			originalWorkCreatorArr[i] = originalWorkCreatorArr[i].replace(/ ／　/g, '、') ;
			originalWorkCreatorArr[i] = originalWorkCreatorArr[i].replace(/　／ /g, '、') ;
			originalWorkCreatorArr[i] = originalWorkCreatorArr[i].replace(/［原作］/g, '') ;
			originalWorkCreatorArr[i] = originalWorkCreatorArr[i].replace(/［原案］/g, '') ;
			originalWorkCreatorArr[i] = originalWorkCreatorArr[i].replace(/［/g, '(') ;
			originalWorkCreatorArr[i] = originalWorkCreatorArr[i].replace(/］/g, ')') ;
		}

		//⑨　（★★　存在するときのみ　★★）放映話数（無加工）
		if(rows[i]['numberOfPrograms']){
			numberOfProgramsArr[i] = rows[i]['numberOfPrograms'].value ;
		}
		
		//⑩　（★★　存在するときのみ　★★）放映期間・放映曜日時刻・他の情報（無加工）
		if(rows[i]['periodDisplayed']){
			periodDisplayedArr[i] = rows[i]['periodDisplayed'].value ;
		}

		//⑪　（★★　存在するときのみ　★★）主題歌 （ないやつは最終的にnullか""になる）
		if(rows[i]['track']){
			//先頭の１個目
			t1_mae = rows[i]['track'].value.indexOf("「") + 1 ;
			t1_ato = rows[i]['track'].value.indexOf("」") - t1_mae ;
			uta1 = rows[i]['track'].value.substr( t1_mae, t1_ato )  ;
			//２個目
			rows[i]['track'].value = rows[i]['track'].value.replace('「', '') ; //先頭の 「 を１コだけ削除
			rows[i]['track'].value = rows[i]['track'].value.replace('」', '') ; //先頭の 」 を１コだけ削除
			t1_mae = rows[i]['track'].value.indexOf("「") + 1 ;
			t1_ato = rows[i]['track'].value.indexOf("」") - t1_mae ;
			uta2 = rows[i]['track'].value.substr( t1_mae, t1_ato )  ;
			//３個目
			rows[i]['track'].value = rows[i]['track'].value.replace('「', '') ; //先頭の 「 を１コだけ削除
			rows[i]['track'].value = rows[i]['track'].value.replace('」', '') ; //先頭の 」 を１コだけ削除
			t1_mae = rows[i]['track'].value.indexOf("「") + 1 ;
			t1_ato = rows[i]['track'].value.indexOf("」") - t1_mae ;
			uta3 = rows[i]['track'].value.substr( t1_mae, t1_ato )  ;
			if(uta3 == uta2){
				uta3 = "" ;
			}
			if(uta2 == uta1){
				uta2 = "" ;
			}
			trackArr[i] = "「" + uta1 + "」" + "「" + uta2 + "」" + "「" + uta3 + "」" ;			
			trackArr[i] = trackArr[i].replace(/「」/g, '') ;
		}
		
	}
	makeMessageAnime(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr);
}

function makeMessageAnime(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr) { // 結果(JSON文字列)を配列に格納

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
				if(random < 7 ){
					setTimeout(function () {
						makeQuestionAnimeP1(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr); //マンガ名
					}, "1000");
				}else if(random < 13){
					setTimeout(function () {
						makeQuestionAnimeP2(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr); //著者名
					}, "1000");
				}else{
					setTimeout(function () {
						makeQuestionAnimeP3(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr); //出版社・ブランド名
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
function makeQuestionAnimeP1(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr){

	let message1 = "" ;
	message1 += startDateArr[0] + "から" + endDateArr[0] + "まで" ;
	if(typeof numberOfProgramsArr[0] != 'undefined'){
		message1 += "全" + numberOfProgramsArr[0] + "話が" ;
	}
	
	if(typeof publisherArr[0] != 'undefined'){
		message1 += publisherArr[0] + "で" ;
	}
	message1 += "放映された、<span style='font-weight:bold;color:#000;'>" ;

	if(typeof actorArr[0][1] == 'undefined'){ //1つ目だけの場合
		if(typeof actorArr[0][0][1] == 'undefined'){ //声優だけの場合
			message1 += actorArr[0][0][0] + "</span>などが声優として出演する"  ; 
		}else{ //キャラ＋声優の場合
			if(actorArr[0][0][1] != ""){
				message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）</span>などが主要キャラとして登場する" ; 
			}else{
				message1 += actorArr[0][0][0] + "</span>などが主要キャラとして登場する" ; 
			}
		}
	}else if(typeof actorArr[0][2] == 'undefined'){ //２つの場合
		if(typeof actorArr[0][1][1] == 'undefined'){ //声優だけの場合
			message1 += actorArr[0][0][0] + "、" ;
			message1 += actorArr[0][1][0] + "</span>などが声優として出演する"  ; 
		}else{ //キャラ＋声優の場合
			if(actorArr[0][0][1] != ""){
				message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）、" ; 
				message1 += actorArr[0][1][0] + "（声：" + actorArr[0][1][1] + "）</span>などが主要キャラとして登場する" ; 
			}else{
				message1 += actorArr[0][0][0] + "、" ; 
				message1 += actorArr[0][1][0] + "</span>などが主要キャラとして登場する" ; 
			}
		}
	}else { //３つ以上ある場合
		if(typeof actorArr[0][2][1] == 'undefined'){ //声優だけの場合
			message1 += actorArr[0][0][0] + "、" ;
			message1 += actorArr[0][1][0] + "、" ;
			message1 += actorArr[0][2][0] + "</span>などが声優として出演する"  ; 
		}else{ //キャラ＋声優の場合
			if(actorArr[0][0][1] != ""){
				message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）、" ; 
				message1 += actorArr[0][1][0] + "（声：" + actorArr[0][1][1] + "）、" ; 
				message1 += actorArr[0][2][0] + "（声：" + actorArr[0][2][1] + "）</span>などが主要キャラとして登場する" ;
			}else{
				message1 += actorArr[0][0][0] + "、" ; 
				message1 += actorArr[0][1][0] + "、" ; 
				message1 += actorArr[0][2][0] + "</span>などが主要キャラとして登場する" ;
			}
		}
	}
	// 問題文が長ったらしくなるので制作会社情報は削除
	/*
	let str = productionCompanyArr[0];
	let before ;
	let after ;
	let kiridasi ;
	for (let i=0; i<20; i++) {
		before = str.indexOf("[");
		after = str.indexOf("]");
		if(before != -1){
			kiridasi = str.substr(before,(after - before +1));
			//alert(kiridasi);
			str = str.replace(kiridasi, '');
		}
	}
	message1 += "、<span style='font-weight:bold;color:#006666;'>" + str + "</span> が制作した" ;
	*/
	
	if(typeof originalWorkCreatorArr[0] != 'undefined' && originalWorkCreatorArr[0] != '' && originalWorkCreatorArr[0] != null){
		message1 += "、<span style='font-weight:bold;color:#000;'>" + originalWorkCreatorArr[0] + "</span> が原作の";
	}
	if(typeof programDurationArr[0] != 'undefined' && programDurationArr[0] != '' && programDurationArr[0] != null){
		message1 += "、" + programDurationArr[0] + "枠の";
	}
	message1 += "テレビアニメは次のどれでしょうか？<br>" ;

	//乱数の生成
	const min = 1 ;
	const max = 3 ; 
	const random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
	if(random == 1){
		message1 += "　　1 --- <a href='" + urlArr[0] + "' target='_blank'>" + nameArr[0] + "</a><br>" ;
		message1 += "　　2 --- <a href='" + urlArr[1] + "' target='_blank'>" + nameArr[1] + "</a><br>" ;
		message1 += "　　3 --- <a href='" + urlArr[2] + "' target='_blank'>" + nameArr[2] + "</a><br>" ;
		kaitouNum = 1 ;
	}else if(random == 2){
		message1 += "　　1 --- <a href='" + urlArr[1] + "' target='_blank'>" + nameArr[1] + "</a><br>" ;
		message1 += "　　2 --- <a href='" + urlArr[0] + "' target='_blank'>" + nameArr[0] + "</a><br>" ;
		message1 += "　　3 --- <a href='" + urlArr[2] + "' target='_blank'>" + nameArr[2] + "</a><br>" ;
		kaitouNum = 2 ;
	}else if(random == 3){
		message1 += "　　1 --- <a href='" + urlArr[2] + "' target='_blank'>" + nameArr[2] + "</a><br>" ;
		message1 += "　　2 --- <a href='" + urlArr[1] + "' target='_blank'>" + nameArr[1] + "</a><br>" ;
		message1 += "　　3 --- <a href='" + urlArr[0] + "' target='_blank'>" + nameArr[0] + "</a><br>" ;
		kaitouNum = 3 ;
	}
	if(typeof trackArr[0] != 'undefined' && trackArr[0] != '' && trackArr[0] != null){
		message1 += "主題歌は <span style='font-weight:bold;color:#000;'>"  + trackArr[0] + "</span> だよ<br>" ;
	}
	seikaiMessage = "正解は" + kaitouNum + "番の <b><a href='" + urlArr[0] + "' target='_blank'>" + nameArr[0] + "</a></b> でした！" ;
	startFlag = 1;  //1:自分が答える番
	resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
	document.getElementById("results").innerHTML = resultStr; 
	scroll();
}

//パターン２（主題歌を回答）
function makeQuestionAnimeP2(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr){

	if(typeof trackArr[0] == 'undefined' || trackArr[0] == '' || trackArr[0] == null ){
		//alert("回避でＱ１へ - 1");
		makeQuestionAnimeP1(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,trackArr,numberOfProgramsArr,periodDisplayedArr,trackArr);
		return;
	}
	let kotaeStr = [];
	for (let i=0; i<trackArr.length; i++) {
		if(kotaeStr.length == 3){
			break ;
		}else{
			if(typeof trackArr[i] != 'undefined' && trackArr[i] != '' && trackArr[i] != null ){
				if(kotaeStr.length == 0){
					kotaeStr[0] = trackArr[i];
				}else if(kotaeStr.length == 1 && kotaeStr[0] != trackArr[i]){
					kotaeStr[1] = trackArr[i];
				}else if(kotaeStr.length == 2 && kotaeStr[1] != trackArr[i]){
					kotaeStr[2] = trackArr[i];
				}
			}
		}
	}
	if(kotaeStr.length < 3){
		makeQuestionAnimeP1(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,trackArr,numberOfProgramsArr,periodDisplayedArr,trackArr);
		return;
	}else{
		let message1 = "" ;
		message1 += startDateArr[0] + "から" + endDateArr[0] + "まで" ;
		if(typeof numberOfProgramsArr[0] != 'undefined'){
			message1 += "全" + numberOfProgramsArr[0] + "話が" ;
		}
		if(typeof publisherArr[0] != 'undefined'){
			message1 += publisherArr[0] + "で" ;
		}
		message1 += "放映された、<span style='font-weight:bold;color:#000;'>" ;

		if(typeof actorArr[0][1] == 'undefined'){ //1つ目だけの場合
			if(typeof actorArr[0][0][1] == 'undefined'){ //声優だけの場合
				message1 += actorArr[0][0][0] + "</span>などが声優として出演する"  ; 
			}else{ //キャラ＋声優の場合
				if(actorArr[0][0][1] != ""){
					message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）</span>などが主要キャラとして登場する" ; 
				}else{
					message1 += actorArr[0][0][0] + "</span>などが主要キャラとして登場する" ; 
				}
			}
		}else if(typeof actorArr[0][2] == 'undefined'){ //２つの場合
			if(typeof actorArr[0][1][1] == 'undefined'){ //声優だけの場合
				message1 += actorArr[0][0][0] + "、" ;
				message1 += actorArr[0][1][0] + "</span>などが声優として出演する"  ; 
			}else{ //キャラ＋声優の場合
				if(actorArr[0][0][1] != ""){
					message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）、" ; 
					message1 += actorArr[0][1][0] + "（声：" + actorArr[0][1][1] + "）</span>などが主要キャラとして登場する" ; 
				}else{
					message1 += actorArr[0][0][0] + "、" ; 
					message1 += actorArr[0][1][0] + "</span>などが主要キャラとして登場する" ; 
				}
			}
		}else { //３つ以上ある場合
			if(typeof actorArr[0][2][1] == 'undefined'){ //声優だけの場合
				message1 += actorArr[0][0][0] + "、" ;
				message1 += actorArr[0][1][0] + "、" ;
				message1 += actorArr[0][2][0] + "</span>などが声優として出演する"  ; 
			}else{ //キャラ＋声優の場合
				if(actorArr[0][0][1] != ""){
					message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）、" ; 
					message1 += actorArr[0][1][0] + "（声：" + actorArr[0][1][1] + "）、" ; 
					message1 += actorArr[0][2][0] + "（声：" + actorArr[0][2][1] + "）</span>などが主要キャラとして登場する" ;
				}else{
					message1 += actorArr[0][0][0] + "、" ; 
					message1 += actorArr[0][1][0] + "、" ; 
					message1 += actorArr[0][2][0] + "</span>などが主要キャラとして登場する" ;
				}
			}
		}

		if(typeof originalWorkCreatorArr[0] != 'undefined'){
			message1 += "、<span style='font-weight:bold;color:#000;'>" + originalWorkCreatorArr[0] + "</span> が原作の";
		}
		if(typeof programDurationArr[0] != 'undefined'){
			message1 += "、" + programDurationArr[0] + "枠の";
		}
		message1 += "テレビアニメ「 <b><a href='" + urlArr[0] + "' target='_blank'>" + nameArr[0] + "</a></b> 」の主題歌は次のどれでしょうか？<br>" ;
		
		//乱数の生成
		var min = 1 ;
		var max = 3 ; 
		var random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
		if(random == 1){
			message1 += "　　1 --- " + kotaeStr[0] + "<br>" ;
			message1 += "　　2 --- " + kotaeStr[1] + "<br>" ;
			message1 += "　　3 --- " + kotaeStr[2] + "<br>" ;
			kaitouNum = 1 ;
		}else if(random == 2){
			message1 += "　　1 --- " + kotaeStr[1] + "<br>" ;
			message1 += "　　2 --- " + kotaeStr[0] + "<br>" ;
			message1 += "　　3 --- " + kotaeStr[2] + "<br>" ;
			kaitouNum = 2 ;
		}else if(random == 3){
			message1 += "　　1 --- " + kotaeStr[2] + "<br>" ;
			message1 += "　　2 --- " + kotaeStr[1] + "<br>" ;
			message1 += "　　3 --- " + kotaeStr[0] + "<br>" ;
			kaitouNum = 3 ;
		}
		seikaiMessage = "正解は" + kaitouNum + "番の <b>" + kotaeStr[0] + "</b> でした！" ;
		startFlag = 1;  //1:自分が答える番
		resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
		document.getElementById("results").innerHTML = resultStr; 
		scroll();
	}
}

//パターン３（原作者を回答）
function makeQuestionAnimeP3(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr){

	if(typeof originalWorkCreatorArr[0] == 'undefined' || originalWorkCreatorArr[0] == '' || originalWorkCreatorArr[0] == null ){
		makeQuestionAnimeP1(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr);
		return;
	}
	let kotaeStr = [];
	for (let i=0; i<originalWorkCreatorArr.length; i++) {
		if(kotaeStr.length == 3){
			break ;
		}else{
			if(typeof originalWorkCreatorArr[i] != 'undefined' && originalWorkCreatorArr[i] != '' && originalWorkCreatorArr[i] != null ){
				if(kotaeStr.length == 0){
					kotaeStr[0] = originalWorkCreatorArr[i];
				}else if(kotaeStr.length == 1 && kotaeStr[0] != originalWorkCreatorArr[i]){
					kotaeStr[1] = originalWorkCreatorArr[i];
				}else if(kotaeStr.length == 2 && kotaeStr[1] != originalWorkCreatorArr[i]){
					kotaeStr[2] = originalWorkCreatorArr[i];
				}
			}
		}
	}
	if(kotaeStr.length < 3){
		makeQuestionAnimeP1(urlArr,nameArr,productionCompanyArr,actorArr,contributorArr,startDateArr,endDateArr,programDurationArr,publisherArr,originalWorkCreatorArr,numberOfProgramsArr,periodDisplayedArr,trackArr);
		return;
		
	}else{
		let message1 = "" ;
		message1 += startDateArr[0] + "から" + endDateArr[0] + "まで" ;
		if(typeof numberOfProgramsArr[0] != 'undefined'){
			message1 += "全" + numberOfProgramsArr[0] + "話が" ;
		}
		
		if(typeof publisherArr[0] != 'undefined'){
			message1 += publisherArr[0] + "で" ;
		}
		message1 += "放映された、<span style='font-weight:bold;color:#000;'>" ;

		if(typeof actorArr[0][1] == 'undefined'){ //1つ目だけの場合
			if(typeof actorArr[0][0][1] == 'undefined'){ //声優だけの場合
				message1 += actorArr[0][0][0] + "</span>などが声優として出演する"  ; 
			}else{ //キャラ＋声優の場合
				if(actorArr[0][0][1] != ""){
					message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）</span>などが主要キャラとして登場する" ; 
				}else{
					message1 += actorArr[0][0][0] + "</span>などが主要キャラとして登場する" ; 
				}
			}
		}else if(typeof actorArr[0][2] == 'undefined'){ //２つの場合
			if(typeof actorArr[0][1][1] == 'undefined'){ //声優だけの場合
				message1 += actorArr[0][0][0] + "、" ;
				message1 += actorArr[0][1][0] + "</span>などが声優として出演する"  ; 
			}else{ //キャラ＋声優の場合
				if(actorArr[0][0][1] != ""){
					message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）、" ; 
					message1 += actorArr[0][1][0] + "（声：" + actorArr[0][1][1] + "）</span>などが主要キャラとして登場する" ; 
				}else{
					message1 += actorArr[0][0][0] + "、" ; 
					message1 += actorArr[0][1][0] + "</span>などが主要キャラとして登場する" ; 
				}
			}
		}else { //３つ以上ある場合
			if(typeof actorArr[0][2][1] == 'undefined'){ //声優だけの場合
				message1 += actorArr[0][0][0] + "、" ;
				message1 += actorArr[0][1][0] + "、" ;
				message1 += actorArr[0][2][0] + "</span>などが声優として出演する"  ; 
			}else{ //キャラ＋声優の場合
				if(actorArr[0][0][1] != ""){
					message1 += actorArr[0][0][0] + "（声：" + actorArr[0][0][1] + "）、" ; 
					message1 += actorArr[0][1][0] + "（声：" + actorArr[0][1][1] + "）、" ; 
					message1 += actorArr[0][2][0] + "（声：" + actorArr[0][2][1] + "）</span>などが主要キャラとして登場する" ;
				}else{
					message1 += actorArr[0][0][0] + "、" ; 
					message1 += actorArr[0][1][0] + "、" ; 
					message1 += actorArr[0][2][0] + "</span>などが主要キャラとして登場する" ;
				}
			}
		}
		
		// 問題文が長ったらしくなるので制作会社情報は削除
		/*
		let str = productionCompanyArr[0];
		let before ;
		let after ;
		let kiridasi ;
		for (let i=0; i<20; i++) {
			before = str.indexOf("[");
			after = str.indexOf("]");
			if(before != -1){
				kiridasi = str.substr(before,(after - before +1));
				//alert(kiridasi);
				str = str.replace(kiridasi, '');
			}
		}
		message1 += "、<span style='font-weight:bold;color:#006666;'>" + str + "</span> が制作した" ;
		*/
			
		if(typeof programDurationArr[0] != 'undefined'){
			message1 += "、" + programDurationArr[0] + "枠の";
		}
		message1 += "テレビアニメ「 <b><a href='" + urlArr[0] + "' target='_blank'>" + nameArr[0] + "</a></b> 」の原作者は次のどれでしょうか？<br>" ;
		
		//乱数の生成
		var min = 1 ;
		var max = 3 ; 
		var random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
		if(random == 1){
			message1 += "　　1 --- " + kotaeStr[0] + "<br>" ;
			message1 += "　　2 --- " + kotaeStr[1] + "<br>" ;
			message1 += "　　3 --- " + kotaeStr[2] + "<br>" ;
			kaitouNum = 1 ;
		}else if(random == 2){
			message1 += "　　1 --- " + kotaeStr[1] + "<br>" ;
			message1 += "　　2 --- " + kotaeStr[0] + "<br>" ;
			message1 += "　　3 --- " + kotaeStr[2] + "<br>" ;
			kaitouNum = 2 ;
		}else if(random == 3){
			message1 += "　　1 --- " + kotaeStr[2] + "<br>" ;
			message1 += "　　2 --- " + kotaeStr[1] + "<br>" ;
			message1 += "　　3 --- " + kotaeStr[0] + "<br>" ;
			kaitouNum = 3 ;
		}
	
		seikaiMessage = "正解は" + kaitouNum + "番の <b>" + kotaeStr[0] + "</b> でした！" ;
		startFlag = 1;  //1:自分が答える番
		resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
		document.getElementById("results").innerHTML = resultStr; 
		scroll();
	}
}

