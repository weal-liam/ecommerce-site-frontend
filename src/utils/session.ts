

export default function getOrCreateSessionkey():string {
    let key = localStorage.getItem('session_key');
    if(!key){
        key = Math.random().toString(36) + Date.now().toString(36);
        localStorage.setItem('session_key',key);
    }
    return key;
}