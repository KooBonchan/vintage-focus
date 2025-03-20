export const dummyReviews = Array.from({ length: 20 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
  
    const allImages = [
      "/image/sample/review/123.jpg",
      "/image/sample/review/124.jpg",
      "/image/sample/review/321.jpg",
      "/image/sample/review/3134.jpg",
      "/image/sample/review/13341.jpg",
    ];
  
    // ✅ 0~3개의 중복 없는 랜덤 이미지 선택
    const imageCount = Math.floor(Math.random() * 4); // 0~3개 선택
    const shuffledImages = new Set(); // 중복 방지를 위해 Set 사용
  
    while (shuffledImages.size < imageCount) {
      const randomImage = allImages[Math.floor(Math.random() * allImages.length)];
      shuffledImages.add(randomImage);
    }
  
    return {
      id: index + 1,
      user: {
        name: `CameraUser${index + 1}`,
        avatar: "/static/images/avatar/default.png",
      },
      rating: Math.floor(Math.random() * 5) + 1,
      images: Array.from(shuffledImages), // ✅ 중복 없는 랜덤 이미지 적용 (0~3개)
      content: [
        "이 카메라는 야외 촬영 시 뛰어난 화질을 제공합니다. 저조도 환경에서도 선명한 사진을 찍을 수 있어 만족스럽습니다.",
        "렌즈 교체가 쉽고 무게도 가벼워 여행용으로 적합합니다. 배터리 수명도 긴 편이라 하루 종일 촬영할 수 있습니다.",
        "AF 속도가 빠르고 컬러 표현이 정확합니다. 단, 동영상 촬영 시 발열이 약간 발생할 수 있습니다.",
        "터치스크린이 반응이 빠르고 조작이 편리합니다. 초보자도 쉽게 사용할 수 있는 인터페이스가 강점입니다.",
        "사진의 디테일이 뛰어나고 색감도 자연스럽습니다. 하지만 가격이 다소 비싸다는 점이 단점입니다.",
      ][index % 5],
      createdAt: date.toISOString(),
    };
  });
  