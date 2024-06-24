const { errorResponse, successResponse } = require("../helpers/response-helper");
const { TableConfig } = require("../models");

module.exports = {
    createTableConfig: async (req, res) => {
        const { name, fields } = req.body;
        try {
            await Promise.all(fields.map((field, index) =>
                TableConfig.create({ tableName: name, columnName: field, order: index + 1 })
            ));
            res.status(201).json(successResponse('Table configuration created successfully'));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getTableConfig: async (req, res) => {
        const { tableName } = req.params;
        try {
            const configs = await TableConfig.findAll({
                where: {
                    tableName,
                    isVisible: true
                }
            });

            const columns = configs.sort((a, b) => a.order - b.order).map(config => ({
                title: config.columnName,
                dataIndex: config.columnName,
                key: config.columnName
            }));
            res.status(201).json(successResponse(columns));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    updateTableConfig: async (req, res) => {
        const { tableName } = req.params;
        const { columns } = req.body;
        try {
            await Promise.all(columns.map(column =>
                TableConfig.update(
                    { isVisible: column.isVisible, order: column.order },
                    { where: { tableName, columnName: column.name } }
                )
            ));
            res.status(201).json(successResponse('Table configuration updated successfully'));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getTableConfigVisibility: async (req, res) => {
        const { tableName } = req.params;

        try {
            const configs = await TableConfig.findAll({
                where: {
                    tableName
                }
            });

            const visibilityConfig = {};
            configs.forEach(config => {
                visibilityConfig[config.columnName] = {
                    isVisible: config.isVisible,
                    order: config.order
                }
            });

            res.status(200).json(successResponse(visibilityConfig));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
    // deleteTableConfig: async (req, res) => {
    //     try {
    //         res.status(201).json(successResponse(user));
    //     } catch (error) {
    //         res.status(500).json(errorResponse(error.message, 500));
    //     }
    // },
}