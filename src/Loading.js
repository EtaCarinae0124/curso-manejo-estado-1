import React from "react";

class Loading extends React.Component {
    componentWillUnmount() {
        console.log('componentwillUnmount');
    }
    
    render() {
        return(
            <p>
                Cargando...
            </p>
        );
    }
}

export { Loading };