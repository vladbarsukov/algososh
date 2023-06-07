import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom';
import { StringComponent } from "./string";

it('should render and Match Snapshot', () => {
  const stringComponent = renderer.create(
    <MemoryRouter>
      <StringComponent/>
    </MemoryRouter>
  );
  expect(stringComponent).toMatchSnapshot();
});