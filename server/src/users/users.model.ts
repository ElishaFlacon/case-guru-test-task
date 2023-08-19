import { Column, DataType, Model, Table } from "sequelize-typescript";


interface IUserCreationAttributes {
    username: string;
    birthday: string;
    position: string;
    POLUCHKA: number;
    date_of_hiring: string;
    avalibleLink: string;
}


@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, IUserCreationAttributes> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING })
    password: string;

    @Column({ type: DataType.STRING, defaultValue: 'worker' })
    role: string;

    @Column({ type: DataType.DATE, allowNull: false })
    birthday: string;

    @Column({ type: DataType.STRING, allowNull: false })
    position: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    POLUCHKA: number; // сумма ЗП :)

    @Column({ type: DataType.DATE, allowNull: false })
    date_of_hiring: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    isWorking: boolean;

    @Column({ type: DataType.STRING })
    availableLink: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isAvailable: boolean;
}