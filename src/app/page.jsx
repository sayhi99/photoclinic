'use client';
import { useEffect, useRef } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { useSplitText } from '@/app/components/common';
import { ModalFunction } from '@/app/components/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  Pagination,
  EffectFade,
  Controller,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'fullpage.js/dist/fullpage.css';
import './main.css';
import Footer from '@/app/components/layout/footer';

export default function HomePage() {
  useSplitText();
  ModalFunction();
  const main4imgSwiperRef = useRef(null);
  const main4txtSwiperRef = useRef(null);

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
        const matrix = transform.match(/matrix.*\((.+)\)/);
        if (matrix) {
          const values = matrix[1].split(', ');
          const a = values[0];
          const b = values[1];
          currentRotate = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }
      }

      // 회전 방향 결정 (항상 짧은 경로로 회전)
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
      if (newRotate === -180) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }

      if (newRotate === 120 || newRotate === -180 || newRotate === -120) {
        // alert('12');
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

  // Section 4 Swiper 초기화
  useEffect(() => {
    const initSection4Swipers = async () => {
      const { default: Swiper } = await import('swiper');

      const main4imgSwiper = new Swiper('.main_4 .img_wrap .swiper', {
        modules: [Autoplay, EffectFade, Controller],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        loopedSlides: 6,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        watchSlidesProgress: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });

      const main4txtSwiper = new Swiper('.main_4 .txt_wrap .swiper', {
        modules: [EffectFade, Controller],
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'fade',
        loop: true,
        loopedSlides: 6,
      });

      main4txtSwiper.controller.control = main4imgSwiper;
      main4imgSwiper.controller.control = main4txtSwiper;

      main4imgSwiperRef.current = main4imgSwiper;
      main4txtSwiperRef.current = main4txtSwiper;
    };

    const timer = setTimeout(initSection4Swipers, 100);

    return () => {
      clearTimeout(timer);
      if (main4imgSwiperRef.current) {
        main4imgSwiperRef.current.destroy();
      }
      if (main4txtSwiperRef.current) {
        main4txtSwiperRef.current.destroy();
      }
    };
  }, []);

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

  const main8SwiperRef = useRef(null);

  // Main 8 Swiper 초기화
  useEffect(() => {
    const initMain8Swiper = async () => {
      const { default: Swiper } = await import('swiper');
      const { Autoplay } = await import('swiper');

      main8SwiperRef.current = new Swiper('.main_8 .swiper', {
        modules: [Autoplay],
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        speed: 3000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          stopOnLastSlide: false,
        },
      });
    };

    // DOM이 로드된 후 Swiper 초기화
    const timer = setTimeout(initMain8Swiper, 100);

    return () => {
      clearTimeout(timer);
      if (main8SwiperRef.current) {
        main8SwiperRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="App">
        <ReactFullpage
          // debug
          licenseKey="8KZNK-N2PA6-HR1W6-1JLGI-EYBNL"
          scrollingSpeed={1000}
          scrollOverflow={true}
          scrollOverflowReset={true}
          scrollOverflowOptions={{
            click: true,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
          }}
          anchors={[
            '1page',
            '2page',
            '3page',
            '4page',
            '5page',
            '6page',
            '7page',
          ]}
          normalScrollElements={'.scroll_section'}
          menu={true}
          slidesNavigation={true}
          responsiveWidth={1280}
          navigation={false}
          afterLoad={(anchorLink, index) => {
            if (typeof window.headerNav === 'function') {
              window.headerNav(index.index);
            }

            if (index.index === 0 || index.index === 7) {
              const dialElements = document.querySelectorAll('.dial');
              dialElements.forEach((el) => el.classList.remove('on'));
            } else {
              const dialElements = document.querySelectorAll('.dial');
              dialElements.forEach((el) => el.classList.add('on'));
              if (typeof window.updateTransforms === 'function') {
                window.updateTransforms(index.index);
              }
            }

            if (index.index === 2) {
              const countingElements = document.querySelectorAll('.counting');
              countingElements.forEach((element) => {
                const countTo = element.getAttribute('data-count');
                let currentCount = 0;
                const duration = 1500;
                const increment = countTo / (duration / 16);

                const animate = function () {
                  currentCount += increment;
                  if (currentCount < countTo) {
                    element.textContent =
                      Math.floor(currentCount).toLocaleString();
                    requestAnimationFrame(animate);
                  } else {
                    element.textContent = countTo.toLocaleString();
                  }
                };
                animate();
              });
            }
          }}
          render={() => (
            //  <div id="fullpage">
            <ReactFullpage.Wrapper>
              <section className="section section_1">
                <div className="main_1 main_section">
                  <div className="camera">
                    {/* <!-- <div id="coords">X: --%, Y: --%</div> --> */}
                    <div className="grid">
                      <img src="/img/main/grid.svg" alt="" />
                    </div>
                    <div className="frame_wrap">
                      <div className="frame_1">
                        <img src="/img/main/frame_1.svg" alt="" />
                      </div>
                      <div className="frame_2">
                        <img src="/img/main/frame_2.svg" alt="" />
                      </div>
                      <div className="frame_3">
                        <img src="/img/main/frame_3.svg" alt="" />
                      </div>
                      <div className="frame_4">
                        <img src="/img/main/frame_4.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <Swiper
                    className="swiper main_1_swiper"
                    modules={[Autoplay, Pagination, EffectFade]}
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    effect="fade"
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      el: '.main_1 .swiper-pagination',
                      clickable: true,
                      renderBullet: function (index, className) {
                        return (
                          '<span class="' +
                          className +
                          '">' +
                          (index + 1) +
                          '</span>'
                        );
                      },
                    }}
                  >
                    <SwiperSlide>
                      <div className="bg main_1_1">
                        <div className="text_wrap">
                          <b className="split_fast">포토클리닉은</b>
                          <strong>
                            병원의 이야기에 <br />
                            사람의 하모니를 더합니다
                          </strong>
                          <p>
                            모든 컨텐츠는 섬세한 기획과 따뜻한 감성으로
                            촬영합니다. <br />
                            병원의 이야기가 특별한 브랜드가 되도록 진심을
                            담습니다. <br />
                            사진은 "진주마음우산정신건강의학과의 감성"입니다.
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="bg main_1_2">
                        <div className="text_wrap">
                          <b className="split_fast">포토클리닉은</b>
                          <strong>
                            섬세한 기획으로 <br />
                            병원의 감성을 그려냅니다.
                          </strong>
                          <p>
                            모든 사진은 단순한 기록이 아닌, 병원이 지닌 분위기와
                            의료진의 따뜻한 마음을 전하는 작업입니다. <br />
                            더원서울안과의 이야기를 닮은 공간, 그 안에서 환자를
                            바라보는 시선까지 담아 <br />
                            브랜드의 감성을 사진으로 완성합니다.
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="bg main_1_3">
                        <div className="text_wrap">
                          <b className="split_fast">포토클리닉은</b>
                          <strong>
                            병원의 이야기를 <br />
                            브랜드의 언어로 전합니다.
                          </strong>
                          <p>
                            따뜻한 진료의 순간, 섬세하게 설계된 공간, <br />
                            그리고 의료진의 진심이 한 장의 사진 속에서 브랜드가
                            됩니다. <br />
                            알파서울안과의 이야기를 포토클리닉의 감성으로
                            기록했습니다.
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <div className="bottom_wrap">
                    <div className="pagination_wrap">
                      <img src="/img/main/main_1_vector1.svg" alt="" />
                      <div className="fake_pagination">
                        <span>3</span>
                        <span>2</span>
                        <span>1</span>
                        <span>0</span>
                      </div>
                      <div className="swiper-pagination"></div>
                      <img src="/img/main/main_1_vector2.svg" alt="" />
                    </div>
                    <img src="/img/main/main_1_vector4.svg" alt="" />
                  </div>
                </div>
              </section>
              <section className="section section_2">
                <div className="main_2 main_section">
                  <div className="main_inner">
                    <div className="txt_wrap">
                      <div>
                        <div className="main_tit">
                          <span className="split_fast split_fade_right">
                            Director
                          </span>
                          <h3 className="fade_up">
                            <b>"포토클리닉만</b> 할 수 있는 이야기<b>"</b>
                          </h3>
                        </div>
                        <div className="content fade_up">
                          <p>
                            병원공간과 사람의 조화를 최우선으로 생각합니다.{' '}
                            <br />
                            모든 컨텐츠는 섬세한 기획과 따뜻한 감성으로
                            만들어집니다.
                          </p>
                          <p>
                            병원의 이야기와 의료진의 이미지, <br />
                            직원들의 서비스와 공간이 주는 느낌이 모여, <br />
                            병원브랜드를 만듭니다.
                          </p>
                          <p>
                            우리 병원만의 이야기, <br />
                            ​포토클리닉으로 시작해보세요.
                          </p>
                          <p>
                            이름을 걸고, 진심을 담겠습니다. <br />
                            포토코치 정연호 드림.
                          </p>
                        </div>
                        <a
                          className="link_btn fade_right"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert('준비중');
                          }}
                        >
                          <span>프로젝트 문의하기</span>
                          <img src="/img/main/main_5_icon1.svg" alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="img_wrap ">
                      <img
                        className="main_2_img1 fade_left"
                        src="/img/main/main_2_img1.png"
                        alt=""
                      />
                      <img
                        className="main_2_img2"
                        src="/img/main/main_2_img2.png?v=2"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section className="section section_3">
                <div className="main_3 main_section">
                  <div className="main_inner">
                    <div className="main_tit">
                      <span className="split_fast split_fade_right">About</span>
                      <h3 className="fade_up">
                        <b>포토클리닉이 걸어온 길</b>
                      </h3>
                      <p className="fade_up">
                        "진심으로 걸어온 길,
                        <br className="mobile_block" /> 병원이 잘 되길 바라는
                        마음을 담아."
                      </p>
                    </div>
                    <ul className="fade_up">
                      <li>
                        <div className="con">
                          <img src="/img/main/main_3_img1.webp" alt="" />
                          <strong>촬영한 병원</strong>
                          <p>
                            <b className="counting" data-count="350">
                              00
                            </b>{' '}
                            여 곳
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="con">
                          <img src="/img/main/main_3_img2.webp" alt="" />
                          <strong>촬영한 의료진</strong>
                          <p>
                            <b className="counting" data-count="420">
                              00
                            </b>{' '}
                            명 이상
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="con">
                          <img src="/img/main/main_3_img3.webp" alt="" />
                          <strong>전달된 보정사진</strong>
                          <p>
                            <b className="counting" data-count="32000">
                              00,000
                            </b>{' '}
                            컷 이상
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className="section section_4">
                <div className="main_4 main_section">
                  <div className="main_inner">
                    <div className="img_wrap">
                      <div className="swiper">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="_cover">
                              <img src="/img/main/main_4_img1.png" alt="" />
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="_cover">
                              <img src="/img/main/main_4_img2.png" alt="" />
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="_cover">
                              <img src="/img/main/main_4_img3.png" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="txt_wrap">
                      <div className="swiper">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div>
                              <span className="top_txt split_fast split_fade_right">
                                Philosophy
                              </span>
                              <h3>
                                촬영을 하기 위한 과정, <br />
                                <b>관심과 열정.</b>
                              </h3>
                              <p>
                                포토클리닉은 자주 병원에 방문을 합니다. <br />
                                저희가 하는 이 과정은 단순히 사진을 찍기 위함이
                                아닙니다. <br />
                                병원의 스토리와 그것으로 만들어지는 브랜드를
                                위한 과정입니다.
                              </p>
                              <div className="load_wrap">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="66"
                                  height="66"
                                  viewBox="0 0 66 66"
                                  fill="none"
                                >
                                  <circle
                                    cx="33.0482"
                                    cy="33.0001"
                                    r="30.5901"
                                    stroke="#69AAAF"
                                    strokeOpacity="0.2"
                                    strokeWidth="3.22474"
                                  />
                                </svg>
                                <svg
                                  className="load start"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="66"
                                  height="66"
                                  viewBox="0 0 66 66"
                                  fill="none"
                                >
                                  <circle
                                    cx="33.0482"
                                    cy="33.0001"
                                    r="30.5901"
                                    stroke="#155855"
                                    strokeOpacity="1"
                                    strokeWidth="3.22474"
                                  />
                                </svg>
                                <span className="num">01</span>
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div>
                              <span className="top_txt split_fast split_fade_right">
                                Philosophy
                              </span>
                              <h3>
                                우리는 <b>함께라는 가치</b>에 <br />
                                집중합니다
                              </h3>
                              <p>
                                저희는 원장님과 함께 병원의 직원 모두, 촬영에
                                참여하게 합니다. <br />
                                많은 병원들이 촬영 후, 병원 분위기가 좋아졌다고
                                말합니다. <br />
                                저희는 병원과 사람의 조화를 만드는 일을 합니다.
                              </p>
                              <div className="load_wrap">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="66"
                                  height="66"
                                  viewBox="0 0 66 66"
                                  fill="none"
                                >
                                  <circle
                                    cx="33.0482"
                                    cy="33.0001"
                                    r="30.5901"
                                    stroke="#69AAAF"
                                    strokeOpacity="0.2"
                                    strokeWidth="3.22474"
                                  />
                                </svg>
                                <svg
                                  className="load start"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="66"
                                  height="66"
                                  viewBox="0 0 66 66"
                                  fill="none"
                                >
                                  <circle
                                    cx="33.0482"
                                    cy="33.0001"
                                    r="30.5901"
                                    stroke="#155855"
                                    strokeOpacity="1"
                                    strokeWidth="3.22474"
                                  />
                                </svg>
                                <span className="num">02</span>
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div>
                              <span className="top_txt split_fast split_fade_right">
                                Philosophy
                              </span>
                              <h3>
                                무엇보다{' '}
                                <b>
                                  높은 퀄리티의 <br />
                                  결과물
                                </b>
                                을 드립니다
                              </h3>
                              <p>
                                ​병원에 대한 관심, 인물촬영에 대한 깊은 철학에서
                                시작합니다. 한장, 한장이 브랜드라는 생각으로
                                컨텐츠를 만듭니다. 그래서 저희는 재촬영 비율이
                                거의 없습니다.
                              </p>
                              <div className="load_wrap">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="66"
                                  height="66"
                                  viewBox="0 0 66 66"
                                  fill="none"
                                >
                                  <circle
                                    cx="33.0482"
                                    cy="33.0001"
                                    r="30.5901"
                                    stroke="#69AAAF"
                                    strokeOpacity="0.2"
                                    strokeWidth="3.22474"
                                  />
                                </svg>
                                <svg
                                  className="load start"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="66"
                                  height="66"
                                  viewBox="0 0 66 66"
                                  fill="none"
                                >
                                  <circle
                                    cx="33.0482"
                                    cy="33.0001"
                                    r="30.5901"
                                    stroke="#155855"
                                    strokeOpacity="1"
                                    strokeWidth="3.22474"
                                  />
                                </svg>
                                <span className="num">03</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="section section_5">
                <div className="main_5 main_section">
                  <div className="main_inner">
                    <div className="main_tit">
                      <span className=" split_fast split_fade_right">
                        Services
                      </span>
                      <h3 className="fade_up">
                        포토클리닉 <b>진심컨텐츠</b>
                      </h3>
                      <p className="fade_up">
                        병원이 잘되길 바라는 진심에서 시작합니다
                      </p>
                    </div>
                    <ul className="trs_9 fade_up">
                      <li>
                        <strong>​프리미엄</strong>
                        <span>Premium</span>
                        <div className="list_wrap">
                          <p>- 의료진 프로필</p>
                          <p>- 진료연출 기획 및 촬영</p>
                          <p>- 병원 분위기 / 인테리어 </p>
                        </div>
                      </li>
                      <li>
                        <strong>​프리미엄+</strong>
                        <span>Premium Plus</span>
                        <div className="list_wrap">
                          <p>- 프리미엄패키지 외</p>
                          <p>- 브랜드영상 4K 1분 30초</p>
                          <p>- 스토리영상 4K 30초</p>
                        </div>
                      </li>
                      <li>
                        <strong>홈페이지</strong>
                        <span>Homepage</span>
                        <div className="list_wrap">
                          <p>- 프리미엄패키지 외</p>
                          <p>- 홈페이지 제작</p>
                        </div>
                      </li>
                      <li>
                        <strong>구독컨텐츠</strong>
                        <span>Subscribe Contents</span>
                        <div className="list_wrap">
                          <p>- 사진 구독</p>
                          <p>- 인스타그램 관리</p>
                          <p>- 원내 사진 관리</p>
                        </div>
                      </li>
                    </ul>
                    <div className="txt_box trs_12 fade_up">
                      <p>
                        저희 포토클리닉 컨텐츠는 병원의 홍보를 위한 컨텐츠뿐만
                        아니라, 병원의 브랜딩을 위한 이미지와 영상을 기획하고
                        만듭니다. <br />
                        이미지는 병원의 스토리를 이야기 하는데 가장 좋은
                        도구입니다. <br />
                        병원의 스토리에 맞게, 원하는 컨텐츠를 고르세요. 패키지
                        상품은 합리적인 가격에 최상의 컨텐츠를 제공합니다.
                      </p>
                    </div>
                    <a
                      className="link_btn fade_right trs_12"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('준비중');
                      }}
                    >
                      <span>프로젝트 문의하기</span>
                      <img src="/img/main/main_5_icon1.svg" alt="" />
                    </a>
                  </div>
                </div>
              </section>
              <section className="section section_6 ">
                <div className="main_6 main_section">
                  <div className="main_inner">
                    <div className="main_tit">
                      <span className="split_fast split_fade_right">
                        Portfolio
                      </span>
                      <h3 className="fade_up trs_3">
                        포토클리닉 <b>함께 한 병원들</b>
                      </h3>
                      <p className="fade_up trs_6">
                        진심으로 담은 우리병원사진
                      </p>
                    </div>
                    <div className="list_wrap scroll_section trs_9 fade_up">
                      <div className="">
                        <ul>
                          <li>
                            <a
                              href="#"
                              className="btn_pop"
                              data-target="#main_6_slide"
                              onClick={(e) => {
                                e.preventDefault();
                                // 모달 열기 로직은 useModal 훅에서 처리됨
                              }}
                            >
                              <img
                                src="/img/main/main_6_img1.png"
                                alt="더드림의원"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="btn_pop"
                              data-target="#main_6_slide"
                              data-seq=""
                              onClick={(e) => {
                                e.preventDefault();
                                // 모달 열기 로직은 useModal 훅에서 처리됨
                              }}
                            >
                              <img
                                src="/img/main/main_6_img2.png"
                                alt="더드림의원"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="btn_pop"
                              data-target="#main_6_slide"
                              data-seq=""
                              onClick={(e) => {
                                e.preventDefault();
                                // 모달 열기 로직은 useModal 훅에서 처리됨
                              }}
                            >
                              <img
                                src="/img/main/main_6_img3.png"
                                alt="더드림의원"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="btn_pop"
                              data-target="#main_6_slide"
                              data-seq=""
                              onClick={(e) => {
                                e.preventDefault();
                                // 모달 열기 로직은 useModal 훅에서 처리됨
                              }}
                            >
                              <img
                                src="/img/main/main_6_img4.png"
                                alt="더드림의원"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="section section_7">
                <div className="main_7 main_section">
                  <div className="main_inner">
                    <div className="main_tit">
                      <span className="split_fast split_fade_right">
                        Contact
                      </span>
                      <h3 className="fade_up trs_3">
                        포토클리닉에 <b>문의주세요!</b>
                      </h3>
                      <p className="fade_up trs_6">
                        저희는 압구정에 있지만, 마음만은 전국에.
                      </p>
                    </div>
                    <div className="con_wrap">
                      <div className="form_box fade_right trs_9">
                        <form action="/curd/inquiry.php" method="POST">
                          <div className="input_wrap">
                            <label htmlFor="name">이름</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="이름을 입력해주세요."
                              required
                            />
                          </div>
                          <div className="input_wrap ">
                            <label htmlFor="tel">전화번호</label>
                            <div className="tel_box">
                              <input
                                type="text"
                                id="tel1"
                                name="tel1"
                                placeholder="010"
                                required
                                maxLength="3"
                                onInput={(e) => {
                                  e.target.value = e.target.value
                                    .replace(/[^0-9]/g, '')
                                    .slice(0, 3);
                                }}
                              />
                              -
                              <input
                                type="text"
                                id="tel2"
                                name="tel2"
                                placeholder=""
                                required
                                maxLength="4"
                                onInput={(e) => {
                                  e.target.value = e.target.value
                                    .replace(/[^0-9]/g, '')
                                    .slice(0, 4);
                                }}
                              />
                              -
                              <input
                                type="text"
                                id="tel3"
                                name="tel3"
                                placeholder=""
                                required
                                maxLength="4"
                                onInput={(e) => {
                                  e.target.value = e.target.value
                                    .replace(/[^0-9]/g, '')
                                    .slice(0, 4);
                                }}
                              />
                            </div>
                          </div>
                          <div className="input_wrap">
                            <label htmlFor="mail">이메일</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="이메일을 입력하세요"
                              required
                            />
                          </div>
                          <div className="input_wrap">
                            <label htmlFor="content">문의내용</label>
                            <textarea
                              name="content"
                              id="content"
                              placeholder="내용을 입력하세요"
                            ></textarea>
                          </div>
                          <div className="bottom_wrap">
                            <div className="chk_wrap">
                              <input
                                type="checkbox"
                                id="chk"
                                name="chk"
                                required
                              />
                              <label htmlFor="chk">
                                개인정보 취급방침 동의
                              </label>
                              <a
                                href="#"
                                className="btn_pop"
                                data-target="#pop_info"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // 모달 열기 로직은 useModal 훅에서 처리됨
                                }}
                              >
                                [자세히보기]
                              </a>
                            </div>
                            <button type="submit">
                              <span>문의하기</span>
                              <img src="/img/main/main_7_icon1.svg" alt="" />
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="map_box  fade_left trs_9">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.5035950549936!2d127.02916477632164!3d37.5196245268159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca38d2916209f%3A0xa671a8224cdf29d3!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDrhbztmITroZwxNTDquLggMzYtNQ!5e0!3m2!1sko!2skr!4v1748847772496!5m2!1sko!2skr"
                          width="600"
                          height="450"
                          style={{ border: '0' }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="section section_8 fp-auto-height">
                <div className="main_8">
                  <div className="swiper">
                    <div className="swiper-wrapper">
                      {/* <?php while($row = mysqli_fetch_array($resultReview)) { ?>
                        <div class="swiper-slide">
                            <div class="inner">
                                <div class="client">
                                    <div class="logo">
                                        <img src="<?= $row['img'] ?>" alt="<?= $row['title'] ?>">
                                    </div>
                                    <div class="scope">
                                        <img src="/img/main/scope.svg" alt="">
                                        <img src="/img/main/scope.svg" alt="">
                                        <img src="/img/main/scope.svg" alt="">
                                        <img src="/img/main/scope.svg" alt="">
                                        <img src="/img/main/scope.svg" alt="">
                                    </div>
                                </div>
                                <div class="txt_wrap">
                                    <strong>"<?= $row['title'] ?>"</strong>
                                    <p><?= strip_tags($row['content']) ?></p>
                                </div>
                            </div>
                        </div>
                        <?php } ?> */}
                      <div className="swiper-slide">
                        <div className="inner">
                          <div className="client">
                            <div className="logo">
                              <img src="/img/main/main_8_logo1.png" alt="" />
                            </div>
                            <div className="scope">
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                            </div>
                          </div>
                          <div className="txt_wrap">
                            <strong>"기획부터 결과물까지 완벽했던 촬영"</strong>
                            <p>
                              단순 촬영이 아니라, 브랜드 방향성에 맞게 컨셉
                              기획부터 세심하게 신경 써주셨어요.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="inner">
                          <div className="client">
                            <div className="logo">
                              <img src="/img/main/main_8_logo1.png" alt="" />
                            </div>
                            <div className="scope">
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                            </div>
                          </div>
                          <div className="txt_wrap">
                            <strong>"기획부터 결과물까지 완벽했던 촬영"</strong>
                            <p>
                              단순 촬영이 아니라, 브랜드 방향성에 맞게 컨셉
                              기획부터 세심하게 신경 써주셨어요.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="inner">
                          <div className="client">
                            <div className="logo">
                              <img src="/img/main/main_8_logo1.png" alt="" />
                            </div>
                            <div className="scope">
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                            </div>
                          </div>
                          <div className="txt_wrap">
                            <strong>"기획부터 결과물까지 완벽했던 촬영"</strong>
                            <p>
                              단순 촬영이 아니라, 브랜드 방향성에 맞게 컨셉
                              기획부터 세심하게 신경 써주셨어요.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="inner">
                          <div className="client">
                            <div className="logo">
                              <img src="/img/main/main_8_logo1.png" alt="" />
                            </div>
                            <div className="scope">
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                              <img src="/img/main/scope.svg" alt="" />
                            </div>
                          </div>
                          <div className="txt_wrap">
                            <strong>"기획부터 결과물까지 완벽했던 촬영"</strong>
                            <p>
                              단순 촬영이 아니라, 브랜드 방향성에 맞게 컨셉
                              기획부터 세심하게 신경 써주셨어요.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <?php require_once $_SERVER["DOCUMENT_ROOT"]."/layout/footer.php";?> */}
                <Footer />
              </section>
              {/* </div> */}
            </ReactFullpage.Wrapper>
          )}
        />
      </div>
    </>
  );
}
