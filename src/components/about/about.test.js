import React from 'react';
import * as renderer from 'react-test-renderer';
import About from '.';

test('It renders without errors', () => {
    const component = renderer.create(<About/>)
    const json = component.toJSON();

    expect(json).toMatchSnapshot();
});
