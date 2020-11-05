import reducer from '../lib/store/reducer'
import { setState } from '../lib/store/actions'

describe('>>> TEST REDUCER NORMAL ARRAY', () => {
  const state = {}
  let storeServiceState = {}
  const initialState = {
    array:[0,1,2]
  }
  const setObject = {
    array:[1,2,3]
  }
  const action = setState(setObject)
  test("Replace array lvl 1", () => {
    expect(reducer(initialState)(state, action)).toEqual({
       array:[1,2,3]
    })
  })
})


describe('>>> TEST REDUCER NORMAL', () => {

  const initialState = {
    settings:{
      theme:{
        __options: {
          //type:undefined,  Не объект
          value: 'Hello', // value значит не объект (если в theme больше ничего нет)
          dispatch: v => {
            return `${v}_GOOD`
          }
        }
      }
    },
    isStatus:{
      __options: {
        end:'+',
        value:'f', // ! Обязательно иначе он думает что это объект
        dispatch: ( next, prov, options ) => {
          const { end } = options
          return `${next}_GOOD_2${end}`
        }
      }
    },
    test:{
      prm_1: {
        arg:['0','1','2'],
        arg_2:'2',
        __options: {
          dispatch: v => {
            return v
          }
        }
      },
      prm_2:{

      }
    }
  }

  const state = {}

  const obj = {
    settings : {
      theme:'TEST_1',
      newKey: 'GOOD'
    },
    isStatus:'TEST_2',
    test:{
      prm_1:{
        arg:['0']
      }
    }
  }

  const action = setState(obj,{})

  test("delete object state level 2 injection", () => {

    expect(reducer(initialState)(state, action)).toEqual({
      settings : {
        theme:'TEST_1_GOOD',
        newKey: 'GOOD'
      },
      isStatus:'TEST_2_GOOD_2+',
      test:{
        prm_1:{
          arg:['0'],
          arg_2:'2'
        },
        prm_2:{}
      }
    })

  })

})


describe('>>> TEST REDUCER NORMAL 2', () => {

  const state = {}
  const initialState = {
    k:{
      __options:{
        value: 3
      }
    },
    root:{
      array:{
        8:"1",
        9:"2",
        10:"3",
        11:"4",
        tooK:1
      }
    }
  }
  const obj = {
    k:3,
    root:{
      array:[8,9,10,11]
    }
  }
  const action = setState(obj,{})

  test(" state lvl2 array ", () => {

    expect(reducer(initialState)(state, action)).toEqual({
      k:3,
      root:{
        array:{
          8:"1",
          9:"2",
          10:"3",
          11:"4",
          tooK:1
        }
      }
    })

  })

})

describe('>>> TEST REDUCER NORMAL 3', () => {

  const state = {}
  const initialState = {
    sts: null,
    status:{
      pc:undefined
    }
  }
  const obj = {
    sts:true,
    status:{
      pc:true
    }
  }
  const action = setState(obj,{})

  test(" state lvl2 array ", () => {

    expect(reducer(initialState)(state, action)).toEqual({
      sts:true,
      status:{
        pc:true
      }
    })

  })

})

describe.skip('>>> TEST REDUCER NORMAL 4', () => {


  const state = {}
  const initialState = {
    status:{
      pc: {
        __options:{
          type:'string',
          dispatch:v => v
        }
      },
      settings:{},
    }
  }
  const obj = {
    status:{
      pc: {
        fast: [ 0, 1 ]
      }
    }
  }
  const action = setState(obj,{})

  test(" state lvl2 array ", () => {
    expect(reducer(initialState)(state, action)).toEqual({
      status:{
        pc:undefined,
        settings:{}
      },
    })

  })

})

describe('>>> TEST REDUCER NORMAL 5', () => {

  const state = {}
  const initialState = {

  }
  const obj = {
    status:{
      pc:{
        f:{
          c:{
            f:true
          }
        }
      }
    }
  }
  const action = setState(obj,{})

  test(" state lvl2 array ", () => {
    expect(reducer(initialState)(state, action)).toEqual({
      status:{
        pc:{
          f:{
            c:{
              f:true
            }
          }
        }
      }
    })

  })

})
