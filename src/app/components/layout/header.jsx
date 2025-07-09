'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import Link from 'next/link';
import './header.css';

export default function Header() {
  const [mnavOpen, mnavClose] = useState(false);

  const handleBurgerClick = () => {
    mnavClose(!mnavOpen);
  };

  const handleMnavClick = (e) => {
    e.stropPropagation();
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

  //모바일네비 메뉴 클릭
  useEffect(() => {
    $('.mnav_menu > a').on('click', function (e) {
      e.stopPropagation(); // 이벤트 버블링 방지
      $('.mnav_wrap').removeClass('on');
      $('.global_header .burger').removeClass('on');
    });
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
                  <Link href={'#2page'} onClick={handleMnavClick}>
                    Director
                  </Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#3page'} onClick={handleMnavClick}>
                    About
                  </Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#4page'} onClick={handleMnavClick}>
                    Philosophy
                  </Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#5page'} onClick={handleMnavClick}>
                    Services
                  </Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#6page'} onClick={handleMnavClick}>
                    Portfolio
                  </Link>
                </li>
                <li className="mnav_menu">
                  <Link href={'#7page'} onClick={handleMnavClick}>
                    Contact
                  </Link>
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
