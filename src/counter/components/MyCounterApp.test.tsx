import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";


describe('MyCounterApp', () => {

    test('debe renderizar el componente', () => {
        render(<MyCounterApp />);

        expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain('counter: 10');
        expect(screen.getByRole("button", { name: '+1' })).toBeDefined;
        expect(screen.getByRole("button", { name: '-1' })).toBeDefined;
        expect(screen.getByRole("button", { name: 'Reset' })).toBeDefined;
    });

    test('debe incrementar el contador', () => {
        render(<MyCounterApp />);

        const labelH1 = screen.getByRole("heading", { level: 1 });
        const buttonAdd = screen.getByRole("button", { name: '+1' });

        fireEvent.click(buttonAdd);
        expect(labelH1.innerHTML).toContain('counter: 11');
    });

    test('debe decrementar el contador', () => {
        render(<MyCounterApp />);

        const labelH1 = screen.getByRole("heading", { level: 1 });
        const buttonSubstract = screen.getByRole("button", { name: '-1' });

        fireEvent.click(buttonSubstract);
        expect(labelH1.innerHTML).toContain('counter: 9');
    });

});