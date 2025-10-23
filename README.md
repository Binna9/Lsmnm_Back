# Tag Web Backend

Spring Boot 기반의 웹 백엔드 애플리케이션입니다.

## 🚀 빠른 시작

### 1. 환경 설정

#### 개발 환경 설정
```bash
# application-dev.properties 파일 생성
cp src/main/resources/application-dev.properties.template src/main/resources/application-dev.properties

# 실제 데이터베이스 정보 입력
# PostgreSQL, Redis 연결 정보를 실제 값으로 수정
```

#### 프로덕션 환경 설정
```bash
# application-prod.properties 파일 생성
cp src/main/resources/application-prod.properties.template src/main/resources/application-prod.properties

# 환경변수 설정
export DATABASE_URL=jdbc:postgresql://prod-server:5432/proddb
export DATABASE_USERNAME=produser
export DATABASE_PASSWORD=prodpass
export REDIS_HOST=prod-redis-server
export REDIS_PORT=6379
export REDIS_DATABASE=0
export REDIS_PASSWORD=prod_redis_pass
export EXTERNAL_API_URL=https://prod-api.example.com/
```

### 2. 애플리케이션 실행

#### 개발 환경
```bash
./gradlew bootRun --args='--spring.profiles.active=dev'
```

#### 프로덕션 환경
```bash
java -jar build/libs/tag-web-back-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

## 📁 프로젝트 구조

```
src/
├── main/
│   ├── java/
│   │   └── com/lsmnm/Tag/
│   └── resources/
│       ├── application.properties          # 기본 설정 (환경변수 사용)
│       ├── application-dev.properties      # 개발 환경 설정 (Git 제외)
│       ├── application-prod.properties     # 프로덕션 환경 설정 (Git 제외)
│       ├── application-dev.properties.template    # 개발 환경 템플릿
│       └── application-prod.properties.template   # 프로덕션 환경 템플릿
└── test/
    └── resources/
        └── application-test.properties     # 테스트 환경 설정
```

## 🔒 보안 설정

### Git에서 제외되는 파일들
- `application-dev.properties` - 개발 환경 민감 정보
- `application-prod.properties` - 프로덕션 환경 민감 정보
- `*.cer`, `*.crt`, `*.pem` - SSL 인증서 파일들
- `cacerts_backup` - 키스토어 백업 파일
- `.env*` - 환경변수 파일들

### 환경변수 설정
프로덕션 환경에서는 반드시 환경변수를 사용하여 민감한 정보를 설정하세요:

```bash
# 데이터베이스
DATABASE_URL=jdbc:postgresql://server:port/database
DATABASE_USERNAME=username
DATABASE_PASSWORD=password

# Redis
REDIS_HOST=redis-server
REDIS_PORT=6379
REDIS_DATABASE=0
REDIS_PASSWORD=redis_password

# 외부 API
EXTERNAL_API_URL=https://api.example.com/
```

## 🛠️ 기술 스택

- **Java 17**
- **Spring Boot 3.4.2**
- **Spring Data JPA**
- **Spring Data Redis**
- **MyBatis 3.0.5**
- **PostgreSQL 42.7.3**
- **Thymeleaf**
- **Gradle 8.14.3**

## 📝 개발 가이드

### 빌드
```bash
./gradlew build
```

### 테스트
```bash
./gradlew test
```

### 실행
```bash
./gradlew bootRun
```

## ⚠️ 주의사항

1. **민감한 정보 보호**: `application-dev.properties`와 `application-prod.properties` 파일은 절대 Git에 커밋하지 마세요.
2. **환경변수 사용**: 프로덕션 환경에서는 반드시 환경변수를 사용하세요.
3. **SSL 인증서**: SSL 관련 파일들도 Git에서 제외됩니다.

## 🔧 문제 해결

### SSL 인증서 오류
Maven Central에서 의존성을 다운로드할 때 SSL 오류가 발생하는 경우:

```bash
# SSL 인증서 다운로드 및 설치
# (이미 프로젝트에 설정되어 있음)
```

### 데이터베이스 연결 오류
환경변수가 올바르게 설정되었는지 확인하세요:

```bash
echo $DATABASE_URL
echo $DATABASE_USERNAME
echo $DATABASE_PASSWORD
```
