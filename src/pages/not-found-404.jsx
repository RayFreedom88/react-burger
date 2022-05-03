const styleNotFound = {
    width: '100%',
    margin: '100px auto 40px',
    textAlign: 'center'
};

export function NotFound404() {

    return (
        <>
            <div style={styleNotFound}>
                <h1 className="text text_type_digits-large">404</h1>
                <p className="text text_type_main-large">Страница не найдена</p>
            </div>
        </>
    );
}