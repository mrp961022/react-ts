import React from 'react'
import { Route } from 'react-router-dom'
import { RouteInterface } from '../assets/js/router'

export const RouteCommon = (route: RouteInterface) => {
    return (
        <Route
            key={route.path}
            path={route.path}
            exact={route.exact || false}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    )
}
