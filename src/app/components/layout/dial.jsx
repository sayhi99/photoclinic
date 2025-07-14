'use client';
import { useEffect } from 'react';

export default function Dial() {
  // 다이얼 기능
  const updateTransforms = (num) => {
    const rotations = [0, -60, -120, -180, -240, -300];
    const innerRotations = [0, 90, 240, 180, 120, 60];

    const dialButtons = document.querySelectorAll('.dial .btn');

    dialButtons.forEach((button, index) => {
      let rotationIndex = (index + num - 1) % rotations.length;
      let newRotate = rotations[rotationIndex];
      let innerRotate = innerRotations[rotationIndex];

      // 현재 회전값 가져오기
      const transform = window.getComputedStyle(button).transform;
      let currentRotate = 0;
      if (transform !== 'none') {
        const match = transform.match(/rotate\(([^)]+)deg\)/);
        if (match) {
          currentRotate = parseInt(match[1]) || 0;
        }
      }

      console.log(
        `Button ${
          index + 1
        }: Before normalization - newRotate=${newRotate}, currentRotate=${currentRotate}`
      );

      // 회전 방향 결정 (jQuery와 동일한 조건)
      if (Math.abs(newRotate - currentRotate) > 180) {
        if (newRotate > currentRotate) {
          newRotate -= 360;
        } else {
          newRotate += 360;
        }
      }

      // transform 스타일 적용
      button.style.transform = `rotate(${newRotate}deg)`;

      // img 요소 찾아서 transform 적용
      const img = button.querySelector('img');
      if (img) {
        img.style.transform = `translate(0, -50%) rotate(${innerRotate}deg)`;
      }

      // 클래스 추가/제거
      // if (newRotate === -180) {
      //   button.classList.add('active');
      // } else {
      //   button.classList.remove('active');
      // }
      // if (newRotate === 120 || newRotate === -180 || newRotate === -120) {
      // if (newRotate === -120 || newRotate === -180 || newRotate === 120) {
      if (
        newRotate === -120 ||
        newRotate === -180 ||
        newRotate === 120 ||
        newRotate === 180 ||
        newRotate === 240
      ) {
        // console.log('newRotate value:', newRotate);

        // try {
        //   console.log('newRotate value:', newRotate);
        // } catch (error) {
        //   console.error('Error logging newRotate:', error);
        // }
        button.classList.add('hidden');
      } else {
        button.classList.remove('hidden');
      }

      if (newRotate === 0) {
        button.classList.add('on');
      } else {
        button.classList.remove('on');
      }
    });
  };
  // 다이얼 관련 스크립트
  useEffect(() => {
    window.updateTransforms = updateTransforms;

    // DOM이 완전히 로드된 후 실행
    const handleInitialLoad = () => {
      const dialButtons = document.querySelectorAll('.dial .btn');
      if (dialButtons.length > 0) {
        const initialNum = 1; // 초기값 설정
        updateTransforms(initialNum);
      }
    };

    // 즉시 실행 시도
    handleInitialLoad();

    // DOM이 아직 로드되지 않았다면 약간의 지연 후 재시도
    const timer = setTimeout(handleInitialLoad, 100);

    return () => {
      delete window.updateTransforms;
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="dial">
        <div className="btn active" data-img="1">
          <a href="#2page">
            <img src="/img/main/dial_1.svg?v=2" alt="" />
            <img className="dial_on" src="/img/main/dial_1_on.svg?v=2" alt="" />
          </a>
        </div>
        <div className="btn" data-img="2">
          <a href="#7page">
            <img src="/img/main/dial_6.svg?v=2" alt="" />
            <img className="dial_on" src="/img/main/dial_6_on.svg?v=2" alt="" />
          </a>
        </div>
        <div className="btn" data-img="3">
          <a href="#6page">
            <img src="/img/main/dial_5.svg?v=2" alt="" />
            <img className="dial_on" src="/img/main/dial_5_on.svg?v=2" alt="" />
          </a>
        </div>
        <div className="btn" data-img="4">
          <a href="#5page">
            <img src="/img/main/dial_4.svg?v=2" alt="" />
            <img className="dial_on" src="/img/main/dial_4_on.svg?v=2" alt="" />
          </a>
        </div>
        <div className="btn" data-img="5">
          <a href="#4page">
            <img src="/img/main/dial_3.svg?v=2" alt="" />
            <img className="dial_on" src="/img/main/dial_3_on.svg?v=2" alt="" />
          </a>
        </div>
        <div className="btn" data-img="6">
          <a href="#3page">
            <img src="/img/main/dial_2.svg?v=2" alt="" />
            <img className="dial_on" src="/img/main/dial_2_on.svg?v=2" alt="" />
          </a>
        </div>
      </div>
    </>
  );
}
