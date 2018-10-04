//////////// DEPENDENCIES, MODULES, CONFIGURATIONS /////////////

const Model = require("objection").Model;




////////////// MODEL ///////////////////////////////////////////

class StudentModel extends Model {

    static get tableName() {
        return "students";
    }

    static get idColumn() {
      return "student_id";
    }

    static get jsonSchema() {
      return {
        type: "object",
        required: ["first_name", "last_name"],
        properties: {
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          grade: { type: 'number' },
          email: { type: 'number' }
        }
      };
    }

}


module.exports = StudentModel
