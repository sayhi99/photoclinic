'use client';
import './footer.css';

export default function Footer() {
  return (
    <>
      <footer className="global_footer">
        <div className="w1360">
          <h1 className="f_logo">
            <a href="/">
              <img src="/img/common/f_logo.svg?v=2" alt="푸터 로고" />
            </a>
          </h1>
          <div className="f_info">
            <div className="left">
              <strong>사진, 그 이상의 이야기.</strong>
              <div className="site">
                <b>Family Site</b>
                <a href="https://jakeimagelab.com" target="_blank">
                  jakeimagelab.com{' '}
                  <img src="/img/common/ico_link.svg" alt="링크" />
                </a>
              </div>
              <ul>
                <li>Company Name: 포토클리닉</li>
                <li>Owner: 정연호</li>
                <li>Business Registration Number: 190-16-00212</li>
              </ul>
              <ul>
                <li>Address : 서울시 강남구 논현로 150길 36-5</li>
                <li>
                  E-mail:{' '}
                  <a href="mailto: jakeimagelab@gmail.com">
                    {' '}
                    jakeimagelab@gmail.com
                  </a>{' '}
                </li>
              </ul>
              <ul>
                <li>Contact for more information. </li>
              </ul>
              <ul>
                <li>
                  This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy">
                    Privacy Policy
                  </a>{' '}
                  and
                  <a href="https://policies.google.com/terms">
                    Terms of Service
                  </a>{' '}
                  apply.
                </li>
              </ul>
            </div>
            <div className="right">
              <div className="site">
                <b>Family Site</b>
                <a href="https://jakeimagelab.com" target="_blank">
                  jakeimagelab.com{' '}
                  <img src="/img/common/ico_link.svg" alt="링크" />
                </a>
              </div>
              <div className="copy">
                © 2015 PHOTOCLINIC
                <br />
                <img src="/img/common/designed_by_wacus.svg" alt="WACUS" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
