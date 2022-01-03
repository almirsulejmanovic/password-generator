import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = testResult.score * 100 / 4;

  /*   const createPassLabel = () => {
      switch (testResult.score) {
        case 0:
          return 'Very weak';
        case 1:
          return 'Weak';
        case 2:
          return 'Fair';
        case 3:
          return 'Good';
        case 4:
          return 'Strong';
        default:
          return '';
      }
    }
   */

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#F5F5F5';
      case 1:
        return '#DF6661';
      case 2:
        return '#EFC20F';
      case 3:
        return '#00A878';
      case 4:
        return '#006B4D';
      default:
        return 'none';
    }
  }

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '10px'
  })

  return (
    <>
      <div className="progress" style={{ height: '10px' }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{/* {createPassLabel()} */}</p>
    </>
  )
}

export default PasswordStrengthMeter
