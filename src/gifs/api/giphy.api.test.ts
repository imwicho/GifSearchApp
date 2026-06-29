import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";


describe('giphyApi', () => {

    test('debe estar correctamente configurado', () => {

        const params = giphyApi.defaults.params;
        console.log(params);

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        // expect(giphyApi.defaults.params.lang).toBe('es');

        // expect(params.lang).toBe('es');
        // expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);

        //* .toBe se usa para evaluar primitivos

        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY
        });

        //* .toStrictEqual se usa para evaluar objetos
    })

});