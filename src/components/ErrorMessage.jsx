function ErrorMessage({ message = 'Unable to load movies.' }) {
    return (
        <p role="alert">
            {message}
        </p>
    );
}

export default ErrorMessage;