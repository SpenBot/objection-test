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
        required: ["name", "organization_id", "valid_start_dt"],

        properties: {
          name: { type: 'string', minLength:5, maxLength: 255 },
          name_classification: { type: 'string' },
          organization_id: { type: 'string', format: 'uuid'},
          valid_start_dt: { type: 'string', format: 'date-time' },
          valid_end_dt:  { type: ['string', 'null'], format: 'date-time' },
          weight: { type: 'number' },
          status: { type: 'string',  minLength :3, maxLength: 16 },
          type: { type: 'string', minLength: 3, maxLength: 16 },
          description: { type: ['string', 'null'] },
          description_classification: { type: ['string', 'null'] }
        }
      };

    }

}


module.exports = Priority;
