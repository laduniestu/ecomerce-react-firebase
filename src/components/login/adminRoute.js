import React from "react";
import { Route, Redirect } from "react-router-dom";
const adminRoute = ({
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
                isAuthenticated && isAdmin ? 
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
export default adminRoute;