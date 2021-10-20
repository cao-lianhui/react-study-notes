export default function bindActionCreators(creators, dispatch){
    const bindCreators = {}
    for(const key in creators){
        if(typeof creators[key] === 'function'){
            bindCreators[key] = bindActionCreator(creators[key], dispatch);
        }
    }
    return bindCreators;
}

function bindActionCreator(creators, dispatch){
    return (...args) => dispatch(creators(...args))
}