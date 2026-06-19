import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import GifsApp from './GifsApp';


describe('GifsApp', () => {

    test('debe renderizar componente apropiadamente', () => {
        const { container } = render(<GifsApp />)

        expect(container).toMatchSnapshot();
    });


});