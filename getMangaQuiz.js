
let forMangaData_maxNum = 5352 ; // グローバル変数（11/22現在は5352だったのでそれを初期値に）

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//最初にゲームクイズ用 forMangaData_maxNum を取得  ///////////////////
function getMaxNumForManga() {
    //クエリ文字列をセット
    let query =  'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> ';
        query += 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ';
        query += 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ';
        query += 'PREFIX schema: <https://schema.org/> ';
        query += 'SELECT (count(?s) as ?count) ';
        query += 'WHERE { ';
        query += '?s schema:genre "マンガ単行本シリーズ" ; ';
        query += 'rdfs:label ?name ; ';
        query += 'schema:creator  ?creator ; ';
        query += 'schema:datePublished  ?time ; ';
        query += 'schema:publisher  ?publisher ; ';
        query += 'schema:brand  ?brand ; ';
        query += 'schema:numberOfItems  ?numberOfItems ; ';
        query += 'schema:inLanguage  "日本語" . ';
        query += 'FILTER regex(?creator, "")  ';
        query += 'FILTER regex(?brand, "")  ';
        query += 'FILTER (xsd:integer(?numberOfItems) >= 5)  '; //５巻以上を対象とする
        query += '}';
    getMaxNumForManga2(query,'https://mediag.bunka.go.jp/sparql',"POST") ; //スパークルクエリ送信
}
function getMaxNumForManga2(queryStr,endpoint,method) { // XMLHttpRequestでクエリ送信
    const querypart = "query=" + encodeURIComponent(queryStr);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, endpoint, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200 || xmlhttp.status == 201 ) {
                getMaxNumForManga3(xmlhttp.responseText);
            } else {
                document.getElementById("results").innerHTML = "エラー000" ;
				return ;
            }
        }
    }
    xmlhttp.send(querypart);
}
function getMaxNumForManga3(text) { // 結果(JSON文字列)を配列に格納
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
    forMangaData_maxNum = Number( rows[0]['count'].value ) ; //URIの数(最大値)をグローバル変数に代入
}
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////   乱数の生成 → 20つのゲームURIとゲーム名を取得   /////////////////
function getRandomNum_M() {
	kaitouNum = 0 ; //回答の番号（初期値は0）
	seikaiMessage = "" ; //正解メッセージ
	const min = 0 ;
	const maxNumMin20 = forMangaData_maxNum - 20 ; //０スタートで20つ取得するためマイナス20する
	const random = Math.floor( Math.random() * (maxNumMin20 + 1 - min) ) + min ; //乱数の生成
	get20manga( random );
}
function get20manga( random ) {
    //クエリ文字列をセット
    let query =  'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> ';
        query += 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ';
        query += 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ';
        query += 'PREFIX schema: <https://schema.org/> ';
        query += 'SELECT * ';
        query += 'WHERE { ';
        query += '?s schema:genre "マンガ単行本シリーズ" ; ';
        query += 'rdfs:label ?name ; ';
        query += 'schema:creator  ?creator ; ';
        query += 'schema:datePublished  ?time ; ';
        query += 'schema:publisher  ?publisher ; ';
        query += 'schema:brand  ?brand ; ';
        query += 'schema:numberOfItems  ?numberOfItems ; ';
        query += 'schema:inLanguage  "日本語" . ';
        query += 'FILTER regex(?creator, "")  ';
        query += 'FILTER regex(?brand, "")  ';
        query += 'FILTER (xsd:integer(?numberOfItems) >= 5)  '; //５巻以上を対象とする
        query += '} OFFSET ';
        query += random;
        query += ' LIMIT 20';
    get20manga2(query,'https://mediag.bunka.go.jp/sparql','POST') ; //スパークルクエリ送信
}
function get20manga2(queryStr,endpoint,method) { // XMLHttpRequestでクエリ送信
    const querypart = "query=" + encodeURIComponent(queryStr);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, endpoint, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Accept", "application/sparql-results+json");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200 || xmlhttp.status == 201 ) {
                get20manga3(xmlhttp.responseText);
            }
        }
    }
    xmlhttp.send(querypart);
}
function get20manga3(text) { // 結果(JSON文字列)を配列に格納
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
	
	//出版社の「〇〇　//　カナ」の「　//　カナ」部分を削除し〇〇だけを残す処理
	let zenkakuSpaceNum
	for (let i=0; i<rows.length; i++) {
		zenkakuSpaceNum = rows[i]['publisher'].value.indexOf('　'); //全角スペース位置を取得
		if(zenkakuSpaceNum != -1){
			rows[i]['publisher'].value = rows[i]['publisher'].value.substr( 0, zenkakuSpaceNum ); //全角スペース前までを切り出し
		}
	}
	
	//初版の出版年月日の処理
	for (let i=0; i<rows.length; i++) {
		if(rows[i]['time'].value.length == 4){
			rows[i]['time'].value = rows[i]['time'].value + "年" ;
		}else if(rows[i]['time'].value.length == 7 ){
			if(rows[i]['time'].value.substr(5, 1) == "0"){
				rows[i]['time'].value = rows[i]['time'].value.substr(0, 4) + "年" + rows[i]['time'].value.substr(6, 1) + "月" ;
			}else{
				rows[i]['time'].value = rows[i]['time'].value.substr(0, 4) + "年" + rows[i]['time'].value.substr(5, 2) + "月" ;
			}
		}else if(rows[i]['time'].value.length == 10 ){
			if(rows[i]['time'].value.substr(5, 1) == "0"){
				if(rows[i]['time'].value.substr(8, 1) == "0"){
					rows[i]['time'].value = rows[i]['time'].value.substr(0, 4) + "年" + rows[i]['time'].value.substr(6, 1) + "月" + rows[i]['time'].value.substr(9, 1) + "日"  ;
				}else{
					rows[i]['time'].value = rows[i]['time'].value.substr(0, 4) + "年" + rows[i]['time'].value.substr(6, 1) + "月" + rows[i]['time'].value.substr(8, 2) + "日"  ;
				}
			}else{
				if(rows[i]['time'].value.substr(8, 1) == "0"){
					rows[i]['time'].value = rows[i]['time'].value.substr(0, 4) + "年" + rows[i]['time'].value.substr(5, 2) + "月" + rows[i]['time'].value.substr(9, 1) + "日"  ;
				}else{
					rows[i]['time'].value = rows[i]['time'].value.substr(0, 4) + "年" + rows[i]['time'].value.substr(5, 2) + "月" + rows[i]['time'].value.substr(8, 2) + "日"  ;
				}
			}
		}
	}
	makeMessageManga(rows);
}
function makeMessageManga(rows) { // 結果(JSON文字列)を配列に格納

	// 問題につかう３つのデータ（ manga20dataArr ）の作成
	let manga20dataArr = [] ; 
	manga20dataArr.push({ s:rows[0]['s'].value , name:rows[0]['name'].value , creator:rows[0]['creator'].value , time:rows[0]['time'].value , publisher:rows[0]['publisher'].value , brand:rows[0]['brand'].value , numberOfItems:rows[0]['numberOfItems'].value });
	for (var i=1; i<rows.length; i++) { // １からスタート（０は格納済）
		if(manga20dataArr.length == 3){
			break ;
		}else if( manga20dataArr.length == 2 && rows[i]['creator'].value != rows[0]['creator'].value && rows[i]['publisher'].value != rows[0]['publisher'].value && rows[i]['creator'].value != rows[1]['creator'].value && rows[i]['publisher'].value != rows[1]['publisher'].value ){
			manga20dataArr.push({ s:rows[i]['s'].value , name:rows[i]['name'].value , creator:rows[i]['creator'].value , time:rows[i]['time'].value , publisher:rows[i]['publisher'].value , brand:rows[i]['brand'].value , numberOfItems:rows[i]['numberOfItems'].value })
		
		}else if( manga20dataArr.length == 1 && rows[i]['creator'].value != rows[0]['creator'].value && rows[i]['publisher'].value != rows[0]['publisher'].value ){
			manga20dataArr.push({ s:rows[i]['s'].value , name:rows[i]['name'].value , creator:rows[i]['creator'].value , time:rows[i]['time'].value , publisher:rows[i]['publisher'].value , brand:rows[i]['brand'].value , numberOfItems:rows[i]['numberOfItems'].value })
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
						makeQuestionMangaP1(manga20dataArr); //マンガ名
					}, "1000");
				}else if(random < 16){
					setTimeout(function () {
						makeQuestionMangaP2(manga20dataArr); //著者名
					}, "1000");
				}else{
					setTimeout(function () {
						makeQuestionMangaP3(manga20dataArr); //出版社・ブランド名
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

//パターン１（マンガ名称を回答）
function makeQuestionMangaP1(manga20dataArr){

	let message1 = "" ;
	message1 += manga20dataArr[0].time + "にコミックス第1巻(初版)が ";
	message1 += "<b>" + manga20dataArr[0].publisher + "</b>「<b>" + manga20dataArr[0].brand + "</b>」により刊行され、";
	message1 += "現在第" + manga20dataArr[0].numberOfItems + "巻まで出版されている、";
	message1 += "<b>" + manga20dataArr[0].creator + "</b> によるマンガは次のどれでしょうか？<br>";

	//乱数の生成
	var min = 1 ;
	var max = 3 ; 
	var random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
	if(random == 1){
		message1 += "　　1 --- <a href='" + manga20dataArr[0].s + "' target='_blank'>" + manga20dataArr[0].name + "</a><br>" ;
		message1 += "　　2 --- <a href='" + manga20dataArr[1].s + "' target='_blank'>" + manga20dataArr[1].name + "</a><br>" ;
		message1 += "　　3 --- <a href='" + manga20dataArr[2].s + "' target='_blank'>" + manga20dataArr[2].name + "</a><br>" ;
		kaitouNum = 1 ;
	}else if(random == 2){
		message1 += "　　1 --- <a href='" + manga20dataArr[1].s + "' target='_blank'>" + manga20dataArr[1].name + "</a><br>" ;
		message1 += "　　2 --- <a href='" + manga20dataArr[0].s + "' target='_blank'>" + manga20dataArr[0].name + "</a><br>" ;
		message1 += "　　3 --- <a href='" + manga20dataArr[2].s + "' target='_blank'>" + manga20dataArr[2].name + "</a><br>" ;
		kaitouNum = 2 ;
	}else if(random == 3){
		message1 += "　　1 --- <a href='" + manga20dataArr[2].s + "' target='_blank'>" + manga20dataArr[2].name + "</a><br>" ;
		message1 += "　　2 --- <a href='" + manga20dataArr[1].s + "' target='_blank'>" + manga20dataArr[1].name + "</a><br>" ;
		message1 += "　　3 --- <a href='" + manga20dataArr[0].s + "' target='_blank'>" + manga20dataArr[0].name + "</a><br>" ;
		kaitouNum = 3 ;
	}
	seikaiMessage = "正解は" + kaitouNum + "番の <b><a href='" + manga20dataArr[0].s + "' target='_blank'>" + manga20dataArr[0].name + "</a></b> でした！" ;
	
	startFlag = 1;  //1:自分が答える番
	resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
	document.getElementById("results").innerHTML = resultStr; 
	scroll();
			
}

//パターン２（マンガ作者を回答）
function makeQuestionMangaP2(manga20dataArr){

	let message1 = "" ;
	message1 += manga20dataArr[0].time + "にコミックス第1巻(初版)が ";
	message1 += "<b>" + manga20dataArr[0].publisher + "</b>「<b>" + manga20dataArr[0].brand + "</b>」により刊行され、";
	message1 += "現在第" + manga20dataArr[0].numberOfItems + "巻まで出版されているマンガ";
	message1 += "『 <b><a href='" + manga20dataArr[0].s + "' target='_blank'>" + manga20dataArr[0].name + "</a></b> 』の作者は次のどれでしょうか？<br>";

	//乱数の生成
	const min = 1 ;
	const max = 3 ; 
	const random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
	if(random == 1){
		message1 += "　　1 --- " + manga20dataArr[0].creator + "<br>" ;
		message1 += "　　2 --- " + manga20dataArr[1].creator + "<br>" ;
		message1 += "　　3 --- " + manga20dataArr[2].creator + "<br>" ;
		kaitouNum = 1 ;
	}else if(random == 2){
		message1 += "　　1 --- " + manga20dataArr[1].creator + "<br>" ;
		message1 += "　　2 --- " + manga20dataArr[0].creator + "<br>" ;
		message1 += "　　3 --- " + manga20dataArr[2].creator + "<br>" ;
		kaitouNum = 2 ;
	}else if(random == 3){
		message1 += "　　1 --- " + manga20dataArr[2].creator + "<br>" ;
		message1 += "　　2 --- " + manga20dataArr[1].creator + "<br>" ;
		message1 += "　　3 --- " + manga20dataArr[0].creator + "<br>" ;
		kaitouNum = 3 ;
	}
	seikaiMessage = "正解は" + kaitouNum + "番の <b>" + manga20dataArr[0].creator + "</b> でした！" ;
	
	startFlag = 1;  //1:自分が答える番
	resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
	document.getElementById("results").innerHTML = resultStr; 
	scroll();
			
}

//パターン３（出版社とブランド名を回答）
function makeQuestionMangaP3(manga20dataArr){

	let message1 = "" ;
	message1 += manga20dataArr[0].time + "にコミックス第1巻(初版)が刊行され、";
	message1 += "現在第" + manga20dataArr[0].numberOfItems + "巻まで出版されている、";
	message1 += "<b>" + manga20dataArr[0].creator + "</b> によるマンガ";
	message1 += "『 <b><a href='" + manga20dataArr[0].s + "' target='_blank'>" + manga20dataArr[0].name + "</a></b> 』の出版社とブランド名の組み合わせで正しいのは次のどれでしょうか？<br>";

	//乱数の生成
	const min = 1 ;
	const max = 3 ; 
	const random = Math.floor( Math.random() * (max + 1 - min) ) + min ; // random の数が答え
	if(random == 1){
		message1 += "　　1 --- " + manga20dataArr[0].publisher + "「" + manga20dataArr[0].brand + "」<br>" ;
		message1 += "　　2 --- " + manga20dataArr[1].publisher + "「" + manga20dataArr[1].brand + "」<br>" ;
		message1 += "　　3 --- " + manga20dataArr[2].publisher + "「" + manga20dataArr[2].brand + "」<br>" ;
		kaitouNum = 1 ;
	}else if(random == 2){
		message1 += "　　1 --- " + manga20dataArr[1].publisher + "「" + manga20dataArr[1].brand + "」<br>" ;
		message1 += "　　2 --- " + manga20dataArr[0].publisher + "「" + manga20dataArr[0].brand + "」<br>" ;
		message1 += "　　3 --- " + manga20dataArr[2].publisher + "「" + manga20dataArr[2].brand + "」<br>" ;
		kaitouNum = 2 ;
	}else if(random == 3){
		message1 += "　　1 --- " + manga20dataArr[2].publisher + "「" + manga20dataArr[2].brand + "」<br>" ;
		message1 += "　　2 --- " + manga20dataArr[1].publisher + "「" + manga20dataArr[1].brand + "」<br>" ;
		message1 += "　　3 --- " + manga20dataArr[0].publisher + "「" + manga20dataArr[0].brand + "」<br>" ;
		kaitouNum = 3 ;
	}
	seikaiMessage = "正解は" + kaitouNum + "番の <b>" + manga20dataArr[0].publisher + "「" + manga20dataArr[0].brand + "」</b> でした！" ;
	
	startFlag = 1;  //1:自分が答える番
	resultStr += "<span class='shiri'>メデ美</span>：" + message1  ;
	document.getElementById("results").innerHTML = resultStr; 
	scroll();
			
}

