import React from 'react';
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent, screen } from '@testing-library/react';
//import { act } from 'react-dom/test-utils';
import { ProviderStore, withConnectStore } from '../index'


const AppComponent = ({ status, setStatus, color, setColor, theme, setTheme,
                        id1Login, setState }) => {

  const handleClickStatus = () => setStatus('new')

  const handleClickColor = () => setColor('green')

  const handleClickTheme = () => setTheme('simple')

  const handleClickSetState = ()=>setState({ status:'status_test'})

  return (
    <React.Fragment>

      <span data-testid="status-display"> { status } </span>
      <span data-testid="color-display"> { color } </span>
      <span data-testid="theme-display"> { theme } </span>
      <span data-testid="login-display"> { id1Login } </span>

      <button onClick={handleClickStatus}>setStatus</button>
      <button onClick={handleClickColor}>setColor</button>
      <button onClick={handleClickTheme}>setTheme</button>
      <button onClick={handleClickSetState}>setState</button>

    </React.Fragment>)
}



describe('>>> TEST DOM Component', () => {


    const model = { state:{
        status: 'true',
        display: {
          color:'red',
          theme:{
            __options: {
              value: 'primary',
              dispatch: v => v + '_test'
            }
          },
        },
        users:{
          'id1': {
            name: 'UserName'
          }
        }
      }
    }

    const App = withConnectStore(AppComponent, {
      status:undefined,
      display:['color', 'theme'],
      users:{
        id1: ['*name:login']
      }
    })

    const dom = <ProviderStore model={model}><App/></ProviderStore>

    test("check props initial state and modelComponent",  () => {
      render(dom)
      expect(screen.getByTestId('status-display')).toHaveTextContent('true')
      expect(screen.getByTestId('color-display')).toHaveTextContent('red')
      expect(screen.getByTestId('theme-display')).toHaveTextContent('primary')
      expect(screen.getByTestId('login-display')).toHaveTextContent('UserName')
    })

    test("check set[Name] commands", async () => {
      const { getByText } = render(dom);
      const setStatus = getByText('setStatus')
      const setColor = getByText('setColor')
      const setTheme = getByText('setTheme')

      await fireEvent.click(setStatus)
      expect(screen.getByTestId('status-display')).toHaveTextContent('new')
      await fireEvent.click(setColor)
      expect(screen.getByTestId('color-display')).toHaveTextContent('green')
      await fireEvent.click(setTheme)
      expect(screen.getByTestId('theme-display')).toHaveTextContent('simple_test')
    })


})


describe('>>> TEST DOM Component mapStateToProps', () => {


    const model = { state:{
        status: 'true'
    }}

    const mapStateToProps = ({ status })=>{
      return { status }
    }

    const App = withConnectStore(AppComponent, {mapStateToProps} )

    const dom = <ProviderStore model={model}><App/></ProviderStore>

    test("check props initial state and modelComponent",  () => {
      render(dom)
      expect(screen.getByTestId('status-display')).toHaveTextContent('true')
    })

    test("check set[Name] commands", async () => {
      const { getByText } = render(dom);
      const setState = getByText('setState')
      await fireEvent.click(setState)
      expect(screen.getByTestId('status-display')).toHaveTextContent('status_test')
    })


})
