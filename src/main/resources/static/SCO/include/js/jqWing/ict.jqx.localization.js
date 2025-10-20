/**
 * Declare variable
 */

/**
 * Declare Initial JS Function
 */
var getLocalization = function (culture) {
    var localization = null;
    switch (culture) {
        case "de":
            localization =
             {
                 // separator of parts of a date (e.g. '/' in 11/05/1955)
                 '/': "/",
                 // separator of parts of a time (e.g. ':' in 05:44 PM)
                 ':': ":",
                 // the first day of the week (0 = Sunday, 1 = Monday, etc)
                 firstDay: 1,
                 days: {
                     // full day names
                     names: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                     // abbreviated day names
                     namesAbbr: ["Sonn", "Mon", "Dien", "Mitt", "Donn", "Fre", "Sams"],
                     // shortest day names
                     namesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
                 },

                 months: {
                     // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                     names: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
                     // abbreviated month names
                     namesAbbr: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez", ""]
                 },
                 // AM and PM designators in one of these forms:
                 // The usual view, and the upper and lower case versions
                 //      [standard,lowercase,uppercase]
                 // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                 //      null
                 AM: ["AM", "am", "AM"],
                 PM: ["PM", "pm", "PM"],
                 eras: [
                 // eras in reverse chronological order.
                 // name: the name of the era in this culture (e.g. A.D., C.E.)
                 // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                 // offset: offset in years from gregorian calendar
                 { "name": "A.D.", "start": null, "offset": 0 }
                 ],
                 twoDigitYearMax: 2999,
                 patterns:
                  {
                      d: "dd.MM.yyyy",
                      D: "dddd, d. MMMM yyyy",
                      t: "HH:mm",
                      T: "HH:mm:ss",
                      f: "dddd, d. MMMM yyyy HH:mm",
                      F: "dddd, d. MMMM yyyy HH:mm:ss",
                      M: "dd MMMM",
                      Y: "MMMM yyyy"

                  },
                 percentsymbol: "%",
                 currencysymbol: "€",
                 currencysymbolposition: "after",
                 decimalseparator: '.',
                 thousandsseparator: ',',
                 pagergotopagestring: "Gehe zu",
                 pagershowrowsstring: "Zeige Zeile:",
                 pagerrangestring: " von ",
                 pagerpreviousbuttonstring: "nächster",
                 pagernextbuttonstring: "voriger",
                 pagerfirstbuttonstring: "first",
                 pagerlastbuttonstring: "last",
                 groupsheaderstring: "Ziehen Sie eine Kolumne und legen Sie es hier zu Gruppe nach dieser Kolumne",
                 sortascendingstring: "Sortiere aufsteigend",
                 sortdescendingstring: "Sortiere absteigend",
                 sortremovestring: "Entferne Sortierung",
                 groupbystring: "Group By this column",
                 groupremovestring: "Remove from groups",
                 filterclearstring: "Löschen",
                 filterstring: "Filter",
                 filtershowrowstring: "Zeige Zeilen, in denen:",
                 filterorconditionstring: "Oder",
                 filterandconditionstring: "Und",
                 filterselectallstring: "(Alle auswählen)",
                 filterchoosestring: "Bitte wählen Sie:",
                 filterstringcomparisonoperators: ['leer', 'nicht leer', 'enthält', 'enthält(gu)',
                    'nicht enthalten', 'nicht enthalten(gu)', 'beginnt mit', 'beginnt mit(gu)',
                    'endet mit', 'endet mit(gu)', 'equal', 'gleich(gu)', 'null', 'nicht null'],
                 filternumericcomparisonoperators: ['gleich', 'nicht gleich', 'weniger als', 'kleiner oder gleich', 'größer als', 'größer oder gleich', 'null', 'nicht null'],
                 filterdatecomparisonoperators: ['gleich', 'nicht gleich', 'weniger als', 'kleiner oder gleich', 'größer als', 'größer oder gleich', 'null', 'nicht null'],
                 filterbooleancomparisonoperators: ['gleich', 'nicht gleich'],
                 validationstring: "Der eingegebene Wert ist ungültig",
                 emptydatastring: "Nokeine Daten angezeigt",
                 filterselectstring: "Wählen Sie Filter",
                 loadtext: "Loading...",
                 clearstring: "Löschen",
                 todaystring: "Heute"
             };
            break;
        case "pt":
        	localization =
        	{
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': "/",
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ":",
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0,
                days: {
                    // full day names
                    names: ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
                    // abbreviated day names
                    namesAbbr: ["dom","seg","ter","qua","qui","sex","sáb"],
                    // shortest day names
                    namesShort: ["D","S","T","Q","Q","S","S"]
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                    names: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro",""],
                    // abbreviated month names
                    namesAbbr: ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez",""]
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: null,
                PM: null,
                eras: [
                // eras in reverse chronological order.
                // name: the name of the era in this culture (e.g. A.D., C.E.)
                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                // offset: offset in years from gregorian calendar
                {"name":"d.C.","start":null,"offset":0}
                ],
                twoDigitYearMax: 2999,
                patterns: {
                    // short date pattern
                    d: "dd/MM/yyyy",
                    // long date pattern
                    D: "dddd, d' de 'MMMM' de 'yyyy",
                    // short time pattern
                    t: "HH:mm",
                    // long time pattern
                    T: "HH:mm:ss",
                    // long date, short time pattern
                    f: "dddd, d' de 'MMMM' de 'yyyy HH:mm",
                    // long date, long time pattern
                    F: "dddd, d' de 'MMMM' de 'yyyy HH:mm:ss",
                    // month/day pattern
                    M: "dd' de 'MMMM",
                    // month/year pattern
                    Y: "MMMM' de 'yyyy",
                    // S is a sortable format that does not vary by culture
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    // formatting of dates in MySQL DataBases
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "dd.MM.yyyy",
                    d2: "dd-MM-yyyy",
                    d3: "dd-MMMM-yyyy",
                    d4: "dd-MM-yy",
                    d5: "H:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "dd/MMMM/yyyy",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "MM-dd-yyyy"
                },
                percentsymbol: "%",
                currencysymbol: "R$",
                decimalseparator: ',',
                thousandsseparator: '.',
                currencysymbolposition: "before",
                currencysymbolposition:"Antes",
				pagergotopagestring:"página:",
				pagershowrowsstring:"Mostrar linhas",
				pagerrangestring:" De ",
				pagerpreviousbuttonstring:"Anterior",
				pagernextbuttonstring:"Próxima",
				pagerfirstbuttonstring:"Primeira",
				pagerlastbuttonstring:"Última",
				groupsheaderstring:"Arraste uma coluna e solte-a aqui para agrupar por ela",
				sortascendingstring:"Classificação crescente",
				sortdescendingstring:"Classificação descrescente",
				sortremovestring:"Remover classificação",
				groupbystring:"Agrupar por esta coluna",
				groupremovestring:"Remover dos grupos",
				filterclearstring:"Limpar",
				filterstring:"Filtro",
				filtershowrowstring:"Mostrar linhas onde:",
				filterorconditionstring:"Ou",
				filterandconditionstring:"E",
				filterselectallstring:"Selecionar tudo",
				filterchoosestring:"Por favor escolha:",
//				filterstringcomparisonoperators:['vazio', 'não vazio', 'contém', ' contém(key sensitive A/a)',
//                    'não contém', 'não contém(key sensitive A/a)', 'inicia com', 'inicia com(key sensitive A/a)',
//                    'termina com', 'termina com(key sensitive A/a)', 'igual', 'igual(key sensitive A/a)', 'nulo', 'não nulo'],
				filterstringcomparisonoperators:['vazio', 'não vazio', 'contains', ' contains(key sensitive A/a)',
				                                 'não contém', 'não contém(key sensitive A/a)', 'inicia com', 'inicia com(key sensitive A/a)',
				                                 'termina com', 'termina com(key sensitive A/a)', 'igual', 'igual(key sensitive A/a)', 'nulo', 'não nulo'],
				filternumericcomparisonoperators:['igual', 'diferente', 'menor que', 'menor que ou igual', 'maior que', 'maior que ou igual', 'nulo', 'não nulo'],
				filterdatecomparisonoperators:['igual', 'diferente', 'menor que', 'menor que ou igual', 'maior que', 'maior que ou igual', 'nulo', 'não nulo'],
				filterbooleancomparisonoperators:['igual', 'diferente'],
				validationstring:"Valor de entrada inválido",
				emptydatastring:"Não há dados para exibir",
				filterselectstring:"Selecione filtro",
				loadtext:"Carregando...",
				clearstring:"Limpar",
				todaystring:"Hoje"
            };
            break;
        case "zh":
            localization =
            {
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': "/",
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ":",
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0,
                days: {
                    // full day names
                    names: ["周日","周一","周二","周三","周四","周五","周六"], //["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    // abbreviated day names
                    namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
                    // shortest day names
                    namesShort: ["日", "一", "二", "三", "四", "五", "六"]
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                    names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
                    // abbreviated month names
                    namesAbbr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""]
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: ["上午,上午,上午"],
                PM: ["下午,下午,下午"],
                eras: [
                // eras in reverse chronological order.
                // name: the name of the era in this culture (e.g. A.D., C.E.)
                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                // offset: offset in years from gregorian calendar
                { "name": "A.D.", "start": null, "offset": 0 }
                ],
                twoDigitYearMax: 2999,
                patterns: {
                    // short date pattern
                    d: "M/d/yyyy",
                    // long date pattern
                    D: "dddd, MMMM dd, yyyy",
                    // short time pattern
                    t: "h:mm tt",
                    // long time pattern
                    T: "h:mm:ss tt",
                    // long date, short time pattern
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    // long date, long time pattern
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    // month/day pattern
                    M: "MMMM dd",
                    // month/year pattern
                    Y: "yyyy MMMM",
                    // S is a sortable format that does not vary by culture
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    // formatting of dates in MySQL DataBases
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "dd.MM.yyyy",
                    d2: "dd-MM-yyyy",
                    d3: "dd-MMMM-yyyy",
                    d4: "dd-MM-yy",
                    d5: "H:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "dd/MMMM/yyyy",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "MM-dd-yyyy"
                },
                percentsymbol: "%",
                currencysymbol: "元",
                currencysymbolposition: "以前",
                decimalseparator: '.',
                thousandsseparator: ',',
                pagergotopagestring: "页:",
                pagershowrowsstring: "显示行:",
                pagerrangestring: " 的 ",
                pagerpreviousbuttonstring: "以前",
                pagernextbuttonstring: "下一个",
                pagerfirstbuttonstring: "第一",
                pagerlastbuttonstring: "持续",
                groupsheaderstring: "拖动一列，按照该列在这里拖放到组",
                sortascendingstring: "升序",
                sortdescendingstring: "降序",
                sortremovestring: "删除排序",
                groupbystring: "集团通过此列",
                groupremovestring: "从组中删除",
                filterclearstring: "明确",
                filterstring: "过滤",
                filtershowrowstring: "显示的行:",
                filterorconditionstring: "要么",
                filterandconditionstring: "和",
                filterselectallstring: "(全选)",
                filterchoosestring: "请选择:",
                filterstringcomparisonoperators: ['空', '不空', '包含', '包含(匹配的东西)',
                   '不包含', '不包含(匹配的东西)', '开始', '开始(匹配的东西)',
                   '结束所有', '结束  (匹配的东西)', '等于', '等于(匹配的东西)', '空值', '不空值'],
                filternumericcomparisonoperators: ['等于', '不等于', '少于', '小于或等于', '更棒', '大于或等于', '空值', '不空值'],
                filterdatecomparisonoperators: ['等于', '不等于', '少于', '小于或等于', '更棒', '大于或等于', '空值', '不空值'],
                filterbooleancomparisonoperators: ['等于', '不等于'],
                validationstring: "输入的值无效",
                emptydatastring: "没有数据显示",
                filterselectstring: "选择过滤器",
                loadtext: "加载...",
                clearstring: "明确",
                todaystring: "今天"
            };
            break;
        case "ja":
            localization =
            {
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': "/",
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ":",
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0,
                days: {
                    // full day names
                    names: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
                    // abbreviated day names
                    namesAbbr: ["日", "月", "火", "水", "木", "金", "土"],
                    // shortest day names
                    namesShort: ["日", "月", "火", "水", "木", "金", "土"]
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                    names: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],
                    // abbreviated month names
                    namesAbbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""]
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [
                // eras in reverse chronological order.
                // name: the name of the era in this culture (e.g. A.D., C.E.)
                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                // offset: offset in years from gregorian calendar
                { "name": "A.D.", "start": null, "offset": 0 }
                ],
                twoDigitYearMax: 2999,
                patterns: {
                    // short date pattern
                    d: "M/d/yyyy",
                    // long date pattern
                    D: "dddd, MMMM dd, yyyy",
                    // short time pattern
                    t: "h:mm tt",
                    // long time pattern
                    T: "h:mm:ss tt",
                    // long date, short time pattern
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    // long date, long time pattern
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    // month/day pattern
                    M: "MMMM dd",
                    // month/year pattern
                    Y: "yyyy MMMM",
                    // S is a sortable format that does not vary by culture
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    // formatting of dates in MySQL DataBases
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "dd.MM.yyyy",
                    d2: "dd-MM-yyyy",
                    d3: "dd-MMMM-yyyy",
                    d4: "dd-MM-yy",
                    d5: "H:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "dd/MMMM/yyyy",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "MM-dd-yyyy"
                },
                percentsymbol: "%",
                currencysymbol: "¥",
                currencysymbolposition: "前",
                decimalseparator: '.',
                thousandsseparator: ',',
                pagergotopagestring: "ページ:",
                pagershowrowsstring: "表示行:",
                pagerrangestring: " の ",
                pagerpreviousbuttonstring: "前",
                pagernextbuttonstring: "次",
                pagerfirstbuttonstring: "最初",
                pagerlastbuttonstring: "最終",
                groupsheaderstring: "列をドラッグして、その列によってグループにそれをここにドロップします",
                sortascendingstring: "昇順で並べ替え",
                sortdescendingstring: "降順ソート",
                sortremovestring: "ソート削除",
                groupbystring: "この列によってグループ",
                groupremovestring: "グループから削除",
                filterclearstring: "クリア",
                filterstring: "フィルタ",
                filtershowrowstring: "表示する行の場所:",
                filterorconditionstring: "または",
                filterandconditionstring: "そして",
                filterselectallstring: "(すべて選択)",
                filterchoosestring: "選んでください:",
                filterstringcomparisonoperators: ['空', '空ではありません', '含まれています', '含まれています(マッチケース)',
                   '含まれていません。', '含まれていません。(マッチケース)', 'で始まります', 'で始まります(マッチケース)',
                   'で終了', 'で終了(マッチケース)', '等しい', '等しい(マッチケース)', 'ヌル', 'nullではありません'],
                filternumericcomparisonoperators: ['等しい', '等しくありません', '未満', '小さいか等しいです', '越えます', '大きいか等しいです', 'ヌル', 'nullではありません'],
                filterdatecomparisonoperators: ['等しい', '等しくありません', '未満', '小さいか等しいです', '越えます', '大きいか等しいです', 'ヌル', 'nullではありません'],
                filterbooleancomparisonoperators: ['等しい', '等しくありません'],
                validationstring: "入力された値が有効ではありません",
                emptydatastring: "表示できるデータがありません",
                filterselectstring: "フィルタを選択",
                loadtext: "ローディング...",
                clearstring: "クリア",
                todaystring: "今日"
            };
            break;
            //KD(20180622) add localization on lang KO
        case "ko":
            localization =
            {
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': "/",
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ":",
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0,
                days: {
                    // full day names
                    names: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
                    // abbreviated day names
                    namesAbbr: ["일", "월", "화", "수", "목", "금", "토"],
                    // shortest day names
                    namesShort: ["일", "월", "화", "수", "목", "금", "토"]
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                    names: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", ""],
                    // abbreviated month names
                    namesAbbr: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", ""]
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [
                // eras in reverse chronological order.
                // name: the name of the era in this culture (e.g. A.D., C.E.)
                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                // offset: offset in years from gregorian calendar
                { "name": "A.D.", "start": null, "offset": 0 }
                ],
                twoDigitYearMax: 2999,
                patterns: {
                    // short date pattern
                    d: "M/d/yyyy",
                    // long date pattern
                    D: "dddd, MMMM dd, yyyy",
                    // short time pattern
                    t: "h:mm tt",
                    // long time pattern
                    T: "h:mm:ss tt",
                    // long date, short time pattern
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    // long date, long time pattern
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    // month/day pattern
                    M: "MMMM dd",
                    // month/year pattern
                    Y: "yyyy MMMM",
                    // S is a sortable format that does not vary by culture
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    // formatting of dates in MySQL DataBases
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "dd.MM.yyyy",
                    d2: "dd-MM-yyyy",
                    d3: "dd-MMMM-yyyy",
                    d4: "dd-MM-yy",
                    d5: "H:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "dd/MMMM/yyyy",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "MM-dd-yyyy"
                },
                percentsymbol: "%",
                currencysymbol: "$",
                currencysymbolposition: "이전",
                decimalseparator: '.',
                thousandsseparator: ',',
                pagergotopagestring: "페이지:",
                pagershowrowsstring: "행 보기:",
                pagerrangestring: " of ",
                pagerpreviousbuttonstring: "previous",
                pagernextbuttonstring: "다음",
                pagerfirstbuttonstring: "first",
                pagerlastbuttonstring: "last",
                groupsheaderstring: "열을 끌어서 여기에 놓으면 해당 열별로 그룹화 할 수 있습니다",
                sortascendingstring: "오름차순 정렬",
                sortdescendingstring: "내림차순 정렬",
                sortremovestring: "정렬 제거",
                groupbystring: "그룹화 기준",
                groupremovestring: "그룹에서 삭제",
                filterclearstring: "Clear",
                filterstring: "필터",
                filtershowrowstring: "행 표시 위치:",
                filterorconditionstring: "Or",
                filterandconditionstring: "And",
                filterselectallstring: "(전체 선택)",
                filterchoosestring: "선택하세요:",
                filterstringcomparisonoperators: ['값 없음', '전체', '포함', '포함하지 않음', '시작 문자', '끝 문자', '일치 문자'],
                filternumericcomparisonoperators: ['같음( ＝ )', '같지 않음( ≠ )', '보다 작음( ＜ )', '작거나 같음( ≤ )', '보다 큼( ＞ )', '크거나 같음( ≥ )'],
                filterdatecomparisonoperators: ['같음( ＝ )', '같지 않음( ≠ )', '보다 작음( ＜ )', '작거나 같음( ≤ )', '보다 큼( ＞ )', '크거나 같음( ≥ )'],
//                filterstringcomparisonoperators: ['empty', 'not empty', 'contains', 'contains(match case)',
//                                                  'does not contain', 'does not contain(match case)', 'starts with', 'starts with(match case)',
//                                                  'ends with', 'ends with(match case)', 'equal', 'equal(match case)', 'null', 'not null'],
//                filternumericcomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
//                filterdatecomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                filterbooleancomparisonoperators: ['같음', '같지 않음'],
                validationstring: "입력 한 값이 유효하지 않습니다",
                emptydatastring: "표시 할 내용이 없습니다",
                filterselectstring: "필터 선택",
                loadtext: "Loading...",
                clearstring: "Clear",
                todaystring: "오늘"
            };
            break;
        case "en":
        default:
            localization =
            {
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': "/",
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ":",
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0,
                days: {
                    // full day names
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    // abbreviated day names
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    // shortest day names
                    namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    // abbreviated month names
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [
                // eras in reverse chronological order.
                // name: the name of the era in this culture (e.g. A.D., C.E.)
                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                // offset: offset in years from gregorian calendar
                { "name": "A.D.", "start": null, "offset": 0 }
                ],
                twoDigitYearMax: 2999,
                patterns: {
                    // short date pattern
                    d: "M/d/yyyy",
                    // long date pattern
                    D: "dddd, MMMM dd, yyyy",
                    // short time pattern
                    t: "h:mm tt",
                    // long time pattern
                    T: "h:mm:ss tt",
                    // long date, short time pattern
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    // long date, long time pattern
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    // month/day pattern
                    M: "MMMM dd",
                    // month/year pattern
                    Y: "yyyy MMMM",
                    // S is a sortable format that does not vary by culture
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    // formatting of dates in MySQL DataBases
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "dd.MM.yyyy",
                    d2: "dd-MM-yyyy",
                    d3: "dd-MMMM-yyyy",
                    d4: "dd-MM-yy",
                    d5: "H:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "dd/MMMM/yyyy",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "MM-dd-yyyy"
                },
                percentsymbol: "%",
                currencysymbol: "$",
                currencysymbolposition: "before",
                decimalseparator: '.',
                thousandsseparator: ',',
                pagergotopagestring: "page:",
                pagershowrowsstring: "Show rows:",
                pagerrangestring: " of ",
                pagerpreviousbuttonstring: "previous",
                pagernextbuttonstring: "next",
                pagerfirstbuttonstring: "first",
                pagerlastbuttonstring: "last",
                groupsheaderstring: "Drag a column and drop it here to group by that column",
                sortascendingstring: "Sort Ascending",
                sortdescendingstring: "Sort Descending",
                sortremovestring: "Remove Sort",
                groupbystring: "Group By this column",
                groupremovestring: "Remove from groups",
                filterclearstring: "Clear",
                filterstring: "Filter",
                filtershowrowstring: "Show rows where:",
                filterorconditionstring: "Or",
                filterandconditionstring: "And",
                filterselectallstring: "(Select All)",
                filterchoosestring: "Please Choose:",
                filterstringcomparisonoperators: ['empty', 'not empty', 'contains', 'does not contain', 'starts with', 'ends with', 'equal'],
//                filterstringcomparisonoperators: ['empty', 'not empty', 'contains', 'contains(match case)',
//                   'does not contain', 'does not contain(match case)', 'starts with', 'starts with(match case)',
//                   'ends with', 'ends with(match case)', 'equal', 'equal(match case)', 'null', 'not null'],
                filternumericcomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal'],
                filterdatecomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal'],
                filterbooleancomparisonoperators: ['equal', 'not equal'],
                validationstring: "Entered value is not valid",
                emptydatastring: "No data to display",
                filterselectstring: "Select Filter",
                loadtext: "Loading...",
                clearstring: "Clear",
                todaystring: "Today"
            };
            break;
    };
    return localization;
};