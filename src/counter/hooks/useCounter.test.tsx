import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";


describe('useCouneter', () => {

    // let result;

    // beforeEach(() => {
    //     const { result: hookValue } = renderHook(() => useCounter());
    //     result = hookValue;
    // });

    test('se renderiza con valor inicial default de 10 ', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
    });

    test('se renderiza con valor inicial de 5 ', () => {
        const initialValue = 5;
        const { result } = renderHook(() => useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);
    });

    test('se suma +1 al llamar a handleAdd() ', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleAdd();
        });

        expect(result.current.counter).toBe(11);
    });

    test('se resta -1 al llamar a handleSubstract() ', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleSubstract();
        });

        expect(result.current.counter).toBe(9);
    });

    test('se reinica el counter a su valor inicial al llamar a handleReset()', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleSubstract();
            result.current.handleSubstract();
            result.current.handleSubstract();
        });

        expect(result.current.counter).toBe(7);

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.counter).toBe(10);
    });

});