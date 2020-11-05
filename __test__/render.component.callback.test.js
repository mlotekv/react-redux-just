import React from 'react';
import ReactDOM from 'react-dom';
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent, screen } from '@testing-library/react';

import { ProviderStore, withConnectStore } from '../index'

describe('>>> TEST DOM Component Callback', () => {

  const AppComponent = ({ status, setStatus, statusCallback }) => {

    statusCallback(res=>{
      test("check callback",  () => {
        expect(res).toBe('new')
      })
    })

    React.useEffect(()=>setStatus('new'), [])

    return <span data-testid="status-display"> { status } </span>
  }

  const App = withConnectStore(AppComponent, 'status')

  const dom = <ProviderStore><App/></ProviderStore>

  render(dom)

})
