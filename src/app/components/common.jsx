'use client';
import { useEffect, useRef } from 'react';

export const useSplitText = () => {
  const splitTextRef = useRef(null);

  useEffect(() => {
    const splitText = (element) => {
      if (!element) return;

      const text = element.innerHTML; // HTML을 유지
      const newText = text.replace(
        /(<br\s*\/?>)|([^<>\s])/g,
        (match, brTag, character) => {
          return brTag ? brTag : `<span>${character}</span>`;
        }
      );

      element.innerHTML = newText;

      const spans = element.querySelectorAll('span');
      spans.forEach((span, index) => {
        span.classList.add(`num${index}`);
        const delay = index / 50 + 0.1;
        span.style.animationDelay = `${delay}s`;
      });
    };

    // split_fast 클래스를 가진 모든 요소에 적용
    const elements = document.querySelectorAll('.split_fast');
    elements.forEach(splitText);
  }, []);

  return splitTextRef;
};
export const ModalFunction = () => {
  useEffect(() => {
    // 모달 열기
    const handleModalOpen = (e) => {
      if (e.target.classList.contains('btn_pop')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('data-target');

        // 모달 열기 로직
        const modal = document.querySelector(targetId);
        if (modal) {
          // 모든 모달 닫기
          document
            .querySelectorAll('.modal')
            .forEach((m) => (m.style.display = 'none'));
          // 해당 모달 열기
          modal.style.display = 'block';

          // FullPage.js 스크롤 비활성화
          if (typeof window.fullpage_api !== 'undefined') {
            window.fullpage_api.setMouseWheelScrolling(false);
          }

          // body 스크롤 비활성화
          document.body.style.overflow = 'hidden';
        }
      }
    };

    // 모달 닫기 (닫기 버튼)
    const handleModalClose = (e) => {
      if (e.target.classList.contains('ico_close')) {
        console.log('Close button clicked', e.target);
        const modal = e.target.closest('.modal');
        if (modal) {
          modal.style.display = 'none';

          // FullPage.js 스크롤 활성화
          if (typeof window.fullpage_api !== 'undefined') {
            window.fullpage_api.setMouseWheelScrolling(true);
          }

          // body 스크롤 활성화
          document.body.style.overflow = '';

          // more 클래스 제거
          if (modal.classList.contains('more')) {
            modal.classList.remove('more');
          }
        }
      }
    };

    // 모달 배경 클릭으로 닫기
    const handleModalBackgroundClick = (e) => {
      if (e.target.classList.contains('modal')) {
        const modal = e.target;
        const modalContent = e.target.querySelector('.modal_content');

        // 모달 내용 영역 클릭이 아닌 경우에만 닫기
        if (!modalContent || !modalContent.contains(e.target)) {
          modal.style.display = 'none';

          // FullPage.js 스크롤 활성화
          if (typeof window.fullpage_api !== 'undefined') {
            window.fullpage_api.setMouseWheelScrolling(true);
          }

          // body 스크롤 활성화
          document.body.style.overflow = '';

          // more 클래스 제거
          if (modal.classList.contains('more')) {
            modal.classList.remove('more');
          }
        }
      }
    };

    document.addEventListener('click', handleModalOpen);
    document.addEventListener('click', handleModalClose);
    document.addEventListener('click', handleModalBackgroundClick);
    // 클린업 함수

    return () => {
      document.removeEventListener('click', handleModalOpen);
      document.removeEventListener('click', handleModalClose);
      document.removeEventListener('click', handleModalBackgroundClick);
    };
  }, []);

  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const element = e.target;

      // 스크롤 시 클래스 추가
      element.classList.add('scrolling');

      // 기존 타이머 클리어
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 스크롤 중지 후 클래스 제거
      scrollTimeoutRef.current = setTimeout(() => {
        element.classList.remove('scrolling');
      }, 500); // 스크롤 멈춘 후 0.5초 뒤에 숨김
    };

    // 모달 내의 모든 .txt_wrap 요소에 이벤트 리스너 추가
    const scrollElements = document.querySelectorAll('.modal .txt_wrap');

    scrollElements.forEach((element) => {
      element.addEventListener('scroll', handleScroll);
    });

    // 클린업 함수

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollElements.forEach((element) => {
        element.removeEventListener('scroll', handleScroll);
      });
    };
  }, []);
};
