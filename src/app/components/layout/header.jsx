'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import Link from 'next/link';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.css';
import './header.css';

export default function Header() {
  // useEffect로 초기화
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    if (typeof window !== 'undefined' && window.fullpage) {
      window.fullpage('#fullpage', {
        licenseKey: '8KZNK-N2PA6-HR1W6-1JLGI-EYBNL',
        //기본 설정

        scrollingSpeed: 1000,
        scrollOverflow: true,
        scrollOverflowReset: true,
        scrollOverflowOptions: {
          click: true,
          scrollbars: true,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: 'scale',
          fadeScrollbars: true,
        },
        normalScrollElements: '.scroll_section',
        //네비게이션
        navigation: false,
        slidesNavigation: true,
        menu: true,
        anchors: [
          '1page',
          '2page',
          '3page',
          '4page',
          '5page',
          '6page',
          '7page',
        ],

        //콜백 추가
        afterLoad: function (anchorLink, index) {
          headerNav(index.index);
          if (typeof window.headerNav === 'function') {
            window.headerNav(index.index);
          }

          if (index.index === 0 || index.index === 7) {
            $('.dial').removeClass('on');
            const dialElements = document.querySelectorAll('.dial');
            dialElements.forEach((el) => el.classList.remove('on'));
          } else {
            const dialElements = document.querySelectorAll('.dial');
            dialElements.forEach((el) => el.classList.add('on'));
            // 섹션 인덱스에 따라 dial 회전
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
              const $this = $(element);

              const animate = function () {
                currentCount += increment;
                $this.text(Math.floor(currentCount).toLocaleString());
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
        },
        //반응형
        responsiveWidth: 1280,
        // fixedElements: 'header',
      });
    }
  }, []);
  return (
    <>
      <header className="global_header">
        <div className="gnb">
          <h1 className="logo">
            <Link href={'/'}>
              <img className="" src="/img/common/t_logo.svg" alt="포토클리닉" />
              <img
                className=""
                src="/img/common/t_logo_w.svg"
                alt="포토클리닉"
              />
            </Link>
          </h1>
          <ul className="nav off">
            <li className="nav_menu">
              <Link href={'#2page'}>Director</Link>
            </li>
            <li className="nav_menu">
              <Link href={'#3page'}>About</Link>
            </li>
            <li className="nav_menu">
              <Link href={'#4page'}>Philosophy</Link>
            </li>
            <li className="nav_menu">
              <Link href={'#5page'}>Services</Link>
            </li>
            <li className="nav_menu">
              <Link href={'#6page'}>Portfolio</Link>
            </li>
            <li className="nav_menu">
              <Link href={'#7page'}>Contact</Link>
            </li>
          </ul>
          <button className="burger">
            <span></span>
            <span></span>
            <div className="blind">메뉴 열기/닫기</div>
          </button>
          <div className="mnav_wrap" data-lenis-prevent>
            <div className="inner">
              <ul className="mnav">
                <li className="mnav_menu">
                  <Link href={'#2page'}>Director</Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#3page'}>About</Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#4page'}>Philosophy</Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#5page'}>Services</Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#6page'}>Portfolio</Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#7page'}>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="quick_menu_wrap on ">
        <div>
          <div className="quick_menu pc_block">
            <div className="quick_item">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('준비중입니다');
                }}
              >
                <div className="icon">
                  <img src="/img/common/side_icon_1.svg?v=2" alt="온라인예약" />
                </div>
                <div className="txt">
                  <p>문의하기</p>
                </div>
              </a>
            </div>
            <div className="quick_item">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('준비중입니다');
                }}
              >
                <div className="icon">
                  <img src="/img/common/side_icon_2.svg?v=2" alt="카톡상담" />
                </div>
                <div className="txt">
                  <p>인스타그램</p>
                </div>
              </a>
            </div>
            <div className="quick_item">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('준비중입니다');
                }}
              >
                <div className="icon">
                  <img src="/img/common/side_icon_3.svg?v=2" alt="블로그" />
                </div>
                <div className="txt">
                  <p>유튜브</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <button className="quick_menu_btn mobile_block">
          <img
            className="open"
            src="/img/common/quick_menu1.svg"
            alt="퀵메뉴 열기"
          />
          <img
            className="close"
            src="/img/common/quick_menu2.svg"
            alt="퀵메뉴 닫기"
          />
        </button>
      </div>
    </>
  );
}
