import React from 'react';
import ReactDOM from 'react-dom';
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent, screen, act } from '@testing-library/react';

import { ProviderStore, withConnectStore } from '../index'

let container

describe('>>> TEST DOM Component REQUEST MODEL', () => {

  const AppComponent = ({ status, statusLoader }) => {
    return <span data-testid="status-display"> { status } </span>
  }

  const App = withConnectStore(AppComponent, 'status')

  const model = {
    state: {
      status:{
        __options:{
          value:'123',
          request: (resolve, reject) => resolve('true')
        }
      }
    }
  }

  const dom = <ProviderStore model={model}><App/></ProviderStore>

  test('render request', async () => {
    await act(async ()=>{
      render(dom, container)
    })
    await act(async ()=>{
      jest.useFakeTimers(1000);
    })
   expect(screen.getByTestId('status-display')).toHaveTextContent('true')
  })


})


describe('>>> TEST DOM Component REQUEST MODEL', () => {

  const AppComponent = ({ status, statusLoader, statusRequestError }) => {
    if (!statusRequestError) return <span data-testid="status-display"> { status } </span>
    return <span data-testid="status-display">error</span>
  }

  const App = withConnectStore(AppComponent, 'status')

  const model = {
    state: {
      status:{
        __options:{
          value:'123',
          request: (resolve, reject) => reject('error')
        }
      }
    }
  }

  const dom = <ProviderStore model={model}><App/></ProviderStore>

  test('render request', async () => {
    await act(async ()=>{
      render(dom, container)
    })
    await act(async ()=>{
      jest.useFakeTimers(1000);
    })
   expect(screen.getByTestId('status-display')).toHaveTextContent('error')
  })


})
