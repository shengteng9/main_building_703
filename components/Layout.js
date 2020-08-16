import React from 'react'
import NextHead from 'next/head'
import {
  node,
  string
} from 'prop-types'
import Footer from '../components/Footer'
import '../style/common.less'


const Layout = ({children}) => {
  return (
    <div className='wrap'>
      <div className="container">
        {children}
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: node
}

export default Layout