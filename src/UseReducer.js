import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({name}) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => {
        dispatch({
            type: actionTypes.confirm,
        });
    };

    const onError = () => {
        dispatch({
            type: actionTypes.error,
        });
    };

    const onWrite = (event) => {
        dispatch({
            type: actionTypes.write,
            payload: event.target.value
        })
        // setState({
        //     ...state,
        //     value: newValue,
        // });
    };

    const onCheck = () => {
        dispatch({
            type: actionTypes.check,
        });
    }

    const onDelete = () => {
        dispatch({
            type: actionTypes.delete,
        })
    }

    const onReset = () => {
        dispatch({
            type: actionTypes.reset,
        })
    }

    React.useEffect(() => {
        console.log('Empezando el efecto');

        if (!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación');
                if(state.value === SECURITY_CODE) {
                    onConfirm();
                    // onConfirm();
                    // setLoading(false);
                } else {
                    onError();
                    // onError();
                    // setError(true);
                    // setLoading(false);
                }
                
                console.log('Terminando la validación');
        }, 3000)
        }

        console.log('Terminando el efecto');
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return(
            <div>
                <h2>
                    Eliminar {name}
                </h2>
                <p>
                    Por favor escribe el código de seguridad
                </p>
                {(state.error && !state.loading) && (
                    <p>
                        ERROR: El código es incorrecto
                    </p>
                )}
                {state.loading && (
                    <p>
                        Cargando...
                    </p>
                )}
                <input 
                    placeholder="Código de Seguridad"
                    value={state.value}
                    onChange={onWrite}
                    // onChange={(event) => {
                    //     onWrite(event.target.value)
                    //     // dispatch({
                    //     //     type: actionTypes.write,
                    //     //     payload: event.target.value,
                    //     // })
                    //     // onWrite(event.target.value);
                    //     // setValue(event.target.value);
                    // }}
                />
                <button
                onClick={onCheck}
                    // onClick={() => {
                    //     onCheck();
                    //     // onCheck();
                    //     // setError(false);
                    //     // setLoading(true);
                    // }}

                    // onClick={() => setError(!error)}
                    // onClick={() => setError(prevState => !prevState)}
                >
                    Comprobar
                </button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return(
            <>
                <p>
                    ¿Seguro que quieres eliminar?
                </p>
                <button
                    onClick={onDelete}
                        // onDelete();
                    // onClick={() => {
                    //     onDelete();
                    //     // onDelete();
                    // }}
                >
                    Sí, eliminar
                </button>
                <button
                    onClick={onReset}
                        // onReset();
                   
                    // onClick={() => {
                    //     onReset();
                    //     // onReset();
                    // }}
                >
                    No, regresar
                </button>
            </>
        );
    } else {
        return(
            <>
                <p>
                    UseState fue eliminado
                </p>
                <button
                    onClick={onReset}
                        // onReset();                      
                    // onClick={() => {
                    //     onReset();
                    //     // onReset();                       
                    // }}
                >
                    Volver atrás
                </button>
            </>
        )
    }
}


const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,    
};

// const reducer = (state, action) => {
// };

// const reducer = (state, action) => {
//     if (action.type === 'ERROR') {
//         return {
//             ...state,
//             error: true,
//             loading: false,
//         };
//     } else if (action.type === 'CHECK') {
//         return {
//             ...state,
//             loading: true,
//         };
//     } else {
//         return {
//             ...initialState,
//         }
//     }
// };

// const reducerSwitch = (state, action) => {
//     switch (action.type) {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error: true,
//                 loading: false,
//             }
//         case 'CHECK':
//             return {
//                 ...state,
//                 loading: true,
//             }
//         default:
//             return {
//                 ...state,
//             }
//     }
// }

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
}

const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }
});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer };