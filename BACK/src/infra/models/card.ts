import { Model, DataTypes } from "sequelize";
import database from "../../main/config/db";

const MODEL_NAME = "cards";

class Card extends Model {}

Card.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lista: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: MODEL_NAME,
    timestamps: true,
  }
);

export { Card };
