var dbClient = require('./dbClient');
dbClient.connect();

class User {
    
    constructor(name, password) {
        this.name = name,
        this.password = password
    }

    async login() {
        const sql = "select name from Users where name=$1 and password = $2";
        const values = [this.name, this.password];
        let result;

        try {
            result = await dbClient.query(sql, values);
        } catch (e) {
            console.log(e.stack);
        }
        
        return result.rowCount != 0;
    }

    async save() {
        const haveUserQuery = "select name from Users where name=$1";
        const haveUserValues = [this.name];
        let result;

        try {
            result = await dbClient.query(haveUserQuery, haveUserValues);
            if(result.rowCount == 0) {
                const addUserQuery = "insert into users(name, password) values($1, $2)";
                const addUserValues = [this.name, this.password];
                await dbClient.query(addUserQuery, addUserValues);
            }
        } catch (e) {
            console.log(e.stack);
        }
        
        return result.rowCount != 0;
    }

}

User.getAllUsers = async () => {
    const getAllUserQuery = "select name from Users";
    let result;

    try {
        result = await dbClient.query(getAllUserQuery);
    } catch (e) {
        console.log(e.stack);
    }

    return result.rows;
}

module.exports = User;