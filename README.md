# react-redux-just

<p align="center">
  <img src="https://user-images.githubusercontent.com/49643329/98297767-f4bd5800-1fc5-11eb-93dd-9d21bec085b4.png" />
</p>


- Get easy access to your storage.

- Access and change any of the variables you want, at any depth.

- Quickly create handlers for your variables.

- Create and process requests, use loaders.

- Light callbacks when changing within a component.

------

<p align="center">
  <img src="https://user-images.githubusercontent.com/49643329/98298270-ca1fcf00-1fc6-11eb-8a26-35b3623b8690.png" />
</p>

------


- [Installing](#installing)
- [Usage](#usage)
- [Initial stores](#initial-stores)
- [Options model](#options)
  - [Dispatch](#dispatch)
  - [Receiving](#receiving)
  - [Requests](#requests)
- [More actions](#more-actions)

## Installing

```bash
$ npm install react-redux-just
```

## Usage

Create a provider at the beginning of your application.

Use `<ProviderStore>` to initialize the store.

```js
import { ProviderStore } from 'react-redux-just'
import App from './App'

ReactDOM.render(
  <ProviderStore>
    <App />
  </ProviderStore>,
  document.getElementById('root'));
```



### `withConnectStore(component, model)`

Use `withConnectStore` to connect to the store.
Specify in the argument the component and the element you want to monitor.

```js
import { withConnectStore } from 'react-redux-just'

function App({ user }) {
  return <div> { user } </div>
}

export default withConnectStore(App, 'user')
```

Use several simple variables at once for their storage.

Specify an `[array]` as an argument, and specify the required variables in it.

```js
import { withConnectStore } from 'react-redux-just'

function Component({ user, date, version }) (
  <ul>
    <li> user: {user} </li>
    <li> user: {date.toString()} </li>
    <li> user: {version} </li>
  </ul>
)

export default withConnectStore(Component, ['user','date.start:date','version'])
```



## Initial stores

You can create a data model for Initial Values.

```js
import { ProviderStore } from 'react-redux-just'

const model = {
  state: {
    user: 'Name',
    date: {
      start: new Date()
    },
    version: 1.0
  }
}

ReactDOM.render(
    <ProviderStore model={model}>
      <App />
    </ProviderStore>
  document.getElementById('root')
);

```


### `Objects` in the store

```js
const model = {
  state: {
    theme: {
      primary: {
        warn: 'yellow'
      },
      secondary:{
        warn: 'red'
      }
    }
  }
}
```
```js
function Component({ primary, setPrimary, backgroundColor }) {
  const handleClick = () =>  setPrimary({ warn: '#f1c40f' })
  const { warn } = primary
  return <button onClick={handleClick} style={{color:warn, backgroundColor}}> Click me! </button>
}

export default withConnectStore(Component, { theme:['primary', { secondary:['warn:backgroundColor']}] })
```
You can rename the callable parameter for the current component using a friendly name (more on this below)

or you can refer directly to "warn"
```js
export default withConnectStore(Component, { theme: { primary:['warn'] } })
```
```js
export default withConnectStore(Component, 'theme.primary.warn')
```

### `mapModelToProps` in the store
Initialize the model to connect the desired variables or objects to the component

Specify the `__options` key in a variable or object

`toProps:true` - Creates an edit action for the current object

Specify the function as an argument to get the actual state of the parameter

```js
function Component({ color, backgroundColor, setTheme, setColor }) {
  const handleClick = () => {
    setTheme({ colorMain: 'green', backgroundColor:'black' }) // name 'color' for the current component only (mapModelToProps)
    setTheme( theme => {
      console.log(theme) // { colorMain: 'green', backgroundColor:'black' }
      return theme
    })
  }
  const handleClickColor = ()=>{
    setColor('yellow')
    setColor( color => {
      console.log(color) // yellow
      return color
    })
  }
  return (
    <React.Fragment>
      <button onClick={handleClick} style={{ color, backgroundColor }}>  Click me! </button>
      <button onClick={handleClickColor}>  Click me, set color yellow! </button>
    </React.Fragment>
  )
}
const mapModelToProps = {
  theme: {
    colorMain: 'color', // Rename for current component
    backgroundColor: true, // (true || undefined )- pull backgroundColor
    __options:{
      toProps:true
    }
  }
}
export default withConnectStore(Component, mapModelToProps )
```

## Options

### `__options` and other possibilities in the `mapModelToProps`

#### Rename
Rename the parameters for the current component

```js
const mapModelToProps = {
  theme: {
    __options:{
      toProps:true  // Create action for object  ( { theme, setTheme } = props )
    },
    colors: ['red:color'], // Pull out of the object and rename for current component ( { color, setColor } = props )
    backgroundColor: '*bgColor', // Rename for current component ( { themeBgColor, setThemeBgColor } = props )
                                 // * - object level 1 up, ** - name add level 2 up, *** ...
    sizes: {
      font: 'fontSize!', // Rename for current component ( { themeSizesFontSize, setThemeSizesFontSize } = props )
                        // ! - Specify all levels of the object in the name
      weight:undefined  //  ( { weight, setWeight} = props )                
    }
  }
}
export default withConnectStore(Component, mapModelToProps )
```

#### dispatch(next, prov, options)
Calling handlers on change

Using the `dispatch` option Create a handler that will be called before changes in the store

When we specify only the settings, then there is no need to write `toProps`

```js
const mapModelToProps = {
  size: {
    __options: {
      min:0,
      dispatch: (next, prov, options) => {
        const { min } = options
        return next>=min?next:0
      }
    }
  }
}
export default withConnectStore(Component, mapModelToProps )
```
Specify your options and use them in the handler

Coming handler arguments: new value, previous value, options

#### receiving(value)
Create an `receiving` handler, before the variable gets into the component, it will go through the handler. The store will not change

```js
function Component({ status }) (
  <span> Status:{status} </span>
)
const mapModelToProps = {
  status: {
    __options: {
      receiving: bool => bool.toString()
    }
  }
}
export default withConnectStore(Component, mapModelToProps )
```


### `__options` when initializing a state

You can also create handlers when initializing a state

#### `requests(new Promise)`

Create a data request with ease

```js
import { ProviderStore } from 'react-redux-just'

const model = {
  state: {
    date: {
      __options:{
        type: 'date',
        value: new Date(),
        receiving: date => date.toString(),
        request: (resolve, reject) => {
              fetch( REQUEST_URL , {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'React POST Request' })
                })
                .then(response => response.json())
                .then(({result}) => resolve(result));
            }
      }
    }
  }
}

ReactDOM.render(
    <ProviderStore model={model}>
      <App />
    </ProviderStore>
  ,document.getElementById('root')
);

```

When creating a request, a `[Name]Loader` is automatically generated

If an error occurs on request, pass it via reject. `[Name]RequestError`

```js
function Component({ date, dateLoader, dateRequestError }) {
  if ( dateLoader ) return <span> Load </span>
  if ( dateRequestError ) return <span> Error </span>
  return <span> date </span>
}
export default withConnectStore(Component, 'date' )
```


### More actions

#### `set[Name]Callbacks(next=>{}, [])`

In addition to change, callbacks, replacements and cleanup are also available.

If you want to use an extra variable in callback, then specify it.

```js
function Component({ date, login, setLogin, setLoginCallback }) {

  setLoginCallback( newLogin => {
    console.log( date, 'new login:', newLogin, 'old login:', login)
  }, [ date ])

  const handlerClick = () => setLogin('alex2020')

  return (
    <div>
      <span> {login} </span>
      <button onClick={handlerClick}> setLogin </button>
    </div>
  )
}
export default withConnectStore(Component, ['login', 'date'] )
```

#### `set[Name].replace(newValue)`
Replaces an object or parameter with a new value
#### `set[Name].clear`


|type        | new value |
|------------|-----------|
|string      | ' '        |
|number      | 0         |
|bool        | false     |
|array       | [ ]        |
|object      | { }        |
|function    | ( ) => { }  |

#### `set[Name].delete`

 Removes the parameter completely (undefined)

```js
  setStyle({  height:100, fontSize: 10, marginLeft:15 })
  //   style:{
  //     height: 100
  //     marginLeft: 10,
  //     fontSize: 10,
  //   }
```
```js
  setStyle({  marginLeft:15, marginRight: 15  })
  //   style:{
  //     height: 100
  //     marginLeft: 15,
  //     fontSize: 10,
  //     marginRight:15
  // }
  ```
  ```js
  setStyle.replace({ height: 100,  fontSize: 10 })
  //   style:{
  //     height: 100
  //     fontSize: 10,
  // }
  ```
  ```js
  setStyle.clear()
  // state = {
  //   style:{}
  // }
  ```
  ```js
  setStyle.delete()
  //   style: undefined

```

### Basic actions

When a component is connected to the store, an action is created to change the called variables.

A common actions `setState`  is also connected to change any element in the store.

With the help of the `setState`  you can change any variable and objects in the store.

```js

function Component({ count, setCount, dataCount, setDataCount, setState }) {
  const handleClick = () => {
    setCount(count < 10 ? count + 1 : 1)
    setDataCount(dataCountClick + 1)
  }
  const handleClickSecond = () => {
    setState({ count: count < 10 ? count + 1 : 1,
               data: { count: dataCount + 1, dateClick: new Date() })
  }
  return {
    <div style={{backgroundColor:''}}>
      <p>
        <b> {count} </b>
        <button onClick={handleClick}> Count++ </button>
      </p>
      <p>
        <b> {count} </b>
        <button onClick={handleClickSecond}> Count++ </button>
      </p>
    </div>
  }
}

export default withConnectStore(Component, ['count', {data:['count!']}])
```
The `setCount` and `setDataCount` only change the variable `count` or `dataCount`.

```js
  setState({ [key]: newValue })
  setState({ [key]: newValue, [key2]: newValue2, ... })

```

You can also use the "*classic version*" of the formation of `mapStateToProps`.

```js
...
import { withConnectStore } from 'react-redux-just'

function Component({ user }) (
  <span> {user} </span>
)

const mapStateToProps = ({ user }) => {
  return { user }
}

export default withConnectStore(Component, { mapStateToProps })
```

You can also configure `mapDispatchToProps`.

```js
export default withConnectStore(Component, { mapStateToProps, mapDispatchToProps })
```

### Other options state model

```js
const model = {
  state: {
    status: false,
    ...
  },
  options: {
    devTools: false // default 'development'
  }
}
```

### License

MIT
