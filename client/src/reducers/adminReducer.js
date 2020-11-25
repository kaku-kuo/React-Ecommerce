import{ 
    CREATE_NEW_PRODUCT_SUCCESS,
    CREATE_NEW_PRODUCT_FAIL,
    CLEAN_NEW_CREATE_PRODUCT
} from '../components/actions/types';

const initialState = {
    newProduct:null,
    loading:true,
    error:null
};

export default(state = initialState, action) => {
       switch(action.type){
          case CREATE_NEW_PRODUCT_SUCCESS:
            return{
            ...state,
            newProduct:action.payload,
            loading:false
        };
          case CLEAN_NEW_CREATE_PRODUCT:
            return{
            ...state,
            newProduct:null,
            loading:true
        };
          case CREATE_NEW_PRODUCT_FAIL:
            return{
            ...state,
            error:action.payload,
            loading:false
        };     
          default:
            return state;  
        };
};