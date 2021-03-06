// dailyAct
var vm = new Vue({
    el: '#faq',
    data: {
      questions: [
        {
            id:1,
            ask: 'KAMISMAXとは？', 
            answer: '日本が世界に誇る一流美容師の技術や考え方を、楽しく分かりやすく学べる映像学習サービスです。次代に向けた新しい教育環境を提供します。',
        },
        {
            id:2,
            ask: 'プランの違いは？',
            answer: 'KAMISMAXでは、サブスク会員になることでオリジナルコンテンツを全て視聴することができます。サブスク会員になるためには初めに会員登録が必要です。お支払いプランは、月額定額払い（月払い）と年額一括払い（年払い）の2種類ございます。<br><br><strong>【月額：1,990円／年額：19,900円】</strong><br><br>年払いをご選択いただくと、10ヶ月分の金額で1年間ご利用いただけます（2ヶ月分お得）。※全て税込となっております。<br>また月払いから年払いへの変更も可能です。<br>マイデータ&gt;歯車マーク&gt;会員種別の設定&gt;会員種別 より「年払」をご選択の上、更新を行ってください。<br>なお、年払いから月払いに変更したい場合は、次回決済日(更新日)の30日前より手続きすることができます。',
        },
        {
            id:3,
            ask: '【KAMISMAX】 OPEN記念価格・特別特典について',
            answer: '今お申込みいただくと、会員登録から２年間、特別価格にてご利用いただけます。<br>さらに、3年目以降もご継続いただける場合、自動的に特別会員ランクとなり、<br>月額：1,490円<br>年額：14,900円<br>特別価格のまま、引き続きご利用いただけます。<br>ぜひお早めにお申し込みの上、KAMISMAXの世界をご堪能ください。',
        },
        {
            id:4,
            ask: 'どのような支払方法がありますか？',
            answer: 'お支払にはクレジットカードのみご利用いただけます。 ※デビット機能付クレジットカード等一部継続課金に対応していないものもございます。利用可能かどうかにつきましては、ご契約のカード会社様までお問い合わせください。',
        },
        {
            id:5,
            ask: '学習履歴とは？',
            answer: '動画の学習状況が一目でわかるように表示いたします。カテゴリーとジャンル毎でご自身の学習進度をご確認ください。 この貯めた学習履歴を生かした新サービスの展開も予定しております。ぜひたくさんの学習履歴をお貯めください。',
        },
        {
            id:6,
            ask: 'KAMI CHARISMAとの関連性は？',
            answer: 'KAMISMAXのご出演者様が「一流の美容師」であるという証として、カミカリスマを受賞された美容師・美容室の方々に出演を依頼しております。',
        },
      ]
    }
  });


