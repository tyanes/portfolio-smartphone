"use strict";

$(".openbtn1").click(function () {
  //ボタンがクリックされたら
  $(this).toggleClass("active"); //ボタン自身に activeクラスを付与し
  $("#g-nav").toggleClass("panelactive"); //ナビゲーションにpanelactiveクラスを付与
  $(".circle-bg").toggleClass("circleactive"); //丸背景にcircleactiveクラスを付与
});

$(".openbtn1").hide().fadeIn(3300);

$("#g-nav a").click(function () {
  //ナビゲーションのリンクがクリックされたら
  $(".openbtn1").removeClass("active"); //ボタンの activeクラスを除去し
  $("#g-nav").removeClass("panelactive"); //ナビゲーションのpanelactiveクラスを除去
  $(".circle-bg").removeClass("circleactive"); //丸背景のcircleactiveクラスを除去
});

//スクロールした際の動きを関数でまとめるa
function PageTopCheck() {
  var winScrollTop = $(window).scrollTop();
  var secondTop = $("#skills").offset().top - 150; //#area-2の上から150pxの位置まで来たら
  if (winScrollTop >= secondTop) {
    $(".js-scroll").removeClass("scroll-view"); //.js-scrollからscroll-viewというクラス名を除去
    $(".js-pagetop").addClass("scroll-view"); //.js-pagetopにscroll-viewというクラス名を付与
  } else {
    //元に戻ったら
    $(".js-scroll").addClass("scroll-view"); //.js-scrollからscroll-viewというクラス名を付与
    $(".js-pagetop").removeClass("scroll-view"); //.js-pagetopからscroll-viewというクラス名を除去
  }
}
//クリックした際の動き
$(".scroll-top a").click(function () {
  var elmHash = $(this).attr("href"); //hrefの内容を取得
  if (elmHash == "#") {
    //もし、リンク先のhref の後が#area-2の場合
    var pos = $(elmHash).offset().top;
    $("body,html").animate({ scrollTop: pos }, pos); //#area-2にスクロール
  } else {
    $("body,html").animate({ scrollTop: 0 }, 500); //それ以外はトップへスクロール。数字が大きくなるほどゆっくりスクロール
  }
  return false; //リンク自体の無効化
});

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopCheck(); /* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  PageTopCheck(); /* スクロールした際の動きの関数を呼ぶ*/
});

//テキストのカウントアップ+バーの設定
var bar = new ProgressBar.Line(splash_text, {
  //id名を指定
  easing: "easeInOut", //アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
  duration: 1000, //時間指定(1000＝1秒)
  strokeWidth: 1, //進捗ゲージの太さ
  color: "#1cf3f3", //進捗ゲージのカラー
  trailWidth: 1, //ゲージベースの線の太さ
  trailColor: "#fff", //ゲージベースの線のカラー
  text: {
    //テキストの形状を直接指定
    style: {
      //天地中央に配置
      position: "absolute",
      left: "50%",
      top: "50%",
      padding: "0",
      margin: "-30px 0 0 0", //バーより上に配置
      transform: "translate(-50%,-50%)",
      "font-size": "1.4rem",
      "font-family": "quantam",
      color: "#fff",
    },
    autoStyleContainer: false, //自動付与のスタイルを切る
  },
  step: function (state, bar) {
    bar.setText(Math.round(bar.value() * 100) + " %"); //テキストの数値
  },
});

//アニメーションスタート
bar.animate(1.0, function () {
  //バーを描画する割合を指定します 1.0 なら100%まで描画します
  $("#splash_text").fadeOut(10); //フェイドアウトでローディングテキストを削除
  $(".loader_cover-up").addClass("coveranime"); //カバーが上に上がるクラス追加
  $(".loader_cover-down").addClass("coveranime"); //カバーが下に下がるクラス追加
  $("#splash").fadeOut(); //#splashエリアをフェードアウト
});
