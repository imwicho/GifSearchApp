import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from "./get-gifs-by-query.action";
import { giphySearchResponseMock } from '../../../tests/mocks/giphy,response.data';

import { giphyApi } from "../api/giphy.api";




describe('getGifsByQuery', () => {

    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        //mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    });

    // test('debe retornar una lista de gifs', async () => {
    //     const gifs = await getGifsByQuery('gatos');
    //     const [gif1] = gifs;

    //     expect(gifs.length).toBe(10);
    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         size: expect.any(String),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //     });
    // });

    test('debe retornar una lista de gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGifsByQuery('cat dance');

        expect(gifs.length).toBe(10);
        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.size).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.height).toBe('number');
            expect(typeof gif.width).toBe('number');
        })
    });

    test('debe retornar una lista vacía de gifs si el query esta vacío', async () => {
        mock.restore();

        const gifs = await getGifsByQuery('');

        expect(gifs.length).toBe(0);
    });

    test('debe manejar el error cuando el API retorna un error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });


        mock.onGet('/search').reply(400, {
            data: {
                message: 'Error en la petición'
            }
        });

        const gifs = await getGifsByQuery('cat dance');

        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
    });

});