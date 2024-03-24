async function scaleCalculator() {
    await new Promise(resolve => setTimeout(resolve, 100)); // 1000 밀리초 = 1초
    const scaleLanding = document.getElementById("landing")
    const currentWidth = 1280;
    const currentHeight = 720;
  
    // 비율에 따른 scale 계산
    let scale = Math.min(innerHeight / currentHeight, innerWidth / currentWidth);
    scale = Math.ceil(scale * 10) / 10; // 1.4 이상인 경우 소수점 두 번째 자리에서 올림
    // 결과 출력
    console.log("Scale:", scale);
    scaleLanding.style.transform = `scale(${scale})`
  }