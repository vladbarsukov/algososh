import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';
import {Button} from './button';


describe('Test ButtonComponent', () => {

  it("should render and Match Snapshot with text", () => {
   const props = {
      text: "button"
    }
    const ButtonComponent = renderer.create(<Button {...props}/>).toJSON();
    render(<Button {...props}/>)
    expect(screen.getByRole('button')).toHaveTextContent('butto');
    expect(ButtonComponent).toMatchSnapshot();
  });

  it("should render and Match Snapshot without text", () => {
    const ButtonComponent = renderer.create(<Button/>).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });
  it("should render and Match Snapshot with disabled button", () => {
    const props = {
      disabled: true
    }
    render(<Button {...props}/>)
    expect(screen.getByRole('button')).toBeDisabled()
    const ButtonComponent = renderer.create(<Button {...props}/>).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });

  it("should render and match snapshot of button with load indication", () => {
    const props = {
      isLoader: true
    };
    render(<Button {...props} />);
    const body = document.body;
    expect(body).toContainElement(
      screen.getByAltText('Загрузка.')
    );
    const buttonComponent = renderer.create(<Button {...props} />).toJSON();
    expect(buttonComponent).toMatchSnapshot();
  });

  it("should click on button work correctly", () => {
    const onClickMock = jest.fn()
    const props = {
      text: "button",
      onClick: onClickMock,
    }
    render(<Button {...props}/>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalled()
  });
});