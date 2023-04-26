import { Model, DataTypes } from "sequelize";
import database from "../../main/config/db";

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
    modelName: "cards",
    timestamps: true,
  }
);
export {Card}
