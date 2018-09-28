import React from 'react';
import { Game } from '../components';
import renderer from 'react-test-renderer';

test('Game component renders the same way', () => {
    const component = renderer.create(<Game />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});