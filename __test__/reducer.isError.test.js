import reducer from '../lib/store/reducer'
import { setState } from '../lib/store/actions'

describe('>>> TEST REDUCER IS_ERROR', () => {
  const state = {}

  const initialState = {
    isStatus:'ff',
    settings:{
      theme:{
        pallete:{
          color:'red'
        }
      },
      user:{
        name:' Ivan'
      }
    }
  }

  test("delete object state level One injection", () => {
    const obj = {
      settings : 'delete object injection'
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(state, action)).not.toStrictEqual({
      settings : 'delete object injection',
      user:{
        name:' Ivan'
      }
    })
  });


  test("delete object state level 2 injection", () => {
    const obj = {
      settings : {
        theme:{
          pallete: 'delete object injection'
        }
      }
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(state, action)).not.toStrictEqual({
      settings:{
        theme:{
          pallete: 'delete object injection'
        },
        user:{
          name:' Ivan'
        }
      }
    })
  });

  test("delete object state ARRAY VS OBJECT 1", () => {
    const initialState = {
      settings: { theme:{pallete:{color:'green'}}}
    }
    const obj = {
      settings : {
        theme:{
          pallete: ['delete object injection']
        }
      }
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(state, action)).not.toStrictEqual({
      settings:{
        theme:{
          pallete: ['delete object injection']
        }
      }
    })
  });

  test("delete object state ARRAY VS OBJECT 2", () => {
    const initialState = {
      isStatus:'s',
    }
    const obj = {
      isStatus:[0,1,2,3]
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(state, action)).not.toStrictEqual({
      isStatus:[0,1,2,3]
    })
  });

  test("delete object state ARRAY VS OBJECT 3", () => {
    const tmp_state = {}
    const initialState = {
      isStatus:[0,1,2]
    }
    const obj = {
      isStatus:'string'
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(tmp_state, action)).not.toStrictEqual({
      isStatus:'string'
    })
  });

  test("delete object state ARRAY VS OBJECT 4", () => {
    const initialState = {
      isStatus:{
        a:{},
        b:{},
        c:{}
      },
    }
    const obj = {
      isStatus:[0,1,2]
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(state, action)).toEqual({
      isStatus:{
        a:{},
        b:{},
        c:{}
      },
    })
  });

  test("delete object state ARRAY VS OBJECT END", () => {
    let tmp_state = {}
    const initialState = {
      isStatus:{
        a:{
          f:{
            prm:'o'
          }
        },
        b:{},
        c:{}
      },
    }
    const obj = {
      isStatus:{
        a:{
          f:{
            prm:1
          }
        }
      }
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(tmp_state, action)).toEqual({
      isStatus:{
        a:{
          f:{
            prm:1
          }
        },
        b:{},
        c:{}
      }
    });
  })

  test("----> add key to object", () => {
    const initialState = {
      isStatus:{
        a:{
          f:{
            prm:'o'
          }
        },
        b:{},
        c:{}
      },
    }
    const obj = {
      isStatus:{
        a:{
          k:4
        }
      }
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(state, action)).toEqual({
      isStatus:{
        a:{
          f:{
            prm:'o'
          },
          k:4
        },
        b:{},
        c:{}
      },
    });
  })

  test("", () => {
    const tmp_state = {}
    const initialState = {
      isStatus:undefined
    }
    const obj = {
      isStatus:()=>{}
    }
    const action = setState(obj,{})
    expect(reducer(initialState)(tmp_state, action)).not.toStrictEqual({
      isStatus:()=>{}
    })
  });

})





// let condition1 = typeof address[key] != typeof _value
// let condition2 = (typeof address[key] == typeof _value) && (!isArrayF(address[key]) || !isArrayF(_value))
// //console.warn('@reducer_handleStateMap if:',{is1,is2, is3,is4, tV:typeof _value, arr:isArrayF(_value), address, _value})
// if (condition1 || condition2){
