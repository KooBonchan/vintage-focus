## Frontend 시스템 스펙

- Vite 6
  - React 19
- TypeScript
- Material UI 6
- React Router 7

## 구현 전략 - 250221

- MUI 컴포넌트 조합으로 기본 페이지 뼈대 구성
- 테마 커스터마이징
- 커스텀 컴포넌트 사용 최소화
- Open API 사용 예정 리스트
  - Portone 통합 결제 API
  - Google Map
- MUI 참고할만한 컴포넌트 라이브러리
  - [@mui/x-charts](https://mui.com/x/react-charts/)
    - 차트 및 대시보드
    - 관리자 페이지에 적용 예정
  - [@mui/x-date-pickers](https://mui.com/x/react-date-pickers/)
    - Date and Time
    - 대여 시스템에 적용 고려
  - [@mui/x-tree-view](https://mui.com/x/react-tree-view/) 
    - 아코디언 적용 시 MUI Accordian 대신 사용 고려
    - 상품 리스트 - 필터 페이지 사용 고려

## MUI 스타일링 가이드

[MUI 공식문서](https://mui.com/material-ui/getting-started/)

* theme 사용 예시
  ```
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        contrastText: 'white',
      },
    },
  });

  ...

  <ThemeProvider theme={customTheme}>
    <MyThemeComponent>Styled div with theme</MyThemeComponent>
  </ThemeProvider>
  ```

* sx props 사용 예시
  ```
  <Box
    sx={{
      color: 'success.dark',
      display: 'inline',
      fontWeight: 'bold',
      mx: 0.5,
      fontSize: 14,
    }}
  >
    +18.77%
  </Box>
  ```
* styled() 사용 예시
  ```
  const MyComponent = styled('div')({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
  });
  
  ...

  <MyComponent>Styled div</MyComponent>
  ```


## Vitest 참고자료

[공식문서 참고영상](https://vueschool.io/lessons/your-first-test?friend=vueuse)
[230917 vitest 예제 - 작성자 정윤규](https://velog.io/@asdf99245/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%9E%91%EC%84%B1%ED%95%B4%EB%B3%B4%EC%9E%90#%EB%8B%A8%EC%88%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8)
 - 직접 카피하지 않고 느낌만 보자
 - rest 요청 mocking - 수업시간에 배운 QueryClient로 대체하기
 - 유틸함수 테스트코드 작성
 - 커스텀 훅 테스트코드 작성
 - 컴포넌트 테스트
   - 렌더링
   - 핸들러 호출
   - given props - then 동작
   - 스냅샷
 - 의존성이 큰 컴포넌트의 경우 의존성을 mock을 잘 해야 함
   - 테스트 전 리팩토링으로 가능한 한 의존성을 분리 및 모듈화
