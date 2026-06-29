import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SearchBar from "./SearchBar";

describe('SearchBar', () => {

    test('debe renderizar el searchbar correctamente', () => {
        const { container } = render(<SearchBar onQuery={() => { }} />);

        expect(container).toMatchSnapshot();
    });

    test('debe llamar onQuery con el valor correcto despues de 1000ms', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        // await new Promise(resolve => setTimeout(resolve, 1001));
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        }, { timeout: 2000 });
    });

    test('debe llamar solo 1 vez con el último valor (debounce)', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });
        fireEvent.change(input, { target: { value: 'te' } });
        fireEvent.change(input, { target: { value: 'tes' } });
        fireEvent.change(input, { target: { value: 'test' } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');
        }, { timeout: 2000 });
    });

    test('debe llamar onQuery cuando se presiona el botón con el valor del input', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    });

    test('debe llamar onQuery cuando se presiona la tecla enter con el valor del input', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });

        fireEvent.keyDown(input, { key: 'Enter' });

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('t');
    });

    test('no debe llamar onQuery cuando se presiona una tecla que no sea enter', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });

        fireEvent.keyDown(input, { key: 't' });

        expect(onQuery).not.toHaveBeenCalled();
    });

    test('el input debe tener el valor correcto de placeholder', () => {
        const value = 'Buscar Gif';
        render(<SearchBar onQuery={() => { }} placeHolderText={value} />);

        expect(screen.getByPlaceholderText(value)).toBeDefined();
    })
});