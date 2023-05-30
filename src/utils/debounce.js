export default function debounce(func, delay) {
  let timerId;
  
  return function() {
    const context = this;
    const args = arguments;
    
    if(timerId) clearTimeout(timerId);
    
    timerId = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  };
}