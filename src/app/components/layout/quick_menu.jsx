'use client';
import './quick_menu.css';

export default function QuickMenu() {
  return (
    <>
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
