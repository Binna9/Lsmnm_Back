/**
 * SessionAPI.js
 * sessionStorage 값을 읽어서 백엔드로 전송하는 API 모듈
 * 
 * @author: System
 * @date: 2025-01-15
 */

(function(window) {
    'use strict';

    // SessionAPI 네임스페이스
    window.SessionAPI = {
        
        /**
         * sessionStorage 에서 모든 데이터를 읽어오는 함수
         * @returns {Object} sessionStorage 의 모든 데이터
         */
        getAllSessionData: function() {
            try {
                var sessionData = {};
                
                // sessionStorage의 모든 키를 순회하면서 데이터 수집
                for (var i = 0; i < sessionStorage.length; i++) {
                    var key = sessionStorage.key(i);
                    var value = sessionStorage.getItem(key);
                    sessionData[key] = value;
                }
                
                console.log('SessionAPI: sessionStorage 데이터 수집 완료', sessionData);
                return sessionData;
                
            } catch (error) {
                console.error('SessionAPI: sessionStorage 데이터 읽기 실패', error);
                return {};
            }
        },

        /**
         * sessionStorage 에 있는 모든 데이터를 FormData 로 Spring Session 에 저장
         * @param {Function} callback - 콜백 함수 (선택사항)
         * @returns {Promise} Promise 객체
         */
        saveToSpringSession: function(callback) {
            try {
                // FormData 생성
                var formData = new FormData();
                
                // sessionStorage에 있는 모든 데이터를 FormData에 추가
                for (var i = 0; i < sessionStorage.length; i++) {
                    var key = sessionStorage.key(i);
                    var value = sessionStorage.getItem(key);
                    formData.append(key, value);
                }
                
                console.log('SessionAPI: sessionStorage 모든 데이터를 Spring Session에 저장 시작');
                
                // fetch API를 사용한 비동기 요청
                return fetch('/api/save-session', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('HTTP error! status: ' + response.status);
                    }
                    return response.json();
                })
                .then(function(data) {
                    console.log('SessionAPI: Spring Session 저장 성공', data);
                    if (typeof callback === 'function') {
                        callback(null, data);
                    }
                    return data;
                })
                .catch(function(error) {
                    console.error('SessionAPI: Spring Session 저장 실패', error);
                    if (typeof callback === 'function') {
                        callback(error, null);
                    }
                    throw error;
                });
                    
            } catch (error) {
                console.error('SessionAPI: Spring Session 저장 중 오류 발생', error);
                if (typeof callback === 'function') {
                    callback(error, null);
                }
                return Promise.reject(error);
            }
        },

        /**
         * Form Data 형태로 서버에 전송하는 함수
         * @param {Function} callback - 콜백 함수 (선택사항)
         * @returns {Promise} Promise 객체
         */
        sendFormDataToServer: function(callback) {
            try {
                var sessionData = this.getAllSessionData();

                // FormData 생성
                var formData = new FormData();

                // SessionStorage 데이터를 FormData에 추가
                for (var key in sessionData) {
                    if (sessionData.hasOwnProperty(key)) {
                        formData.append(key, sessionData[key]);
                    }
                }

                // 추가 메타데이터
                formData.append('timestamp', new Date().toISOString());
                formData.append('url', window.location.href);
                formData.append('userAgent', navigator.userAgent);

                console.log('SessionAPI: FormData로 서버 전송 시작');

                // fetch API 를 사용한 FormData 전송
                return fetch('/session/sync', {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('HTTP error! status: ' + response.status);
                    }
                    return response.json();
                })
                .then(function(data) {
                    console.log('SessionAPI: FormData 서버 응답 성공', data);
                    if (typeof callback === 'function') {
                        callback(null, data);
                    }
                    return data;
                })
                .catch(function(error) {
                    console.error('SessionAPI: FormData 서버 전송 실패', error);
                    if (typeof callback === 'function') {
                        callback(error, null);
                    }
                    throw error;
                });

            } catch (error) {
                console.error('SessionAPI: FormData 전송 중 오류 발생', error);
                if (typeof callback === 'function') {
                    callback(error, null);
                }
                return Promise.reject(error);
            }
        }
    };
    // 전역에서 사용할 수 있도록 window 객체에 등록
    console.log('SessionAPI 모듈이 로드되었습니다.');

})(window);
