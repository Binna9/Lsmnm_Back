/**
 * SMZ Custom Functions
 * API 호출을 로컬 Spring Boot 서버 프록시로 리디렉션
 * CORS 정책 문제 해결을 위해 로컬 프록시 사용
 */

(function() {
    'use strict';

    var PROXY_BASE = '/proxy'; // 로컬 프록시 경로
    var originalAjax = $.ajax;

    $.ajax = function(options) {
        if (options && options.url) {
            var url = options.url;

            // 1. jqGridJSON → init-service 요청을 프록시로 리디렉션
            if (url.includes('/SCO/jqGridJSON.json') && url.includes('ServiceName=ict.sys.init-service')) {
                console.log('→ Init Service redirect to local proxy:', url);
                options.url = PROXY_BASE + '/init';
                options.type = 'POST';
                options.data = options.data || {};
                options.data.searchSysEnv = '1';

                console.log(options.data);
            }

            // 2. 태그 마스터 서비스 → 프록시
            else if (url.includes('smz.tag.master-service')) {
                console.log('→ Tag Service redirect to local proxy:', url);
                options.url = PROXY_BASE + '/tags';
                options.type = 'POST';
            }

            // 3. 콤보박스 → 프록시
            else if (url.includes('ict.sys.code.combo-service')) {
                console.log('→ Combo Service redirect to local proxy:', url);
                options.url = PROXY_BASE + '/combo';
                options.type = 'POST';
                if (options.data && options.data.CODE) {
                    options.url += '?code=' + encodeURIComponent(options.data.CODE);
                }
            }
        }

        return originalAjax.call($, options);
    };

    console.log('✓ SMZ Functions - Local proxy ready');
})();

