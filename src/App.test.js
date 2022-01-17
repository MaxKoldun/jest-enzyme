import { shallow } from 'enzyme';
import Profile from './components/Profile';
import Loader from './components/Loader';
import ErrorHandler from './components/ErrorHandler';
import App from './App.js';
import useFetch from './hooks/useFetch';
import mockUser from './__mocks__/user';

const mockFetchData = jest.fn();
const mockError = new Error('User is not found');

jest.mock('./hooks/useFetch.js', () => jest.fn());

describe('Test App.js', () => {
    beforeEach(() => {
        useFetch.mockImplementation(() => ({
            response  : null,
            error     : null,
            loading   : false,
            fetchData : mockFetchData
        }));
    });

    it('Should render a Profile component', () => {
        useFetch.mockImplementation(() => ({ response: mockUser }));
        const wrapper = shallow(<App />);

        expect(wrapper.find(Profile)).toHaveLength(1);
        expect(wrapper.find(Profile).props().data).toBe(mockUser.results[0]);
    });

    it('Should trigger fetchData if loading is false', () => {
        const wrapper = shallow(<App />);

        wrapper.find('button').simulate('click');

        expect(mockFetchData).toHaveBeenCalledTimes(1);
    });

    it('Shouldn\'t trigger fetchData if loading is true', () => {
        useFetch.mockImplementation(() => ({ loading: true }));
        const wrapper = shallow(<App />);

        wrapper.find('button').simulate('click');

        expect(mockFetchData).toHaveBeenCalledTimes(0);
    });

    it('Should render a Loading component', () => {
        useFetch.mockImplementation(() => ({ loading: true }));
        const wrapper = shallow(<App />);

        expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('Should render a ErrorHandler component', () => {
        useFetch.mockImplementation(() => ({ error: mockError }));
        const wrapper = shallow(<App />);

        expect(wrapper.find(ErrorHandler)).toHaveLength(1);
        expect(wrapper.find(ErrorHandler).props().error).toBe(mockError);
    });
});
