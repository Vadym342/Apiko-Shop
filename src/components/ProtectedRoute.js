import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { userSelector } from '../store';


function ProtectedRoute({ component: Component, ...rest }){
    
    const user = useSelector(userSelector);

    return (
        <Route {...rest} render={(props) =>
                user!==null ?
                    <Component {...props} /> :
                    <Redirect 
                        to={{
                            pathname:'/',
                            state:{
                                from: props.location
                            }
                        }}
                    />
        }
        />
    );
}
export default ProtectedRoute