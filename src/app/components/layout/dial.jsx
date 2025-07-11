'use client';
import { useEffect } from 'react';

export default function Dial() {
  useEffect(() => {}, []);

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
