'use client';
import { ModalFunction } from '../common';
import './modal.css';
import { useEffect, useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Modal() {
  ModalFunction();
  const main6SwiperRef = useRef(null);

  useEffect(() => {
    const initMain6Swiper = async () => {
      const { default: Swiper } = await import('swiper');
      // const { Navigation, Autoplay } = await import('swiper');

      main6SwiperRef.current = new Swiper('#main_6_slide .swiper', {
        modules: [Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        effect: 'slide',
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '#main_6_slide .swiper_button_next',
          prevEl: '#main_6_slide .swiper_button_prev',
        },
      });
    };
    const handleMain6Click = (e) => {
      if (e.target.closest('.main_6 .list_wrap a')) {
        const clickedLink = e.target.closest('a');
        const listItem = clickedLink.parentElement;
        const index = Array.from(listItem.parentElement.children).indexOf(
          listItem
        );

        // 모달이 열린 후 슬라이드 이동
        setTimeout(() => {
          if (main6SwiperRef.current) {
            main6SwiperRef.current.slideTo(index + 1);
          }
        }, 100);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('click', handleMain6Click);

    // DOM이 로드된 후 Swiper 초기화
    const timer = setTimeout(initMain6Swiper, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleMain6Click);
      if (main6SwiperRef.current) {
        main6SwiperRef.current.destroy();
      }
    };
  }, []);
  return (
    <>
      <div className="modal pop_policy" id="pop_info" data-lenis-prevent>
        <div className="modal_inner">
          <div className="content">
            <div className="head">
              <h3>개인정보취급방침</h3>
              <button type="button" className="btn_close">
                <span className="ico_close"></span>
              </button>
            </div>
            <div className="txt_wrap">
              <div className="txt">
                <strong>포토클리닉 개인정보취급방침</strong>◆ 포토클리닉은
                개인정보 보호법 제30조에 따라 정보주체(고객)의 개인정보를
                보호하고, 이와 관련한 고충을 신속하고 원활하게 처리하기 위해
                다음과 같은 방침을 수립·공개합니다.
                <strong>1. 개인정보 수집/이용 목적</strong>□ 포토클리닉은 수집한
                개인정보를 다음의 목적을 위해 사용합니다. ο 맞춤형 촬영 서비스
                제공 및 예약 관리 ο 본인 확인, 회원 식별, 불법 이용 방지 및 고객
                상담, 민원 처리 ο 마케팅 및 프로모션: 이벤트 안내, 신규 서비스
                정보 제공, 고객 분석을 통한 맞춤형 콘텐츠 제공 ο 고객 만족도
                조사, 서비스 개선 및 통계 분석
                <strong>2. 수집하려는 개인정보의 항목</strong>□ 서비스 이용 및
                상담 요청 시 아래와 같은 개인정보를 수집합니다. ο 필수항목:
                이름, 생년월일, 로그인 ID, 비밀번호, 휴대전화번호, 이메일,
                접속로그, 서비스 이용기록 ο 선택항목: 희망 지점, 관심 서비스,
                이벤트 참여 여부, 가입 경로, 마케팅 수신 동의 여부 ο 보유기간:
                회원 탈퇴 요청 전까지 또는 관련 법령 기준에 따름 ο 수집 방법:
                홈페이지(예약/상담/회원가입 등) 및 고객센터
                <strong>3. 개인정보의 보유 및 이용기간</strong>① 수집 시 동의
                받은 개인정보 보유 기간 또는 법령 기준에 따라 처리 및
                보유합니다. ② 구체적 기간은 다음과 같습니다. ο 고객관리: 탈퇴
                요청 또는 서비스 종료 시까지 ο 예약 및 결제 기록: 5년 ο 사진 및
                관련 콘텐츠: 촬영 계약에 따른 보유 기간 동안 ο 법적 의무에 따른
                경우 보관 가능
                <strong>4. 개인정보의 제3자 제공</strong>
                포토클리닉은 법률 또는 고객 동의가 없는 한 제3자에게 개인정보를
                제공하지 않습니다.
                <strong>5. 정보주체의 권리 및 행사 방법</strong>
                고객은 언제든지 다음과 같은 권리를 행사할 수 있습니다. ①
                개인정보 열람 요구 ② 오류 수정 요구 ③ 삭제 및 처리 정지 요구 ※
                서면, 이메일, 팩스 등을 통해 신청 가능
                <strong>6. 처리하는 개인정보 항목</strong>ο 수집항목: 이름,
                생년월일, 로그인ID, 비밀번호, 휴대전화번호, 이메일 주소,
                접속로그, 서비스 이용기록 ο 선택항목: 희망 지점, 관심 서비스,
                이벤트 참여 여부, 가입 경로, 마케팅 수신 동의
                <strong>7. 개인정보의 파기</strong>① 수집 목적 달성 시, 불필요한
                개인정보는 지체 없이 파기합니다. ο 전자 파일: 복구 불가능한
                기술적 방법으로 삭제 ο 종이 문서: 분쇄 또는 소각 처리
                <strong>8. 개인정보 자동수집 장치 운영</strong>
                쿠키를 통해 방문자 행동 분석 및 맞춤 서비스 제공을 위한 정보를
                수집할 수 있습니다. 고객은 웹 브라우저 설정을 통해 쿠키 허용
                여부를 조정할 수 있습니다.
                <strong>9. 개인정보의 안전성 확보 조치</strong>ο 정기 감사 및
                보안 점검 ο 개인정보 처리 인원 최소화 및 접근 통제 ο 암호화 저장
                및 백업 ο 해킹 및 바이러스 대응 체계 운영
                <strong>10. 개인정보 보호책임자</strong>
                포토클리닉은 다음과 같이 개인정보 보호 책임자를 지정하여 고객의
                개인정보 보호 업무를 담당하고 있습니다. - 성명: 정연호 - 연락처:
                010-8556-2988
                <strong>11. 동의 거부 시 불이익 안내</strong>
                고객은 개인정보 수집 및 이용에 대해 동의하지 않을 수 있으며,
                동의하지 않을 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
                <strong>12. 시행일자</strong>본 개인정보취급방침은 **2025년 04월
                14일부터 적용됩니다.**
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal scroll_section" id="main_6_slide">
        <div className="modal_content">
          <button className="btn_close">
            <span className="ico_close"></span>
          </button>
          <div className="swiper">
            <div className="swiper-wrapper">
              {/* <?php foreach ($portfolio as $row) { ?> */}
              <div className="swiper-slide" data-seq="">
                <div className="inner_wrap ">
                  <div className="inner">
                    <div>
                      <img src="/img/main/main_6_img1.png" alt="더드림의원" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide" data-seq="">
                <div className="inner_wrap ">
                  <div className="inner">
                    <div>
                      <img src="/img/main/main_6_img2.png" alt="더드림의원" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide" data-seq="">
                <div className="inner_wrap ">
                  <div className="inner">
                    <div>
                      <img src="/img/main/main_6_img3.png" alt="더드림의원" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide" data-seq="">
                <div className="inner_wrap ">
                  <div className="inner">
                    <div>
                      <img src="/img/main/main_6_img4.png" alt="더드림의원" />
                    </div>
                  </div>
                </div>
              </div>
              {/* <?php } ?> */}
            </div>
            <div className="swiper_navigition">
              <div className="swiper_button_prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 44 44"
                  width="44"
                  height="44"
                >
                  <path d="M31.33 42 12 22 31.33 2l.67.69L13.34 22 32 41.31z"></path>
                </svg>
              </div>
              <div className="swiper_button_next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 44 44"
                  width="44"
                  height="44"
                >
                  <path d="M12.67 2 32 22 12.67 42l-.67-.69L30.66 22 12 2.69z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
