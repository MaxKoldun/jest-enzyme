import React       from 'react';
import { shallow } from 'enzyme';
import mockUser    from '../__mocks__/user';
import api         from '../singleton/api';
import useFetch    from './useFetch';

const TestUseFetchHooks = () => {
    useFetch();

    return <div />;
};

jest.mock('../singleton/api', () => ({ apiClient: { get: jest.fn() } }));

describe('Test hook useFetch', () => {
    const setResponse = jest.fn();
    const setError = jest.fn();
    const setLoading = jest.fn();

    // useState indexes
    const responseIndex = 0;
    const errorIndex = 1;
    const loadingIndex = 2;
    const useStateMocks = {
        [responseIndex] : [ null, setResponse ],
        [errorIndex]    : [ null, setError ],
        [loadingIndex]  : [ false, setLoading ]
    };

    beforeEach(() => {
        api.apiClient.get.mockImplementation(() => Promise.resolve(mockUser));

        let useStateIndex = 0;

        jest.spyOn(React, 'useState').mockImplementation(() => {
            const useStateMock = useStateMocks[useStateIndex];

            useStateIndex++;

            return useStateMock;
        });

        // We should mock it because useEffect is not supported by Enzyme's shallow rendering.
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    });

    afterEach(() => {
    });

    it('Should fetch a value', async () => {
        shallow(<TestUseFetchHooks />);

        await new Promise(process.nextTick);

        expect(setLoading).toHaveBeenCalledTimes(2);
        expect(setLoading).toHaveBeenCalledWith(true);
        expect(setLoading).toHaveBeenCalledWith(false);

        expect(setResponse).toHaveBeenCalledTimes(1);
        expect(setResponse).toHaveBeenCalledWith(mockUser);
    });

    it('Should throw an error during fetching', async () => {
        const mockError = new Error('User is not found');

        api.apiClient.get.mockImplementation(() => Promise.reject(mockError));

        shallow(<TestUseFetchHooks />);

        await new Promise(process.nextTick);

        expect(api.apiClient.get).rejects.toThrow(mockError);

        expect(setLoading).toHaveBeenCalledTimes(2);
        expect(setLoading).toHaveBeenCalledWith(true);
        expect(setLoading).toHaveBeenCalledWith(false);

        expect(setError).toHaveBeenCalledTimes(1);
        expect(setError).toHaveBeenCalledWith(mockError);
    });
});
