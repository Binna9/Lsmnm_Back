# Tag Master Standard 화면 구현

## 개요
외부 서버(mes.lsmnm.com)의 정적 리소스를 사용하면서, API 호출은 로컬 Spring Boot 서버를 통해 프록시하는 Thymeleaf 기반 웹 애플리케이션

## 아키텍처

### 정적 리소스 (CSS, JS)
- **소스**: `https://mes.lsmnm.com/SCO/`
- 모든 CSS, JS 파일은 외부 서버에서 직접 로드
- jQuery, jqWidgets, ICT 커스텀 라이브러리 포함

### API 호출
- **외부 API**: `https://mes.lsmnm.com/SCO/jqGridJSON.json`
- **로컬 프록시**: `/tag/api/*`
- JavaScript에서 Ajax 호출 시 자동으로 로컬 서버로 리다이렉트

### 주요 API 엔드포인트
1. **콤보 데이터**: `/tag/api/combo?find=1`
   - 외부: `ServiceName=ict.sys.code.combo-service`
   
2. **초기 권한**: `/tag/api/init?searchScreenAuthority=1`
   - 외부: `ServiceName=ict.sys.init-service`

3. **범용 서비스**: `/tag/api/service?ServiceName=xxx`
   - 모든 ServiceName 파라미터 처리

## 프로젝트 구조

```
src/
├── main/
│   ├── java/com/lsmnm/Tag/
│   │   ├── TagApplication.java
│   │   ├── config/
│   │   │   ├── RestTemplateConfig.java      # RestTemplate Bean 설정
│   │   │   └── WebConfig.java               # CORS, 정적 리소스 설정
│   │   ├── controller/
│   │   │   └── TagController.java           # 화면 & API 컨트롤러
│   │   └── service/
│   │       └── TagService.java              # 외부 API 호출 서비스
│   └── resources/
│       ├── application.properties           # 서버 설정
│       ├── static/
│       │   └── SMZ/include/js/
│       │       └── smz.functions.js         # API 프록시 스크립트
│       └── templates/
│           └── TagMasterStandard.html       # Thymeleaf 템플릿
```

## 실행 방법

### 1. 애플리케이션 실행
```bash
./gradlew bootRun
```

### 2. 브라우저 접속
```
http://localhost:8080/tag/master/standard
```

## 주요 파일 설명

### `TagController.java`
- **GET `/tag/master/standard`**: 화면 렌더링
- **GET `/tag/api/combo`**: 콤보 데이터 조회
- **GET `/tag/api/init`**: 초기 권한 데이터
- **GET/POST `/tag/api/service`**: 범용 서비스 호출

### `TagService.java`
- `getComboData()`: 콤보 서비스 호출
- `getInitData()`: 초기 서비스 호출
- `callService()`: 범용 서비스 호출

### `smz.functions.js`
- jQuery.ajax를 오버라이드
- 외부 API 호출을 자동으로 로컬 API로 변경
- URL에서 ServiceName을 파싱하여 적절한 로컬 엔드포인트로 매핑

### `TagMasterStandard.html`
- Thymeleaf 네임스페이스 추가: `xmlns:th="http://www.thymeleaf.org"`
- 정적 리소스 경로: `https://mes.lsmnm.com/SCO/*`
- 로컬 스크립트: `/SMZ/include/js/smz.functions.js`

## 동작 방식

1. **화면 로드**
   - 브라우저가 Thymeleaf 템플릿 요청
   - HTML에서 외부 서버의 CSS/JS 로드
   - `smz.functions.js`가 로드되어 Ajax 오버라이드 적용

2. **API 호출**
   - JavaScript에서 Ajax 호출 시도
   - `smz.functions.js`가 URL을 가로채서 로컬 API로 변경
   - 로컬 Spring Boot 서버가 외부 API 호출
   - 결과를 JavaScript로 반환

## 설정 파일

### `application.properties`
```properties
server.port=8080
spring.thymeleaf.cache=false
external.api.base-url=https://mes.lsmnm.com/SCO
external.api.timeout=10000
```

## 트러블슈팅

### 1. CORS 에러 발생
- `WebConfig.java`에서 CORS 설정 확인
- 외부 도메인 접근 권한 확인

### 2. 정적 리소스 로드 실패
- `https://mes.lsmnm.com/SCO/` 서버 상태 확인
- 네트워크 방화벽 설정 확인

### 3. API 호출 실패
- `TagService.java`의 BASE_URL 확인
- RestTemplate 타임아웃 설정 확인
- 외부 API 서버 상태 확인

## 참고사항

- 외부 서버의 정적 리소스가 변경되면 자동으로 반영됨
- API 호출은 로컬 서버를 거치므로 로그 확인 가능
- 개발 시 `spring.thymeleaf.cache=false`로 설정하여 템플릿 변경사항 즉시 반영


