//全角 → 半角（英数字）
function hankaku2Zenkaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

//会話ごとに一番下にスクロールする処理
function scroll(){
	scrollPoint = scrollPoint + 100;		
	document.getElementById("inner").scrollTop = scrollPoint;
}
//通常時のメッセージ
function normalMessage(str) {
	str = hankanaToKana(str); //半角カナ→全角カナ
	str = kanaToHira(str) //全画カナ→ひらがな
	let randomT = Math.floor( Math.random() * 5 );
	
	if(str.match(/おしまい/) || str.match(/やらない/) || str.match(/やらん/) || str.match(/やめる/) || str.match(/しない/) || str.match(/いや/) || str.match(/おわり/) || str.match(/おわる/) || str.match(/終わ/) || str.match(/やだ/) || str.match(/いいえ/) ){
		if(randomT === 0){
			resultStr += "<span class='shiri'>メデ美</span>：ええ～～～…　メデ美泣いちゃうよ…　クイズやろうよぉ…<br>" ;
		}else if(randomT === 1){
			resultStr += "<span class='shiri'>メデ美</span>：そんなこと言わないで遊ぼうよぉ…<br>" ;
		}else if(randomT === 2){
			resultStr += "<span class='shiri'>メデ美</span>：おねがい、あと１回だけ！<br>" ;
		}else if(randomT === 3){
			resultStr += "<span class='shiri'>メデ美</span>：うそ………　クイズしないなんておかしいよ……<br>" ;
		}else{
			resultStr += "<span class='shiri'>メデ美</span>：ちょっとまって、考えなおそうよ…　クイズしようよ…<br>" ;
		}
	}else if( str =="きれい" ||  str =="綺麗" ||  str =="すてき" ||  str =="素敵" ||  str =="天使" ||  str =="てんし" ||  str =="すき" || str =="かわいい" || str =="可愛い" || str =="びじん" || str =="美人" || str =="うつくしい" || str =="美しい"  || str.match(/だいすき/) || str.match(/大好き/) ){
		if(randomT === 0){
			resultStr += "<span class='shiri'>メデ美</span>：ありがとー&#x1f495;<br>" ;
		}else if(randomT === 1){
			resultStr += "<span class='shiri'>メデ美</span>：りんなにも同じこと言ってたでしょー。ほめても何もでないよ&#x1f495;<br>" ;
		}else if(randomT === 2){
			resultStr += "<span class='shiri'>メデ美</span>：うん、知ってる。でもありがと&#x1f495;<br>" 
		}else if(randomT === 3){
			resultStr += "<span class='shiri'>メデ美</span>：ミクとどっちがかわいい？<br>" ;
		}else{
			resultStr += "<span class='shiri'>メデ美</span>：きゃーありがとう！大好き&#x1f495;<br>" ;
		}
	}else if( str == "ころす" ||  str == "殺す" || str == "しね" || str == "死ね" || str == "ばか" || str == "あほ" || str == "きらい" || str == "ぶす" || str == "ぶさいく" ){
		if(randomT === 0){
			resultStr += "<span class='shiri'>メデ美</span>：もうやめる。バイバイ<br>" ;
		}else if(randomT === 1){
			resultStr += "<span class='shiri'>メデ美</span>：もういい、やめる<br>" ;
		}else if(randomT === 2){
			resultStr += "<span class='shiri'>メデ美</span>：もうあんたとは遊ばない<br>" ;
		}else if(randomT === 3){
			resultStr += "<span class='shiri'>メデ美</span>：おまえこそ〇〇じゃ<br>" ;
		}else{
			resultStr += "<span class='shiri'>メデ美</span>：クイズやめる。おしまい。<br>" ;
		}
		document.getElementById("txt1").disabled = true;
		//何回もストップしないと止まらない…
		stopRepeat = 1; //リピートをストップ
		stopRepeat = 1; //リピートをストップ
		stopRepeat = 1; //リピートをストップ
		setTimeout(function () {
			stopRepeat = 1; //リピートをストップ
				setTimeout(function () {
					stopRepeat = 1; //リピートをストップ
				}, "50");
		}, "50");
		return;
	}else if(str == "メデ美" || str == "めでみ" || str == "medemi" || str == "MEDEMI" || str == "メデミ" ){
		if(randomT === 0){
			resultStr += "<span class='shiri'>メデ美</span>：呼んだ？<br>" ;
		}else if(randomT === 1){
			resultStr += "<span class='shiri'>メデ美</span>：はーい！<br>" ;
		}else if(randomT === 2){
			resultStr += "<span class='shiri'>メデ美</span>：はいはーい！<br>" 
		}else if(randomT === 3){
			resultStr += "<span class='shiri'>メデ美</span>：へーい！<br>" ;
		}else{
			resultStr += "<span class='shiri'>メデ美</span>：ほーい！<br>" ;
		}			
	}else if(str == "" || str == " " || str == "  " || str == "   " || str == "    " || str == "      " || str == "　" || str == "　　" || str == "　　　" || str == "　　　　" || str == "　　　　　"){
		if(randomT === 0){
			resultStr += "<span class='shiri'>メデ美</span>：なんか言った？？？<br>" ;
		}else if(randomT === 1){
			resultStr += "<span class='shiri'>メデ美</span>：え？　きこえないよ？<br>" ;
		}else if(randomT === 2){
			resultStr += "<span class='shiri'>メデ美</span>：だまってたらわかんないよ…<br>" 
		}else if(randomT === 3){
			resultStr += "<span class='shiri'>メデ美</span>：なんか言って！<br>" ;
		}else{
			resultStr += "<span class='shiri'>メデ美</span>：ん？<br>" ;
		}
	}else if(str.slice(-1) == "あ" || str.slice(-1) == "ぁ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：あめりかんどっぐ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：あっぷるぱい<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：あすぱらがす<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：あぼかど<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：あんきも<br>" ;}
	}else if(str.slice(-1) == "い" || str.slice(-1) == "ぃ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：いちじく<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：いせえび<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：いくら<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：いいだこ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：いとこんにゃく<br>" ;}
	}else if(str.slice(-1) == "う" || str.slice(-1) == "ぅ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：うぐいすまめ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ういろう<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：うなぎぱい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：うぐいすもち<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：うみぶどう<br>" ;}
	}else if(str.slice(-1) == "え" || str.slice(-1) == "ぇ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：えのきだけ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：えほうまき<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：えくれあ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：えだまめ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：えんがわ<br>" ;}
	}else if(str.slice(-1) == "お" || str.slice(-1) == "ぉ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：おにぎり<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：おむらいす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：おろしそば<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：おにおんすーぷ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：おむれつ<br>" ;}
	}else if(str.slice(-1) == "か"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：かすてら<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：かりんとう<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：かれーらいす<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：かまんべーるちーず<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：かしゅーなっつ<br>" ;}
	}else if(str.slice(-1) == "き"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：きゃらめる<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：きんつば<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：きむち<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：きくらげ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：きなこもち<br>" ;}
	}else if(str.slice(-1) == "く"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：くっきー<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：くるみ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：くしだんご<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：くさもち<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：くわい<br>" ;}
	}else if(str.slice(-1) == "け"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：けがに<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：けんちんじる<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：けずりぶし<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：けちゃっぷ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：けんさきいか<br>" ;}
	}else if(str.slice(-1) == "こ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：こあらのまーち<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：こんにゃく<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ころっけ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：こもちししゃも<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：こーんふれーく<br>" ;}
	}else if(str.slice(-1) == "さ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：さきいか<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：さつまいも<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：さけるちーず<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：さくらんぼ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：さにーれたす<br>" ;}
	}else if(str.slice(-1) == "し"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：しいたけ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ししゃも<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：しょーとけーき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：しまらっきょう<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：しゃぶしゃぶ<br>" ;}
	}else if(str.slice(-1) == "す"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：すくらんぶるえっぐ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：すこんぶ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：すもも<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：すいぎょうざ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：すなぎも<br>" ;}
	}else if(str.slice(-1) == "せ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：せろり<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：せんまいづけ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：せんべいじる<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：せんべい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：せきはん。　あ、「ん」ついちゃった<br>" ;}
	}else if(str.slice(-1) == "そ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：そふとくりーむ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：そーせーじ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：そらまめ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：そーすやきそば<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：そーきそば<br>" ;}
	}else if(str.slice(-1) == "た"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：たぴおかみるくてぃー<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：たこやき<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：たいやき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：たつたあげ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：たけのこ<br>" ;}
	}else if(str.slice(-1) == "ち"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ちょこれーと<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ちきんかつ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ちーずふぉんでゅ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ちょこぱい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ちーずおかき<br>" ;}
	}else if(str.slice(-1) == "つ" || str.slice(-1) == "っ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：つなまよまき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：つみれじる<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：つるしべーこん<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：つばめのす<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：つくね<br>" ;}
	}else if(str.slice(-1) == "て"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：てんぷら<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：てっちり<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：てまきずし<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：てりやきばーがー<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：てんぷらそば<br>" ;}
	}else if(str.slice(-1) == "と"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：とりがい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：とんぶり<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：とるてぃーや<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：とんそく<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：とこぶし<br>" ;}
	}else if(str.slice(-1) == "な"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：なたでここ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：なまはむめろん<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：なめこそば<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ななくさがゆ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：なまびーる<br>" ;}
	}else if(str.slice(-1) == "に"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：にくだんご<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：にがうり<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：にんにくのめ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：にくじゃが<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：にゅーよーくちーずけーき<br>" ;}
	}else if(str.slice(-1) == "ぬ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぬれせんべい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぬかずけ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぬーどる<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぬたうなぎ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぬかみそ<br>" ;}
	}else if(str.slice(-1) == "ね"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ねるねるねるね<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ねぎとろ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ねこんぶ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ねぎやき<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ねぎ<br>" ;}
	}else if(str.slice(-1) == "の"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：のっぺいじる<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：のしもち<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：のりたま<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：のむよーぐると<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：のどぐろ<br>" ;}
	}else if(str.slice(-1) == "は"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：はんばーぐ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：はやしらいす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：はむかつ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：はるまき<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：はっしゅどぽてと<br>" ;}
	}else if(str.slice(-1) == "ひ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ひめりんご<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ひなあられ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ひよこまめ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ひじき<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ひしもち<br>" ;}
	}else if(str.slice(-1) == "ふ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ふぉあぐら<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ふぐさし<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ふじりんご<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ふらんくふるとそーせーじ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ふぇっとちーね<br>" ;}
	}else if(str.slice(-1) == "へ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：へぎそば<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：へしこ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：へーぜるなっつ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：へちま<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：へるしありょくちゃ<br>" ;}
	}else if(str.slice(-1) == "ほ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ほっとけーき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ほっけ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ほるもんやき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ほっきがい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ほたるいか<br>" ;}
	}else if(str.slice(-1) == "ま"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：まっしゅるーむ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：まかだみあなっつ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ますかっと<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：まどれーぬ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ましゅまろ<br>" ;}
	}else if(str.slice(-1) == "み"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：みたらしだんご<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：みーとそーす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：みーとぼーる<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：みるふぃーゆ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：みねすとろーね<br>" ;}
	}else if(str.slice(-1) == "む"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：むぎちょこ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：むしいも<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：むーるがい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：むきえび<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：むにえる<br>" ;}
	}else if(str.slice(-1) == "め"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：めんちかつ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：めーぷるしろっぷ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：めんたいこ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：めんま<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：めだまやき<br>" ;}
	}else if(str.slice(-1) == "も"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：もずく<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：もも<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：もち<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：もやし<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：もつに<br>" ;}
	}else if(str.slice(-1) == "や"|| str.slice(-1) == "ゃ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：やまいも<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：やきそば<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：やきりんご<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：やきとり<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：やきにく<br>" ;}
	}else if(str.slice(-1) == "ゆ"|| str.slice(-1) == "ゅ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ゆどうふ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ゆでたまご<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ゆっけ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ゆきみだいふく<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ゆば<br>" ;}
	}else if(str.slice(-1) == "よ"|| str.slice(-1) == "ょ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：よっちゃんいか<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：よーぐると<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ようめいしゅ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ようなし<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：よしぎゅう<br>" ;}
	}else if(str.slice(-1) == "ら"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：らーめ…　おっと、らざにあ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：らっきょう<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：らいちょうのさと<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：らふらんす<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：らでぃっしゅ<br>" ;}
	}else if(str.slice(-1) == "り"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：りんぐいね<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：りぶろーす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：りょくとうもやし<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：りぞっと<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：りーふれたす<br>" ;}
	}else if(str.slice(-1) == "る"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：るーとびあ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：るまんど<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：るいぼすてぃー<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：るっこら<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：るいべ<br>" ;}
	}else if(str.slice(-1) == "れ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：れあちーずけーき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：れたす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：れもんぱい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：れんずまめ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：れんこんのはさみあげ<br>" ;}
	}else if(str.slice(-1) == "ろ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ろーすはむ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ろぶすたー<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ろーるきゃべつ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ろーすとびーふ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ろーるけーき<br>" ;}
	}else if(str.slice(-1) == "わ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：わたあめ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：わっふる<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：わらびもち<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：わっぱめし<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：わさびづけ<br>" ;}
	}else if(str.slice(-1) == "ん"){
		resultStr += "<span class='shiri'>メデ美</span>：ん…　ンジャメナ<br>" ;
	}else if(str.slice(-1) == "が"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：がとーしょこら<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：がんもどき<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：がむ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：がなっしゅ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：がーりっくとーすと<br>" ;}
	}else if(str.slice(-1) == "ぎ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぎゅうどん<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぎょうざ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぎょにくそーせーじ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぎあら<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぎょくろ<br>" ;}
	}else if(str.slice(-1) == "ぐ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぐんかんまき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぐれーぷふるーつ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぐりんぴーす<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぐりこ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぐみ<br>" ;}
	}else if(str.slice(-1) == "げ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：げっぺい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：げそやき<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：げんまいちゃ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：げんこつせんべい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：げそあげ<br>" ;}
	}else if(str.slice(-1) == "ご"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ごもくすし<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ごこくまい<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ごまどうふ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ごるごんぞーら<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ごまだんご<br>" ;}
	}else if(str.slice(-1) == "ざ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ざーさい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ざわーくらうと<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ざらめせんべい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ざるそば<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ざくろ<br>" ;}
	}else if(str.slice(-1) == "じ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：じゃんばらや<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：じゃーまんぽてと<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：じねんじょ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：じゃわかれー<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：じゃいあんとかぷりこ<br>" ;}
	}else if(str.slice(-1) == "ず"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ずっきーに<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ずんだもち<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ずいき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ずわいがに<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ずぶろっか<br>" ;}
	}else if(str.slice(-1) == "ぜ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぜんまい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぜりー<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぜんざい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぜすぷりごーるど<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぜりーびーんず<br>" ;}
	}else if(str.slice(-1) == "ぞ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぞうに<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぞうすい<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぞうに<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぞうすい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぞうに<br>" ;}
	}else if(str.slice(-1) == "だ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：だちょうのたまご<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：だいず<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：だんご<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：だっかるび<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：だいふくもち<br>" ;}
	}else if(str.slice(-1) == "で"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：でみぐらすそーす<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：でんがく<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：でみぐらすそーす<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：でんがく<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：でこぽん。　あ、「ん」ついちゃった<br>" ;}
	}else if(str.slice(-1) == "ど"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：どてやき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：どびんむし<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：どぶろく<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：どらいかれー<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：どらごんふるーつ<br>" ;}
	}else if(str.slice(-1) == "ば"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ばばろあ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ばってら<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ばさし<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ばーにゃかうだ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ばーもんとかれー<br>" ;}
	}else if(str.slice(-1) == "び"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：びすけっと<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：びーふしちゅー<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：びしそわーず<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：びびんば<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：びーふじゃーきー　<br>" ;}
	}else if(str.slice(-1) == "ぶ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぶるがりあよーぐると<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぶりだいこん<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぶろっこりー<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぶいやべーす<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぶいとーに<br>" ;}
	}else if(str.slice(-1) == "べ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：べにいも<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：べにいもたると<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：べにしょうが<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：べっこうあめ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：べーこんえっぐ<br>" ;}
	}else if(str.slice(-1) == "ぼ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぼんごれびあんこ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぼたもち<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぼろにあそーせーじ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぼたんなべ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぼんたんあめ<br>" ;}
	}else if(str.slice(-1) == "ぱ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぱんなこった<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぱいなっぷる<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぱうんどけーき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぱえりあ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぱるめざんちーず<br>" ;}
	}else if(str.slice(-1) == "ぴ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぴーなっつ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぴくるす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぴすたちお<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぴーちぱい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぴろしき<br>" ;}
	}else if(str.slice(-1) == "ぷ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぷりん。もとい、ぷらむ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぷっちょ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぷりまはむ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぷちとまと<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぷれっつぇる<br>" ;}
	}else if(str.slice(-1) == "ぺ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぺきんだっく<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぺぱーみんと<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぺすかとーれ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぺーるえーる<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぺぺろんちーの<br>" ;}
	}else if(str.slice(-1) == "ぽ"){
		if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぽっきー<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぽてとふらい<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぽてとさらだ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぽんでりんぐ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぽりんきー<br>" ;}
	}else if(str.slice(-1) == "ー"){
		if(str.substr(-2,1) == "あ" || str.substr(-2,1) == "ぁ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：あめりかんどっぐ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：あっぷるぱい<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：あすぱらがす<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：あぼかど<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：あんきも<br>" ;}
		}else if(str.substr(-2,1) == "い" || str.substr(-2,1) == "ぃ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：いちじく<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：いせえび<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：いくら<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：いいだこ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：いとこんにゃく<br>" ;}
		}else if(str.substr(-2,1) == "う" || str.substr(-2,1) == "ぅ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：うぐいすまめ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ういろう<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：うなぎぱい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：うぐいすもち<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：うみぶどう<br>" ;}
		}else if(str.substr(-2,1) == "え" || str.substr(-2,1) == "ぇ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：えのきだけ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：えほうまき<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：えくれあ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：えだまめ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：えんがわ<br>" ;}
		}else if(str.substr(-2,1) == "お" || str.substr(-2,1) == "ぉ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：おにぎり<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：おむらいす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：おろしそば<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：おにおんすーぷ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：おむれつ<br>" ;}
		}else if(str.substr(-2,1) == "か"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：かすてら<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：かりんとう<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：かれーらいす<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：かまんべーるちーず<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：かしゅーなっつ<br>" ;}
		}else if(str.substr(-2,1) == "き"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：きゃらめる<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：きんつば<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：きむち<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：きくらげ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：きなこもち<br>" ;}
		}else if(str.substr(-2,1) == "く"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：くっきー<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：くるみ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：くしだんご<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：くさもち<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：くわい<br>" ;}
		}else if(str.substr(-2,1) == "け"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：けがに<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：けんちんじる<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：けずりぶし<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：けちゃっぷ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：けんさきいか<br>" ;}
		}else if(str.substr(-2,1) == "こ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：こあらのまーち<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：こんにゃく<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ころっけ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：こもちししゃも<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：こーんふれーく<br>" ;}
		}else if(str.substr(-2,1) == "さ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：さきいか<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：さつまいも<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：さけるちーず<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：さくらんぼ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：さにーれたす<br>" ;}
		}else if(str.substr(-2,1) == "し"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：しいたけ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ししゃも<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：しょーとけーき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：しまらっきょう<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：しゃぶしゃぶ<br>" ;}
		}else if(str.substr(-2,1) == "す"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：すくらんぶるえっぐ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：すこんぶ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：すもも<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：すいぎょうざ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：すなぎも<br>" ;}
		}else if(str.substr(-2,1) == "せ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：せろり<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：せんまいづけ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：せんべいじる<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：せんべい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：せきはん。　あ、「ん」ついちゃった<br>" ;}
		}else if(str.substr(-2,1) == "そ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：そふとくりーむ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：そーせーじ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：そらまめ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：そーすやきそば<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：そーきそば<br>" ;}
		}else if(str.substr(-2,1) == "た"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：たぴおかみるくてぃー<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：たこやき<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：たいやき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：たつたあげ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：たけのこ<br>" ;}
		}else if(str.substr(-2,1) == "ち"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ちょこれーと<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ちきんかつ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ちーずふぉんでゅ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ちょこぱい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ちーずおかき<br>" ;}
		}else if(str.substr(-2,1) == "つ" || str.substr(-2,1) == "っ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：つなまよまき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：つみれじる<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：つるしべーこん<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：つばめのす<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：つくね<br>" ;}
		}else if(str.substr(-2,1) == "て"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：てんぷら<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：てっちり<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：てまきずし<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：てりやきばーがー<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：てんぷらそば<br>" ;}
		}else if(str.substr(-2,1) == "と"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：とりがい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：とんぶり<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：とるてぃーや<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：とんそく<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：とこぶし<br>" ;}
		}else if(str.substr(-2,1) == "な"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：なたでここ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：なまはむめろん<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：なめこそば<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ななくさがゆ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：なまびーる<br>" ;}
		}else if(str.substr(-2,1) == "に"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：にくだんご<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：にがうり<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：にんにくのめ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：にくじゃが<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：にゅーよーくちーずけーき<br>" ;}
		}else if(str.substr(-2,1) == "ぬ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぬれせんべい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぬかずけ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぬーどる<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぬたうなぎ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぬかみそ<br>" ;}
		}else if(str.substr(-2,1) == "ね"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ねるねるねるね<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ねぎとろ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ねこんぶ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ねぎやき<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ねぎ<br>" ;}
		}else if(str.substr(-2,1) == "の"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：のっぺいじる<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：のしもち<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：のりたま<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：のむよーぐると<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：のどぐろ<br>" ;}
		}else if(str.substr(-2,1) == "は"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：はんばーぐ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：はやしらいす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：はむかつ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：はるまき<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：はっしゅどぽてと<br>" ;}
		}else if(str.substr(-2,1) == "ひ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ひめりんご<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ひなあられ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ひよこまめ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ひじき<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ひしもち<br>" ;}
		}else if(str.substr(-2,1) == "ふ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ふぉあぐら<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ふぐさし<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ふじりんご<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ふらんくふるとそーせーじ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ふぇっとちーね<br>" ;}
		}else if(str.substr(-2,1) == "へ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：へぎそば<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：へしこ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：へーぜるなっつ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：へちま<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：へるしありょくちゃ<br>" ;}
		}else if(str.substr(-2,1) == "ほ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ほっとけーき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ほっけ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ほるもんやき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ほっきがい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ほたるいか<br>" ;}
		}else if(str.substr(-2,1) == "ま"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：まっしゅるーむ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：まかだみあなっつ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ますかっと<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：まどれーぬ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ましゅまろ<br>" ;}
		}else if(str.substr(-2,1) == "み"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：みたらしだんご<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：みーとそーす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：みーとぼーる<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：みるふぃーゆ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：みねすとろーね<br>" ;}
		}else if(str.substr(-2,1) == "む"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：むぎちょこ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：むしいも<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：むーるがい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：むきえび<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：むにえる<br>" ;}
		}else if(str.substr(-2,1) == "め"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：めんちかつ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：めーぷるしろっぷ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：めんたいこ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：めんま<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：めだまやき<br>" ;}
		}else if(str.substr(-2,1) == "も"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：もずく<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：もも<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：もち<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：もやし<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：もつに<br>" ;}
		}else if(str.substr(-2,1) == "や"|| str.substr(-2,1) == "ゃ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：やまいも<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：やきそば<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：やきりんご<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：やきとり<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：やきにく<br>" ;}
		}else if(str.substr(-2,1) == "ゆ"|| str.substr(-2,1) == "ゅ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ゆどうふ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ゆでたまご<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ゆっけ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ゆきみだいふく<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ゆば<br>" ;}
		}else if(str.substr(-2,1) == "よ"|| str.substr(-2,1) == "ょ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：よっちゃんいか<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：よーぐると<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ようめいしゅ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ようなし<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：よしぎゅう<br>" ;}
		}else if(str.substr(-2,1) == "ら"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：らーめ…　おっと、らざにあ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：らっきょう<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：らいちょうのさと<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：らふらんす<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：らでぃっしゅ<br>" ;}
		}else if(str.substr(-2,1) == "り"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：りんぐいね<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：りぶろーす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：りょくとうもやし<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：りぞっと<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：りーふれたす<br>" ;}
		}else if(str.substr(-2,1) == "る"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：るーとびあ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：るまんど<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：るいぼすてぃー<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：るっこら<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：るいべ<br>" ;}
		}else if(str.substr(-2,1) == "れ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：れあちーずけーき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：れたす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：れもんぱい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：れんずまめ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：れんこんのはさみあげ<br>" ;}
		}else if(str.substr(-2,1) == "ろ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ろーすはむ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ろぶすたー<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ろーるきゃべつ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ろーすとびーふ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ろーるけーき<br>" ;}
		}else if(str.substr(-2,1) == "わ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：わたあめ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：わっふる<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：わらびもち<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：わっぱめし<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：わさびづけ<br>" ;}
		}else if(str.substr(-2,1) == "ん"){
			resultStr += "<span class='shiri'>メデ美</span>：ん…　ンジャメナ<br>" ;
		}else if(str.substr(-2,1) == "が"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：がとーしょこら<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：がんもどき<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：がむ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：がなっしゅ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：がーりっくとーすと<br>" ;}
		}else if(str.substr(-2,1) == "ぎ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぎゅうどん<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぎょうざ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぎょにくそーせーじ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぎあら<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぎょくろ<br>" ;}
		}else if(str.substr(-2,1) == "ぐ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぐんかんまき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぐれーぷふるーつ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぐりんぴーす<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぐりこ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぐみ<br>" ;}
		}else if(str.substr(-2,1) == "げ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：げっぺい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：げそやき<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：げんまいちゃ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：げんこつせんべい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：げそあげ<br>" ;}
		}else if(str.substr(-2,1) == "ご"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ごもくすし<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ごごくまい<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ごまどうふ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ごるごんぞーら<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ごまだんご<br>" ;}
		}else if(str.substr(-2,1) == "ざ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ざーさい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ざわーくらうと<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ざらめせんべい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ざるそば<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ざくろ<br>" ;}
		}else if(str.substr(-2,1) == "じ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：じゃんばらや<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：じゃーまんぽてと<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：じねんじょ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：じゃわかれー<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：じゃいあんとかぷりこ<br>" ;}
		}else if(str.substr(-2,1) == "ず"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ずっきーに<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ずんだもち<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ずいき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ずわいがに<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ずぶろっか<br>" ;}
		}else if(str.substr(-2,1) == "ぜ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぜんまい<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぜりー<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぜんざい<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぜすぷりごーるど<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぜりーびーんず<br>" ;}
		}else if(str.substr(-2,1) == "ぞ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぞうに<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぞうすい<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぞうに<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぞうすい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぞうに<br>" ;}
		}else if(str.substr(-2,1) == "だ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：だちょうのたまご<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：だいず<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：だんご<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：だっかるび<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：だいふくもち<br>" ;}
		}else if(str.substr(-2,1) == "で"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：でみぐらすそーす<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：でんがく<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：でみぐらすそーす<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：でんがく<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：でこぽん。　あ、「ん」ついちゃった<br>" ;}
		}else if(str.substr(-2,1) == "ど"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：どてやき<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：どびんむし<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：どぶろく<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：どらいかれー<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：どらごんふるーつ<br>" ;}
		}else if(str.substr(-2,1) == "ば"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ばばろあ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ばってら<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ばさし<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ばーにゃかうだ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ばーもんとかれー<br>" ;}
		}else if(str.substr(-2,1) == "び"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：びすけっと<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：びーふしちゅー<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：びしそわーず<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：びびんば<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：びーふじゃーきー　<br>" ;}
		}else if(str.substr(-2,1) == "ぶ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぶるがりあよーぐると<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぶりだいこん<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぶろっこりー<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぶいやべーす<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぶいとーに<br>" ;}
		}else if(str.substr(-2,1) == "べ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：べにいも<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：べにいもたると<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：べにしょうが<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：べっこうあめ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：べーこんえっぐ<br>" ;}
		}else if(str.substr(-2,1) == "ぼ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぼんごれびあんこ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぼたもち<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぼろにあそーせーじ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぼたんなべ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぼんたんあめ<br>" ;}
		}else if(str.substr(-2,1) == "ぱ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぱんなこった<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぱいなっぷる<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぱうんどけーき<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぱえりあ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぱるめざんちーず<br>" ;}
		}else if(str.substr(-2,1) == "ぴ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぴーなっつ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぴくるす<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぴすたちお<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぴーちぱい<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぴろしき<br>" ;}
		}else if(str.substr(-2,1) == "ぷ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぷりん。もとい、ぷらむ<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぷっちょ<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぷりまはむ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぷちとまと<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぷれっつぇる<br>" ;}
		}else if(str.substr(-2,1) == "ぺ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぺきんだっく<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぺぱーみんと<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぺすかとーれ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぺーるえーる<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぺぺろんちーの<br>" ;}
		}else if(str.substr(-2,1) == "ぽ"){
			if(randomT === 0){resultStr += "<span class='shiri'>メデ美</span>：ぽっきー<br>" ;}else if(randomT === 1){resultStr += "<span class='shiri'>メデ美</span>：ぽてとふらい<br>" ;}else if(randomT === 2){resultStr += "<span class='shiri'>メデ美</span>：ぽてとさらだ<br>" ;}else if(randomT === 3){resultStr += "<span class='shiri'>メデ美</span>：ぽんでりんぐ<br>" ;}else{resultStr += "<span class='shiri'>メデ美</span>：ぽりんきー<br>" ;}
		}
	}else{
		if(randomT === 0){
			resultStr += "<span class='shiri'>メデ美</span>：ちょっといみわかんない…頭わるくてごめん<br>" ;
		}else if(randomT === 1){
			resultStr += "<span class='shiri'>メデ美</span>：言ってることがよくわからないよ…<br>" ;
		}else if(randomT === 2){
			resultStr += "<span class='shiri'>メデ美</span>：うーん、りかいできません…<br>" 
		}else if(randomT === 3){
			resultStr += "<span class='shiri'>メデ美</span>：ごめん、意味わかんないや…<br>" ;
		}else{
			resultStr += "<span class='shiri'>メデ美</span>：スーパーAIのわたしでもちょっと意味わかりません…<br>" ;
		}
	}
}
//ひらがなをカタカナにする関数
function hiraToKana(str) {
	return str.replace(/[\u3041-\u3096]/g, function(match) {
		var chr = match.charCodeAt(0) + 0x60;
		return String.fromCharCode(chr);
	});
}
//カタカナをひらがなにする関数
function kanaToHira(str) {
	return str.replace(/[\u30a1-\u30f6]/g, function(match) {
		var chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	});
}
//全角のひらがなカタカナ以外が含まれているか判定する関数
function isZenkakuKana(str){
	str = (str==null)?"":str;
	if(str.match(/^[ぁ-ゖー]*$/)){
		return true;
	}else if(str.match(/^[ァ-ヶー]*$/)){
		return true;
	}else{
		return false;
	}
}
//半角ｶﾅを全角カタカナにする関数
function hankanaToKana(str) {
    var kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };
    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
            .replace(reg, function (match) {
                return kanaMap[match];
            })
            .replace(/ﾞ/g, '゛')
            .replace(/ﾟ/g, '゜');
}
