import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifsActions from "../actions/get-gifs-by-query.action";



describe('useGifs', () => {

    const searchTerm = 'cat dance';
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('debe retornar valores y metodos por default', () => {
        const { result } = renderHook(() => useGifs());

        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.gifs.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });


    test('debe retornar una lista de gifs al buscar', async () => {
        //handleSearch
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch(searchTerm);
        });

        expect(result.current.gifs.length).toBe(10);
    });

    test('debe retornar una lista de gifs cuando handleTermClicked es llamado', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked(searchTerm);
        });

        expect(result.current.gifs.length).toBe(10);
    });

    test('debe retornar una lista del gifs del cache cuando handleTermClicked es llamado con un termino ya existente', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked(searchTerm);
        });

        expect(result.current.gifs.length).toBe(10);

        vi.spyOn(gifsActions, 'getGifsByQuery').mockRejectedValue(new Error('Custom error'));

        await act(async () => {
            await result.current.handleTermClicked(searchTerm);
        });

        expect(result.current.gifs.length).toBe(10);
    });

    test('debe retornar no más de 8 terminos previos de busqueda', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifsActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('gato1');
            await result.current.handleSearch('gato2');
            await result.current.handleSearch('gato3');
            await result.current.handleSearch('gato4');
            await result.current.handleSearch('gato5');
            await result.current.handleSearch('gato6');
            await result.current.handleSearch('gato7');
            await result.current.handleSearch('gato8');
            await result.current.handleSearch('gato9');
        });

        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual([
            'gato9', 'gato8',
            'gato7', 'gato6',
            'gato5', 'gato4',
            'gato3', 'gato2'
        ]);
    });

    test('no debe llamar a getGifsByQuery si el query esta vacío', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifsActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('');
        });

        expect(gifsActions.getGifsByQuery).not.toHaveBeenCalled();
    });

    test('no debe llamar a getGifsByQuery si el query ya existe en prevterms', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifsActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('gatos');
        });

        await act(async () => {
            await result.current.handleSearch('gatos');
        });

        expect(gifsActions.getGifsByQuery).toHaveBeenCalledTimes(1);
    });

});