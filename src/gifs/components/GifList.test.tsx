import { describe, expect, test } from "vitest";
import GifList from "./GifList";
import { render, screen } from "@testing-library/react";
import { gifsMock } from "../../../tests/mocks/gifs.data.ts";

describe('GifList', () => {

    test('debe renderizar el componente con los valores por defecto', () => {
        render(<GifList gifs={[]} />);

        expect(screen.getByRole('heading', { level: 2 })).toBeDefined();
    });

    test('debe renderizar los gifs en el componente', () => {
        const { container } = render(<GifList gifs={gifsMock} />);

        // expect(screen.getAllByRole('img').length).toBe(10);
        // expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(10);
        // expect(screen.getAllByRole('paragraph').length).toBe(10);

        expect(container.getElementsByClassName('gif-card').length).toBe(10);
    });

});