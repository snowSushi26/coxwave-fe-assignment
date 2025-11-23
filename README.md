# 김설회 과제

## 폴더 구조

### FSD (Feature-Sliced Design) 아키텍처를 채택해서 커스텀하여 사용 ([참조](https://feature-sliced.design/))

- widgets
  - 페이지에서 사용하는 독립적 UI 컴포넌트
- features
  - 기간 필터링 등의 비즈니스 상호작용 기능
- entities
  - 이벤트, 프로젝트 등 비즈니스 엔티티 관련 컴포넌트 및 데이터
- shared
  - 비즈니스에 종속되지 않는 프로젝트 전체에서 재사용되는 공통 컴포넌트 및 유틸

## 라이브러리

- date-fns & date-fns-tz: 날짜 조작 및 타임존 적용 하기위해 사용.
- react-datepicker: 빠른 데이트피커 개발을 위해 사용.
- clsx: 조건부 클래스 관리 및 병합을 위해 사용했습니다.
- class-variance-authority: 기능별 및 속성별 스타일 매핑을 하기위해 사용

### 요구사항

- [x] Next.js v15.4이상
- [x] Node v22.x.x 사용
- [x] Chrome 130+
  - [x] 호환성 테스트 (Playwright)

## 과제 구현 내용

### 프로젝트 선택 기능

- [x] 드롭다운 메뉴를 통해 사용자가 프로젝트를 선택할 수 있습니다.

### 기간(Period) 선택 기능

- [x] 사전 정의된 기간 옵션 제공
  - [x] Today: 금일 00시 ~ 현재
  - [x] Yesterday: 작일 00시 ~ 금일 00시
  - [x] This Week: 금주 월요일 00시 ~ 현재
  - [x] Last 30 Days: 29일 전 00시 ~ 현재
  - [x] Custom: 선택한 시작일 00시 ~ 선택한 종료일 + 1일의 00시
- [x] Custom을 선택하면 DatePicker를 이용해 기간을 선택할 수 있습니다.
- [x] 시간 단위 선택은 지원하지 않습니다.
- [x] 모든 시간은 선택된 프로젝트의 Timezone 기준

### 이벤트 목록

- [x] ID, Type, CreateTime을 표시하고 CreateTime은 Jul 7, 2023, 1:21 AM 과 같은 형식으로 표시
      합니다.
- [x] 표시하는 CreateTime은 프로젝트에 설정된 Timezone을 기준으로 하여 표시합니다.

### 페이지네이션 UI

- [x] 이전 페이지, 다음 페이지 이동 기능을 제공합니다.
- [x] 한 페이지에 표시하는 항목 개수의 기본값은 15입니다.
- [x] 현재 탐색중인 페이지를 나타내는 정보를 표시합니다.
  - [x] 이는 보고 있는 항목들이 전체 목록에서 몇번째 위치하는 지를 표현합니다
  - [x] 예를 들어 해당 기간에 존재하는 이벤트가 32개이고, 두번째 페이지를 보고 있다면 16-30
        / 32 로 표현합니다.

### 기타

- 서버 데이터가 2024년 11월 ,12월 데이터만 있어서 default값을 custom으로 2024년으로 기간 설정 해놨습니다.

## 빌드 및 실행

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

## Chrome 130+ 호환성 테스트

### 테스트

```bash
npx playwright install chromium
npm run test
```
