## Frontend 시스템 스펙

- Vite 6
  - React 19
- TypeScript
- Material UI 6
- React Router 7

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
