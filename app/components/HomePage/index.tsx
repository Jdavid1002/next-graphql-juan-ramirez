'use client';

import React, { useState } from 'react'
import Header from '../Header';
import Content from '../Content';
// import { Inter } from '@next/font/google'

const HomePage = () => {

  const [SearchValue, setSearchValue] = useState<string>('')

  return (
    <div>
      <Header 
        SearchValue={SearchValue}
        setSearchValue={setSearchValue}
      />
      <Content 
        SearchValue={SearchValue}
      />
    </div>
  );
}
 
export default HomePage;