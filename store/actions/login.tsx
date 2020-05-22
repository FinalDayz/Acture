import Login from '../../models/Login';

export const SET_LOGIN = 'SET_LOGIN';

export function fetchLogin(email: string, password: string) {
    return async (dispatch: (arg0: {}) => void) => {
        try {
            const response = await fetch(
                'http://localhost:3000/api/users/login',
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email,
                    password
                  })
                }
              );

              if (!response.ok) {
                throw new Error('Something went wrong!');
              }
              const resData = await response.json();

              for (const key in resData) {
                  new Login(
                    resData[key].success,
                    resData[key].message
                );
              }

            dispatch({SET_LOGIN});
        } catch (err) {
            throw err;
        }
    }
}