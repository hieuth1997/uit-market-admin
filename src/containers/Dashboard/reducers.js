import * as Types from './constant';
let initial = {
  data : [
    {
     title: 'New User is registered.',
     time: '4 hours ago',
    }
   
   
   ],
   card :  [
    {
      id: 2,
      type: 'user-add',
      color: { color: 'rgb(143, 201, 251)' },
      name: 'New Users',
      number: 0,
      bgColor: { background: '#fff', color: '#666' },
      link : "user"
     
    },
    {
      id: 3,
      type: 'fund',
      color: { color: ' rgb(100, 234, 145)' },
      name: 'New Comments',
      number: 0,
      bgColor: { background: 'rgb(38,198,218)', color: '#fff' },
      link : "comment"
    },
    {
      id: 4,
      type: 'shopping',
      color: { color: ' rgb(246, 152, 153)' },
      name: 'New Products',
      number: 0,
      bgColor: { background: 'rgb(26,118,202)', color: '#fff' },
      link : "product",
    },
    {
      id: 1,
      type: 'user',
      color: { color: ' rgb(216, 151, 235)' },
      name: 'Online Users',
      number: 0,
      bgColor: { background: 'rgb(116,96,238)', color: '#fff' },
      link : "user"
    },
    
   
  ],
}

 const dashboardReducer = (state = initial , action) => {
  switch (action.type) {
    case Types.SET_COLAPSE:
      {
        return {...state ,isCollaped : !state.isCollaped }
       
      }
      case Types.SHOW_STATIC :
        const objectToArray = Object.values(action.result)
        let cards = state.card.map((each,index)=>{
          each.number=objectToArray[index];
          return {...each}
        })
        return{...state,card:cards}
    default:
      return state
  }
}
export default dashboardReducer;
