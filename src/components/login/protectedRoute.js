import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({
    component: Component,
    isAuthenticated,
    isVerifying,
    isAdmin,
    ...rest
}) => (
        <Route
            {...rest}
            render={props =>
                isVerifying ? 
                (
                    <div />
                ) : 
                isAuthenticated ? 
                (
                    <Component {...props} />
                ) : 
                (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: 'please sign in'
                        }}
                    />
                )
            }
        />
    );
export default ProtectedRoute;