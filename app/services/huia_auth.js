var users = {
    'grsevero': 'gorder',
    'admin ': 'pampastorm',
};

exports.auth = function(username, password, fn) {

    //Verifica se usuario existe e se a senha está correta
    if(users[username] && users[username] == password)
        return fn(null, username)
    else
        return fn("Invalid username or password", true);
}
