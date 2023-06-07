import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';
import {Circle} from "./circle";


describe('Test CircleComponent', () => {

  it("should render and Match Snapshot with text", () => {
    const CircleComponent = renderer.create(<Circle />).toJSON();
    render(<Circle />)
    expect(CircleComponent).toMatchSnapshot();
  });

});