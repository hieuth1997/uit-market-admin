import * as types from './constant';
let initial =
{
    user : [],
    filter : [],
    schools : [],
}

const filterUser = (users,userName) => {
    let results = [];
    results =  users.filter(item=>{
        return item.user.toLowerCase().search(userName.toLowerCase()) !== -1;

    });
    return results;
}
const formApi = (state = initial, action) => {
    let index = -1;
    const {user} = action;
    switch (action.type) {
        
        case types.GET_SCHOOL_SUCCESS:
            
                
                return  {...state,schools:action.schools} 
       
            
    
        
    
        default : return state;
       

            

  
    }

}
export default formApi;