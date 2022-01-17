import Profile from './components/Profile';
import Loader  from './components/Loader';
import ErrorHandler from './components/ErrorHandler';
import useFetch from './hooks/useFetch';

function App() {
    const { response, error, loading, fetchData } = useFetch('https://randomuser.me/api');

    const handleFetch = () => {
        if (!loading) {
            fetchData();
        }
    };

    return (
        <div className = 'App'>
            {response ? <Profile data = {response.results[0]} /> : null}
            {loading ? <Loader /> : null}
            {error ? <ErrorHandler error = {error} /> : null}
            <button onClick = {handleFetch}>Fetch</button>
        </div>
    );
}

export default App;
