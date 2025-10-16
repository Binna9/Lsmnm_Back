/**
 * SMZ Custom Functions
 * API 호출을 로컬 Spring Boot 서버로 프록시
 * 현재 cors 정책 덕분에 호출 불가
 */

(function() {
    'use strict';
    
    var LOCAL_API_BASE = '/tag/api';
    var originalAjax = $.ajax;
    
    /**
     * jQuery ajax 오버라이드 - 외부 API를 로컬로 프록시
     */
    $.ajax = function(options) {
        if (options && options.url) {
            var url = options.url;
            
            // smz.tag.master-service 호출을 로컬 API로 변경
            if (url.indexOf('smz.tag.master-service') !== -1) {
                console.log('→ Tag Service:', url);
                options.url = LOCAL_API_BASE + '/tags';
            }
            // 콤보박스 데이터 호출
            else if (url.indexOf('ict.sys.code.combo-service') !== -1) {
                console.log('→ Combo Service:', url);
                options.url = LOCAL_API_BASE + '/combo';
            }
        }
        
        return originalAjax.call($, options);
    };
    
    console.log('✓ SMZ Functions - API proxy ready');
    
})();
