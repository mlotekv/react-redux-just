import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent, screen } from '@testing-library/react';
//import { act } from 'react-dom/test-utils';
import { ProviderStore, withConnectStore } from '../index'


const AppComponent = ({ status, statusCallback, setStatus, color, setColor }) => {

  statusCallback(res=>{
    console.log(res)
  })

  const handleClickStatus = () => setStatus('new')

  const handleClickColor = () => setColor('green')

  const handleDeleteStatus = ()=> setStatus.delete()
  const handleReplaceStatus = ()=> setStatus.replace('replace')
  const handleClearStatus = ()=> setStatus.clear()

  const handleDeleteColor = ()=> setColor.delete()
  const handleReplaceColor = ()=> setColor.replace('replace-color')
  const handleClearColor = ()=> setColor.clear()

  return (
    <div>

      <span data-testid="status-display"> { status } </span>
      <span data-testid="color-display"> { color } </span>

      <button onClick={handleClickStatus}>setStatus</button>
      <button onClick={handleClickColor}>setColor</button>

      <button onClick={handleDeleteStatus}>setStatusDelete</button>
      <button onClick={handleReplaceStatus}>setStatusReplace</button>
      <button onClick={handleClearStatus}>setStatusClear</button>

      <button onClick={handleDeleteColor}>setColorDelete</button>
      <button onClick={handleReplaceColor}>setColorReplace</button>
      <button onClick={handleClearColor}>setColorClear</button>

    </div>)
}



describe('>>> TEST DOM Component 2', () => {


    const model = { state:{
        status: 'connect',
        pallete: {
          color: 'green'
        }
    }
   }

    const App = withConnectStore(AppComponent, {
      status:undefined,
      pallete:{
        color: undefined,
        __options:{
          toProps: true
        }
      }
    })

    const dom = <ProviderStore model={model}><App/></ProviderStore>

    test("check props initial state and modelComponent 2",  () => {
      render(dom)
      expect(screen.getByTestId('status-display')).toHaveTextContent('connect')
      expect(screen.getByTestId('color-display')).toHaveTextContent('green')
    })


    test("check set[Name] commands 2", async () => {
      const { getByText } = render(dom);
      const setStatus = getByText('setStatus')
      const setColor = getByText('setColor')
      await fireEvent.click(setStatus)
      expect(screen.getByTestId('status-display')).toHaveTextContent('new')
      await fireEvent.click(setColor)
      expect(screen.getByTestId('color-display')).toHaveTextContent('green')
    })

    test("check set[Name] commands delete and clear ", async () => {
      const { getByText } = render(dom);
      const setStatusDelete = getByText('setStatusDelete')
      const setStatusReplace = getByText('setStatusReplace')
      const setStatusClear = getByText('setStatusClear')

      await fireEvent.click(setStatusDelete)
      expect(screen.getByTestId('status-display')).toHaveTextContent('')

      await fireEvent.click(setStatusReplace)
      expect(screen.getByTestId('status-display')).toHaveTextContent('replace')

      await fireEvent.click(setStatusClear)
      expect(screen.getByTestId('status-display')).toHaveTextContent('')
    })

    test("check set[Name] commands delete and clear 2", async () => {
      const { getByText } = render(dom);
      const setColorDelete = getByText('setColorDelete')
      const setColorReplace = getByText('setColorReplace')
      const setColorClear = getByText('setColorClear')

      await fireEvent.click(setColorDelete)
      expect(screen.getByTestId('color-display')).toHaveTextContent('')

      await fireEvent.click(setColorReplace)
      expect(screen.getByTestId('color-display')).toHaveTextContent('replace-color')

      await fireEvent.click(setColorClear)
      expect(screen.getByTestId('color-display')).toHaveTextContent('')
    })


})
