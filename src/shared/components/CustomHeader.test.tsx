import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CustomHeader from "./CustomHeader";


describe('CustomHeader', () => {

    const title = 'Title test';

    test('debe renderizar título correctamente', () => {

        render(<CustomHeader title={title} />)

        const h1 = screen.getByText(title);

        expect(h1).toBeDefined();
        expect(h1.tagName).toBe('H1');
        expect(h1.innerHTML).toBe(title);
    });

    test('debe renderizar una descripción cuando es recibida', () => {
        const description = 'Test description';
        render(<CustomHeader title={title} description={description} />)

        const p = screen.getByText(description);

        expect(p).toBeDefined();
        expect(p.tagName).toBe('P');
        expect(p.innerHTML).toBe(description);
    });

    test('no debe renderizar una descripción cuando es recibida', () => {
        const { container } = render(<CustomHeader title={title} />)

        const divElement = container.querySelector('.content-center');

        const p = divElement?.querySelector('p');
        expect(p).toBeNull();
    });

});
