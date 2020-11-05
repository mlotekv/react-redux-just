
import createMapStateToProps from '../lib/connect/create-map-state-to-props/create-map-state-to-props'
import createMapDispatchToProps from '../lib/connect/create-map-state-to-props/create-map-dispatch-props'

describe(" >>> Test handler create map generator props", () => {
  const state = {
    isStatus: true,
    theme:{
      colors: 'black',
      pallete: {
        js: {
          f:'oh'
        }
      }
    },
    settings:{
      pc:{
        name:'TEST_NAME',
        prm: true,
        color:'red'
      }
    },
    mac:{
      id: '$9078678',
      time: 123
    }
  }

  const mapModelToProps = {
    isStatus:'status',
    theme:{
      colors: '*color',
      pallete:{
        js: {
          f:'loop!'
        }
      }
    },
    mac:['id!', 'time:lastTime'],
    settings:{
      display:{
        __options:{
          dispath: v=>v,
        }
      },
      pc:['name', '*prm:newN*amePrm', 'color:myColor!'] // Array[1] - Error Invalid Name
    }
  }

  const expectedMapStateToProps = {
    status:true,
    themeColor:'black',
    themePalleteJsLoop:'oh',
    display:undefined,
    name:'TEST_NAME',
    //pcNewNamePrm:true,
    settingsPcMyColor:'red',
    macId:'$9078678',
    lastTime:123
  }

  const anyF = expect.any(Function)

  const expectedMapDispatchToProps = {

    setStatus:anyF,
    statusCallback:anyF,
    setThemeColor:anyF,
    themeColorCallback:anyF,

    setLastTime:anyF,
    lastTimeCallback:anyF,

    setThemePalleteJsLoop:anyF,
    themePalleteJsLoopCallback:anyF,

    setDisplay:anyF,
    displayCallback:anyF,
    setName:anyF,
    nameCallback:anyF,
    setSettingsPcMyColor:anyF,
    settingsPcMyColorCallback:anyF,
    setMacId:anyF,
    macIdCallback:anyF,
    setState:anyF,
    setDeleteCallback:anyF // В итоговый компонет не подключается
  }

  test("createMapStateToProps", () => {
    expect(createMapStateToProps(mapModelToProps, state)).toEqual(expectedMapStateToProps);
  });
  test("createMapDispatchToProps", () => {
    expect(createMapDispatchToProps(mapModelToProps, state)).toEqual(expectedMapDispatchToProps);
  });

});


describe(" >>> Test handler create map generator props 2", () => {
  const state = {
    theme:{
      color:'red'
    }
  }

  const mapModelToProps = {
    theme:{
      __options: {
        toProps:true,
      },
      color:'color!'
    }
  }
  const expectedMapStateToProps = {
    theme:{
      color:'red'
    },
    themeColor:'red'
  }

  test("createMapStateToProps 2", () => {
    expect(createMapStateToProps(mapModelToProps, state)).toEqual(expectedMapStateToProps);
  });

})


describe(" >>> Test handler create map generator props default", () => {
  const state = {}


  const anyF = expect.any(Function)

  const expectedMapDispatchToProps = {
    setState:anyF,
    setDeleteCallback:anyF // В итоговый компонет не подключается
  }

  test("createMapDispatchToProps", () => {
    expect(createMapDispatchToProps({}, state)).toEqual(expectedMapDispatchToProps);
  });

});
