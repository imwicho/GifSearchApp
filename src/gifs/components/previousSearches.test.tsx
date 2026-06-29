import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PreviousSearches from "./PreviousSearches";

describe('previousSearches', () => {

    const prevTerms = ['hu tao', 'gatos', 'perros', 'cat dance']

    test('debe renderizar el componente con los valores por default', () => {
        render(<PreviousSearches previousSearchList={[]} onLabelClicked={() => { }} />)

        expect(screen.getByRole('heading', { level: 2 })).toBeDefined();
        expect(screen.getByText('No hay búsquedas prevías')).toBeDefined();
    });

    test('debe mostrar la lista con los terminos recibidos', () => {
        render(<PreviousSearches previousSearchList={prevTerms} onLabelClicked={() => { }} />)

        expect(screen.getAllByRole('listitem').length).toBe(4);
    });

    test('debe llamar a onLabelClicked cuando se hace click en un elemento de la lista', () => {
        const onLabelClicked = vi.fn();
        render(<PreviousSearches previousSearchList={prevTerms} onLabelClicked={onLabelClicked} />)

        const [firsListItem] = screen.getAllByRole('listitem');
        fireEvent.click(firsListItem);

        expect(onLabelClicked).toHaveBeenCalledTimes(1);
        expect(onLabelClicked).toHaveBeenCalledWith(firsListItem.textContent);
    });

});