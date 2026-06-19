import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { fireEvent, render, screen } from "@testing-library/react";
//import { useCounter } from "../hooks/useCounter";

const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleSubstract: handleSubstractMock,
        handleReset: handleResetMock,
    })
}));

describe('MyCounterApp', () => {

    test('debe renderizar el componente', () => {
        render(<MyCounterApp />);

        expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain('counter: 20');
        expect(screen.getByRole("button", { name: '+1' })).toBeDefined;
        expect(screen.getByRole("button", { name: '-1' })).toBeDefined;
        expect(screen.getByRole("button", { name: 'Reset' })).toBeDefined;
    });

    test('handleAdd debe ser llamado si se da click al botón +1', () => {
        render(<MyCounterApp />);

        const buttonAdd = screen.getByRole("button", { name: '+1' });

        fireEvent.click(buttonAdd);
        expect(handleAddMock).toHaveBeenCalled();
        expect(handleSubstractMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();
    });

});