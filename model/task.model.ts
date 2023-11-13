import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Tasks extends Model {
    @Column
    name: String

    @Column
    description: string

    @Column
    createDate: string

    @Column
    updateDate: string

    @Column
    createdBy: string;

    @Column
    updatedBy: string;
}