import { useState, useEffect } from 'react';

const useRerender = () => {
    const [, rerender] = useState({});
    return () => rerender({});
};

const observables = new Set();

export const observer =
    component =>
    (...props) => {
        const rerender = useRerender();
        observables.clear();

        useEffect(() => {
            observables.forEach(observable => observable.subscribe(rerender));

            return () => observables.forEach(observable => observable.unsubscribe(rerender));
        }, [rerender]);

        return component(...props);
    };

export const observable = value => ({
    value,
    listeners: new Set(),
    get() {
        observables.add(this);
        return this.value;
    },
    set(value) {
        this.value = value;
        this.notify();
    },
    subscribe(listener) {
        this.listeners.add(listener);
    },
    unsubscribe(listener) {
        this.listeners.delete(listener);
    },
    notify() {
        this.listeners.forEach(listener => listener());
    },
});
