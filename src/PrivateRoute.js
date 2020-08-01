import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, condition: Condition, ...rest }) => {

    //Check token in every request or load page
    var token = sessionStorage.getItem('token');
    var user_id = sessionStorage.getItem('user_id');
    console.log(token);
    console.log(user_id)

    return(
    <Route
        {...rest}
        render={(props) => 
            Condition ?
                (<Component {...props} />) :
                (<Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />)
        }
    />
    );
}

// const  PrivateRoute: React.FC<{
//     component: React.FC;
//     path: string;
//     exact: boolean;
// }> = (props) => {
//     const condition = props.condition;

//     return condition ? 
//         (<Route 
//             path={props.path} 
//             exact={props.exact} 
//             component={props.component}/>):
//         (<Redirect to="/login"/>)
// };

// export default PrivateRoute;