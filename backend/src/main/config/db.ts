import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:', {
    logging: false
});

export default sequelize;