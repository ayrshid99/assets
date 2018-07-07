import { ActionReducer, Action } from '@ngrx/store';
export const LOGINSTART = "LOGINSTART";
export const LOGINSUCCESS = "LOGINSUCCESS";
export const LOGINFAILURE = "LOGINFAILURE";
export const LOGOUT = "LOGOUT"

export interface Message {
    type: string,
    message: string

}


export interface LoginState {

    message: Message,
    token: string,
    roles: string[],
    isAuthenticated: boolean,
    username: string


}

const initialState =
    {


        message: { type: "", message: "" },
        token: "",
        roles: [],
        isAuthenticated: false,
        username: ""
    }

export function loginStart(data) {
    console.log("loginstart" + data)
    return {
        type: LOGINSTART,
        payload: data
    }
}

export function loginSuccess(data) {


    console.log("loginSuccess " + data)
    return {
        type: LOGINSUCCESS,
        payload: data
    }
}

export function loginFailure(error) {
    console.log("loginFailure" + error)

    return {
        type: LOGINFAILURE,
        payload: error
    }
}
export function loginReducers(state: LoginState = initialState, action: Action) {
    switch (action.type) {
        case LOGINSTART: {
            console.log(LOGINSTART)
            return Object.assign({}, state,)

        }
        //Object.assign({},state,{loading:true})


        case LOGINSUCCESS:
            {
                console.log(LOGINSUCCESS)

                return Object.assign({}, state, {  isAuthenticated: true, message: undefined }, action.payload

                )

            }



        case LOGINFAILURE:
            {
                console.log(LOGINFAILURE)
                return Object.assign({}, state, {  message: { type: "error", message: "Wrong Username or Password" } })

            }

        case LOGOUT:
            return initialState
        default:
            return state;
    }
}