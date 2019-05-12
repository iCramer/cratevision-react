import React from 'react';
import blue from '../../assets/images/loadingBlue.svg';
import yellow from '../../assets/images/loadingYellow.svg';
import pink from '../../assets/images/loadingPink.svg';

export const Loading = (props) => {
  return (
    <div className="loading">
      <div className="loading-icon">
        <img src={blue} className="loading-blue" />
        <img src={yellow} className="loading-yellow" />
        <img src={pink} className="loading-pink" />
      </div>
    </div>
  )
}
