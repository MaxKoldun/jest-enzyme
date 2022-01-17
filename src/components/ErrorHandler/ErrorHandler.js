import PropTypes  from 'prop-types';

function ErrorHandler(props)  {
    const { error } = props;

    return (
        <p className = 'error'>{error.message}</p>
    );
}

ErrorHandler.propTypes = {
    error : PropTypes.shape({
        message : PropTypes.string.isRequired
    })
};

export default ErrorHandler;
