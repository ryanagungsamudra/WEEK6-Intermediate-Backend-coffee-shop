const productDetailModel = require("../model/product-detail.model")
const { Pagination, formResponse } = require("../../helper")

const productDetailController = {
    create: (req, res) => {
        return productDetailModel.create(req.body)
            .then((result) => {
                return formResponse(201, "success", result, res)
            }).catch((error) => {
                return formResponse(500, error)
            })
    },
    read: (req, res) => {
        let { search, category, sortBy, page, limit } = req.query
        let offset = Pagination.buildOffset(page, limit)
        return productDetailModel.read(search, category, sortBy, limit, offset)
            .then((result) => {
                return formResponse(200, "success", result, res)
            }).catch((error) => {
                return formResponse(500, error)
            })
    },

    readDetail: (req, res) => {
        return productDetailModel.readDetail(req.params.id)
            .then((result) => {
                if (result != null) {
                    return res.status(200).send({ message: "Success", data: result })
                } else {
                    return res.status(404).send({ message: "Sorry data not found! Please check your input ID!" })
                }
            }).catch((error) => {
                return formResponse(500, error)
            })
    },
    update: (req, res) => {
        const request = {
            ...req.body,
            id: req.params.id
        }
        return productDetailModel.update(request)
            .then((result) => {
                return formResponse(201, "success", result, res)
            }).catch((error) => {
                return formResponse(500, error)
            })
    },
    remove: (req, res) => {
        return productDetailModel.remove(req.params.id)
            .then((result) => {
                return formResponse(200, "success", result, res)
            }).catch((error) => {
                return formResponse(500, error)
            })
    }
}

module.exports = productDetailController