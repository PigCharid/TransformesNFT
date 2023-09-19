import React from 'react';

import styles from '../styles';

const regex = /^[A-Za-z0-9]+$/;

const CustomInput = ({ label, placeHolder, value, handleValueChange }) => (
  <>
    <label htmlFor="name" className={styles.label}>{label}</label>
    <input
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={(e) => {
        if (e.target.value === '' || regex.test(e.target.value)) handleValueChange(e.target.value);
      }}
      className='bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full hover:outline-siteViolet'
    />
  </>
);

export default CustomInput;
