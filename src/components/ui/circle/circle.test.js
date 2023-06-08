import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';
import {Circle} from "./circle";


describe('Test CircleComponent', () => {

  it("should render and Match Snapshot without letter", () => {
    const CircleComponent = renderer.create(<Circle />).toJSON();
    render(<Circle />)
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with letter", () => {
    const props = {
      letter: "a"
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByTestId('letter')).toHaveTextContent('a');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with head", () => {
    const props = {
      head: 'head',
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByTestId('head')).toHaveTextContent('head');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with tail", () => {
    const props = {
      tail: 'tail',
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByTestId('tail')).toHaveTextContent('tail');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with component in head", () => {
    const props = {
      head: <Circle head={'test'}/>,
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with component in tail", () => {
    const props = {
      tail: <Circle head={'test'}/>,
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with index", () => {
    const props = {
      index: '1',
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByTestId('index')).toHaveTextContent('1');
    // expect(screen.getByText('1')).toBeInTheDocument()
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with props: isSmall ===  true", () => {
    const props = {
      isSmall: true,
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByTestId('circleWrapper')).toHaveClass('small');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with default state", () => {
    const props = {
      state: 'default',
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByTestId('circleWrapper')).toHaveClass('default');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with changing state", () => {
    const props = {
      state: 'changing',
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByTestId('circleWrapper')).toHaveClass('changing');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot with modified state", () => {
    const props = {
      state: 'modified',
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props}/>)
    expect(screen.getByTestId('circleWrapper')).toHaveClass('modified');
    expect(CircleComponent).toMatchSnapshot();
  });
});