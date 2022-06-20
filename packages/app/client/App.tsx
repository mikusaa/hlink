import React, { Suspense, useState } from 'react'
import { Layout, Button, message } from 'antd'
import Config from './components/Config'
import ConfigList from './components/ConfigList'
import useSWR from 'swr'
import fetch from './kit/fetch'
import { TConfig } from '../types/shim'
import defaultConfig from './kit/defaultConfig'

const { Header, Footer, Content } = Layout

function App() {
  useSWR('/api/config/default', (url) => fetch.get<string>(url), {
    suspense: true,
    onSuccess(data) {
      defaultConfig.set(data)
    },
  })

  return (
    <Layout className="h-screen">
      <Header className="flex justify-between items-center">
        <a
          href="https://hlink.likun.me"
          className="color-white text-size-5 font-600 flex items-center justify-center"
        >
          <img
            className="h-1.3rem mr-3"
            src="https://hlink.likun.me/logo.svg"
          />
          hlink
        </a>
      </Header>
      <Content className="flex justify-center">
        <div className="w-80% m-2">
          <Suspense fallback={<>加载中...</>}>
            <ConfigList />
          </Suspense>
        </div>
      </Content>
      <Footer className="text-center">
        MIT Licensed | Copyright © 2019-present likun & hlink Contributors
      </Footer>
    </Layout>
  )
}

export default App
