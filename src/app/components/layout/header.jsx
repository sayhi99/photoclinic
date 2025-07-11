'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import Link from 'next/link';
import './header.css';

export default function Header() {
  const [mnavOpen, setMnavOpen] = useState(false);

  const handleBurgerClick = () => {
    setMnavOpen(!mnavOpen);
  };

  const handleMnavClick = (e) => {
    e.stopPropagation();
    setMnavOpen(false);
  };

  // AOS 초기화
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  //모바일네비 버거버튼 클릭
  useEffect(() => {
    const burger = document.querySelector('.burger');
    const mnavWrap = document.querySelector('.mnav_wrap');

    if (burger && mnavWrap) {
      // 클래스 토글
      if (mnavOpen) {
        burger.classList.add('on');
        mnavWrap.classList.add('on');
      } else {
        burger.classList.remove('on');
        mnavWrap.classList.remove('on');
      }
    }
  }, [mnavOpen]);

  useEffect(() => {
    const checkSection1Active = () => {
      const section1 = document.querySelector('.section_1');
      const globalHeader = document.querySelector('.global_header');

      if (section1 && globalHeader) {
        if (section1.classList.contains('active')) {
          globalHeader.classList.remove('on');
        } else {
          globalHeader.classList.add('on');
        }
      }
    };

    // 초기 실행
    checkSection1Active();

    // MutationObserver를 사용하여 section_1의 클래스 변경 감지
    const section1Observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          checkSection1Active();
        }
      });
    });

    // section_1 요소가 존재하면 observer 시작
    const section1 = document.querySelector('.section_1');
    if (section1) {
      section1Observer.observe(section1, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    // 클린업 함수
    return () => {
      section1Observer.disconnect();
    };
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
              <a href="#2page">Director</a>
            </li>
            <li className="nav_menu">
              <a href="#3page">About</a>
            </li>
            <li className="nav_menu">
              <a href="#4page">Philosophy</a>
            </li>
            <li className="nav_menu">
              <a href="#5page">Services</a>
            </li>
            <li className="nav_menu">
              <a href="#6page">Portfolio</a>
            </li>
            <li className="nav_menu">
              <a href="#7page">Contact</a>
            </li>
          </ul>
          <button
            className={`burger ${mnavOpen ? 'on' : ''}`}
            onClick={handleBurgerClick}
          >
            <span></span>
            <span></span>
            <div className="blind">메뉴 열기/닫기</div>
          </button>
          <div
            className={`mnav_wrap ${mnavOpen ? 'on' : ''}`}
            data-lenis-prevent
          >
            <div className="inner">
              <ul className="mnav">
                <li className="mnav_menu">
                  <a href="#2page" onClick={handleMnavClick}>
                    Director
                  </a>
                </li>
                <li className="mnav_menu">
                  <a href="#3page" onClick={handleMnavClick}>
                    About
                  </a>
                </li>
                <li className="mnav_menu">
                  <a href="#4page" onClick={handleMnavClick}>
                    Philosophy
                  </a>
                </li>
                <li className="mnav_menu">
                  <a href="#5page" onClick={handleMnavClick}>
                    Services
                  </a>
                </li>
                <li className="mnav_menu">
                  <a href="#6page" onClick={handleMnavClick}>
                    Portfolio
                  </a>
                </li>
                <li className="mnav_menu">
                  <a href="#7page" onClick={handleMnavClick}>
                    Contact
                  </a>
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
