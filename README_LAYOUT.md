# 공통 레이아웃 구조 가이드

## 📁 파일 구조

```
src/main/resources/templates/
├── layouts/
│   └── common.html              # 공통 레이아웃 (head, scripts, css)
├── TagMasterStandard.html       # 기존 전체 페이지
├── TagMasterSimple.html         # 간소화 버전 (공통 레이아웃 사용)
├── workTagStandard.html         # 기존 전체 페이지
└── WorkTagSimple.html           # 간소화 버전 (공통 레이아웃 사용)
```

## 🎯 레이아웃 구조 장점

### ✅ 기존 방식 (Full Page)
```html
<html>
<head>
    <!-- 100줄 이상의 script/css include -->
    <script src="..."></script>
    <script src="..."></script>
    ...
</head>
<body>
    <!-- body 내용 -->
</body>
</html>
```

**문제점:**
- ❌ 모든 페이지마다 동일한 script/css 중복
- ❌ 수정 시 모든 페이지 일일이 수정 필요
- ❌ 유지보수 어려움

### ✅ 레이아웃 방식 (Simple)
```html
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <!-- 공통 레이아웃 include -->
    <th:block th:replace="~{layouts/common :: head('페이지 제목')}"></th:block>
    
    <!-- 페이지별 스크립트만 작성 -->
    <script>
        // 이 페이지에만 필요한 로직
    </script>
</head>
<body>
    <!-- body 내용만 작성 -->
</body>
</html>
```

**장점:**
- ✅ 공통 부분 한 곳에서 관리
- ✅ 수정 시 `layouts/common.html`만 수정
- ✅ 페이지별로 body 로직만 집중
- ✅ 코드 간결화

## 📝 사용 방법

### 1. 공통 레이아웃 정의 (`layouts/common.html`)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head th:fragment="head(title)">
    <meta charset="utf-8">
    
    <!-- 모든 페이지에서 공통으로 사용하는 CSS -->
    <link rel="stylesheet" href="...">
    
    <!-- 모든 페이지에서 공통으로 사용하는 JavaScript -->
    <script src="https://mes.lsmnm.com/SCO/include/js/jquery/jquery-1.12.0.min.js"></script>
    <script src="/SMZ/include/js/smz.init.js"></script>
    
    <title th:replace="${title}"></title>
</head>
</html>
```

### 2. 페이지에서 레이아웃 사용

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <!-- 공통 레이아웃 include (제목 전달) -->
    <th:block th:replace="~{layouts/common :: head('[SMZ7010] Tag Master')}"></th:block>
    
    <!-- 이 페이지에만 필요한 스크립트 -->
    <script type="text/javascript">
        $(document).ready(function () {
            console.log('페이지 로드됨');
            
            f_initSreen();
            f_initSearchForm();
            f_initContents();
        });
        
        function f_initSreen() {
            serviceName = 'smz.tag.master-service';
        }
        
        function f_search() {
            fc_searchGrid([{gridId: gridTagMstId, resultKey: 'RK_TAG_MST_LIST'}]);
        }
    </script>
</head>
<body>
    <!-- body 내용만 작성 -->
    <div id="divSearchCondition">
        <h2>Tag Master 검색</h2>
        <input type="text" id="TAG_ID" />
        <button onclick="f_search()">검색</button>
    </div>
    
    <div id="divTagDictionary">
        <!-- 그리드 영역 -->
    </div>
</body>
</html>
```

## 🌐 URL 접근

### 기존 Full 페이지
- Tag Master: `http://localhost:8080/tag/master/standard`
- Work Tag: `http://localhost:8080/tag/work/standard`

### 간소화 Simple 페이지
- Tag Master: `http://localhost:8080/tag/master/simple`
- Work Tag: `http://localhost:8080/tag/work/simple`

## 🔧 새 페이지 추가 방법

### 1. 새 HTML 파일 생성

```html
<!-- templates/NewPage.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <!-- 공통 레이아웃 -->
    <th:block th:replace="~{layouts/common :: head('새 페이지 제목')}"></th:block>
    
    <!-- 페이지별 스크립트 -->
    <script type="text/javascript">
        $(document).ready(function () {
            console.log('새 페이지 로드');
        });
    </script>
</head>
<body>
    <h1>새 페이지 내용</h1>
</body>
</html>
```

### 2. 컨트롤러에 매핑 추가

```java
@GetMapping("/new/page")
public String newPage(Model model) {
    return "NewPage";
}
```

### 3. 접근
```
http://localhost:8080/tag/new/page
```

## 📋 공통 레이아웃 수정

### Script 추가
`layouts/common.html`에만 추가하면 모든 페이지에 적용:

```html
<head th:fragment="head(title)">
    <!-- 기존 스크립트들... -->
    
    <!-- 새로운 공통 스크립트 추가 -->
    <script src="/SMZ/include/js/new-common-library.js"></script>
    
    <title th:replace="${title}"></title>
</head>
```

### CSS 추가
```html
<head th:fragment="head(title)">
    <!-- 기존 CSS들... -->
    
    <!-- 새로운 공통 CSS 추가 -->
    <link rel="stylesheet" href="/SMZ/include/css/new-common-style.css">
    
    <title th:replace="${title}"></title>
</head>
```

## 🎨 페이지별 커스터마이징

특정 페이지에만 필요한 스크립트/CSS는 해당 페이지에서 추가:

```html
<head>
    <!-- 공통 레이아웃 -->
    <th:block th:replace="~{layouts/common :: head('페이지 제목')}"></th:block>
    
    <!-- 이 페이지에만 필요한 CSS -->
    <link rel="stylesheet" href="/SMZ/include/css/page-specific.css">
    
    <!-- 이 페이지에만 필요한 Script -->
    <script src="/SMZ/include/js/page-specific.js"></script>
    
    <script type="text/javascript">
        // 페이지별 로직
    </script>
</head>
```

## 📊 비교표

| 항목 | 기존 방식 | 레이아웃 방식 |
|------|----------|-------------|
| 코드 중복 | 많음 (각 페이지마다) | 없음 (한 곳에서 관리) |
| 유지보수 | 어려움 | 쉬움 |
| 페이지 크기 | 큼 (3000+ 줄) | 작음 (200-300 줄) |
| 수정 범위 | 모든 페이지 | layouts/common.html만 |
| 가독성 | 낮음 | 높음 |

## ⚙️ Mock 함수 처리

외부 라이브러리 로드 실패 시를 대비한 Mock 함수들이 `smz.init.js`에 정의되어 있습니다:

- ✅ `fc_makeGrid()` - 그리드 생성
- ✅ `fc_searchGrid()` - 그리드 검색
- ✅ `fc_showMessageBox()` - 메시지 표시
- ✅ 외 50개 이상의 함수

## 🚀 적용 완료

- ✅ `layouts/common.html` - 공통 레이아웃
- ✅ `TagMasterSimple.html` - Tag Master 간소화 버전
- ✅ `WorkTagSimple.html` - Work Tag 간소화 버전
- ✅ `TagController.java` - 컨트롤러 매핑 추가
- ✅ `smz.init.js` - Mock 함수들 추가

## 📞 문의

추가 페이지 생성이나 공통 레이아웃 수정이 필요하시면 말씀해주세요!

