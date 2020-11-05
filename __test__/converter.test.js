
import converter from '../lib/connect/create-map-state-to-props/converter'

import compare from '../lib/utils/compare-array'
import clearValue from '../lib/utils/clear-value'

describe(" >>> compare arrays test ", () => {

  const a = [0,1,2,3,4,5,'res',true]
  const b = [0,1,2,3,4,5,'res',true]
  const c = [0,1,2,3,4,5,'res']

  test("compare 1", () => {
    expect(compare(a,b)).toBe(true);
  });
  test("compare 2", () => {
    expect(compare(a,c)).toBe(false);
  });
})

describe(" >>> clear value test ", () => {

  test("compare string", () => {
    expect(clearValue('test')).toBe('');
  });

  test("compare number", () => {
    expect(clearValue(654)).toBe(0);
  });

  test("compare bigint", () => {
    expect(clearValue(1n)).toBe(0);
  });

  test("compare object", () => {
    expect(clearValue({ status:true })).toEqual({});
  });

  test("compare function", () => {
    expect(clearValue(v=>v)).toEqual(expect.any(Function));
  });

  test("compare boolean", () => {
    expect(clearValue(true)).toBe(false);
  });

  test("compare array", () => {
    expect(clearValue([0,1,2,3])).toEqual([]);
  });

  test("compare array", () => {
    expect(clearValue(undefined)).toEqual(undefined);
  });

})




describe(" >>> converter test ", () => {

  test("map model string", () => {

    const mapModelToProps = 'status'

    const expected = {
      status: 'status'
    }

    expect(converter(mapModelToProps)).toEqual(expected);
  });

  test("map model string map", () => {

    const mapModelToProps = 'settings.theme'

    const expected = {
      settings:{
        theme: 'theme'
      }
    }

    expect(converter(mapModelToProps)).toEqual(expected);
  });

  test("map model string rename", () => {

    const mapModelToProps = 'settings:mySettings'

    const expected = {
      settings: 'mySettings'
    }

    expect(converter(mapModelToProps)).toEqual(expected);

  });

  test("map model string map rename", () => {

    const mapModelToProps = 'settings.theme:myTheme'

    const expected = {
      settings:{
        theme: 'myTheme'
      }
    }

    expect(converter(mapModelToProps)).toEqual(expected);
  });

  test("map model array", () => {

    const mapModelToProps = ['settings.theme:*myTheme', 'status', { pallete:['color']}]

    const expected = {
      settings:{
        theme: '*myTheme'
      },
      status: 'status',
      pallete:['color']
    }

    expect(converter(mapModelToProps)).toEqual(expected);
  });


});
