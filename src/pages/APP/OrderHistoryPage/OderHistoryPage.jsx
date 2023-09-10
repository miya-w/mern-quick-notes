// import * as usersService from '../../../utilities/users-service'
import { checkToken } from '../../../utilities/users-service'

export default function OderHistoryPage(){

    async function handleCheckToken(){
        const expDate =  await checkToken();
    }

    return(
    <>
        <h1>OderHistoryPage</h1>
        <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
    )
}