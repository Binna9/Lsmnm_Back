/**
 * ict.jquery.common.js
 * 공통 JavaScript 함수들
 */

/**
 * 검색 폼의 항목들을 가져오는 함수
 * @returns {Object} 검색 항목들의 객체
 */
function fm_getSearchItems() {
    var searchItems = {};
    
    try {
        // 기본 검색 폼에서 항목들을 수집
        var $searchForm = $('form[name="searchForm"], form[id*="search"], .search-form');
        
        if ($searchForm.length === 0) {
            // 검색 폼이 없으면 전체 폼에서 검색
            $searchForm = $('form').first();
        }
        
        if ($searchForm.length > 0) {
            // 폼 내의 모든 입력 요소들을 수집
            $searchForm.find('input, select, textarea').each(function() {
                var $this = $(this);
                var name = $this.attr('name');
                var id = $this.attr('id');
                var value = $this.val();
                
                // name 속성이 있는 경우
                if (name && name.trim() !== '') {
                    if (value !== null && value !== undefined && value.toString().trim() !== '') {
                        searchItems[name] = value;
                    }
                }
                // name이 없고 id가 있는 경우
                else if (id && id.trim() !== '') {
                    if (value !== null && value !== undefined && value.toString().trim() !== '') {
                        searchItems[id] = value;
                    }
                }
            });
        }
        
        // 특별한 검색 필드들도 포함 (id에 search가 포함된 경우)
        $('input[id*="search"], input[id*="Search"], input[name*="search"], input[name*="Search"]').each(function() {
            var $this = $(this);
            var id = $this.attr('id');
            var name = $this.attr('name');
            var value = $this.val();
            
            if (value !== null && value !== undefined && value.toString().trim() !== '') {
                if (name) {
                    searchItems[name] = value;
                } else if (id) {
                    searchItems[id] = value;
                }
            }
        });
        
        // 그리드 검색 조건들도 포함
        if (typeof window.gwGridSize !== 'undefined') {
            $.each(window.gwGridSize, function(index, gridData) {
                if (gridData.searchColumns) {
                    $.each(gridData.searchColumns, function(colIndex, colData) {
                        var colId = colData.datafield;
                        var $colElement = $('input[id="' + colId + '"], select[id="' + colId + '"]');
                        if ($colElement.length > 0) {
                            var value = $colElement.val();
                            if (value !== null && value !== undefined && value.toString().trim() !== '') {
                                searchItems[colId] = value;
                            }
                        }
                    });
                }
            });
        }
        
        console.log('fm_getSearchItems - 검색 항목들:', searchItems);
        
    } catch (e) {
        console.error('fm_getSearchItems 오류:', e);
    }
    
    return searchItems;
}

/**
 * 검색 실행 함수
 * @param {Object} searchParams 검색 파라미터
 * @returns {boolean} 검색 성공 여부
 */
function fm_executeSearch(searchParams) {
    try {
        var searchItems = searchParams || fm_getSearchItems();
        
        if (Object.keys(searchItems).length === 0) {
            console.warn('검색 조건이 없습니다.');
            return false;
        }
        
        // 검색 실행 로직
        console.log('검색 실행:', searchItems);
        
        // 그리드가 있는 경우 그리드 새로고침
        if (typeof window.gwGridSize !== 'undefined') {
            $.each(window.gwGridSize, function(index, gridData) {
                if (gridData.gridId && $('#' + gridData.gridId).length > 0) {
                    var grid = $('#' + gridData.gridId).jqxGrid('refresh');
                }
            });
        }
        
        return true;
        
    } catch (e) {
        console.error('fm_executeSearch 오류:', e);
        return false;
    }
}

/**
 * 폼 유효성 검사 함수
 * @param {string} formSelector 폼 선택자
 * @returns {boolean} 유효성 검사 통과 여부
 */
function fm_validateForm(formSelector) {
    try {
        var $form = $(formSelector || 'form');
        var isValid = true;
        
        $form.find('input[required], select[required], textarea[required]').each(function() {
            var $this = $(this);
            var value = $this.val();
            
            if (!value || value.trim() === '') {
                isValid = false;
                $this.addClass('error');
                console.warn('필수 필드가 비어있습니다:', $this.attr('name') || $this.attr('id'));
            } else {
                $this.removeClass('error');
            }
        });
        
        return isValid;
        
    } catch (e) {
        console.error('fm_validateForm 오류:', e);
        return false;
    }
}

/**
 * 폼 데이터를 직렬화하는 함수
 * @param {string} formSelector 폼 선택자
 * @returns {Object} 직렬화된 폼 데이터
 */
function fm_serializeForm(formSelector) {
    var formData = {};
    
    try {
        $(formSelector).find('input, select, textarea').each(function() {
            var $this = $(this);
            var name = $this.attr('name');
            var value = $this.val();
            
            if (name) {
                formData[name] = value || '';
            }
        });
        
    } catch (e) {
        console.error('fm_serializeForm 오류:', e);
    }
    
    return formData;
}

/**
 * 검색 조건을 설정하는 함수
 * @param {Object} conditions 검색 조건 객체
 */
function fm_setSearchConditions(conditions) {
    try {
        $.each(conditions, function(key, value) {
            var $element = $('input[name="' + key + '"], select[name="' + key + '"], input[id="' + key + '"]');
            if ($element.length > 0) {
                $element.val(value);
            }
        });
    } catch (e) {
        console.error('fm_setSearchConditions 오류:', e);
    }
}

/**
 * 폼을 초기화하는 함수
 * @param {string} formSelector 폼 선택자
 */
function fm_resetForm(formSelector) {
    try {
        $(formSelector || 'form')[0].reset();
        
        // 추가적인 초기화가 필요한 경우
        $(formSelector || 'form').find('input[type="text"], input[type="hidden"], select').val('');
        
    } catch (e) {
        console.error('fm_resetForm 오류:', e);
    }
}

/**
 * 검색 버튼 클릭 이벤트 처리
 */
function fm_handleSearch() {
    try {
        var searchItems = fm_getSearchItems();
        
        if (Object.keys(searchItems).length === 0) {
            console.warn('검색 조건이 없습니다.');
            return false;
        }
        
        // 검색 실행 로직
        console.log('검색 실행:', searchItems);
        
        return true;
        
    } catch (e) {
        console.error('fm_handleSearch 오류:', e);
        return false;
    }
}

// DOM이 로드된 후 초기화
$(document).ready(function() {
    console.log('ict.jquery.common.js 로드 완료');
});
